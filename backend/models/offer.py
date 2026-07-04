import enum
from datetime import datetime, timezone
from sqlalchemy import (Column, Integer, String, Boolean, DateTime, Text,
                        Float, ForeignKey, Enum as SAEnum, JSON)
from backend.database.db import Base


class DiscountType(str, enum.Enum):
    percentage = "percentage"
    flat = "flat"


class Offer(Base):
    __tablename__ = "offers"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(200), nullable=False)
    description = Column(Text, nullable=True)
    offer_type = Column(String(50), default="seasonal")   # seasonal | festival | flash | regular
    discount_type = Column(SAEnum(DiscountType), default=DiscountType.percentage)
    discount_value = Column(Float, nullable=False)
    banner_image = Column(String(500), nullable=True)
    min_order_amount = Column(Float, default=0.0)
    applicable_food_ids = Column(JSON, nullable=True)   # list of food ids, None = all
    valid_from = Column(DateTime(timezone=True), nullable=True)
    valid_until = Column(DateTime(timezone=True), nullable=True)
    is_active = Column(Boolean, default=True)
    priority = Column(Integer, default=0)
    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
    updated_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc),
                        onupdate=lambda: datetime.now(timezone.utc))


class Coupon(Base):
    __tablename__ = "coupons"

    id = Column(Integer, primary_key=True, index=True)
    code = Column(String(50), unique=True, nullable=False, index=True)
    description = Column(Text, nullable=True)
    discount_type = Column(SAEnum(DiscountType), default=DiscountType.percentage)
    discount_value = Column(Float, nullable=False)
    min_order_amount = Column(Float, default=0.0)
    max_discount = Column(Float, nullable=True)
    usage_limit = Column(Integer, nullable=True)   # None = unlimited
    used_count = Column(Integer, default=0)
    is_active = Column(Boolean, default=True)
    valid_from = Column(DateTime(timezone=True), nullable=True)
    valid_until = Column(DateTime(timezone=True), nullable=True)
    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
