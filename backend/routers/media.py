from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form, status
from sqlalchemy.orm import Session
from typing import List

from backend.database.db import get_db
from backend.models.gallery import MediaFile
from backend.schemas.gallery import MediaFileResponse
from backend.auth.jwt import get_current_admin
from backend.utils.file_upload import save_upload_file

router = APIRouter(prefix="/media", tags=["Media Library"])


@router.get("/", response_model=List[MediaFileResponse])
def get_media_files(folder: str = None, skip: int = 0, limit: int = 100, db: Session = Depends(get_db), admin=Depends(get_current_admin)):
    query = db.query(MediaFile)
    if folder:
        query = query.filter(MediaFile.folder == folder)
    return query.order_by(MediaFile.created_at.desc()).offset(skip).limit(limit).all()


@router.post("/upload", response_model=MediaFileResponse)
async def upload_media(
    file: UploadFile = File(...),
    folder: str = Form("general"),
    db: Session = Depends(get_db),
    admin=Depends(get_current_admin)
):
    if file.content_type.startswith("image/"):
        target_folder = f"images/{folder}"
    elif file.content_type.startswith("video/"):
        target_folder = f"videos/{folder}"
    else:
        target_folder = f"other/{folder}"
        
    file_url = await save_upload_file(file, target_folder)
    
    new_media = MediaFile(
        filename=file_url.split("/")[-1],
        original_name=file.filename,
        file_url=file_url,
        file_type=file.content_type,
        file_size=0,
        folder=folder,
        uploaded_by=admin.id
    )
    db.add(new_media)
    db.commit()
    db.refresh(new_media)
    
    return new_media


@router.post("/public-upload", response_model=MediaFileResponse)
async def public_upload_media(
    file: UploadFile = File(...),
    folder: str = Form("bookings"),
    db: Session = Depends(get_db)
):
    """Allows unauthenticated image uploads specifically for vehicle bookings."""
    # Restrict to images only for security
    if not file.content_type.startswith("image/"):
        raise HTTPException(
            status_code=400,
            detail="Only image files are allowed for booking uploads."
        )
        
    target_folder = f"images/{folder}"
    file_url = await save_upload_file(file, target_folder)
    
    new_media = MediaFile(
        filename=file_url.split("/")[-1],
        original_name=file.filename,
        file_url=file_url,
        file_type=file.content_type,
        file_size=0,
        folder=folder,
        uploaded_by=None  # Public upload
    )
    db.add(new_media)
    db.commit()
    db.refresh(new_media)
    
    return new_media


@router.delete("/{media_id}")
def delete_media(media_id: int, db: Session = Depends(get_db), admin=Depends(get_current_admin)):
    media = db.query(MediaFile).filter(MediaFile.id == media_id).first()
    if not media:
        raise HTTPException(status_code=404, detail="Media not found")
        
    # Attempt to delete file from disk
    try:
        relative_path = media.file_url.lstrip('/')
        if os.path.exists(relative_path):
            os.remove(relative_path)
    except Exception:
        pass
        
    db.delete(media)
    db.commit()
    return {"message": "Media deleted"}
