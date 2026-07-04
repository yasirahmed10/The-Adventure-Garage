from datetime import datetime
from typing import Optional, Any
from pydantic import BaseModel


class HomepageSectionCreate(BaseModel):
    section_key: str
    title: Optional[str] = None
    subtitle: Optional[str] = None
    content: Optional[Any] = None
    is_active: bool = True
    display_order: int = 0


class HomepageSectionUpdate(BaseModel):
    title: Optional[str] = None
    subtitle: Optional[str] = None
    content: Optional[Any] = None
    is_active: Optional[bool] = None
    display_order: Optional[int] = None


class HomepageSectionResponse(BaseModel):
    id: int
    section_key: str
    title: Optional[str]
    subtitle: Optional[str]
    content: Optional[Any]
    is_active: bool
    display_order: int
    updated_at: datetime

    class Config:
        from_attributes = True


class HeroBannerCreate(BaseModel):
    title: Optional[str] = None
    subtitle: Optional[str] = None
    button_text: Optional[str] = None
    button_link: Optional[str] = None
    is_active: bool = True
    display_order: int = 0


class HeroBannerUpdate(BaseModel):
    title: Optional[str] = None
    subtitle: Optional[str] = None
    button_text: Optional[str] = None
    button_link: Optional[str] = None
    is_active: Optional[bool] = None
    display_order: Optional[int] = None


class HeroBannerResponse(BaseModel):
    id: int
    title: Optional[str]
    subtitle: Optional[str]
    image: str
    button_text: Optional[str]
    button_link: Optional[str]
    is_active: bool
    display_order: int
    created_at: datetime

    class Config:
        from_attributes = True


class BannerCreate(BaseModel):
    name: str
    banner_type: str = "homepage"
    link: Optional[str] = None
    is_active: bool = True
    display_order: int = 0
    valid_from: Optional[datetime] = None
    valid_until: Optional[datetime] = None


class BannerUpdate(BaseModel):
    name: Optional[str] = None
    banner_type: Optional[str] = None
    link: Optional[str] = None
    is_active: Optional[bool] = None
    display_order: Optional[int] = None
    valid_from: Optional[datetime] = None
    valid_until: Optional[datetime] = None


class BannerResponse(BaseModel):
    id: int
    name: str
    banner_type: str
    image: str
    link: Optional[str]
    is_active: bool
    display_order: int
    valid_from: Optional[datetime]
    valid_until: Optional[datetime]
    created_at: datetime

    class Config:
        from_attributes = True
