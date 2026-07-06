from datetime import datetime
from typing import Optional
from pydantic import BaseModel


class BeforeAfterCreate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    before_image: str
    after_image: str
    category: Optional[str] = None


class BeforeAfterUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    before_image: Optional[str] = None
    after_image: Optional[str] = None
    category: Optional[str] = None


class BeforeAfterResponse(BaseModel):
    id: int
    title: Optional[str]
    description: Optional[str]
    before_image: str
    after_image: str
    category: Optional[str]
    created_at: datetime

    class Config:
        from_attributes = True
