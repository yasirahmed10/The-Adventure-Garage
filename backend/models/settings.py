from datetime import datetime, timezone
from sqlalchemy import Column, Integer, String, Boolean, DateTime, Text, JSON
from backend.database.db import Base


class RestaurantSettings(Base):
    __tablename__ = "restaurant_settings"

    id = Column(Integer, primary_key=True, default=1)
    name = Column(String(200), default="Jaffa Restaurant")
    tagline = Column(String(500), nullable=True)
    logo = Column(String(500), nullable=True)
    favicon = Column(String(500), nullable=True)
    address = Column(Text, nullable=True)
    city = Column(String(100), nullable=True)
    state = Column(String(100), nullable=True)
    pincode = Column(String(10), nullable=True)
    country = Column(String(100), default="India")
    phone = Column(String(20), nullable=True)
    phone2 = Column(String(20), nullable=True)
    email = Column(String(255), nullable=True)
    whatsapp = Column(String(20), nullable=True)
    map_embed_url = Column(Text, nullable=True)
    lat = Column(String(50), nullable=True)
    lng = Column(String(50), nullable=True)
    opening_hours = Column(JSON, nullable=True)  # {monday: {open: "09:00", close: "22:00"}, ...}
    social_media = Column(JSON, nullable=True)   # {instagram, facebook, twitter, youtube}
    gst_number = Column(String(50), nullable=True)
    fssai_number = Column(String(50), nullable=True)
    upi_qr_image = Column(String(500), nullable=True)
    upi_id = Column(String(100), nullable=True)
    currency = Column(String(10), default="INR")
    currency_symbol = Column(String(5), default="₹")
    updated_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc),
                        onupdate=lambda: datetime.now(timezone.utc))


class WebsiteSettings(Base):
    __tablename__ = "website_settings"

    id = Column(Integer, primary_key=True, default=1)
    meta_title = Column(String(200), nullable=True)
    meta_description = Column(Text, nullable=True)
    meta_keywords = Column(Text, nullable=True)
    og_image = Column(String(500), nullable=True)
    google_analytics_id = Column(String(100), nullable=True)
    google_search_console = Column(Text, nullable=True)
    theme_color = Column(String(20), default="#F97316")  # orange-500
    font_family = Column(String(100), default="Inter")
    primary_color = Column(String(20), default="#F97316")
    secondary_color = Column(String(20), default="#1F2937")
    delivery_enabled = Column(Boolean, default=True)
    reservation_enabled = Column(Boolean, default=True)
    # Delivery settings
    delivery_charge = Column(Integer, default=40)
    free_delivery_above = Column(Integer, default=299)
    min_order_amount = Column(Integer, default=99)
    delivery_radius_km = Column(Integer, default=10)
    estimated_delivery_min = Column(Integer, default=30)
    estimated_delivery_max = Column(Integer, default=60)
    updated_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc),
                        onupdate=lambda: datetime.now(timezone.utc))


class PageContent(Base):
    __tablename__ = "page_contents"

    id = Column(Integer, primary_key=True, index=True)
    page_key = Column(String(100), unique=True, nullable=False, index=True)
    # about | privacy_policy | terms | refund_policy | faq
    title = Column(String(200), nullable=True)
    content = Column(Text, nullable=True)   # HTML / rich text
    is_active = Column(Boolean, default=True)
    updated_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc),
                        onupdate=lambda: datetime.now(timezone.utc))
