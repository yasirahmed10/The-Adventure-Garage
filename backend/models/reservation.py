import enum
from datetime import datetime, timezone
from sqlalchemy import (Column, Integer, String, Boolean, DateTime, Text,
                        Date, Time, ForeignKey, Enum as SAEnum)
from sqlalchemy.orm import relationship
from backend.database.db import Base


class ReservationStatus(str, enum.Enum):
    pending = "pending"
    approved = "approved"
    rejected = "rejected"
    cancelled = "cancelled"
    completed = "completed"


class SeatingType(str, enum.Enum):
    indoor = "indoor"
    outdoor = "outdoor"


class Reservation(Base):
    __tablename__ = "reservations"

    id = Column(Integer, primary_key=True, index=True)
    reservation_number = Column(String(50), unique=True, nullable=False, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="SET NULL"), nullable=True)

    # Guest details
    guest_name = Column(String(100), nullable=False)
    guest_phone = Column(String(20), nullable=False)
    guest_email = Column(String(255), nullable=True)

    # Booking details
    date = Column(Date, nullable=False)
    time = Column(Time, nullable=False)
    guests_count = Column(Integer, nullable=False, default=2)
    seating_type = Column(SAEnum(SeatingType), default=SeatingType.indoor)
    special_requests = Column(Text, nullable=True)
    table_number = Column(String(20), nullable=True)   # assigned by admin

    status = Column(SAEnum(ReservationStatus), default=ReservationStatus.pending)
    admin_notes = Column(Text, nullable=True)

    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
    updated_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc),
                        onupdate=lambda: datetime.now(timezone.utc))

    user = relationship("User", backref="reservations")
