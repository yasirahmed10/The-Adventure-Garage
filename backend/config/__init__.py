from pydantic_settings import BaseSettings, SettingsConfigDict
from typing import List
import json


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")

    # App
    APP_NAME: str = "Jaffa Restaurant"
    APP_ENV: str = "development"
    DEBUG: bool = True

    # JWT
    SECRET_KEY: str = "change-me-in-production-at-least-32-chars"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60
    REFRESH_TOKEN_EXPIRE_DAYS: int = 7

    # Database
    DATABASE_URL: str = "postgresql://jaffa_user:jaffa_pass@localhost:5432/jaffa_db"

    # CORS
    CORS_ORIGINS: str = '["http://localhost:3000","http://localhost:5173"]'

    @property
    def cors_origins_list(self) -> List[str]:
        try:
            return json.loads(self.CORS_ORIGINS)
        except Exception:
            return ["http://localhost:3000", "http://localhost:5173"]

    # File Storage
    UPLOAD_DIR: str = "./uploads"
    MAX_FILE_SIZE_MB: int = 10

    # Email
    SMTP_HOST: str = "smtp.gmail.com"
    SMTP_PORT: int = 587
    SMTP_USER: str = ""
    SMTP_PASSWORD: str = ""
    EMAIL_FROM: str = "noreply@jaffa.com"

    # Admin
    ADMIN_EMAIL: str = "admin@jaffa.com"
    ADMIN_PASSWORD: str = "Admin@123"
    ADMIN_NAME: str = "Jaffa Admin"

    # Rate Limiting
    RATE_LIMIT: str = "100/minute"

    # Restaurant
    RESTAURANT_NAME: str = "Jaffa"
    RESTAURANT_PHONE: str = "+91-9000000000"
    RESTAURANT_EMAIL: str = "hello@jaffa.com"


settings = Settings()
