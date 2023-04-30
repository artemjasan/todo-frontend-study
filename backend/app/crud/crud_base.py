from typing import Generic, TypeVar, Type
from uuid import UUID

from pydantic import BaseModel
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, insert, delete, update

from app.database.models import Base
from app.schemas.base import BaseDeleteResponse

ModelType = TypeVar("ModelType", bound=Base)
CreateSchemaType = TypeVar("CreateSchemaType", bound=BaseModel)
UpdateSchemaType = TypeVar("UpdateSchemaType", bound=BaseModel)


class CRUDBase(Generic[ModelType, CreateSchemaType, UpdateSchemaType]):
    def __init__(self, model: Type[ModelType]):
        """
        CRUD object with defaults methods to Create, Read, Update, Delete actions
        """
        self.model = model

    async def get(self, session: AsyncSession, id_: UUID) -> ModelType | None:
        query = select(self.model).where(self.model.id == id_)
        response = await session.execute(query)
        return response.scalar()

    async def get_multi(self, session: AsyncSession) -> list[ModelType]:
        query = select(self.model).order_by(self.model.id.desc())
        response = await session.execute(query)
        return response.scalars().all()

    async def create(self, session: AsyncSession, obj_in: CreateSchemaType) -> ModelType:
        query = (
            insert(self.model)
            .values(**obj_in.dict(exclude_unset=True))
            .returning(self.model)
        )
        response = await session.execute(query)
        await session.commit()
        return response.fetchone()

    async def update(
            self,
            session: AsyncSession,
            obj_current: ModelType,
            obj_in: UpdateSchemaType,
    ) -> ModelType:
        query = (
            update(self.model)
            .where(self.model.id == obj_current.id)
            .values(**obj_in.dict(exclude_unset=True))
            .returning(self.model)
        )
        response = await session.execute(query)
        await session.commit()
        return response.fetchone()

    async def delete(self, session: AsyncSession, id_: UUID) -> BaseDeleteResponse:
        query = delete(self.model).where(self.model.id == id_)
        await session.execute(query)
        await session.commit()
        return BaseDeleteResponse(id=id_)

