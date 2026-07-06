from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from datetime import datetime, timezone

from backend.database.db import get_db
from backend.models.offer import Offer
from backend.schemas.offer import OfferCreate, OfferUpdate, OfferResponse
from backend.auth.jwt import get_current_admin

router = APIRouter(prefix="/offers", tags=["Offers"])


@router.get("/", response_model=List[OfferResponse])
def get_active_offers(db: Session = Depends(get_db)):
    now = datetime.now(timezone.utc)
    query = db.query(Offer).filter(Offer.is_active == True)
    # Filter valid dates if set
    query = query.filter((Offer.valid_from == None) | (Offer.valid_from <= now))
    query = query.filter((Offer.valid_until == None) | (Offer.valid_until >= now))
    return query.order_by(Offer.priority.desc()).all()


@router.get("/admin/all", response_model=List[OfferResponse])
def get_all_offers(db: Session = Depends(get_db), admin=Depends(get_current_admin)):
    return db.query(Offer).order_by(Offer.priority.desc()).all()


@router.post("/", response_model=OfferResponse)
def create_offer(offer: OfferCreate, db: Session = Depends(get_db), admin=Depends(get_current_admin)):
    new_offer = Offer(**offer.model_dump())
    db.add(new_offer)
    db.commit()
    db.refresh(new_offer)
    return new_offer


@router.put("/{offer_id}", response_model=OfferResponse)
def update_offer(offer_id: int, offer: OfferUpdate, db: Session = Depends(get_db), admin=Depends(get_current_admin)):
    db_offer = db.query(Offer).filter(Offer.id == offer_id).first()
    if not db_offer:
        raise HTTPException(status_code=404, detail="Offer not found")

    for key, value in offer.model_dump(exclude_unset=True).items():
        setattr(db_offer, key, value)

    db.commit()
    db.refresh(db_offer)
    return db_offer


@router.delete("/{offer_id}")
def delete_offer(offer_id: int, db: Session = Depends(get_db), admin=Depends(get_current_admin)):
    db_offer = db.query(Offer).filter(Offer.id == offer_id).first()
    if not db_offer:
        raise HTTPException(status_code=404, detail="Offer not found")
    db.delete(db_offer)
    db.commit()
    return {"message": "Offer deleted"}
