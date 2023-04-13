from sqlalchemy import Column, String, text
from sqlalchemy_utils import UUIDType

from .base import Base


class Category(Base):
    __tablename__ = "categories"

    id = Column(UUIDType, primary_key=True, server_default=text("uuid_generate_v4()"))
    name = Column(String, nullable=False, unique=True)
