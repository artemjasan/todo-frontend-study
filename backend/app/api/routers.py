from fastapi import APIRouter

from .categories import category_router
from .tasks import task_router

api_router = APIRouter()
api_router.include_router(category_router, tags=["categories"], prefix="/categories")
api_router.include_router(task_router, tags=["tasks"], prefix="/tasks")
