import enum
from datetime import datetime, timezone
from sqlalchemy import (Column, Integer, String, Boolean, DateTime, Text,
                        Float, ForeignKey, Enum as SAEnum, JSON)
from sqlalchemy.orm import relationship
from backend.database.db import Base


class OrderStatus(str, enum.Enum):
    pending = "pending"
    accepted = "accepted"
    preparing = "preparing"
    out_for_delivery = "out_for_delivery"
    delivered = "delivered"
    cancelled = "cancelled"


class PaymentMethod(str, enum.Enum):
    cod = "cod"
    upi = "upi"
    card = "card"
    online = "online"


class PaymentStatus(str, enum.Enum):
    pending = "pending"
    paid = "paid"
    failed = "failed"
    refunded = "refunded"


class Order(Base):
    __tablename__ = "orders"

    id = Column(Integer, primary_key=True, index=True)
    order_number = Column(String(50), unique=True, nullable=False, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="SET NULL"), nullable=True)

    # Customer details
    customer_name = Column(String(100), nullable=False)
    customer_phone = Column(String(20), nullable=False)
    customer_email = Column(String(255), nullable=True)

    # Delivery address
    address = Column(Text, nullable=False)
    landmark = Column(String(255), nullable=True)
    city = Column(String(100), nullable=False)
    pincode = Column(String(10), nullable=False)
    delivery_notes = Column(Text, nullable=True)

    # Pricing
    subtotal = Column(Float, nullable=False)
    discount_amount = Column(Float, default=0.0)
    delivery_charge = Column(Float, default=0.0)
    gst_amount = Column(Float, default=0.0)
    total_amount = Column(Float, nullable=False)

    # Coupon
    coupon_id = Column(Integer, ForeignKey("coupons.id", ondelete="SET NULL"), nullable=True)
    coupon_code = Column(String(50), nullable=True)

    # Status
    status = Column(SAEnum(OrderStatus), default=OrderStatus.pending)
    payment_method = Column(SAEnum(PaymentMethod), default=PaymentMethod.cod)
    payment_status = Column(SAEnum(PaymentStatus), default=PaymentStatus.pending)
    payment_reference = Column(String(255), nullable=True)

    # Timestamps
    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
    updated_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc),
                        onupdate=lambda: datetime.now(timezone.utc))
    delivered_at = Column(DateTime(timezone=True), nullable=True)

    user = relationship("User", backref="orders")
    items = relationship("OrderItem", back_populates="order", cascade="all, delete-orphan")
    coupon = relationship("Coupon", backref="orders")


class OrderItem(Base):
    __tablename__ = "order_items"

    id = Column(Integer, primary_key=True, index=True)
    order_id = Column(Integer, ForeignKey("orders.id", ondelete="CASCADE"), nullable=False)
    food_id = Column(Integer, ForeignKey("foods.id", ondelete="SET NULL"), nullable=True)
    food_name = Column(String(200), nullable=False)   # snapshot
    food_image = Column(String(500), nullable=True)
    price = Column(Float, nullable=False)              # price at time of order
    quantity = Column(Integer, nullable=False, default=1)
    total = Column(Float, nullable=False)

    order = relationship("Order", back_populates="items")
    food = relationship("Food", backref="order_items")
