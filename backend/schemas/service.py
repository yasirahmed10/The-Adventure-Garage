from pydantic import BaseModel
from typing import List, Optional, Dict, Any
from datetime import datetime


class FAQItem(BaseModel):
    question: str
    answer: str


class ServiceBase(BaseModel):
    name: str
    description: Optional[str] = None
    short_description: Optional[str] = None
    cover_image: Optional[str] = None
    price: Optional[float] = None
    benefits: Optional[List[str]] = None
    faqs: Optional[List[FAQItem]] = None
    is_active: Optional[bool] = True
    is_featured: Optional[bool] = False
    display_order: Optional[int] = 0


class ServiceCreate(ServiceBase):
    pass


class ServiceUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    short_description: Optional[str] = None
    cover_image: Optional[str] = None
    price: Optional[float] = None
    benefits: Optional[List[str]] = None
    faqs: Optional[List[FAQItem]] = None
    is_active: Optional[bool] = None
    is_featured: Optional[bool] = None
    display_order: Optional[int] = None


class ServiceResponse(ServiceBase):
    id: int
    slug: str
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
