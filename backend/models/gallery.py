import enum
from datetime import datetime, timezone
from sqlalchemy import (Column, Integer, String, Boolean, DateTime, Text,
                        Enum as SAEnum)
from backend.database.db import Base


class MediaType(str, enum.Enum):
    image = "image"
    video = "video"


class Gallery(Base):
    __tablename__ = "gallery"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(200), nullable=True)
    description = Column(Text, nullable=True)
    media_type = Column(SAEnum(MediaType), default=MediaType.image)
    file_url = Column(String(500), nullable=False)
    thumbnail_url = Column(String(500), nullable=True)
    category = Column(String(100), nullable=True, index=True) # Cars, SUV, 4x4, PPF, Wrap, Ceramic, Thar
    is_featured = Column(Boolean, default=False)
    display_order = Column(Integer, default=0)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
    updated_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc),
                        onupdate=lambda: datetime.now(timezone.utc))


class MediaFile(Base):
    __tablename__ = "media_files"

    id = Column(Integer, primary_key=True, index=True)
    filename = Column(String(255), nullable=False)
    original_name = Column(String(255), nullable=False)
    file_url = Column(String(500), nullable=False)
    file_type = Column(String(50), nullable=False)   # image/jpeg, video/mp4 etc.
    file_size = Column(Integer, nullable=False, default=0)      # bytes
    folder = Column(String(100), nullable=True)
    width = Column(Integer, nullable=True)
    height = Column(Integer, nullable=True)
    uploaded_by = Column(Integer, nullable=True)     # admin id
    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
