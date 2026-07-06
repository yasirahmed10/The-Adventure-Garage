from pydantic import BaseModel, EmailStr
from typing import List, Optional
from datetime import date, datetime


class BookingBase(BaseModel):
    name: str
    phone: str
    email: Optional[EmailStr] = None
    vehicle_brand: str
    vehicle_model: str
    vehicle_year: Optional[int] = None
    required_service: str
    preferred_date: date
    preferred_time: str
    message: Optional[str] = None
    images: Optional[List[str]] = None


class BookingCreate(BookingBase):
    pass


class BookingUpdate(BaseModel):
    status: Optional[str] = None
    admin_notes: Optional[str] = None


class BookingResponse(BookingBase):
    id: int
    booking_number: str
    status: str
    admin_notes: Optional[str] = None
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
        json_encoders = {
            date: lambda v: v.isoformat()
        }
