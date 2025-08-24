import React from 'react';
import { Box, Typography, Avatar } from '@mui/material';

interface CallScreenProps {
  contactName: string;
  contactNumber?: string;
  callState: 'incoming' | 'busy';
  darkTheme: boolean;
  timeDisplay: string;
  batteryLevel: number;
  showAvatar: boolean;
  avatarColor: string;
}

const CallScreen: React.FC<CallScreenProps> = ({
  contactName,
  contactNumber,
  callState,
  darkTheme,
  timeDisplay,
  batteryLevel,
  showAvatar,
  avatarColor,
}) => {
  const getSignalBars = () => {
    return (
      <Box sx={{ display: 'flex', alignItems: 'end', gap: '1px', mr: 1 }}>
        {[1, 2, 3, 4].map((bar) => (
          <Box
            key={bar}
            sx={{
              width: '3px',
              height: `${bar * 2 + 2}px`,
              backgroundColor: '#FFFFFF',
              borderRadius: '0.5px',
            }}
          />
        ))}
      </Box>
    );
  };

  const getBatteryIcon = () => (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box
        sx={{
          width: '24px',
          height: '12px',
          border: '1px solid #FFFFFF',
          borderRadius: '2px',
          position: 'relative',
          mr: '2px',
        }}
      >
        <Box
          sx={{
            width: `${(batteryLevel / 100) * 20}px`,
            height: '8px',
            backgroundColor: batteryLevel > 20 ? '#FFFFFF' : '#FF3B30',
            borderRadius: '1px',
            margin: '1px',
          }}
        />
      </Box>
      <Box
        sx={{
          width: '2px',
          height: '6px',
          backgroundColor: '#FFFFFF',
          borderRadius: '0 1px 1px 0',
        }}
      />
    </Box>
  );

  const getCallStateText = () => {
    switch (callState) {
      case 'incoming':
        return 'входящий вызов';
      case 'busy':
        return 'занято';
      default:
        return 'входящий вызов';
    }
  };

  const getCallStateColor = () => {
    switch (callState) {
      case 'busy':
        return '#FF3B30';
      default:
        return '#FFFFFF';
    }
  };

  return (
    <Box
      sx={{
        position: 'relative',
        margin: '0 auto',
      }}
    >
      {/* iPhone Body */}
      <Box
        data-phone-body
        sx={{
          width: '430px',
          height: '930px',
          backgroundColor: '#1C1C1E',
          borderRadius: '50px',
          padding: '10px',
          position: 'relative',
          boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
        }}
      >
        {/* Volume Buttons */}
        <Box
          sx={{
            position: 'absolute',
            left: '-6px',
            top: '180px',
            width: '6px',
            height: '30px',
            backgroundColor: '#1C1C1E',
            borderRadius: '3px 0 0 3px',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            left: '-6px',
            top: '220px',
            width: '6px',
            height: '30px',
            backgroundColor: '#1C1C1E',
            borderRadius: '3px 0 0 3px',
          }}
        />
        
        {/* Power Button */}
        <Box
          sx={{
            position: 'absolute',
            right: '-6px',
            top: '200px',
            width: '6px',
            height: '60px',
            backgroundColor: '#1C1C1E',
            borderRadius: '0 3px 3px 0',
          }}
        />

        {/* Screen */}
        <Box
          data-call-screen
          sx={{
            width: '405px',
            height: '888px',
            backgroundColor: '#302d36',
            color: '#FFFFFF',
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", Helvetica, Arial, sans-serif',
            position: 'relative',
            overflow: 'hidden',
            borderRadius: '40px',
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
              position: 'relative',
            }}
          >
            <Typography sx={{ fontSize: '17px', fontWeight: 600, letterSpacing: '-0.41px' }}>
              {timeDisplay}
            </Typography>
            
            {/* Dynamic Island */}
            <Box
              sx={{
                position: 'absolute',
                top: '8px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '126px',
                height: '32px',
                backgroundColor: '#000000',
                borderRadius: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                paddingRight: '12px',
                zIndex: 10,
              }}
            >
              {/* Orange indicator dot */}
              <Box
                sx={{
                  width: '8px',
                  height: '8px',
                  backgroundColor: '#FF9500',
                  borderRadius: '50%',
                }}
              />
            </Box>
            
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {getSignalBars()}
              {getBatteryIcon()}
            </Box>
          </Box>

          {/* Call State */}
          <Box sx={{ textAlign: 'center', mt: 4, mb: 2 }}>
            <Typography 
              sx={{ 
                fontSize: '16px', 
                fontWeight: 400, 
                color: callState === 'busy' ? '#a19ea9' : getCallStateColor(),
                textTransform: 'lowercase',
                letterSpacing: '1px',
              }}
            >
              {callState === 'busy' ? 'Пользователь занят' : getCallStateText()}
            </Typography>
          </Box>

          {/* Contact Avatar */}
          {showAvatar && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
              <Avatar
                sx={{
                  width: 180,
                  height: 180,
                  backgroundColor: avatarColor,
                  fontSize: '72px',
                  fontWeight: 600,
                  boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
                }}
              >
                {contactName.charAt(0).toUpperCase()}
              </Avatar>
            </Box>
          )}

          {/* Contact Info */}
          <Box sx={{ textAlign: 'center', mb: 'auto', px: 4 }}>
            <Typography 
              sx={{ 
                fontSize: '32px', 
                fontWeight: 300, 
                mb: 1,
                lineHeight: 1.2,
              }}
            >
              {contactName}
            </Typography>
            {contactNumber && (
              <Typography 
                sx={{ 
                  fontSize: '20px', 
                  fontWeight: 400, 
                  color: 'rgba(255, 255, 255, 0.6)',
                  letterSpacing: '0.5px',
                }}
              >
                {contactNumber}
              </Typography>
            )}
          </Box>

          {/* Call Actions */}
          {callState === 'incoming' && (
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'space-around', 
              alignItems: 'center',
              px: 6,
              pb: 6,
            }}>
              {/* Decline Button */}
              <Box
                sx={{
                  width: '75px',
                  height: '75px',
                  borderRadius: '50%',
                  backgroundColor: '#FF3B30',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 20px rgba(255, 59, 48, 0.4)',
                  cursor: 'pointer',
                  '&:hover': {
                    transform: 'scale(1.05)',
                  },
                  transition: 'transform 0.2s ease',
                }}
              >
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
                  <path 
                    d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"
                    fill="white"
                    transform="rotate(135 12 12)"
                  />
                </svg>
              </Box>

              {/* Accept Button */}
              <Box
                sx={{
                  width: '75px',
                  height: '75px',
                  borderRadius: '50%',
                  backgroundColor: '#32D74B',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 20px rgba(50, 215, 75, 0.4)',
                  cursor: 'pointer',
                  '&:hover': {
                    transform: 'scale(1.05)',
                  },
                  transition: 'transform 0.2s ease',
                }}
              >
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
                  <path 
                    d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"
                    fill="white"
                  />
                </svg>
              </Box>
            </Box>
          )}

          {/* Busy State - New buttons */}
          {callState === 'busy' && (
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              px: 8,
              pb: 6,
            }}>
              {/* Cancel Button */}
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Box
                  sx={{
                    width: '75px',
                    height: '75px',
                    borderRadius: '50%',
                    backgroundColor: '#8E8E93',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    mb: 1,
                    '&:hover': {
                      transform: 'scale(1.05)',
                    },
                    transition: 'transform 0.2s ease',
                  }}
                >
                  <Typography sx={{ fontSize: '30px', color: 'white' }}>✕</Typography>
                </Box>
                <Typography sx={{ fontSize: '14px', color: 'white', fontWeight: 400 }}>
                  Отменить
                </Typography>
              </Box>

              {/* Call Back Button */}
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Box
                  sx={{
                    width: '75px',
                    height: '75px',
                    borderRadius: '50%',
                    backgroundColor: '#32D74B',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 4px 20px rgba(50, 215, 75, 0.4)',
                    cursor: 'pointer',
                    mb: 1,
                    '&:hover': {
                      transform: 'scale(1.05)',
                    },
                    transition: 'transform 0.2s ease',
                  }}
                >
                  <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
                    <path 
                      d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"
                      fill="white"
                    />
                  </svg>
                </Box>
                <Typography sx={{ fontSize: '14px', color: 'white', fontWeight: 400 }}>
                  Перезвонить
                </Typography>
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default CallScreen; 