from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from backend.database.db import get_db
from backend.models.homepage import HomepageSection, HeroBanner, Banner
from backend.schemas.homepage import (HomepageSectionCreate, HomepageSectionUpdate, HomepageSectionResponse,
                              HeroBannerCreate, HeroBannerUpdate, HeroBannerResponse,
                              BannerCreate, BannerUpdate, BannerResponse)
from backend.auth.jwt import get_current_admin

router = APIRouter(prefix="/homepage", tags=["Homepage"])

# ── Homepage Sections ───────────────────────────────────────────────────────
@router.get("/sections", response_model=List[HomepageSectionResponse])
def get_sections(active_only: bool = True, db: Session = Depends(get_db)):
    query = db.query(HomepageSection)
    if active_only:
        query = query.filter(HomepageSection.is_active == True)
    return query.order_by(HomepageSection.display_order).all()


@router.post("/sections", response_model=HomepageSectionResponse)
def create_section(section: HomepageSectionCreate, db: Session = Depends(get_db), admin=Depends(get_current_admin)):
    if db.query(HomepageSection).filter(HomepageSection.section_key == section.section_key).first():
        raise HTTPException(status_code=400, detail="Section key already exists")
    new_section = HomepageSection(**section.model_dump())
    db.add(new_section)
    db.commit()
    db.refresh(new_section)
    return new_section


@router.put("/sections/{section_key}", response_model=HomepageSectionResponse)
def update_section(section_key: str, section: HomepageSectionUpdate, db: Session = Depends(get_db), admin=Depends(get_current_admin)):
    db_section = db.query(HomepageSection).filter(HomepageSection.section_key == section_key).first()
    if not db_section:
        raise HTTPException(status_code=404, detail="Section not found")
    
    for key, value in section.model_dump(exclude_unset=True).items():
        setattr(db_section, key, value)
    
    db.commit()
    db.refresh(db_section)
    return db_section


# ── Hero Banners ────────────────────────────────────────────────────────────
@router.get("/hero-banners", response_model=List[HeroBannerResponse])
def get_hero_banners(active_only: bool = True, db: Session = Depends(get_db)):
    query = db.query(HeroBanner)
    if active_only:
        query = query.filter(HeroBanner.is_active == True)
    return query.order_by(HeroBanner.display_order).all()


@router.post("/hero-banners", response_model=HeroBannerResponse)
def create_hero_banner(banner: HeroBannerCreate, image: str, db: Session = Depends(get_db), admin=Depends(get_current_admin)):
    new_banner = HeroBanner(**banner.model_dump(), image=image)
    db.add(new_banner)
    db.commit()
    db.refresh(new_banner)
    return new_banner


@router.put("/hero-banners/{banner_id}", response_model=HeroBannerResponse)
def update_hero_banner(banner_id: int, banner: HeroBannerUpdate, image: str = None, db: Session = Depends(get_db), admin=Depends(get_current_admin)):
    db_banner = db.query(HeroBanner).filter(HeroBanner.id == banner_id).first()
    if not db_banner:
        raise HTTPException(status_code=404, detail="Banner not found")
    
    for key, value in banner.model_dump(exclude_unset=True).items():
        setattr(db_banner, key, value)
    if image:
        db_banner.image = image
        
    db.commit()
    db.refresh(db_banner)
    return db_banner


@router.delete("/hero-banners/{banner_id}")
def delete_hero_banner(banner_id: int, db: Session = Depends(get_db), admin=Depends(get_current_admin)):
    db_banner = db.query(HeroBanner).filter(HeroBanner.id == banner_id).first()
    if not db_banner:
        raise HTTPException(status_code=404, detail="Banner not found")
    db.delete(db_banner)
    db.commit()
    return {"message": "Banner deleted"}


# ── Promotional Banners ─────────────────────────────────────────────────────
@router.get("/banners/{banner_type}", response_model=List[BannerResponse])
def get_banners_by_type(banner_type: str, active_only: bool = True, db: Session = Depends(get_db)):
    query = db.query(Banner).filter(Banner.banner_type == banner_type)
    if active_only:
        query = query.filter(Banner.is_active == True)
    return query.order_by(Banner.display_order).all()


@router.post("/banners", response_model=BannerResponse)
def create_banner(banner: BannerCreate, image: str, db: Session = Depends(get_db), admin=Depends(get_current_admin)):
    new_banner = Banner(**banner.model_dump(), image=image)
    db.add(new_banner)
    db.commit()
    db.refresh(new_banner)
    return new_banner


@router.delete("/banners/{banner_id}")
def delete_banner(banner_id: int, db: Session = Depends(get_db), admin=Depends(get_current_admin)):
    db_banner = db.query(Banner).filter(Banner.id == banner_id).first()
    if not db_banner:
        raise HTTPException(status_code=404, detail="Banner not found")
    db.delete(db_banner)
    db.commit()
    return {"message": "Banner deleted"}
