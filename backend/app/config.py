import os
from pydantic import BaseSettings, AnyHttpUrl, validator


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
    # Other settings
    BACKEND_CORS_ORIGINS: list[AnyHttpUrl] = ["http://localhost:3000", "http://0.0.0.0:3000", "http://127.0.0.1:3000"]

    def get_db_url(self) -> str:
        pg = self.POSTGRES
        return f"postgresql+asyncpg://{pg.USER}:{pg.PASSWORD}@{pg.HOST}:{pg.PORT}/{pg.DB}"

    @validator("BACKEND_CORS_ORIGINS", pre=True)
    def assemble_cors_origins(cls, v: str | list[str]) -> list[str]:
        if isinstance(v, str) and not v.startswith("["):
            return [i.strip() for i in v.split(",")]
        elif isinstance(v, (list, tuple)):
            return [str(x).strip() for x in v]
        raise ValueError(v)



settings = Settings()