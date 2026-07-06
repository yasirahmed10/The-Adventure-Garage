from datetime import datetime
from typing import Optional, Any
from pydantic import BaseModel


# ── Business Settings ────────────────────────────────────────────────────────

class BusinessSettingsUpdate(BaseModel):
    name: Optional[str] = None
    tagline: Optional[str] = None
    logo: Optional[str] = None
    favicon: Optional[str] = None
    address: Optional[str] = None
    phone: Optional[str] = None
    email: Optional[str] = None
    whatsapp: Optional[str] = None
    map_embed_url: Optional[str] = None
    opening_hours: Optional[Any] = None
    social_links: Optional[Any] = None


class BusinessSettingsResponse(BaseModel):
    id: int
    name: str
    tagline: Optional[str]
    logo: Optional[str]
    favicon: Optional[str]
    address: Optional[str]
    phone: Optional[str]
    email: Optional[str]
    whatsapp: Optional[str]
    map_embed_url: Optional[str]
    opening_hours: Optional[Any]
    social_links: Optional[Any]
    updated_at: datetime

    class Config:
        from_attributes = True


# ── Website / SEO Settings ───────────────────────────────────────────────────

class WebsiteSettingsUpdate(BaseModel):
    meta_title: Optional[str] = None
    meta_description: Optional[str] = None
    meta_keywords: Optional[str] = None
    og_image: Optional[str] = None
    google_analytics_id: Optional[str] = None
    google_search_console: Optional[str] = None
    primary_color: Optional[str] = None
    secondary_color: Optional[str] = None
    accent_hover_color: Optional[str] = None
    background_color: Optional[str] = None
    font_family: Optional[str] = None
    button_radius: Optional[str] = None
    card_radius: Optional[str] = None
    navbar_style: Optional[str] = None
    footer_style: Optional[str] = None
    glassmorphism_enabled: Optional[bool] = None
    hero_title: Optional[str] = None
    hero_subtitle: Optional[str] = None
    hero_bg_image: Optional[str] = None
    cta_text: Optional[str] = None
    about_title: Optional[str] = None
    about_subtitle: Optional[str] = None
    about_desc_1: Optional[str] = None
    about_desc_2: Optional[str] = None
    about_button_text: Optional[str] = None
    custom_section_enabled: Optional[bool] = None
    custom_section_title: Optional[str] = None
    custom_section_subtitle: Optional[str] = None
    custom_section_content: Optional[str] = None
    custom_section_image: Optional[str] = None
    custom_section_cta_text: Optional[str] = None
    custom_section_cta_link: Optional[str] = None
    show_about_section: Optional[bool] = None
    show_gallery_section: Optional[bool] = None
    show_testimonials_section: Optional[bool] = None
    show_services_section: Optional[bool] = None
    show_offers_section: Optional[bool] = None


class WebsiteSettingsResponse(BaseModel):
    id: int
    meta_title: Optional[str]
    meta_description: Optional[str]
    meta_keywords: Optional[str]
    og_image: Optional[str]
    google_analytics_id: Optional[str]
    google_search_console: Optional[str]
    primary_color: Optional[str]
    secondary_color: Optional[str]
    accent_hover_color: Optional[str]
    background_color: Optional[str]
    font_family: Optional[str]
    button_radius: Optional[str]
    card_radius: Optional[str]
    navbar_style: Optional[str]
    footer_style: Optional[str]
    glassmorphism_enabled: Optional[bool]
    hero_title: Optional[str]
    hero_subtitle: Optional[str]
    hero_bg_image: Optional[str]
    cta_text: Optional[str]
    about_title: Optional[str]
    about_subtitle: Optional[str]
    about_desc_1: Optional[str]
    about_desc_2: Optional[str]
    about_button_text: Optional[str]
    custom_section_enabled: Optional[bool]
    custom_section_title: Optional[str]
    custom_section_subtitle: Optional[str]
    custom_section_content: Optional[str]
    custom_section_image: Optional[str]
    custom_section_cta_text: Optional[str]
    custom_section_cta_link: Optional[str]
    show_about_section: Optional[bool]
    show_gallery_section: Optional[bool]
    show_testimonials_section: Optional[bool]
    show_services_section: Optional[bool]
    show_offers_section: Optional[bool]
    updated_at: datetime

    class Config:
        from_attributes = True


# ── Page Content ─────────────────────────────────────────────────────────────

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
