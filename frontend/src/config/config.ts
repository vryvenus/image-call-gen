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
  
  // В Docker или продакшн - используем nginx proxy через /api
  if (process.env.NODE_ENV === 'production' || hostname === '45.120.177.170') {
    return '/api';
  }
  
  // Для разработки - прямое обращение к backend
  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    return 'http://localhost:8000';
  }
  
  // Fallback на /api для Docker
  return '/api';
};

export const config: AppConfig = {
  API_BASE_URL: getApiBaseUrl(),
  PRODUCTION_IP: '45.120.177.170',
  DEVELOPMENT_PORT: 3000,
  API_PORT: 8000,
  TIMEOUT: 30000,
};

export default config; 