from datetime import datetime
from typing import Optional
from pydantic import BaseModel, EmailStr
from .service import ServiceResponse


class TestimonialCreate(BaseModel):
    service_id: Optional[int] = None
    reviewer_name: str
    reviewer_email: Optional[EmailStr] = None
    rating: float
    review: Optional[str] = None


class TestimonialUpdate(BaseModel):
    status: Optional[str] = None
    is_featured: Optional[bool] = None
    reply: Optional[str] = None


class TestimonialResponse(BaseModel):
    id: int
    user_id: Optional[int]
    service_id: Optional[int]
    reviewer_name: str
    reviewer_email: Optional[str]
    reviewer_photo: Optional[str]
    rating: float
    review: Optional[str]
    reply: Optional[str]
    status: str
    is_featured: bool
    created_at: datetime
    updated_at: datetime
    service: Optional[ServiceResponse] = None

    class Config:
        from_attributes = True
