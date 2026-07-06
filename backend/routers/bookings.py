from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List, Optional
import uuid
import datetime

from backend.database.db import get_db
from backend.models.booking import Booking, BookingStatus
from backend.schemas.booking import BookingCreate, BookingUpdate, BookingResponse
from backend.auth.jwt import get_current_admin

router = APIRouter(prefix="/bookings", tags=["Bookings"])


def generate_booking_number() -> str:
    now = datetime.datetime.now()
    random_str = uuid.uuid4().hex[:4].upper()
    return f"TAG-{now.strftime('%Y%m%d')}-{random_str}"


@router.get("/", response_model=List[BookingResponse])
def get_bookings(
    status: Optional[str] = None,
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
    admin=Depends(get_current_admin)
):
    query = db.query(Booking)
    if status:
        query = query.filter(Booking.status == status)
    return query.order_by(Booking.created_at.desc()).offset(skip).limit(limit).all()


@router.get("/{booking_id}", response_model=BookingResponse)
def get_booking(booking_id: int, db: Session = Depends(get_db), admin=Depends(get_current_admin)):
    booking = db.query(Booking).filter(Booking.id == booking_id).first()
    if not booking:
        raise HTTPException(status_code=404, detail="Booking not found")
    return booking


@router.post("/", response_model=BookingResponse)
def create_booking(booking: BookingCreate, db: Session = Depends(get_db)):
    booking_no = generate_booking_number()
    new_booking = Booking(
        **booking.model_dump(),
        booking_number=booking_no,
        status=BookingStatus.pending
    )
    db.add(new_booking)
    db.commit()
    db.refresh(new_booking)
    return new_booking


@router.put("/{booking_id}", response_model=BookingResponse)
def update_booking_status(
    booking_id: int,
    booking_update: BookingUpdate,
    db: Session = Depends(get_db),
    admin=Depends(get_current_admin)
):
    db_booking = db.query(Booking).filter(Booking.id == booking_id).first()
    if not db_booking:
        raise HTTPException(status_code=404, detail="Booking not found")

    if booking_update.status:
        db_booking.status = booking_update.status
    if booking_update.admin_notes is not None:
        db_booking.admin_notes = booking_update.admin_notes

    db_booking.updated_at = datetime.datetime.now(datetime.timezone.utc)
    db.commit()
    db.refresh(db_booking)
    return db_booking


@router.delete("/{booking_id}")
def delete_booking(booking_id: int, db: Session = Depends(get_db), admin=Depends(get_current_admin)):
    db_booking = db.query(Booking).filter(Booking.id == booking_id).first()
    if not db_booking:
        raise HTTPException(status_code=404, detail="Booking not found")
    db.delete(db_booking)
    db.commit()
    return {"message": "Booking deleted"}
