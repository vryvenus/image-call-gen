import React from 'react';
import { Box, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import MicIcon from '@mui/icons-material/Mic';

interface CallEntry {
  id: string;
  name: string;
  type: 'incoming' | 'outgoing' | 'missed';
  time: string;
  count?: number;
  callType?: 'telegram' | 'phone';
}

interface TelegramPreviewProps {
  calls: CallEntry[];
  darkTheme: boolean;
  showSearch: boolean;
  showWifi: boolean;
  headerTitle: string;
  timeDisplay: string;
  batteryLevel: number;
}

const TelegramPreview: React.FC<TelegramPreviewProps> = ({
  calls,
  darkTheme,
  showSearch,
  showWifi,
  headerTitle,
  timeDisplay,
  batteryLevel,
}) => {
  const getCallIcon = (type: string) => {
    // Не показываем никаких иконок для всех типов вызовов
    return null;
  };

  const getSignalBars = () => {
    return (
      <Box sx={{ display: 'flex', alignItems: 'end', gap: '1px', mr: 1 }}>
        {[1, 2, 3, 4].map((bar) => (
          <Box
            key={bar}
            sx={{
              width: '3px',
              height: `${bar * 2 + 2}px`,
              backgroundColor: darkTheme ? '#FFFFFF' : '#000000',
              borderRadius: '0.5px',
            }}
          />
        ))}
      </Box>
    );
  };

  const getWifiIcon = () => (
    <Box sx={{ mr: 1 }}>
      <svg width="15" height="11" viewBox="0 0 15 11" fill="none">
        <path
          d="M1.5 8.5C3.5 6.5 5.5 5.5 7.5 5.5C9.5 5.5 11.5 6.5 13.5 8.5M3.5 10C4.5 9 6 8.5 7.5 8.5C9 8.5 10.5 9 11.5 10M7.5 11C7.78 11 8 10.78 8 10.5C8 10.22 7.78 10 7.5 10C7.22 10 7 10.22 7 10.5C7 10.78 7.22 11 7.5 11Z"
          stroke={darkTheme ? '#FFFFFF' : '#000000'}
          strokeWidth="1"
          fill="none"
          strokeLinecap="round"
        />
      </svg>
    </Box>
  );

  const getBatteryIcon = () => (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box
        sx={{
          width: '24px',
          height: '12px',
          border: `1px solid ${darkTheme ? '#FFFFFF' : '#000000'}`,
          borderRadius: '2px',
          position: 'relative',
          mr: '2px',
        }}
      >
        <Box
          sx={{
            width: `${(batteryLevel / 100) * 20}px`,
            height: '8px',
            backgroundColor: batteryLevel > 20 ? (darkTheme ? '#FFFFFF' : '#000000') : '#FF3B30',
            borderRadius: '1px',
            margin: '1px',
          }}
        />
      </Box>
      <Box
        sx={{
          width: '2px',
          height: '6px',
          backgroundColor: darkTheme ? '#FFFFFF' : '#000000',
          borderRadius: '0 1px 1px 0',
        }}
      />
    </Box>
  );

  return (
    <Box
      data-telegram-preview
      sx={{
        width: '375px',
        height: '812px',
        backgroundColor: darkTheme ? '#000000' : '#FFFFFF',
        color: darkTheme ? '#FFFFFF' : '#000000',
        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", Helvetica, Arial, sans-serif',
        position: 'relative',
        overflow: 'hidden',
        borderRadius: '40px',
        border: '8px solid #1C1C1E',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Status Bar */}
      <Box
        sx={{
          height: '44px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: 3,
          pt: 1,
        }}
      >
        <Typography sx={{ fontSize: '17px', fontWeight: 600, letterSpacing: '-0.41px' }}>
          {timeDisplay}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {getSignalBars()}
          {showWifi && getWifiIcon()}
          {getBatteryIcon()}
        </Box>
      </Box>

      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: 2,
          py: 1,
          borderBottom: darkTheme ? '1px solid #2C2C2E' : '1px solid #E5E5EA',
        }}
      >
        <Typography sx={{ color: '#007AFF', fontSize: '17px', fontWeight: 400, letterSpacing: '-0.41px' }}>
          Изменить
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Typography
            sx={{
              backgroundColor: darkTheme ? '#2C2C2E' : '#E5E5EA',
              color: darkTheme ? '#FFFFFF' : '#000000',
              px: 2,
              py: 0.5,
              borderRadius: '16px',
              fontSize: '15px',
              fontWeight: 600,
              letterSpacing: '-0.24px',
            }}
          >
            Все
          </Typography>
          <Typography sx={{ color: '#8E8E93', fontSize: '17px', fontWeight: 400, letterSpacing: '-0.41px' }}>
            Пропущ.
          </Typography>
        </Box>
      </Box>

      {/* Title */}
      <Box sx={{ px: 2, py: 2 }}>
        <Typography sx={{ fontSize: '34px', fontWeight: 700, letterSpacing: '0.37px', lineHeight: '41px' }}>
          {headerTitle}
        </Typography>
      </Box>

      {/* Search */}
      {showSearch && (
        <Box sx={{ px: 2, mb: 2 }}>
          <Box
            sx={{
              backgroundColor: darkTheme ? '#1C1C1E' : '#F2F2F7',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              px: 2,
              py: 1,
              height: '36px',
            }}
          >
            <SearchIcon sx={{ color: '#8E8E93', mr: 1, fontSize: 20 }} />
            <Typography sx={{ color: '#8E8E93', fontSize: '17px', fontWeight: 400, letterSpacing: '-0.41px' }}>
              Поиск
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
            <MicIcon sx={{ color: '#8E8E93', fontSize: 20 }} />
          </Box>
        </Box>
      )}

      {/* Calls List */}
      <Box sx={{ flex: 1, overflow: 'auto', minHeight: 0 }}>
        {calls.map((call, index) => (
          <Box
            key={call.id}
            sx={{
              display: 'flex',
              alignItems: 'center',
              px: 2,
              py: 1.5,
              borderBottom: index < calls.length - 1 ? 
                (darkTheme ? '1px solid #2C2C2E' : '1px solid #E5E5EA') : 'none',
            }}
          >
            {/* Avatar */}
            <Box
              sx={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: '#8E8E93',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mr: 2,
              }}
            >
              <Typography sx={{ color: '#FFFFFF', fontSize: '16px', fontWeight: 600, letterSpacing: '-0.32px' }}>
                {call.name.charAt(0).toUpperCase()}
              </Typography>
            </Box>

            {/* Call Info */}
            <Box sx={{ flex: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                <Typography
                  sx={{
                    fontSize: '17px',
                    fontWeight: 400,
                    letterSpacing: '-0.41px',
                    color: call.type === 'missed' ? '#FF3B30' : (darkTheme ? '#FFFFFF' : '#000000'),
                    mr: 1,
                  }}
                >
                  {call.name}
                  {call.count && call.count > 1 && (
                    <Typography
                      component="span"
                                             sx={{
                         color: '#8E8E93',
                         fontSize: '17px',
                         fontWeight: 400,
                         letterSpacing: '-0.41px',
                         ml: 0.5,
                       }}
                    >
                      ({call.count})
                    </Typography>
                  )}
                </Typography>
              </Box>
              <Typography sx={{ color: '#8E8E93', fontSize: '15px', fontWeight: 400, letterSpacing: '-0.24px' }}>
                {call.callType === 'phone' ? 'Россия' : 'Аудиовызов Telegram'}
              </Typography>
            </Box>

            {/* Time and Icon */}
            <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', minWidth: '50px' }}>
              <Typography sx={{ color: '#8E8E93', fontSize: '15px', fontWeight: 400, letterSpacing: '-0.24px', mb: 0.5 }}>
                {call.time}
              </Typography>
              <Box sx={{ height: '16px', display: 'flex', alignItems: 'center' }}>
                {getCallIcon(call.type)}
              </Box>
            </Box>
          </Box>
        ))}
      </Box>

      {/* Bottom Navigation */}
      <Box
        sx={{
          height: '83px',
          borderTop: darkTheme ? '1px solid #2C2C2E' : '1px solid #E5E5EA',
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-around',
          pt: 1,
          pb: 2,
          backgroundColor: darkTheme ? '#000000' : '#FFFFFF',
          flexShrink: 0,
          mt: 'auto',
        }}
      >
        {/* Избранные */}
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', opacity: 0.6 }}>
          <Box sx={{ mb: 0.5 }}>
            <svg width="25" height="24" viewBox="0 0 25 24" fill="none">
              <path
                d="M12.5 2L15.09 8.26L22 9L17 13.74L18.18 20.5L12.5 17.27L6.82 20.5L8 13.74L3 9L9.91 8.26L12.5 2Z"
                fill="#8E8E93"
              />
            </svg>
          </Box>
          <Typography sx={{ fontSize: '10px', color: '#8E8E93', fontWeight: 400, letterSpacing: '-0.08px' }}>
            Избранные
          </Typography>
        </Box>

        {/* Недавние - активная */}
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Box sx={{ mb: 0.5 }}>
            <svg width="25" height="24" viewBox="0 0 25 24" fill="none">
              <path
                d="M12.5 2C18.02 2 22.5 6.48 22.5 12C22.5 17.52 18.02 22 12.5 22C6.98 22 2.5 17.52 2.5 12C2.5 6.48 6.98 2 12.5 2ZM12.5 7V12L16.5 14L15.5 15.5L11 13V7H12.5Z"
                fill="#007AFF"
              />
            </svg>
          </Box>
          <Typography sx={{ fontSize: '10px', color: '#007AFF', fontWeight: 600, letterSpacing: '-0.08px' }}>
            Недавние
          </Typography>
        </Box>

        {/* Контакты */}
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', opacity: 0.6 }}>
          <Box sx={{ mb: 0.5 }}>
            <svg width="25" height="24" viewBox="0 0 25 24" fill="none">
              <path
                d="M12.5 12C14.71 12 16.5 10.21 16.5 8C16.5 5.79 14.71 4 12.5 4C10.29 4 8.5 5.79 8.5 8C8.5 10.21 10.29 12 12.5 12ZM12.5 14C9.83 14 4.5 15.34 4.5 18V20H20.5V18C20.5 15.34 15.17 14 12.5 14Z"
                fill="#8E8E93"
              />
            </svg>
          </Box>
          <Typography sx={{ fontSize: '10px', color: '#8E8E93', fontWeight: 400, letterSpacing: '-0.08px' }}>
            Контакты
          </Typography>
        </Box>

        {/* Клавиши */}
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', opacity: 0.6 }}>
          <Box sx={{ mb: 0.5 }}>
            <svg width="25" height="24" viewBox="0 0 25 24" fill="none">
              <path
                d="M4.5 4H20.5C21.6 4 22.5 4.9 22.5 6V18C22.5 19.1 21.6 20 20.5 20H4.5C3.4 20 2.5 19.1 2.5 18V6C2.5 4.9 3.4 4 4.5 4ZM7.5 7V9H9.5V7H7.5ZM11.5 7V9H13.5V7H11.5ZM15.5 7V9H17.5V7H15.5ZM7.5 11V13H9.5V11H7.5ZM11.5 11V13H13.5V11H11.5ZM15.5 11V13H17.5V11H15.5ZM7.5 15V17H17.5V15H7.5Z"
                fill="#8E8E93"
              />
            </svg>
          </Box>
          <Typography sx={{ fontSize: '10px', color: '#8E8E93', fontWeight: 400, letterSpacing: '-0.08px' }}>
            Клавиши
          </Typography>
        </Box>

        {/* Автоответчик */}
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', opacity: 0.6 }}>
          <Box sx={{ mb: 0.5 }}>
            <svg width="25" height="24" viewBox="0 0 25 24" fill="none">
              <path
                d="M12.5 14C13.6 14 14.5 13.1 14.5 12V8C14.5 6.9 13.6 6 12.5 6C11.4 6 10.5 6.9 10.5 8V12C10.5 13.1 11.4 14 12.5 14ZM18.5 12C18.5 15.3 15.8 18 12.5 18C9.2 18 6.5 15.3 6.5 12H8.5C8.5 14.2 10.3 16 12.5 16C14.7 16 16.5 14.2 16.5 12H18.5ZM11.5 19V22H13.5V19H11.5Z"
                fill="#8E8E93"
              />
            </svg>
          </Box>
          <Typography sx={{ fontSize: '10px', color: '#8E8E93', fontWeight: 400, letterSpacing: '-0.08px' }}>
            Автоответчик
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default TelegramPreview; 