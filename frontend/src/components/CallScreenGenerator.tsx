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
  Switch,
  FormControlLabel,
  CircularProgress,
} from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import CallScreen from './CallScreen';

const CallScreenGenerator: React.FC = () => {
  const previewRef = useRef<HTMLDivElement>(null);
  
  // Состояние для настроек
  const [contactName, setContactName] = useState('Владимир Николаевич');
  const [contactNumber, setContactNumber] = useState('+7-911-563-54-37');
  const [callState, setCallState] = useState<'incoming' | 'busy'>('incoming');
  const [timeDisplay, setTimeDisplay] = useState('14:38');
  const [batteryLevel, setBatteryLevel] = useState(85);
  const [showAvatar, setShowAvatar] = useState(false);
  const [avatarColor, setAvatarColor] = useState('#007AFF');
  const [isDownloading, setIsDownloading] = useState(false);

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

  // Обработчик изменения номера телефона с автоформатированием
  const handlePhoneChange = (value: string) => {
    setContactNumber(value);
    
    // Автоформатирование только если это похоже на российский номер
    if (value.startsWith('+7') && value.replace(/[^\d]/g, '').length >= 11) {
      const formatted = formatPhoneNumber(value);
      if (formatted !== value) {
        setContactNumber(formatted);
      }
    }
  };

  const handleDownload = async () => {
    if (!previewRef.current || isDownloading) return;

    setIsDownloading(true);
    
    try {
      // Находим элемент с экраном вызова
      const callElement = previewRef.current.querySelector('[data-call-screen]') as HTMLElement;
      const phoneBody = previewRef.current.querySelector('[data-phone-body]') as HTMLElement;
      
      if (!callElement || !phoneBody) {
        alert('Ошибка: не удалось найти элемент для скриншота');
        return;
      }

      // Сохраняем оригинальные стили
      const originalCallBorderRadius = callElement.style.borderRadius;
      const originalBodyBorderRadius = phoneBody.style.borderRadius;
      
      // Временно убираем округление
      callElement.style.borderRadius = '0';
      phoneBody.style.borderRadius = '0';

      // Создаем скриншот
      const canvas = await html2canvas(callElement, {
        backgroundColor: null,
        scale: 2,
        useCORS: true,
        allowTaint: true,
        width: 405,
        height: 888,
      });

      // Восстанавливаем оригинальные стили
      callElement.style.borderRadius = originalCallBorderRadius;
      phoneBody.style.borderRadius = originalBodyBorderRadius;

      // Создаем ссылку для скачивания
      const link = document.createElement('a');
      link.download = `call-screen-${callState}-${Date.now()}.png`;
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

  const avatarColors = [
    { name: 'Синий', value: '#007AFF' },
    { name: 'Зеленый', value: '#32D74B' },
    { name: 'Красный', value: '#FF3B30' },
    { name: 'Оранжевый', value: '#FF9500' },
    { name: 'Фиолетовый', value: '#AF52DE' },
    { name: 'Розовый', value: '#FF2D92' },
    { name: 'Серый', value: '#8E8E93' },
  ];

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
                <Typography sx={{ color: 'white', fontSize: '20px', fontWeight: 'bold' }}>📞</Typography>
              </Box>
              <Typography variant="h5" sx={{ fontWeight: 700, color: '#ffffff' }}>
                Настройки вызова
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
                📱 Информация о контакте
              </Typography>
              
              <TextField
                fullWidth
                label="Имя контакта"
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
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
                label="Номер телефона"
                value={contactNumber}
                onChange={(e) => handlePhoneChange(e.target.value)}
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
                <InputLabel>Состояние вызова</InputLabel>
                <Select
                  value={callState}
                  label="Состояние вызова"
                  onChange={(e) => setCallState(e.target.value as any)}
                >
                  <MenuItem value="incoming">📞 Входящий вызов</MenuItem>
                  <MenuItem value="busy">�� Занято</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth sx={{ 
                mb: 3,
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
                <InputLabel>Цвет аватара</InputLabel>
                <Select
                  value={avatarColor}
                  label="Цвет аватара"
                  onChange={(e) => setAvatarColor(e.target.value)}
                >
                  {avatarColors.map((color) => (
                    <MenuItem key={color.value} value={color.value}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Box 
                          sx={{ 
                            width: 20, 
                            height: 20, 
                            borderRadius: '50%', 
                            backgroundColor: color.value 
                          }} 
                        />
                        {color.name}
                      </Box>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControlLabel
                control={
                  <Switch
                    checked={showAvatar}
                    onChange={(e) => setShowAvatar(e.target.checked)}
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
                    👤 Показать аватар
                  </Typography>
                }
              />
            </Box>

            {/* Настройки системы */}
            <Box sx={{ 
              mb: 4, 
              p: 3, 
              borderRadius: '16px', 
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.1))',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }}>
              <Typography variant="h6" sx={{ mb: 3, color: '#ffffff', fontWeight: 600 }}>
                ⚙️ Системные настройки
              </Typography>
              
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
                Превью iPhone
              </Typography>
            </Box>
            
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
              <div ref={previewRef}>
                <CallScreen
                  contactName={contactName}
                  contactNumber={contactNumber}
                  callState={callState}
                  darkTheme={true}
                  timeDisplay={timeDisplay}
                  batteryLevel={batteryLevel}
                  showAvatar={showAvatar}
                  avatarColor={avatarColor}
                />
              </div>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default CallScreenGenerator; 