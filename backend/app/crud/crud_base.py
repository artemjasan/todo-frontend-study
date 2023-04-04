from typing import Any, Generic, TypeVar, Type
from uuid import UUID

from fastapi.encoders import jsonable_encoder
from pydantic import BaseModel
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

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
        response = await session.execute(select(self.model).where(self.model.id == id_))
        return response.scalar()

    async def get_multi(self, session: AsyncSession) -> list[ModelType]:
        response = await session.execute(select(self.model).order_by(self.model.id.desc()))
        return response.scalars().all()

    async def create(self, session: AsyncSession, obj_in: CreateSchemaType) -> ModelType:
        obj_in_data = jsonable_encoder(obj_in)
        db_obj = self.model(**obj_in_data)
        session.add(db_obj)
        await session.commit()
        await session.refresh(db_obj)
        return db_obj

    async def update(
        self,
        session: AsyncSession,
        obj_current: ModelType,
        obj_in: UpdateSchemaType | dict[str, Any]
    ) -> ModelType:
        obj_data = jsonable_encoder(obj_current)
        if isinstance(obj_in, dict):
            updated_data = obj_in
        else:
            updated_data = obj_in.dict(exclude_unset=True)
        for field in obj_data:
            if field in updated_data:
                setattr(obj_current, field, updated_data[field])
        session.add(obj_current)
        await session.commit()
        await session.refresh(obj_current)
        return obj_current

    async def delete(self, session: AsyncSession, id_: UUID) -> BaseDeleteResponse:
        response = await self.get(session=session, id_=id_)
        await session.delete(response)
        await session.commit()
        return BaseDeleteResponse(id=id_)
