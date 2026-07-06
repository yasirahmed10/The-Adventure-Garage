import enum
from datetime import datetime, timezone
from sqlalchemy import (Column, Integer, String, Date, Time, Text, DateTime, JSON, ForeignKey)
from sqlalchemy.orm import relationship
from backend.database.db import Base


class BookingStatus(str, enum.Enum):
    pending = "pending"
    accepted = "accepted"
    rejected = "rejected"
    completed = "completed"


class Booking(Base):
    __tablename__ = "bookings"

    id = Column(Integer, primary_key=True, index=True)
    booking_number = Column(String(50), unique=True, nullable=False, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="SET NULL"), nullable=True)

    # Client details
    name = Column(String(100), nullable=False)
    phone = Column(String(20), nullable=False)
    email = Column(String(255), nullable=True)

    # Vehicle details
    vehicle_brand = Column(String(100), nullable=False)
    vehicle_model = Column(String(100), nullable=False)
    vehicle_year = Column(Integer, nullable=True)
    required_service = Column(String(200), nullable=False)

    # Booking details
    preferred_date = Column(Date, nullable=False)
    preferred_time = Column(String(50), nullable=False) # e.g. "10:00 AM" or time
    message = Column(Text, nullable=True)
    images = Column(JSON, nullable=True)  # List of strings (image paths upload by user)

    status = Column(String(50), default=BookingStatus.pending)
    admin_notes = Column(Text, nullable=True)

    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
    updated_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc),
                        onupdate=lambda: datetime.now(timezone.utc))

    user = relationship("User", backref="bookings")
