from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from backend.database.db import get_db
from backend.models.testimonial import Testimonial, TestimonialStatus
from backend.schemas.testimonial import TestimonialCreate, TestimonialUpdate, TestimonialResponse
from backend.auth.jwt import get_current_user_optional, get_current_admin

router = APIRouter(prefix="/testimonials", tags=["Testimonials"])


@router.get("/", response_model=List[TestimonialResponse])
def get_approved_testimonials(food_id: int = None, is_featured: bool = None, skip: int = 0, limit: int = 20, db: Session = Depends(get_db)):
    query = db.query(Testimonial).filter(Testimonial.status == TestimonialStatus.approved)
    if food_id:
        query = query.filter(Testimonial.food_id == food_id)
    if is_featured is not None:
        query = query.filter(Testimonial.is_featured == is_featured)
    return query.order_by(Testimonial.created_at.desc()).offset(skip).limit(limit).all()


@router.post("/", response_model=TestimonialResponse)
def submit_testimonial(
    testimonial: TestimonialCreate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user_optional)
):
    new_testimonial = Testimonial(
        **testimonial.model_dump(),
        user_id=current_user.id if current_user else None,
        reviewer_photo=current_user.avatar if current_user else None
    )
    db.add(new_testimonial)
    db.commit()
    db.refresh(new_testimonial)
    return new_testimonial


# ── Admin Routes ────────────────────────────────────────────────────────────
@router.get("/admin/all", response_model=List[TestimonialResponse])
def get_all_testimonials(status: str = None, skip: int = 0, limit: int = 50, db: Session = Depends(get_db), admin=Depends(get_current_admin)):
    query = db.query(Testimonial)
    if status:
        query = query.filter(Testimonial.status == status)
    return query.order_by(Testimonial.created_at.desc()).offset(skip).limit(limit).all()


@router.put("/{test_id}", response_model=TestimonialResponse)
def update_testimonial_status(
    test_id: int,
    test_update: TestimonialUpdate,
    db: Session = Depends(get_db),
    admin=Depends(get_current_admin)
):
    testimonial = db.query(Testimonial).filter(Testimonial.id == test_id).first()
    if not testimonial:
        raise HTTPException(status_code=404, detail="Testimonial not found")

    for key, value in test_update.model_dump(exclude_unset=True).items():
        setattr(testimonial, key, value)

    db.commit()
    db.refresh(testimonial)
    return testimonial


@router.delete("/{test_id}")
def delete_testimonial(test_id: int, db: Session = Depends(get_db), admin=Depends(get_current_admin)):
    testimonial = db.query(Testimonial).filter(Testimonial.id == test_id).first()
    if not testimonial:
        raise HTTPException(status_code=404, detail="Testimonial not found")
    db.delete(testimonial)
    db.commit()
    return {"message": "Testimonial deleted"}
