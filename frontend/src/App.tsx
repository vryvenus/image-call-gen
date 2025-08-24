import React, { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Container, AppBar, Toolbar, Typography, Box, Tabs, Tab } from '@mui/material';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import ListIcon from '@mui/icons-material/List';
import PhoneIcon from '@mui/icons-material/Phone';
import PhotoGenerator from './components/PhotoGenerator';
import CallScreenGenerator from './components/CallScreenGenerator';
import './App.css';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#ffffff',
    },
    secondary: {
      main: '#888888',
    },
    background: {
      default: 'transparent',
    },
  },
  typography: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
    h4: {
      fontWeight: 700,
      background: 'linear-gradient(45deg, #ffffff, #cccccc)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    },
    h6: {
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: '12px',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backdropFilter: 'blur(10px)',
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          '& .MuiTabs-indicator': {
            backgroundColor: '#ffffff',
            height: '3px',
            borderRadius: '2px',
          },
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          color: 'rgba(255, 255, 255, 0.7)',
          fontWeight: 600,
          fontSize: '16px',
          textTransform: 'none',
          '&.Mui-selected': {
            color: '#ffffff',
          },
          '&:hover': {
            color: '#ffffff',
            opacity: 1,
          },
        },
      },
    },
  },
});

function App() {
  const [currentTab, setCurrentTab] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ 
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0c0c0c 0%, #1a1a1a 50%, #2d2d2d 100%)',
      }}>
        <AppBar 
          position="static" 
          elevation={0}
          sx={{
            background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.8), rgba(20, 20, 20, 0.9))',
            backdropFilter: 'blur(20px)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
          }}
        >
          <Toolbar sx={{ py: 1 }}>
            <Box sx={{
              width: 50,
              height: 50,
              borderRadius: '16px',
              background: 'linear-gradient(135deg, #333333, #555555)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mr: 3,
              boxShadow: '0 4px 16px rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              position: 'relative',
              overflow: 'hidden',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.1), transparent)',
                transform: 'translateX(-100%)',
                transition: 'transform 0.6s',
              },
              '&:hover::before': {
                transform: 'translateX(100%)',
              },
            }}>
              <PhotoCameraIcon sx={{ color: 'white', fontSize: 28 }} />
            </Box>
            
            <Box sx={{ flexGrow: 1 }}>
              <Typography 
                variant="h5" 
                component="div" 
                sx={{ 
                  background: 'linear-gradient(135deg, #ffffff, #cccccc, #ffffff)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontWeight: 800,
                  letterSpacing: '2px',
                  fontSize: { xs: '1.2rem', md: '1.5rem' },
                  textShadow: '0 2px 4px rgba(0,0,0,0.3)',
                  position: 'relative',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: -2,
                    left: 0,
                    width: '60px',
                    height: '2px',
                    background: 'linear-gradient(90deg, #ffffff, transparent)',
                    borderRadius: '1px',
                  },
                }}
              >
                NSBX Фейкомет
              </Typography>
            </Box>

            <Box sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              px: 2,
              py: 1,
              borderRadius: '12px',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }}>
              <Box sx={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: '#00ff88',
                boxShadow: '0 0 8px #00ff88',
                animation: 'pulse 2s infinite',
              }} />
              <Typography sx={{ 
                color: 'rgba(255, 255, 255, 0.8)', 
                fontSize: '0.75rem',
                fontWeight: 500,
              }}>
                Online
              </Typography>
            </Box>
          </Toolbar>

          {/* Navigation Tabs */}
          <Box sx={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
            <Tabs
              value={currentTab}
              onChange={handleTabChange}
              centered
              sx={{ px: 2 }}
            >
              <Tab 
                icon={<ListIcon />} 
                label="Список вызовов" 
                iconPosition="start"
                sx={{ minHeight: '60px' }}
              />
              <Tab 
                icon={<PhoneIcon />} 
                label="Экран вызова" 
                iconPosition="start"
                sx={{ minHeight: '60px' }}
              />
            </Tabs>
          </Box>
        </AppBar>
        
        <Container maxWidth={false} sx={{ py: 4 }}>
          <Box sx={{ textAlign: 'center', mb: 8, position: 'relative' }} className="fade-in-up">
            <Box sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '300px',
              height: '300px',
              background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
              borderRadius: '50%',
              filter: 'blur(40px)',
              zIndex: 0,
            }} />
            
            <Box sx={{ position: 'relative', zIndex: 1 }}>
              <Typography 
                variant="h2" 
                component="h1" 
                gutterBottom
                sx={{
                  fontSize: { xs: '2.5rem', md: '4rem', lg: '5rem' },
                  fontWeight: 900,
                  background: 'linear-gradient(135deg, #ffffff 0%, #cccccc 50%, #ffffff 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  textShadow: '0 8px 16px rgba(0,0,0,0.3)',
                  mb: 3,
                  letterSpacing: '3px',
                  position: 'relative',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'linear-gradient(135deg, transparent, rgba(255,255,255,0.1), transparent)',
                    WebkitBackgroundClip: 'text',
                    animation: 'shimmer 3s infinite',
                  },
                }}
              >
                SX - NSBX - IP
              </Typography>
              
              <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 2,
                mb: 2,
              }}>
                <Box sx={{
                  width: '60px',
                  height: '2px',
                  background: 'linear-gradient(90deg, transparent, #ffffff, transparent)',
                }} />
                <Typography 
                  variant="h5" 
                  sx={{ 
                    color: 'rgba(255, 255, 255, 0.9)',
                    fontWeight: 600,
                    letterSpacing: '2px',
                    fontSize: { xs: '1rem', md: '1.25rem' },
                    textTransform: 'uppercase',
                  }}
                >
                  {currentTab === 0 ? 'Генератор скриншотов' : 'Экран входящего вызова'}
                </Typography>
                <Box sx={{
                  width: '60px',
                  height: '2px',
                  background: 'linear-gradient(90deg, transparent, #ffffff, transparent)',
                }} />
              </Box>
            </Box>
          </Box>
          
          {/* Tab Content */}
          {currentTab === 0 && <PhotoGenerator />}
          {currentTab === 1 && <CallScreenGenerator />}
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;
