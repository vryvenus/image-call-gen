export const ENV = {
  PRODUCTION_IP: '45.120.177.170',
  API_PORT: 34567,
  FRONTEND_PORT: 34568,
  
  // Определяем режим работы
  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production',
  
  // URL для API
  getApiUrl: () => {
    const hostname = window.location.hostname;
    
    if (hostname === '45.120.177.170') {
      return `http://45.120.177.170:34567`;
    }
    
    return `http://localhost:34567`;
  }
};

export default ENV; 