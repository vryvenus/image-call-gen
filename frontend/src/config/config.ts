export interface AppConfig {
  API_BASE_URL: string;
  PRODUCTION_IP: string;
  DEVELOPMENT_PORT: number;
  API_PORT: number;
  TIMEOUT: number;
}

// Определяем базовый URL API в зависимости от окружения
const getApiBaseUrl = (): string => {
  const hostname = window.location.hostname;
  
  // Если мы на продакшн сервере
  if (hostname === '45.120.177.170') {
    return 'http://45.120.177.170:34567';
  }
  
  // Если мы на localhost или 127.0.0.1
  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    return 'http://localhost:34567';
  }
  
  // Fallback на localhost
  return 'http://localhost:34567';
};

export const config: AppConfig = {
  API_BASE_URL: getApiBaseUrl(),
  PRODUCTION_IP: '45.120.177.170',
  DEVELOPMENT_PORT: 34568,
  API_PORT: 34567,
  TIMEOUT: 30000,
};

export default config; 