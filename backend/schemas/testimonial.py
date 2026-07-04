from datetime import datetime
from typing import Optional
from pydantic import BaseModel, EmailStr
from .food import FoodResponse


class TestimonialCreate(BaseModel):
    food_id: Optional[int] = None
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
    food_id: Optional[int]
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
    food: Optional[FoodResponse]

    class Config:
        from_attributes = True
