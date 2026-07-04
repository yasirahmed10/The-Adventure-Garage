from datetime import datetime, date, time
from typing import Optional
from pydantic import BaseModel, EmailStr


class ReservationCreate(BaseModel):
    guest_name: str
    guest_phone: str
    guest_email: Optional[EmailStr] = None
    date: date
    time: time
    guests_count: int
    seating_type: str = "indoor"
    special_requests: Optional[str] = None


class ReservationUpdate(BaseModel):
    status: Optional[str] = None
    table_number: Optional[str] = None
    admin_notes: Optional[str] = None


class ReservationResponse(BaseModel):
    id: int
    reservation_number: str
    user_id: Optional[int]
    guest_name: str
    guest_phone: str
    guest_email: Optional[str]
    date: date
    time: time
    guests_count: int
    seating_type: str
    special_requests: Optional[str]
    table_number: Optional[str]
    status: str
    admin_notes: Optional[str]
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
