from datetime import datetime, timezone
from sqlalchemy import Column, Integer, String, Boolean, DateTime, Text, JSON
from backend.database.db import Base


class HomepageSection(Base):
    """Stores all homepage section configurations."""
    __tablename__ = "homepage_sections"

    id = Column(Integer, primary_key=True, index=True)
    section_key = Column(String(100), unique=True, nullable=False, index=True)
    # e.g. hero_slider, featured_foods, best_sellers, about, why_choose_us,
    #       categories_showcase, popular_dishes, testimonials_section, gallery_section,
    #       stats, reservation_cta, delivery_cta, today_offers
    title = Column(String(200), nullable=True)
    subtitle = Column(String(500), nullable=True)
    content = Column(JSON, nullable=True)   # flexible JSON for section-specific data
    is_active = Column(Boolean, default=True)
    display_order = Column(Integer, default=0)
    updated_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc),
                        onupdate=lambda: datetime.now(timezone.utc))


class HeroBanner(Base):
    __tablename__ = "hero_banners"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(200), nullable=True)
    subtitle = Column(String(500), nullable=True)
    image = Column(String(500), nullable=False)
    button_text = Column(String(100), nullable=True)
    button_link = Column(String(500), nullable=True)
    is_active = Column(Boolean, default=True)
    display_order = Column(Integer, default=0)
    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
    updated_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc),
                        onupdate=lambda: datetime.now(timezone.utc))


class Banner(Base):
    __tablename__ = "banners"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(200), nullable=False)
    banner_type = Column(String(50), default="homepage")  # homepage|offer|popup|seasonal
    image = Column(String(500), nullable=False)
    link = Column(String(500), nullable=True)
    is_active = Column(Boolean, default=True)
    display_order = Column(Integer, default=0)
    valid_from = Column(DateTime(timezone=True), nullable=True)
    valid_until = Column(DateTime(timezone=True), nullable=True)
    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
    updated_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc),
                        onupdate=lambda: datetime.now(timezone.utc))
