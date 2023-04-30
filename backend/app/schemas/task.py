from datetime import datetime
from uuid import UUID

from pydantic import BaseModel, Field

from app.schemas import CategoryResponse


class TaskBase(BaseModel):
    body: str = Field(..., max_length=255)


class TaskCreate(TaskBase):
    category_id: UUID


class TaskUpdate(TaskBase):
    body: str | None = Field(default=None, max_length=255)
    completed: bool | None = Field(default=None)
    category_id: UUID | None = Field(default=None)


class TaskResponse(BaseModel):
    id: UUID
    body: str
    completed: bool
    category: CategoryResponse
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True
