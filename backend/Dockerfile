# Используем официальный Python образ
FROM python:3.11-slim

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем файл зависимостей
COPY requirements.txt .

# Устанавливаем зависимости
RUN pip install --no-cache-dir -r requirements.txt

# Копируем исходный код
COPY . .

# Создаем директории для изображений
RUN mkdir -p generated_images static

# Открываем порт
EXPOSE 8000

# Команда запуска
CMD ["python", "main.py"]
