from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List, Optional

from backend.database.db import get_db
from backend.models.before_after import BeforeAfter
from backend.schemas.before_after import BeforeAfterCreate, BeforeAfterUpdate, BeforeAfterResponse
from backend.auth.jwt import get_current_admin

router = APIRouter(prefix="/before-after", tags=["Before & After"])


@router.get("/", response_model=List[BeforeAfterResponse])
def get_before_afters(category: Optional[str] = None, db: Session = Depends(get_db)):
    query = db.query(BeforeAfter)
    if category:
        query = query.filter(BeforeAfter.category == category)
    return query.order_by(BeforeAfter.id.desc()).all()


@router.post("/", response_model=BeforeAfterResponse)
def create_before_after(
    ba: BeforeAfterCreate,
    db: Session = Depends(get_db),
    admin=Depends(get_current_admin)
):
    new_ba = BeforeAfter(**ba.model_dump())
    db.add(new_ba)
    db.commit()
    db.refresh(new_ba)
    return new_ba


@router.put("/{ba_id}", response_model=BeforeAfterResponse)
def update_before_after(
    ba_id: int,
    ba: BeforeAfterUpdate,
    db: Session = Depends(get_db),
    admin=Depends(get_current_admin)
):
    db_ba = db.query(BeforeAfter).filter(BeforeAfter.id == ba_id).first()
    if not db_ba:
        raise HTTPException(status_code=404, detail="BeforeAfter comparison not found")

    update_data = ba.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_ba, key, value)

    db.commit()
    db.refresh(db_ba)
    return db_ba


@router.delete("/{ba_id}")
def delete_before_after(ba_id: int, db: Session = Depends(get_db), admin=Depends(get_current_admin)):
    db_ba = db.query(BeforeAfter).filter(BeforeAfter.id == ba_id).first()
    if not db_ba:
        raise HTTPException(status_code=404, detail="BeforeAfter comparison not found")
    db.delete(db_ba)
    db.commit()
    return {"message": "BeforeAfter comparison deleted"}
