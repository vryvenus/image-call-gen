import React, { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import {
  Card,
  CardContent,
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Typography,
  Slider,
  Chip,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Switch,
  FormControlLabel,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import DownloadIcon from '@mui/icons-material/Download';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import TelegramPreview from './TelegramPreview';

interface CallEntry {
  id: string;
  name: string;
  type: 'incoming' | 'outgoing' | 'missed';
  time: string;
  count?: number;
  callType?: 'telegram' | 'phone'; // Тип вызова: Telegram или обычный телефон
}

const PhotoGenerator: React.FC = () => {
  const previewRef = useRef<HTMLDivElement>(null);
  
  const [calls, setCalls] = useState<CallEntry[]>([
    { id: '1', name: 'Владимир Николаевич', type: 'incoming', time: '14:35', count: 2, callType: 'phone' },
    { id: '4', name: 'Вика салон на Лужниках', type: 'incoming', time: 'Вчера', count: 2, callType: 'phone' },
    { id: '5', name: 'Пашка', type: 'incoming', time: 'Вчера', callType: 'telegram' },
    { id: '6', name: 'Люба', type: 'incoming', time: 'Вчера', count: 2, callType: 'phone' },
    { id: '7', name: 'Пашка', type: 'missed', time: 'Вчера', callType: 'telegram' },
    { id: '8', name: 'Бухгалтерия', type: 'incoming', time: 'Вчера', callType: 'phone' },
  ]);
  
  const [newCallName, setNewCallName] = useState('');
  const [newCallType, setNewCallType] = useState<'incoming' | 'outgoing' | 'missed'>('incoming');
  const [newCallTime, setNewCallTime] = useState('');
  const [newCallCount, setNewCallCount] = useState<number>(1);
  const [newCallCallType, setNewCallCallType] = useState<'telegram' | 'phone'>('telegram');

  // Функция для форматирования номера телефона
  const formatPhoneNumber = (value: string): string => {
    // Убираем все символы кроме цифр и +
    const cleaned = value.replace(/[^\d+]/g, '');
    
    // Если не начинается с +, возвращаем как есть
    if (!cleaned.startsWith('+')) {
      return value;
    }
    
    // Если начинается с +7 (российский номер)
    if (cleaned.startsWith('+7') && cleaned.length >= 4) {
      const digits = cleaned.slice(2); // убираем +7
      let formatted = '+7';
      
      if (digits.length >= 3) {
        formatted += '-' + digits.slice(0, 3);
      }
      if (digits.length >= 6) {
        formatted += '-' + digits.slice(3, 6);
      }
      if (digits.length >= 8) {
        formatted += '-' + digits.slice(6, 8);
      }
      if (digits.length >= 10) {
        formatted += '-' + digits.slice(8, 10);
      }
      
      return formatted;
    }
    
    // Для других стран - базовое форматирование
    if (cleaned.length > 1) {
      const countryCode = cleaned.slice(0, cleaned.indexOf('0') > 0 ? cleaned.indexOf('0') : 4);
      const number = cleaned.slice(countryCode.length);
      
      if (number.length >= 2) {
        let formatted = countryCode;
        // Группируем по 3 цифры
        for (let i = 0; i < number.length; i += 3) {
          if (i > 0) formatted += '-';
          formatted += number.slice(i, i + 3);
        }
        return formatted;
      }
    }
    
    return cleaned;
  };

  // Обработчик изменения имени контакта с автоформатированием
  const handleNameChange = (value: string) => {
    if (value.startsWith('+')) {
      const formatted = formatPhoneNumber(value);
      setNewCallName(formatted);
      // Автоматически устанавливаем тип "phone" для номеров
      if (newCallCallType === 'telegram') {
        setNewCallCallType('phone');
      }
    } else {
      setNewCallName(value);
    }
  };
  
  const [darkTheme, setDarkTheme] = useState(true);
  const [showSearch, setShowSearch] = useState(true);
  const [showWifi, setShowWifi] = useState(false);
  const [headerTitle, setHeaderTitle] = useState('Недавние');
  const [timeDisplay, setTimeDisplay] = useState('14:38');
  const [batteryLevel, setBatteryLevel] = useState(50);
  const [isDownloading, setIsDownloading] = useState(false);
  
  // Состояние для редактирования
  const [editingCall, setEditingCall] = useState<CallEntry | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  const addCall = () => {
    if (!newCallName.trim()) return;
    
    const newCall: CallEntry = {
      id: Date.now().toString(),
      name: newCallName,
      type: newCallType,
      time: newCallTime || 'Сейчас',
      count: newCallCount > 1 ? newCallCount : undefined,
      callType: newCallCallType,
    };
    
    setCalls([newCall, ...calls]);
    setNewCallName('');
    setNewCallTime('');
    setNewCallCount(1);
    setNewCallCallType('telegram');
  };

  const removeCall = (id: string) => {
    setCalls(calls.filter(call => call.id !== id));
  };

  const startEditCall = (call: CallEntry) => {
    setEditingCall({ ...call });
    setEditDialogOpen(true);
  };

  const saveEditCall = () => {
    if (!editingCall) return;
    
    setCalls(calls.map(call => 
      call.id === editingCall.id ? editingCall : call
    ));
    setEditDialogOpen(false);
    setEditingCall(null);
  };

  const cancelEditCall = () => {
    setEditDialogOpen(false);
    setEditingCall(null);
  };

  const handleDownload = async () => {
    if (!previewRef.current || isDownloading) return;

    setIsDownloading(true);
    
    try {
      // Находим элемент с превью Telegram
      const telegramElement = previewRef.current.querySelector('[data-telegram-preview]') as HTMLElement;
      
      if (!telegramElement) {
        alert('Ошибка: не удалось найти элемент для скриншота');
        return;
      }

      // Временно убираем рамку и скругления для скриншота
      const originalBorder = telegramElement.style.border;
      const originalBorderRadius = telegramElement.style.borderRadius;
      
      telegramElement.style.border = 'none';
      telegramElement.style.borderRadius = '0px';

      // Создаем скриншот
      const canvas = await html2canvas(telegramElement, {
        backgroundColor: null,
        scale: 2, // Увеличиваем качество
        useCORS: true,
        allowTaint: true,
        width: 375,
        height: 812,
      });

      // Возвращаем оригинальные стили
      telegramElement.style.border = originalBorder;
      telegramElement.style.borderRadius = originalBorderRadius;

      // Создаем ссылку для скачивания
      const link = document.createElement('a');
      link.download = `telegram-calls-${Date.now()}.png`;
      link.href = canvas.toDataURL('image/png');
      
      // Автоматически скачиваем файл
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
    } catch (error) {
      console.error('Ошибка при создании скриншота:', error);
      alert('Ошибка при создании скриншота. Попробуйте еще раз.');
    } finally {
      setIsDownloading(false);
    }
  };

  const getCallTypeColor = (type: string) => {
    switch (type) {
      case 'incoming': return 'success';
      case 'outgoing': return 'primary';
      case 'missed': return 'error';
      default: return 'default';
    }
  };

  const getCallTypeLabel = (type: string) => {
    switch (type) {
      case 'incoming': return 'Входящий';
      case 'outgoing': return 'Исходящий';
      case 'missed': return 'Пропущенный';
      default: return type;
    }
  };

  return (
    <Grid container spacing={4} sx={{ maxWidth: '1400px', mx: 'auto', px: 2 }} className="fade-in-up">
      {/* Панель настроек */}
      <Grid item xs={12} md={6}>
        <Card 
          elevation={8} 
          className="fade-in-up"
          sx={{ 
            borderRadius: '20px',
            background: 'rgba(0, 0, 0, 0.7)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'translateY(-5px)',
              boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
            },
          }}
        >
          <CardContent sx={{ p: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <Box sx={{
                width: 40,
                height: 40,
                borderRadius: '12px',
                background: 'linear-gradient(45deg, #333333, #555555)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mr: 2,
              }}>
                <Typography sx={{ color: 'white', fontSize: '20px', fontWeight: 'bold' }}>⚙️</Typography>
              </Box>
              <Typography variant="h5" sx={{ fontWeight: 700, color: '#ffffff' }}>
                Настройки экрана
              </Typography>
            </Box>
          
          {/* Основные настройки */}
          <Box sx={{ 
            mb: 4, 
            p: 3, 
            borderRadius: '16px', 
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.1))',
            border: '1px solid rgba(255, 255, 255, 0.1)',
          }}>
            <Typography variant="h6" sx={{ mb: 3, color: '#ffffff', fontWeight: 600 }}>
              🎨 Основные настройки
            </Typography>
            
            <TextField
              fullWidth
              label="Заголовок"
              value={headerTitle}
              onChange={(e) => setHeaderTitle(e.target.value)}
              sx={{ 
                mb: 2,
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px',
                  '&:hover fieldset': {
                    borderColor: '#ffffff',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#ffffff',
                  },
                },
              }}
            />
            
            <TextField
              fullWidth
              label="Время в статус-баре"
              value={timeDisplay}
              onChange={(e) => setTimeDisplay(e.target.value)}
              sx={{ 
                mb: 3,
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px',
                  '&:hover fieldset': {
                    borderColor: '#ffffff',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#ffffff',
                  },
                },
              }}
            />
            
            <Box sx={{ mb: 3 }}>
              <Typography gutterBottom sx={{ color: '#ffffff', fontWeight: 500 }}>
                🔋 Уровень батареи: {batteryLevel}%
              </Typography>
              <Slider
                value={batteryLevel}
                onChange={(_, newValue) => setBatteryLevel(newValue as number)}
                min={0}
                max={100}
                sx={{ 
                  color: '#ffffff',
                  '& .MuiSlider-thumb': {
                    background: 'linear-gradient(45deg, #333333, #555555)',
                    boxShadow: '0 4px 8px rgba(255, 255, 255, 0.3)',
                  },
                  '& .MuiSlider-track': {
                    background: 'linear-gradient(45deg, #333333, #555555)',
                  },
                }}
              />
            </Box>
            
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={darkTheme}
                    onChange={(e) => setDarkTheme(e.target.checked)}
                    sx={{
                      '& .MuiSwitch-switchBase.Mui-checked': {
                        color: '#ffffff',
                        '& + .MuiSwitch-track': {
                          backgroundColor: '#ffffff',
                        },
                      },
                    }}
                  />
                }
                label={
                  <Typography sx={{ color: '#ffffff', fontWeight: 500 }}>
                    🌙 Темная тема
                  </Typography>
                }
              />
              
              <FormControlLabel
                control={
                  <Switch
                    checked={showSearch}
                    onChange={(e) => setShowSearch(e.target.checked)}
                    sx={{
                      '& .MuiSwitch-switchBase.Mui-checked': {
                        color: '#ffffff',
                        '& + .MuiSwitch-track': {
                          backgroundColor: '#ffffff',
                        },
                      },
                    }}
                  />
                }
                label={
                  <Typography sx={{ color: '#ffffff', fontWeight: 500 }}>
                    🔍 Показать поиск
                  </Typography>
                }
              />
              
              <FormControlLabel
                control={
                  <Switch
                    checked={showWifi}
                    onChange={(e) => setShowWifi(e.target.checked)}
                    sx={{
                      '& .MuiSwitch-switchBase.Mui-checked': {
                        color: '#ffffff',
                        '& + .MuiSwitch-track': {
                          backgroundColor: '#ffffff',
                        },
                      },
                    }}
                  />
                }
                label={
                  <Typography sx={{ color: '#ffffff', fontWeight: 500 }}>
                    📶 Показать Wi-Fi
                  </Typography>
                }
              />
            </Box>
          </Box>

          {/* Добавление нового вызова */}
          <Box sx={{ 
            mb: 4, 
            p: 3, 
            borderRadius: '16px', 
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.1))',
            border: '1px solid rgba(255, 255, 255, 0.1)',
          }}>
            <Typography variant="h6" sx={{ mb: 3, color: '#ffffff', fontWeight: 600 }}>
              ➕ Добавить вызов
            </Typography>
            <TextField
              fullWidth
              label="Имя контакта или номер телефона"
              value={newCallName}
              onChange={(e) => handleNameChange(e.target.value)}
              placeholder="Например: Иван Иванов или +79115635437"
              sx={{ 
                mb: 2,
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px',
                  '&:hover fieldset': {
                    borderColor: '#ffffff',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#ffffff',
                  },
                },
              }}
            />
            
            <FormControl fullWidth sx={{ 
              mb: 2,
              '& .MuiOutlinedInput-root': {
                borderRadius: '12px',
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#ffffff',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#ffffff',
                },
              },
            }}>
              <InputLabel>Тип вызова</InputLabel>
              <Select
                value={newCallType}
                label="Тип вызова"
                onChange={(e) => setNewCallType(e.target.value as any)}
              >
                <MenuItem value="incoming">📞 Входящий</MenuItem>
                <MenuItem value="outgoing">📱 Исходящий</MenuItem>
                <MenuItem value="missed">❌ Пропущенный</MenuItem>
              </Select>
            </FormControl>
            
            <FormControl fullWidth sx={{ 
              mb: 2,
              '& .MuiOutlinedInput-root': {
                borderRadius: '12px',
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#ffffff',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#ffffff',
                },
              },
            }}>
              <InputLabel>Источник вызова</InputLabel>
              <Select
                value={newCallCallType}
                label="Источник вызова"
                onChange={(e) => setNewCallCallType(e.target.value as any)}
              >
                <MenuItem value="telegram">💬 Аудиовызов Telegram</MenuItem>
                <MenuItem value="phone">🇷🇺 Россия</MenuItem>
              </Select>
            </FormControl>
            
            <TextField
              fullWidth
              label="Время (например: 14:35, Вчера)"
              value={newCallTime}
              onChange={(e) => setNewCallTime(e.target.value)}
              sx={{ 
                mb: 2,
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px',
                  '&:hover fieldset': {
                    borderColor: '#ffffff',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#ffffff',
                  },
                },
              }}
            />
            
            <TextField
              fullWidth
              type="number"
              label="Количество вызовов"
              value={newCallCount}
              onChange={(e) => setNewCallCount(parseInt(e.target.value) || 1)}
              inputProps={{ min: 1, max: 99 }}
              sx={{ 
                mb: 3,
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px',
                  '&:hover fieldset': {
                    borderColor: '#ffffff',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#ffffff',
                  },
                },
              }}
            />
            
            <Button
              fullWidth
              variant="contained"
              startIcon={<AddIcon />}
              onClick={addCall}
              disabled={!newCallName.trim()}
              sx={{
                borderRadius: '12px',
                background: 'linear-gradient(45deg, #333333, #555555)',
                boxShadow: '0 4px 15px rgba(255, 255, 255, 0.2)',
                py: 1.5,
                fontSize: '16px',
                fontWeight: 600,
                color: '#ffffff',
                '&:hover': {
                  background: 'linear-gradient(45deg, #444444, #666666)',
                  boxShadow: '0 6px 20px rgba(255, 255, 255, 0.3)',
                  color: '#ffffff',
                },
                '&:disabled': {
                  background: '#333333',
                  color: '#666666',
                },
              }}
            >
              Добавить вызов
            </Button>
          </Box>

          {/* Список вызовов */}
          <Box sx={{ 
            mb: 4, 
            p: 3, 
            borderRadius: '16px', 
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.1))',
            border: '1px solid rgba(255, 255, 255, 0.1)',
          }}>
            <Typography variant="h6" sx={{ mb: 3, color: '#ffffff', fontWeight: 600 }}>
              📋 Список вызовов ({calls.length})
            </Typography>
            
            <List sx={{ 
              maxHeight: 300, 
              overflow: 'auto', 
              mb: 3,
              '& .MuiListItem-root': {
                borderRadius: '12px',
                mb: 1,
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                '&:hover': {
                  background: 'rgba(255, 255, 255, 0.2)',
                  transform: 'translateX(4px)',
                  transition: 'all 0.2s ease',
                },
              },
            }}>
              {calls.map((call) => (
                <ListItem
                  key={call.id}
                  secondaryAction={
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <IconButton 
                        onClick={() => startEditCall(call)}
                        sx={{
                          color: '#4dabf7',
                          '&:hover': {
                            background: 'rgba(77, 171, 247, 0.1)',
                            transform: 'scale(1.1)',
                          },
                          transition: 'all 0.2s ease',
                        }}
                      >
                        <EditIcon />
                      </IconButton>
                    <IconButton 
                      edge="end" 
                      onClick={() => removeCall(call.id)}
                      sx={{
                        color: '#ff4757',
                        '&:hover': {
                          background: 'rgba(255, 71, 87, 0.1)',
                          transform: 'scale(1.1)',
                        },
                        transition: 'all 0.2s ease',
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                    </Box>
                  }
                >
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <span style={{ color: '#ffffff' }}>{call.name}</span>
                        <Chip
                          label={getCallTypeLabel(call.type)}
                          size="small"
                          color={getCallTypeColor(call.type) as any}
                        />
                        {call.count && (
                          <Chip label={`(${call.count})`} size="small" variant="outlined" />
                        )}
                        <Chip 
                          label={call.callType === 'telegram' ? 'Telegram' : 'Россия'} 
                          size="small" 
                          variant="outlined"
                          color={call.callType === 'telegram' ? 'info' : 'default'}
                        />
                      </Box>
                    }
                    secondary={<span style={{ color: '#cccccc' }}>{call.time}</span>}
                  />
                </ListItem>
              ))}
            </List>
          </Box>

          <Button
            fullWidth
            variant="contained"
            size="large"
            onClick={handleDownload}
            disabled={isDownloading}
            startIcon={isDownloading ? <CircularProgress size={20} color="inherit" /> : <DownloadIcon />}
            sx={{
              borderRadius: '16px',
              background: 'linear-gradient(45deg, #333333, #555555)',
              boxShadow: '0 8px 25px rgba(255, 255, 255, 0.2)',
              py: 2,
              fontSize: '18px',
              fontWeight: 700,
              color: '#ffffff',
              '&:hover': {
                background: 'linear-gradient(45deg, #444444, #666666)',
                boxShadow: '0 12px 35px rgba(255, 255, 255, 0.3)',
                transform: 'translateY(-2px)',
                color: '#ffffff',
              },
              '&:disabled': {
                background: '#333333',
                color: '#666666',
                boxShadow: 'none',
              },
              transition: 'all 0.3s ease',
            }}
          >
            {isDownloading ? 'Создание скриншота...' : '💾 Скачать PNG'}
          </Button>
        </CardContent>
      </Card>
    </Grid>

    {/* Превью */}
    <Grid item xs={12} md={6}>
      <Card 
        elevation={8} 
        className="fade-in-up"
        sx={{ 
          borderRadius: '20px',
          background: 'rgba(0, 0, 0, 0.7)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
          },
        }}
      >
        <CardContent sx={{ p: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <Box sx={{
              width: 40,
              height: 40,
              borderRadius: '12px',
              background: 'linear-gradient(45deg, #333333, #555555)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mr: 2,
            }}>
              <Typography sx={{ color: 'white', fontSize: '20px', fontWeight: 'bold' }}>📱</Typography>
            </Box>
            <Typography variant="h5" sx={{ fontWeight: 700, color: '#ffffff' }}>
              Превью
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <div ref={previewRef}>
              <TelegramPreview
                calls={calls}
                darkTheme={darkTheme}
                showSearch={showSearch}
                showWifi={showWifi}
                headerTitle={headerTitle}
                timeDisplay={timeDisplay}
                batteryLevel={batteryLevel}
              />
            </div>
          </Box>
        </CardContent>
      </Card>
    </Grid>

    {/* Диалог редактирования вызова */}
    <Dialog 
      open={editDialogOpen} 
      onClose={cancelEditCall}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: '20px',
          background: 'rgba(0, 0, 0, 0.9)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        }
      }}
    >
      <DialogTitle sx={{ color: '#ffffff', fontWeight: 700 }}>
        ✏️ Редактировать вызов
      </DialogTitle>
      <DialogContent>
        {editingCall && (
          <Box sx={{ pt: 2 }}>
            <TextField
              fullWidth
              label="Имя контакта или номер телефона"
              value={editingCall.name}
              onChange={(e) => setEditingCall({ ...editingCall, name: e.target.value })}
              sx={{ 
                mb: 2,
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px',
                  '&:hover fieldset': {
                    borderColor: '#ffffff',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#ffffff',
                  },
                },
              }}
            />
            
            <FormControl fullWidth sx={{ 
              mb: 2,
              '& .MuiOutlinedInput-root': {
                borderRadius: '12px',
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#ffffff',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#ffffff',
                },
              },
            }}>
              <InputLabel>Тип вызова</InputLabel>
              <Select
                value={editingCall.type}
                label="Тип вызова"
                onChange={(e) => setEditingCall({ ...editingCall, type: e.target.value as any })}
              >
                <MenuItem value="incoming">📞 Входящий</MenuItem>
                <MenuItem value="outgoing">📱 Исходящий</MenuItem>
                <MenuItem value="missed">❌ Пропущенный</MenuItem>
              </Select>
            </FormControl>
            
            <FormControl fullWidth sx={{ 
              mb: 2,
              '& .MuiOutlinedInput-root': {
                borderRadius: '12px',
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#ffffff',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#ffffff',
                },
              },
            }}>
              <InputLabel>Источник вызова</InputLabel>
              <Select
                value={editingCall.callType}
                label="Источник вызова"
                onChange={(e) => setEditingCall({ ...editingCall, callType: e.target.value as any })}
              >
                <MenuItem value="telegram">💬 Аудиовызов Telegram</MenuItem>
                <MenuItem value="phone">🇷🇺 Россия</MenuItem>
              </Select>
            </FormControl>
            
            <TextField
              fullWidth
              label="Время (например: 14:35, Вчера)"
              value={editingCall.time}
              onChange={(e) => setEditingCall({ ...editingCall, time: e.target.value })}
              sx={{ 
                mb: 2,
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px',
                  '&:hover fieldset': {
                    borderColor: '#ffffff',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#ffffff',
                  },
                },
              }}
            />
            
            <TextField
              fullWidth
              type="number"
              label="Количество вызовов"
              value={editingCall.count || 1}
              onChange={(e) => setEditingCall({ 
                ...editingCall, 
                count: parseInt(e.target.value) > 1 ? parseInt(e.target.value) : undefined 
              })}
              inputProps={{ min: 1, max: 99 }}
              sx={{ 
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px',
                  '&:hover fieldset': {
                    borderColor: '#ffffff',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#ffffff',
                  },
                },
              }}
            />
          </Box>
        )}
      </DialogContent>
      <DialogActions sx={{ p: 3 }}>
        <Button 
          onClick={cancelEditCall}
          sx={{ 
            borderRadius: '12px',
            color: '#ffffff',
            '&:hover': {
              background: 'rgba(255, 255, 255, 0.1)',
            },
          }}
        >
          Отмена
        </Button>
        <Button 
          onClick={saveEditCall}
          variant="contained"
          sx={{
            borderRadius: '12px',
            background: 'linear-gradient(45deg, #333333, #555555)',
            '&:hover': {
              background: 'linear-gradient(45deg, #444444, #666666)',
            },
          }}
        >
          Сохранить
        </Button>
      </DialogActions>
    </Dialog>
  </Grid>
  );
};

export default PhotoGenerator; 