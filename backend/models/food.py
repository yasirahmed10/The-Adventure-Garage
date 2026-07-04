import enum
from datetime import datetime, timezone
from sqlalchemy import (Column, Integer, String, Boolean, DateTime, Text,
                        Float, ForeignKey, Enum as SAEnum, JSON)
from sqlalchemy.orm import relationship
from backend.database.db import Base


class SpiceLevel(str, enum.Enum):
    mild = "mild"
    medium = "medium"
    hot = "hot"
    extra_hot = "extra_hot"


class FoodType(str, enum.Enum):
    veg = "veg"
    non_veg = "non_veg"
    vegan = "vegan"


class Food(Base):
    __tablename__ = "foods"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(200), nullable=False, index=True)
    slug = Column(String(250), unique=True, nullable=False, index=True)
    description = Column(Text, nullable=True)
    short_description = Column(String(500), nullable=True)
    category_id = Column(Integer, ForeignKey("categories.id", ondelete="SET NULL"), nullable=True)
    price = Column(Float, nullable=False)
    discount_percent = Column(Float, default=0.0)
    food_type = Column(SAEnum(FoodType), default=FoodType.veg)
    spice_level = Column(SAEnum(SpiceLevel), default=SpiceLevel.mild)
    preparation_time = Column(Integer, default=20)  # minutes
    ingredients = Column(Text, nullable=True)
    allergens = Column(Text, nullable=True)
    nutrition_info = Column(JSON, nullable=True)  # {calories, protein, carbs, fat, fiber}
    is_available = Column(Boolean, default=True)
    is_featured = Column(Boolean, default=False)
    is_bestseller = Column(Boolean, default=False)
    is_new_arrival = Column(Boolean, default=False)
    is_popular = Column(Boolean, default=False)
    rating = Column(Float, default=0.0)
    rating_count = Column(Integer, default=0)
    primary_image = Column(String(500), nullable=True)
    display_order = Column(Integer, default=0)
    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
    updated_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc),
                        onupdate=lambda: datetime.now(timezone.utc))

    category = relationship("Category", backref="foods", foreign_keys=[category_id])
    images = relationship("FoodImage", back_populates="food", cascade="all, delete-orphan")
    reviews = relationship("Testimonial", back_populates="food", cascade="all, delete-orphan")


class FoodImage(Base):
    __tablename__ = "food_images"

    id = Column(Integer, primary_key=True, index=True)
    food_id = Column(Integer, ForeignKey("foods.id", ondelete="CASCADE"), nullable=False)
    image_url = Column(String(500), nullable=False)
    alt_text = Column(String(255), nullable=True)
    display_order = Column(Integer, default=0)
    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))

    food = relationship("Food", back_populates="images")
