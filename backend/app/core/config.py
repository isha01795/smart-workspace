import os
from pydantic_settings import (
    BaseSettings,
    SettingsConfigDict
)

class Settings(BaseSettings):
    # This will pull from the 'DATABASE_URL' environment variable on Render
    DATABASE_URL: str
    SECRET_KEY: str
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30

    # This logic automatically fixes the 'postgres://' vs 'postgresql+asyncpg://' 
    # issue common with Neon and SQLAlchemy Async.
    def __init__(self, **values):
        super().__init__(**values)
        if self.DATABASE_URL.startswith("postgres://"):
            self.DATABASE_URL = self.DATABASE_URL.replace(
                "postgres://", "postgresql+asyncpg://", 1
            )

    model_config = SettingsConfigDict(
        # env_file_encoding is useful for different OS environments
        env_file=".env",
        env_file_encoding="utf-8",
        # This allows the app to stay flexible if extra vars are present
        extra="ignore" 
    )

settings = Settings()