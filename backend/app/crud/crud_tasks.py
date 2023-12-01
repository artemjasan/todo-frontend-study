from uuid import UUID

from sqlalchemy import select, insert, update, desc, func
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import joinedload, load_only
from sqlalchemy.sql import Select, Insert, Update

from app.crud.crud_base import CRUDBase
from app.database import models
from app.schemas import TaskCreate, TaskUpdate

BasicQueryType = Select | Insert | Update


class CRUDTask(CRUDBase[models.Task, TaskCreate, TaskUpdate]):
    async def create(self, session: AsyncSession, *, obj_in: TaskCreate) -> models.Task:
        query = (
            insert(self.model)
            .values(**obj_in.dict(exclude_unset=True))
            .returning(self.model.id)
        )
        response = await session.execute(query)
        await session.commit()
        task_id = response.scalars().first()

        return await self.get(session=session, id_=task_id)

    async def get(self, session: AsyncSession, id_: UUID) -> models.Task | None:
        query = select(self.model).where(self.model.id == id_)
        query = self._join_category(query)
        response = await session.execute(query)
        return response.scalars().first()

    async def get_all(
            self, session: AsyncSession, category_id: UUID | None = None, completed: bool | None = None,
    ) -> list[models.Task]:
        query = select(self.model)
        query = self._join_category(query)
        if category_id:
            query = query.where(self.model.category_id == category_id)
        if completed is not None:
            query = query.where(self.model.completed == completed)
        response = await session.execute(query)

        return response.scalars().all()

    async def get_all_by_category_id(self, session: AsyncSession, category_id: UUID) -> list[models.Task]:
        query = (
            select(self.model)
            .where(self.model.category_id == category_id)
        )
        query = self._join_category(query)
        response = await session.execute(query)

        return response.scalars().all()

    async def update(self, session: AsyncSession, *, obj_current: models.Task, obj_in: TaskUpdate) -> models.Task:
        query = (
            update(self.model)
            .where(self.model.id == obj_current.id)
            .values(**obj_in.dict(exclude_unset=True))
            .values(updated_at=func.now())
            .returning(self.model.id)
        )
        response = await session.execute(query)
        await session.commit()
        await session.refresh(obj_current)
        task_id = response.scalars().first()
        return await self.get(session=session, id_=task_id)

    def _join_category(self, query: BasicQueryType) -> BasicQueryType:
        query = (
            query
            .options(joinedload(self.model.category))
            .options(load_only(
                self.model.id, self.model.body, self.model.completed, self.model.created_at, self.model.updated_at,
            ))
            .order_by(desc(self.model.created_at))
        )
        return query


task_service = CRUDTask(models.Task)
