from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from backend.database.db import get_db
from backend.models.gallery import Gallery
from backend.schemas.gallery import GalleryCreate, GalleryUpdate, GalleryResponse
from backend.auth.jwt import get_current_admin

router = APIRouter(prefix="/gallery", tags=["Gallery"])


@router.get("/", response_model=List[GalleryResponse])
def get_gallery(active_only: bool = True, album: str = None, db: Session = Depends(get_db)):
    query = db.query(Gallery)
    if active_only:
        query = query.filter(Gallery.is_active == True)
    if album:
        query = query.filter(Gallery.album == album)
    return query.order_by(Gallery.display_order).all()


@router.post("/", response_model=GalleryResponse)
def create_gallery_item(item: GalleryCreate, file_url: str, thumbnail_url: str = None, media_type: str = "image", db: Session = Depends(get_db), admin=Depends(get_current_admin)):
    new_item = Gallery(
        **item.model_dump(),
        file_url=file_url,
        thumbnail_url=thumbnail_url,
        media_type=media_type
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
