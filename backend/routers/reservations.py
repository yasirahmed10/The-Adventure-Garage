from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
import uuid

from backend.database.db import get_db
from backend.models.reservation import Reservation, ReservationStatus
from backend.schemas.reservation import ReservationCreate, ReservationUpdate, ReservationResponse
from backend.auth.jwt import get_current_user_optional, get_current_admin

router = APIRouter(prefix="/reservations", tags=["Reservations"])


def generate_reservation_number() -> str:
    return f"RES-{uuid.uuid4().hex[:8].upper()}"


@router.post("/", response_model=ReservationResponse)
def create_reservation(
    res: ReservationCreate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user_optional)
):
    new_res = Reservation(
        reservation_number=generate_reservation_number(),
        user_id=current_user.id if current_user else None,
        guest_name=res.guest_name,
        guest_phone=res.guest_phone,
        guest_email=res.guest_email,
        date=res.date,
        time=res.time,
        guests_count=res.guests_count,
        seating_type=res.seating_type,
        special_requests=res.special_requests
    )

    db.add(new_res)
    db.commit()
    db.refresh(new_res)
    return new_res


@router.get("/my", response_model=List[ReservationResponse])
def get_my_reservations(db: Session = Depends(get_db), current_user=Depends(get_current_user_optional)):
    if not current_user:
        raise HTTPException(status_code=401, detail="Not authenticated")
    return db.query(Reservation).filter(Reservation.user_id == current_user.id).order_by(Reservation.date.desc()).all()


# ── Admin Routes ────────────────────────────────────────────────────────────
@router.get("/", response_model=List[ReservationResponse])
def get_all_reservations(skip: int = 0, limit: int = 50, status: str = None, db: Session = Depends(get_db), admin=Depends(get_current_admin)):
    query = db.query(Reservation)
    if status:
        query = query.filter(Reservation.status == status)
    return query.order_by(Reservation.date.desc(), Reservation.time.desc()).offset(skip).limit(limit).all()


@router.put("/{res_id}", response_model=ReservationResponse)
def update_reservation(
    res_id: int,
    res_update: ReservationUpdate,
    db: Session = Depends(get_db),
    admin=Depends(get_current_admin)
):
    res = db.query(Reservation).filter(Reservation.id == res_id).first()
    if not res:
        raise HTTPException(status_code=404, detail="Reservation not found")

    if res_update.status:
        res.status = res_update.status
    if res_update.table_number:
        res.table_number = res_update.table_number
    if res_update.admin_notes:
        res.admin_notes = res_update.admin_notes

    db.commit()
    db.refresh(res)
    return res
