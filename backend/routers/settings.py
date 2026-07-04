from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from backend.database.db import get_db
from backend.models.settings import RestaurantSettings, WebsiteSettings, PageContent
from backend.schemas.settings import (RestaurantSettingsUpdate, RestaurantSettingsResponse,
                              WebsiteSettingsUpdate, WebsiteSettingsResponse,
                              PageContentCreate, PageContentUpdate, PageContentResponse)
from backend.auth.jwt import get_current_admin

router = APIRouter(prefix="/settings", tags=["Settings"])


def _get_or_create_restaurant_settings(db: Session) -> RestaurantSettings:
    settings = db.query(RestaurantSettings).first()
    if not settings:
        settings = RestaurantSettings(id=1)
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


# ── Restaurant Settings ─────────────────────────────────────────────────────
@router.get("/restaurant", response_model=RestaurantSettingsResponse)
def get_restaurant_settings(db: Session = Depends(get_db)):
    return _get_or_create_restaurant_settings(db)


@router.put("/restaurant", response_model=RestaurantSettingsResponse)
def update_restaurant_settings(settings_update: RestaurantSettingsUpdate, db: Session = Depends(get_db), admin=Depends(get_current_admin)):
    settings = _get_or_create_restaurant_settings(db)
    
    for key, value in settings_update.model_dump(exclude_unset=True).items():
        setattr(settings, key, value)
        
    db.commit()
    db.refresh(settings)
    return settings


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
