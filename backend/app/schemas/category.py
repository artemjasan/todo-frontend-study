from uuid import UUID

from pydantic import BaseModel, Field


class CategoryBase(BaseModel):
    name: str = Field(..., max_length=20, example="Food")


class CategoryCreate(CategoryBase):
    pass


class CategoryUpdate(CategoryBase):
    pass


class CategoryResponse(CategoryBase):
    id: UUID

    class Config:
        orm_mode = True
