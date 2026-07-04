from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func
from datetime import datetime, timedelta, timezone

from backend.database.db import get_db
from backend.models.order import Order, OrderStatus
from backend.models.reservation import Reservation, ReservationStatus
from backend.models.food import Food
from backend.models.user import User
from backend.auth.jwt import get_current_admin

router = APIRouter(prefix="/analytics", tags=["Analytics"])


@router.get("/dashboard")
def get_dashboard_stats(db: Session = Depends(get_db), admin=Depends(get_current_admin)):
    now = datetime.now(timezone.utc)
    today_start = now.replace(hour=0, minute=0, second=0, microsecond=0)
    month_start = now.replace(day=1, hour=0, minute=0, second=0, microsecond=0)

    # Total Orders
    total_orders = db.query(Order).count()
    
    # Today's Orders
    today_orders = db.query(Order).filter(Order.created_at >= today_start).count()
    
    # Revenue (Month)
    monthly_revenue = db.query(func.sum(Order.total_amount)).filter(
        Order.created_at >= month_start,
        Order.status == OrderStatus.delivered
    ).scalar() or 0.0

    # Total Revenue
    total_revenue = db.query(func.sum(Order.total_amount)).filter(
        Order.status == OrderStatus.delivered
    ).scalar() or 0.0

    # Active Reservations today
    today_reservations = db.query(Reservation).filter(
        Reservation.date == today_start.date(),
        Reservation.status.in_([ReservationStatus.pending, ReservationStatus.approved])
    ).count()

    # Total Users
    total_users = db.query(User).filter(User.role == "customer").count()

    # Chart Data: Last 7 days revenue
    last_7_days = [(today_start - timedelta(days=i)) for i in range(6, -1, -1)]
    revenue_chart = []
    
    for day in last_7_days:
        next_day = day + timedelta(days=1)
        day_rev = db.query(func.sum(Order.total_amount)).filter(
            Order.created_at >= day,
            Order.created_at < next_day,
            Order.status == OrderStatus.delivered
        ).scalar() or 0.0
        
        revenue_chart.append({
            "date": day.strftime("%b %d"),
            "revenue": float(day_rev)
        })

    return {
        "stats": {
            "total_orders": total_orders,
            "today_orders": today_orders,
            "monthly_revenue": float(monthly_revenue),
            "total_revenue": float(total_revenue),
            "today_reservations": today_reservations,
            "total_users": total_users
        },
        "charts": {
            "revenue_last_7_days": revenue_chart
        }
    }
