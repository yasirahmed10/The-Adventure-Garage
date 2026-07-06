from datetime import datetime
from typing import Optional
from pydantic import BaseModel


class GalleryCreate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    file_url: str
    category: Optional[str] = None # Cars, SUV, 4x4, PPF, Wrap, Ceramic, Thar
    is_featured: bool = False
    display_order: int = 0
    is_active: bool = True


class GalleryUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    file_url: Optional[str] = None
    category: Optional[str] = None
    is_featured: Optional[bool] = None
    display_order: Optional[int] = None
    is_active: Optional[bool] = None


class GalleryResponse(BaseModel):
    id: int
    title: Optional[str]
    description: Optional[str]
    media_type: str
    file_url: str
    thumbnail_url: Optional[str]
    category: Optional[str]
    is_featured: bool
    display_order: int
    is_active: bool
    created_at: datetime

    class Config:
        from_attributes = True


class MediaFileResponse(BaseModel):
    id: int
    filename: str
    original_name: str
    file_url: str
    file_type: str
    file_size: int
    folder: Optional[str]
    width: Optional[int]
    height: Optional[int]
    uploaded_by: Optional[int]
    created_at: datetime

    class Config:
        from_attributes = True
