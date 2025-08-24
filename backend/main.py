from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel
import uvicorn
from typing import Optional
import os
from config import settings

app = FastAPI(title="Photo Generator API", version="1.0.0")

# CORS настройки для подключения фронтенда
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Модели данных
class CallEntry(BaseModel):
    id: str
    name: str
    type: str  # 'incoming', 'outgoing', 'missed'
    time: str
    count: Optional[int] = None

class GenerateRequest(BaseModel):
    prompt: str
    style: Optional[str] = "telegram-ui"
    width: Optional[int] = 375
    height: Optional[int] = 812
    theme: Optional[str] = "dark"
    headerTitle: Optional[str] = "Недавние"
    timeDisplay: Optional[str] = "14:38"
    batteryLevel: Optional[int] = 50
    showSearch: Optional[bool] = True
    calls: Optional[list[CallEntry]] = []

class GenerateResponse(BaseModel):
    success: bool
    image_url: Optional[str] = None
    message: str

# Базовые эндпоинты
@app.get("/")
async def root():
    return {"message": "Photo Generator API", "status": "running"}

@app.get("/health")
async def health_check():
    return {"status": "healthy", "service": "photo-generator"}

@app.post("/generate", response_model=GenerateResponse)
async def generate_telegram_screenshot(request: GenerateRequest):
    """
    Генерация скриншота недавних вызовов Telegram
    """
    try:
        # Пока что возвращаем заглушку
        # В будущем здесь будет логика генерации реальных скриншотов
        calls_info = f"{len(request.calls or [])} вызовов" if request.calls else "без вызовов"
        theme_info = f"тема: {request.theme}"
        
        # Создаем placeholder с информацией о настройках
        placeholder_text = f"Telegram+Calls+{request.width}x{request.height}+{theme_info}+{calls_info}"
        placeholder_url = f"https://via.placeholder.com/{request.width}x{request.height}/2C2C2E/FFFFFF?text={placeholder_text}"
        
        return GenerateResponse(
            success=True,
            image_url=placeholder_url,
            message=f"Скриншот сгенерирован: {calls_info}, {theme_info}, заголовок: {request.headerTitle}"
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/styles")
async def get_available_styles():
    """
    Получение доступных стилей для генерации
    """
    styles = [
        {"id": "telegram-ui", "name": "Telegram UI", "description": "Стандартный интерфейс Telegram"},
        {"id": "telegram-dark", "name": "Telegram Dark", "description": "Темная тема Telegram"},
        {"id": "telegram-light", "name": "Telegram Light", "description": "Светлая тема Telegram"},
        {"id": "ios-style", "name": "iOS Style", "description": "В стиле iOS"},
        {"id": "android-style", "name": "Android Style", "description": "В стиле Android"}
    ]
    return {"styles": styles}

@app.get("/call-types")
async def get_call_types():
    """
    Получение типов вызовов
    """
    call_types = [
        {"id": "incoming", "name": "Входящий", "color": "green"},
        {"id": "outgoing", "name": "Исходящий", "color": "blue"},
        {"id": "missed", "name": "Пропущенный", "color": "red"}
    ]
    return {"call_types": call_types}

if __name__ == "__main__":
    uvicorn.run(app, host=settings.HOST, port=settings.PORT) 