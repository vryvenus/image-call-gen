import os
from typing import List

class Settings:
    PORT: int = 34567
    HOST: str = "0.0.0.0"
    DEBUG: bool = True
    
    # Основной IP для хостинга
    PRODUCTION_IP: str = "45.120.177.170"
    
    # URL-адреса фронтенда для CORS
    FRONTEND_URLS: List[str] = [
        "http://localhost:34568", 
        "http://127.0.0.1:34568",
        "http://45.120.177.170:34568",
        "https://45.120.177.170:34568"
    ]
    
    # Дополнительные разрешенные origins
    ALLOWED_ORIGINS: List[str] = [
        "http://localhost:34568",
        "http://127.0.0.1:34568", 
        "http://45.120.177.170:34568",
        "https://45.120.177.170:34568",
        f"http://45.120.177.170",
        f"https://45.120.177.170"
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