from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.crud.crud_base import CRUDBase
from app.database import models
from app.schemas import CategoryCreate, CategoryUpdate


class CRUDCategory(CRUDBase[models.Category, CategoryCreate, CategoryUpdate]):
    async def get_by_name(self, session: AsyncSession, name: str) -> models.Category | None:
        response = await session.execute(select(models.Category).where(models.Category.name == name))
        return response.scalar()

    async def get_all(self, session: AsyncSession) -> list[models.Category]:
        response = await session.execute(select(models.Category).order_by(models.Category.id.desc()))
        return response.scalars().all()


category_service = CRUDCategory(models.Category)
