import enum
from datetime import datetime, timezone
from sqlalchemy import (Column, Integer, String, Boolean, DateTime, Text,
                        Float, ForeignKey, Enum as SAEnum)
from sqlalchemy.orm import relationship
from backend.database.db import Base


class TestimonialStatus(str, enum.Enum):
    pending = "pending"
    approved = "approved"
    rejected = "rejected"


class Testimonial(Base):
    __tablename__ = "testimonials"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="SET NULL"), nullable=True)
    food_id = Column(Integer, ForeignKey("foods.id", ondelete="SET NULL"), nullable=True)

    reviewer_name = Column(String(100), nullable=False)
    reviewer_email = Column(String(255), nullable=True)
    reviewer_photo = Column(String(500), nullable=True)
    rating = Column(Float, nullable=False)
    review = Column(Text, nullable=True)
    reply = Column(Text, nullable=True)            # admin reply

    status = Column(SAEnum(TestimonialStatus), default=TestimonialStatus.pending)
    is_featured = Column(Boolean, default=False)

    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
    updated_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc),
                        onupdate=lambda: datetime.now(timezone.utc))

    user = relationship("User", backref="testimonials")
    food = relationship("Food", back_populates="reviews")
