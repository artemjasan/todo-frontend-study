from sqlalchemy import Column, String, text, Boolean, ForeignKey, TIMESTAMP
from sqlalchemy.orm import relationship
from sqlalchemy_utils import UUIDType

from .base import Base


class Task(Base):
    __tablename__ = "tasks"
    id = Column(UUIDType, primary_key=True, server_default=text("uuid_generate_v4()"))
    body = Column(String, nullable=False)
    completed = Column(Boolean, nullable=False, default=False)
    category_id = Column(UUIDType, ForeignKey('categories.id'))
    category = relationship('Category', backref='tasks')
    created_at = Column(TIMESTAMP, nullable=False, server_default=text("now()"))
    updated_at = Column(TIMESTAMP, nullable=False, server_default=text("now()"))
