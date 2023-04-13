from fastapi import APIRouter

from .categories import category_router

api_router = APIRouter()
api_router.include_router(category_router, tags=["login"], prefix="/categories")
