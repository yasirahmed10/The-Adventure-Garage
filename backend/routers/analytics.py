from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func
from datetime import datetime, timedelta, timezone

from backend.database.db import get_db
from backend.models.booking import Booking, BookingStatus
from backend.models.service import Service
from backend.models.user import User
from backend.auth.jwt import get_current_admin

router = APIRouter(prefix="/analytics", tags=["Analytics"])


@router.get("/dashboard")
def get_dashboard_stats(db: Session = Depends(get_db), admin=Depends(get_current_admin)):
    now = datetime.now(timezone.utc)
    today_start = now.replace(hour=0, minute=0, second=0, microsecond=0)
    month_start = now.replace(day=1, hour=0, minute=0, second=0, microsecond=0)

    # Bookings Stats
    total_bookings = db.query(Booking).count()
    pending_bookings = db.query(Booking).filter(Booking.status == BookingStatus.pending).count()
    accepted_bookings = db.query(Booking).filter(Booking.status == BookingStatus.accepted).count()
    completed_bookings = db.query(Booking).filter(Booking.status == BookingStatus.completed).count()
    
    # New bookings today
    today_bookings = db.query(Booking).filter(Booking.created_at >= today_start).count()
    
    # Total Users
    total_users = db.query(User).count()
    
    # Total Services
    total_services = db.query(Service).filter(Service.is_active == True).count()

    # Chart Data: Bookings count for last 7 days
    last_7_days = [(today_start - timedelta(days=i)) for i in range(6, -1, -1)]
    bookings_chart = []
    
    for day in last_7_days:
        next_day = day + timedelta(days=1)
        day_count = db.query(Booking).filter(
            Booking.created_at >= day,
            Booking.created_at < next_day
        ).count()
        
        bookings_chart.append({
            "date": day.strftime("%b %d"),
            "bookings": day_count
        })

    return {
        "stats": {
            "total_bookings": total_bookings,
            "pending_bookings": pending_bookings,
            "accepted_bookings": accepted_bookings,
            "completed_bookings": completed_bookings,
            "today_bookings": today_bookings,
            "total_users": total_users,
            "total_services": total_services
        },
        "charts": {
            "bookings_last_7_days": bookings_chart
        }
    }
