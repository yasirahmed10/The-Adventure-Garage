from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List, Optional

from backend.database.db import get_db
from backend.models.gallery import Gallery
from backend.schemas.gallery import GalleryCreate, GalleryUpdate, GalleryResponse
from backend.auth.jwt import get_current_admin

router = APIRouter(prefix="/gallery", tags=["Gallery"])


@router.get("/", response_model=List[GalleryResponse])
def get_gallery(active_only: bool = True, category: Optional[str] = None, db: Session = Depends(get_db)):
    query = db.query(Gallery)
    if active_only:
        query = query.filter(Gallery.is_active == True)
    if category:
        query = query.filter(Gallery.category == category)
    return query.order_by(Gallery.display_order.asc()).all()


@router.post("/", response_model=GalleryResponse)
def create_gallery_item(item: GalleryCreate, db: Session = Depends(get_db), admin=Depends(get_current_admin)):
    new_item = Gallery(
        **item.model_dump()
    )
    db.add(new_item)
    db.commit()
    db.refresh(new_item)
    return new_item


@router.put("/{item_id}", response_model=GalleryResponse)
def update_gallery_item(item_id: int, item: GalleryUpdate, db: Session = Depends(get_db), admin=Depends(get_current_admin)):
    db_item = db.query(Gallery).filter(Gallery.id == item_id).first()
    if not db_item:
        raise HTTPException(status_code=404, detail="Item not found")

    for key, value in item.model_dump(exclude_unset=True).items():
        setattr(db_item, key, value)

    db.commit()
    db.refresh(db_item)
    return db_item


@router.delete("/{item_id}")
def delete_gallery_item(item_id: int, db: Session = Depends(get_db), admin=Depends(get_current_admin)):
    db_item = db.query(Gallery).filter(Gallery.id == item_id).first()
    if not db_item:
        raise HTTPException(status_code=404, detail="Item not found")
    db.delete(db_item)
    db.commit()
    return {"message": "Item deleted"}
