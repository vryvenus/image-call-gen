import axios from 'axios';
import config from '../config/config';

const api = axios.create({
  baseURL: config.API_BASE_URL,
  timeout: config.TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface GenerateImageRequest {
  prompt: string;
  style?: string;
  width?: number;
  height?: number;
}

export interface GenerateImageResponse {
  success: boolean;
  image_url?: string;
  message: string;
}

export interface Style {
  id: string;
  name: string;
  description: string;
}

export interface StylesResponse {
  styles: Style[];
}

// Генерация изображения
export const generateImage = (data: GenerateImageRequest) => {
  return api.post<GenerateImageResponse>('/generate', data);
};

// Получение доступных стилей
export const getStyles = () => {
  return api.get<StylesResponse>('/styles');
};

// Проверка здоровья API
export const healthCheck = () => {
  return api.get('/health');
};

export default api; 