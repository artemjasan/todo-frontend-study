import logging

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.routers import api_router
from app.config import settings

logger = logging.getLogger(__name__)

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.PROJECT_VERSION
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.BACKEND_CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def make_app() -> FastAPI:
    app.include_router(api_router, prefix=settings.PREFIX_API)
    return app


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(
        "__main__:make_app",
        host="0.0.0.0",
        port=8080,
        reload=True,
        factory=True,
    )
