import os
from pydantic import BaseSettings


class PostgresSettings(BaseSettings):
    class Config:
        env_prefix = "POSTGRES_"

    HOST: str = "postgres"
    PORT: int = 5432
    DB: str = "postgres"
    USER: str = "postgres"
    PASSWORD: str = "postgres"


class Settings(BaseSettings):
    # Application settings
    PROJECT_NAME: str = "Todo list API"
    PROJECT_VERSION: str = "0.1.0"
    PREFIX_API: str = "/api"
    # Database settings
    POSTGRES: PostgresSettings = PostgresSettings()

    def get_db_url(self) -> str:
        pg = self.POSTGRES
        return f"postgresql+asyncpg://{pg.USER}:{pg.PASSWORD}@{pg.HOST}:{pg.PORT}/{pg.DB}"


settings = Settings()
