from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from datetime import datetime, timezone

from backend.database.db import get_db
from backend.models.offer import Coupon
from backend.schemas.offer import CouponCreate, CouponUpdate, CouponResponse
from backend.auth.jwt import get_current_admin

router = APIRouter(prefix="/coupons", tags=["Coupons"])


@router.post("/validate")
def validate_coupon(code: str, order_amount: float, db: Session = Depends(get_db)):
    coupon = db.query(Coupon).filter(Coupon.code == code).first()
    if not coupon or not coupon.is_active:
        raise HTTPException(status_code=400, detail="Invalid or inactive coupon")

    now = datetime.now(timezone.utc)
    if coupon.valid_from and coupon.valid_from > now:
        raise HTTPException(status_code=400, detail="Coupon is not valid yet")
    if coupon.valid_until and coupon.valid_until < now:
        raise HTTPException(status_code=400, detail="Coupon has expired")

    if coupon.usage_limit and coupon.used_count >= coupon.usage_limit:
        raise HTTPException(status_code=400, detail="Coupon usage limit reached")

    if order_amount < coupon.min_order_amount:
        raise HTTPException(status_code=400, detail=f"Minimum order amount of {coupon.min_order_amount} required")

    # calculate discount
    discount_amount = 0.0
    if coupon.discount_type == "percentage":
        discount_amount = order_amount * (coupon.discount_value / 100)
        if coupon.max_discount:
            discount_amount = min(discount_amount, coupon.max_discount)
    else:
        discount_amount = coupon.discount_value

    return {
        "valid": True,
        "discount_amount": discount_amount,
        "coupon": coupon
    }


# ── Admin Routes ────────────────────────────────────────────────────────────
@router.get("/", response_model=List[CouponResponse])
def get_all_coupons(db: Session = Depends(get_db), admin=Depends(get_current_admin)):
    return db.query(Coupon).order_by(Coupon.created_at.desc()).all()


@router.post("/", response_model=CouponResponse)
def create_coupon(coupon: CouponCreate, db: Session = Depends(get_db), admin=Depends(get_current_admin)):
    if db.query(Coupon).filter(Coupon.code == coupon.code).first():
        raise HTTPException(status_code=400, detail="Coupon code already exists")
    new_coupon = Coupon(**coupon.model_dump())
    db.add(new_coupon)
    db.commit()
    db.refresh(new_coupon)
    return new_coupon


@router.put("/{coupon_id}", response_model=CouponResponse)
def update_coupon(coupon_id: int, coupon: CouponUpdate, db: Session = Depends(get_db), admin=Depends(get_current_admin)):
    db_coupon = db.query(Coupon).filter(Coupon.id == coupon_id).first()
    if not db_coupon:
        raise HTTPException(status_code=404, detail="Coupon not found")

    for key, value in coupon.model_dump(exclude_unset=True).items():
        setattr(db_coupon, key, value)

    db.commit()
    db.refresh(db_coupon)
    return db_coupon


@router.delete("/{coupon_id}")
def delete_coupon(coupon_id: int, db: Session = Depends(get_db), admin=Depends(get_current_admin)):
    db_coupon = db.query(Coupon).filter(Coupon.id == coupon_id).first()
    if not db_coupon:
        raise HTTPException(status_code=404, detail="Coupon not found")
    db.delete(db_coupon)
    db.commit()
    return {"message": "Coupon deleted"}
