import enum
from datetime import datetime, timezone
from sqlalchemy import (Column, Integer, String, Boolean, DateTime, Text,
                        Float, Enum as SAEnum, JSON)
from backend.database.db import Base


class DiscountType(str, enum.Enum):
    percentage = "percentage"
    flat = "flat"


class Offer(Base):
    __tablename__ = "offers"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(200), nullable=False)
    description = Column(Text, nullable=True)
    offer_type = Column(String(50), default="seasonal")   # seasonal | package | promotional
    discount_type = Column(SAEnum(DiscountType), default=DiscountType.percentage)
    discount_value = Column(Float, nullable=False)
    banner_image = Column(String(500), nullable=True)
    min_amount = Column(Float, default=0.0)
    applicable_service_ids = Column(JSON, nullable=True)   # list of service ids
    valid_from = Column(DateTime(timezone=True), nullable=True)
    valid_until = Column(DateTime(timezone=True), nullable=True)
    is_active = Column(Boolean, default=True)
    priority = Column(Integer, default=0)
    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
    updated_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc),
                        onupdate=lambda: datetime.now(timezone.utc))
