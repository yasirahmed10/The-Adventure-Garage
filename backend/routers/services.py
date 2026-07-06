from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List, Optional
import re

from backend.database.db import get_db
from backend.models.service import Service
from backend.schemas.service import ServiceCreate, ServiceUpdate, ServiceResponse
from backend.auth.jwt import get_current_admin

router = APIRouter(prefix="/services", tags=["Services"])


def create_slug(name: str) -> str:
    slug = name.lower()
    slug = re.sub(r'[^a-z0-9]+', '-', slug)
    return slug.strip('-')


@router.get("/", response_model=List[ServiceResponse])
def get_services(
    active_only: bool = True,
    is_featured: Optional[bool] = None,
    db: Session = Depends(get_db)
):
    query = db.query(Service)
    if active_only:
        query = query.filter(Service.is_active == True)
    if is_featured is not None:
        query = query.filter(Service.is_featured == is_featured)
    return query.order_by(Service.display_order.asc()).all()


@router.get("/{slug}", response_model=ServiceResponse)
def get_service(slug: str, db: Session = Depends(get_db)):
    service = db.query(Service).filter(Service.slug == slug).first()
    if not service:
        # fallback to ID
        try:
            service_id = int(slug)
            service = db.query(Service).filter(Service.id == service_id).first()
        except ValueError:
            pass

    if not service:
        raise HTTPException(status_code=404, detail="Service not found")
    return service


@router.post("/", response_model=ServiceResponse)
def create_service(service: ServiceCreate, db: Session = Depends(get_db), admin=Depends(get_current_admin)):
    base_slug = create_slug(service.name)
    slug = base_slug
    counter = 1
    while db.query(Service).filter(Service.slug == slug).first():
        slug = f"{base_slug}-{counter}"
        counter += 1

    new_service = Service(**service.model_dump(), slug=slug)
    db.add(new_service)
    db.commit()
    db.refresh(new_service)
    return new_service


@router.put("/{service_id}", response_model=ServiceResponse)
def update_service(service_id: int, service: ServiceUpdate, db: Session = Depends(get_db), admin=Depends(get_current_admin)):
    db_service = db.query(Service).filter(Service.id == service_id).first()
    if not db_service:
        raise HTTPException(status_code=404, detail="Service not found")

    update_data = service.model_dump(exclude_unset=True)
    if "name" in update_data and update_data["name"] != db_service.name:
        base_slug = create_slug(update_data["name"])
        slug = base_slug
        counter = 1
        while db.query(Service).filter(Service.slug == slug, Service.id != service_id).first():
            slug = f"{base_slug}-{counter}"
            counter += 1
        update_data["slug"] = slug

    for key, value in update_data.items():
        setattr(db_service, key, value)

    db.commit()
    db.refresh(db_service)
    return db_service


@router.delete("/{service_id}")
def delete_service(service_id: int, db: Session = Depends(get_db), admin=Depends(get_current_admin)):
    db_service = db.query(Service).filter(Service.id == service_id).first()
    if not db_service:
        raise HTTPException(status_code=404, detail="Service not found")
    db.delete(db_service)
    db.commit()
    return {"message": "Service deleted"}
