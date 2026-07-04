from datetime import datetime
from typing import Optional, Any
from pydantic import BaseModel


class RestaurantSettingsUpdate(BaseModel):
    name: Optional[str] = None
    tagline: Optional[str] = None
    address: Optional[str] = None
    city: Optional[str] = None
    state: Optional[str] = None
    pincode: Optional[str] = None
    country: Optional[str] = None
    phone: Optional[str] = None
    phone2: Optional[str] = None
    email: Optional[str] = None
    whatsapp: Optional[str] = None
    map_embed_url: Optional[str] = None
    lat: Optional[str] = None
    lng: Optional[str] = None
    opening_hours: Optional[Any] = None
    social_media: Optional[Any] = None
    gst_number: Optional[str] = None
    fssai_number: Optional[str] = None
    upi_id: Optional[str] = None
    currency: Optional[str] = None
    currency_symbol: Optional[str] = None


class RestaurantSettingsResponse(BaseModel):
    id: int
    name: str
    tagline: Optional[str]
    logo: Optional[str]
    favicon: Optional[str]
    address: Optional[str]
    city: Optional[str]
    state: Optional[str]
    pincode: Optional[str]
    country: str
    phone: Optional[str]
    phone2: Optional[str]
    email: Optional[str]
    whatsapp: Optional[str]
    map_embed_url: Optional[str]
    lat: Optional[str]
    lng: Optional[str]
    opening_hours: Optional[Any]
    social_media: Optional[Any]
    gst_number: Optional[str]
    fssai_number: Optional[str]
    upi_qr_image: Optional[str]
    upi_id: Optional[str]
    currency: str
    currency_symbol: str
    updated_at: datetime

    class Config:
        from_attributes = True


class WebsiteSettingsUpdate(BaseModel):
    meta_title: Optional[str] = None
    meta_description: Optional[str] = None
    meta_keywords: Optional[str] = None
    google_analytics_id: Optional[str] = None
    google_search_console: Optional[str] = None
    theme_color: Optional[str] = None
    font_family: Optional[str] = None
    primary_color: Optional[str] = None
    secondary_color: Optional[str] = None
    delivery_enabled: Optional[bool] = None
    reservation_enabled: Optional[bool] = None
    delivery_charge: Optional[int] = None
    free_delivery_above: Optional[int] = None
    min_order_amount: Optional[int] = None
    delivery_radius_km: Optional[int] = None
    estimated_delivery_min: Optional[int] = None
    estimated_delivery_max: Optional[int] = None


class WebsiteSettingsResponse(BaseModel):
    id: int
    meta_title: Optional[str]
    meta_description: Optional[str]
    meta_keywords: Optional[str]
    og_image: Optional[str]
    google_analytics_id: Optional[str]
    google_search_console: Optional[str]
    theme_color: str
    font_family: str
    primary_color: str
    secondary_color: str
    delivery_enabled: bool
    reservation_enabled: bool
    delivery_charge: int
    free_delivery_above: int
    min_order_amount: int
    delivery_radius_km: int
    estimated_delivery_min: int
    estimated_delivery_max: int
    updated_at: datetime

    class Config:
        from_attributes = True


class PageContentCreate(BaseModel):
    page_key: str
    title: Optional[str] = None
    content: Optional[str] = None
    is_active: bool = True


class PageContentUpdate(BaseModel):
    title: Optional[str] = None
    content: Optional[str] = None
    is_active: Optional[bool] = None


class PageContentResponse(BaseModel):
    id: int
    page_key: str
    title: Optional[str]
    content: Optional[str]
    is_active: bool
    updated_at: datetime

    class Config:
        from_attributes = True
