from datetime import datetime, timezone
from sqlalchemy import Column, Integer, String, Boolean, DateTime, Text, JSON
from backend.database.db import Base


class BusinessSettings(Base):
    __tablename__ = "business_settings"

    id = Column(Integer, primary_key=True, default=1)
    name = Column(String(200), default="THE ADVENTURE GARAGE (TAG)")
    tagline = Column(String(500), default="Premium Automotive Customization & Detailing Studio")
    logo = Column(String(500), nullable=True)
    favicon = Column(String(500), nullable=True)
    address = Column(Text, default="Shop No. 210, Old Secretary Gate, Sultania Rd, opposite Commissioner Office, Kohefiza, Bhopal, Madhya Pradesh 462001")
    phone = Column(String(20), default="09560815118")
    email = Column(String(255), default="info@theadventuregarage.com")
    whatsapp = Column(String(20), default="9560815118")
    map_embed_url = Column(Text, default="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3665.3400500000003!2d77.3811728!3d23.2629926!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x397c67e394681f5b%3A0x8d8b9b658d72dbcc!2sThe%20Adventure%20Garage!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin")
    opening_hours = Column(JSON, nullable=True)  # {"days": "Mon - Sat", "timings": "10:00 AM - 08:00 PM"}
    social_links = Column(JSON, nullable=True)   # {"instagram": "...", "facebook": "...", "youtube": "..."}
    updated_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc),
                        onupdate=lambda: datetime.now(timezone.utc))


class WebsiteSettings(Base):
    __tablename__ = "website_settings"

    id = Column(Integer, primary_key=True, default=1)

    # SEO & Meta
    meta_title = Column(String(200), default="THE ADVENTURE GARAGE | Car Detailing & Customization Bhopal")
    meta_description = Column(Text, default="Bhopal's premium studio for Car Detailing, Ceramic Coating, Paint Protection Film (PPF), Car Wrapping, and Thar 4x4 customizations.")
    meta_keywords = Column(Text, default="car detailing bhopal, ceramic coating bhopal, car wrapping, ppf installation, thar customization, 4x4 modifications bhopal")
    og_image = Column(String(500), nullable=True)
    google_analytics_id = Column(String(100), nullable=True)
    google_search_console = Column(Text, nullable=True)

    # Design & Theme
    primary_color = Column(String(50), default="#00B589")
    secondary_color = Column(String(50), default="#0a1f1a")
    accent_hover_color = Column(String(50), default="#00936F")
    background_color = Column(String(50), default="#09090b")
    font_family = Column(String(50), default="Outfit")
    button_radius = Column(String(20), default="full")       # full, 2xl, xl, lg, md, none
    card_radius = Column(String(20), default="3xl")           # 3xl, 2xl, xl, lg, md, none
    navbar_style = Column(String(20), default="glass")        # glass, solid, transparent
    footer_style = Column(String(20), default="detailed")     # detailed, minimal
    glassmorphism_enabled = Column(Boolean, default=True)

    # Homepage Content Overrides
    hero_title = Column(Text, nullable=True)
    hero_subtitle = Column(Text, nullable=True)
    hero_bg_image = Column(String(500), nullable=True)
    cta_text = Column(String(200), default="Book Appointment")
    about_title = Column(Text, default="BUILT NOT BOUGHT. WE DEFINE CAR CULTURE.")
    about_subtitle = Column(Text, default="THE TAG HERITAGE")
    about_desc_1 = Column(Text, default="THE ADVENTURE GARAGE (TAG) is Bhopal’s premium automotive customization studio. Founded on the principle of extreme craftsmanship, we don’t just apply wraps or spray coatings; we customize each vehicle as a personal masterpiece.")
    about_desc_2 = Column(Text, default="Whether you want to shield your luxury supercar with self-healing PPF, change colors with premium vinyl, or convert your Mahindra Thar into a menacing 4x4 beast, our certified technicians execute each project with microscopic precision.")
    about_button_text = Column(String(200), default="Read Our Full Story")
    show_about_section = Column(Boolean, default=True)
    
    # Custom Section
    custom_section_enabled = Column(Boolean, default=False)
    custom_section_title = Column(Text, nullable=True)
    custom_section_subtitle = Column(Text, nullable=True)
    custom_section_content = Column(Text, nullable=True)
    custom_section_image = Column(String(500), nullable=True)
    custom_section_cta_text = Column(String(200), nullable=True)
    custom_section_cta_link = Column(String(500), nullable=True)
    
    show_gallery_section = Column(Boolean, default=True)
    show_testimonials_section = Column(Boolean, default=True)
    show_services_section = Column(Boolean, default=True)
    show_offers_section = Column(Boolean, default=True)

    updated_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc),
                        onupdate=lambda: datetime.now(timezone.utc))


class PageContent(Base):
    __tablename__ = "page_contents"

    id = Column(Integer, primary_key=True, index=True)
    page_key = Column(String(100), unique=True, nullable=False, index=True)
    title = Column(String(200), nullable=True)
    content = Column(Text, nullable=True)   # HTML / rich text
    is_active = Column(Boolean, default=True)
    updated_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc),
                        onupdate=lambda: datetime.now(timezone.utc))
