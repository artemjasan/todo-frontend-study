from uuid import UUID

from pydantic import BaseModel


class BaseDeleteResponse(BaseModel):
    id: UUID

    class Config:
        orm_mode = True