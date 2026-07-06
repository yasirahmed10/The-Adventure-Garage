from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from backend.database.db import get_db
from backend.models.settings import BusinessSettings, WebsiteSettings, PageContent
from backend.schemas.settings import (BusinessSettingsUpdate, BusinessSettingsResponse,
                              WebsiteSettingsUpdate, WebsiteSettingsResponse,
                              PageContentCreate, PageContentUpdate, PageContentResponse)
from backend.auth.jwt import get_current_admin

router = APIRouter(prefix="/settings", tags=["Settings"])


def _get_or_create_business_settings(db: Session) -> BusinessSettings:
    settings = db.query(BusinessSettings).first()
    if not settings:
        settings = BusinessSettings(id=1)
        db.add(settings)
        db.commit()
        db.refresh(settings)
    return settings


def _get_or_create_website_settings(db: Session) -> WebsiteSettings:
    settings = db.query(WebsiteSettings).first()
    if not settings:
        settings = WebsiteSettings(id=1)
        db.add(settings)
        db.commit()
        db.refresh(settings)
    return settings


# ── Business Settings ─────────────────────────────────────────────────────
@router.get("/business", response_model=BusinessSettingsResponse)
def get_business_settings(db: Session = Depends(get_db)):
    return _get_or_create_business_settings(db)


@router.put("/business", response_model=BusinessSettingsResponse)
def update_business_settings(settings_update: BusinessSettingsUpdate, db: Session = Depends(get_db), admin=Depends(get_current_admin)):
    settings = _get_or_create_business_settings(db)
    
    for key, value in settings_update.model_dump(exclude_unset=True).items():
        setattr(settings, key, value)
        
    db.commit()
    db.refresh(settings)
    return settings


# Alias for compatibility with old restaurant layouts
@router.get("/restaurant", response_model=BusinessSettingsResponse)
def get_restaurant_settings_alias(db: Session = Depends(get_db)):
    return _get_or_create_business_settings(db)


@router.put("/restaurant", response_model=BusinessSettingsResponse)
def update_restaurant_settings_alias(settings_update: BusinessSettingsUpdate, db: Session = Depends(get_db), admin=Depends(get_current_admin)):
    return update_business_settings(settings_update, db, admin)


# ── Website Settings ────────────────────────────────────────────────────────
@router.get("/website", response_model=WebsiteSettingsResponse)
def get_website_settings(db: Session = Depends(get_db)):
    return _get_or_create_website_settings(db)


@router.put("/website", response_model=WebsiteSettingsResponse)
def update_website_settings(settings_update: WebsiteSettingsUpdate, db: Session = Depends(get_db), admin=Depends(get_current_admin)):
    settings = _get_or_create_website_settings(db)
    
    for key, value in settings_update.model_dump(exclude_unset=True).items():
        setattr(settings, key, value)
        
    db.commit()
    db.refresh(settings)
    return settings


# ── Design Settings (convenience wrapper over website settings) ─────────────
@router.get("/design", response_model=WebsiteSettingsResponse)
def get_design_settings(db: Session = Depends(get_db)):
    """Get all design/theme settings. This is an alias for /website that includes design fields."""
    return _get_or_create_website_settings(db)


@router.put("/design", response_model=WebsiteSettingsResponse)
def update_design_settings(settings_update: WebsiteSettingsUpdate, db: Session = Depends(get_db), admin=Depends(get_current_admin)):
    """Update design/theme settings. This is an alias for /website that includes design fields."""
    return update_website_settings(settings_update, db, admin)


# ── Pages Content ───────────────────────────────────────────────────────────
@router.get("/pages/{page_key}", response_model=PageContentResponse)
def get_page_content(page_key: str, db: Session = Depends(get_db)):
    page = db.query(PageContent).filter(PageContent.page_key == page_key).first()
    if not page or not page.is_active:
        raise HTTPException(status_code=404, detail="Page not found")
    return page


@router.get("/pages", response_model=List[PageContentResponse])
def get_all_pages(db: Session = Depends(get_db), admin=Depends(get_current_admin)):
    return db.query(PageContent).all()


@router.put("/pages/{page_key}", response_model=PageContentResponse)
def update_page_content(page_key: str, page_update: PageContentUpdate, db: Session = Depends(get_db), admin=Depends(get_current_admin)):
    page = db.query(PageContent).filter(PageContent.page_key == page_key).first()
    if not page:
        page = PageContent(page_key=page_key)
        db.add(page)
        
    for key, value in page_update.model_dump(exclude_unset=True).items():
        setattr(page, key, value)
        
    db.commit()
    db.refresh(page)
    return page
