import os
from typing import List

class Settings:
    PORT: int = 8000
    HOST: str = "0.0.0.0"
    DEBUG: bool = True
    
    # Основной IP для хостинга
    PRODUCTION_IP: str = "178.33.142.78"
    
    # URL-адреса фронтенда для CORS
    FRONTEND_URLS: List[str] = [
        "http://localhost:3000", 
        "http://178.33.142.78",
    ]
    
    # Дополнительные разрешенные origins
    ALLOWED_ORIGINS: List[str] = [
        "http://localhost:3000",
        "http://178.33.142.78", 
    ]
    
    # Настройки для генерации изображений
    DEFAULT_IMAGE_WIDTH: int = 512
    DEFAULT_IMAGE_HEIGHT: int = 512
    MAX_IMAGE_WIDTH: int = 1024
    MAX_IMAGE_HEIGHT: int = 1024
    
    # Папки для сохранения изображений
    GENERATED_IMAGES_DIR: str = "generated_images"
    STATIC_DIR: str = "static"

settings = Settings() 