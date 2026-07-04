from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from datetime import datetime, timezone
import uuid

from backend.database.db import get_db
from backend.models.order import Order, OrderItem, OrderStatus, PaymentStatus
from backend.models.food import Food
from backend.schemas.order import OrderCreate, OrderUpdate, OrderResponse
from backend.auth.jwt import get_current_user_optional, get_current_admin
from backend.models.user import User

router = APIRouter(prefix="/orders", tags=["Orders"])


def generate_order_number() -> str:
    return f"ORD-{uuid.uuid4().hex[:8].upper()}"


@router.post("/", response_model=OrderResponse)
def create_order(
    order: OrderCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user_optional)
):
    if not order.items:
        raise HTTPException(status_code=400, detail="Order must contain at least one item")

    subtotal = 0.0
    db_items = []

    for item in order.items:
        food = db.query(Food).filter(Food.id == item.food_id).first()
        if not food:
            raise HTTPException(status_code=400, detail=f"Food item {item.food_id} not found")
        if not food.is_available:
            raise HTTPException(status_code=400, detail=f"Food item '{food.name}' is currently unavailable")

        # calculate price considering discount
        actual_price = food.price * (1 - food.discount_percent / 100)
        item_total = actual_price * item.quantity
        subtotal += item_total

        db_items.append(OrderItem(
            food_id=food.id,
            food_name=food.name,
            food_image=food.primary_image,
            price=actual_price,
            quantity=item.quantity,
            total=item_total
        ))

    # Calculate final amounts (simplified logic)
    delivery_charge = 40.0 if subtotal < 299 else 0.0
    discount_amount = 0.0  # Would be calculated from coupon here
    gst_amount = (subtotal - discount_amount) * 0.05
    total_amount = subtotal - discount_amount + delivery_charge + gst_amount

    new_order = Order(
        order_number=generate_order_number(),
        user_id=current_user.id if current_user else None,
        customer_name=order.customer_name,
        customer_phone=order.customer_phone,
        customer_email=order.customer_email,
        address=order.address,
        landmark=order.landmark,
        city=order.city,
        pincode=order.pincode,
        delivery_notes=order.delivery_notes,
        subtotal=subtotal,
        discount_amount=discount_amount,
        delivery_charge=delivery_charge,
        gst_amount=gst_amount,
        total_amount=total_amount,
        coupon_code=order.coupon_code,
        payment_method=order.payment_method,
        items=db_items
    )

    db.add(new_order)
    db.commit()
    db.refresh(new_order)
    return new_order


@router.get("/my", response_model=List[OrderResponse])
def get_my_orders(db: Session = Depends(get_db), current_user=Depends(get_current_user_optional)):
    if not current_user:
        raise HTTPException(status_code=401, detail="Not authenticated")
    return db.query(Order).filter(Order.user_id == current_user.id).order_by(Order.created_at.desc()).all()


@router.get("/{order_number}", response_model=OrderResponse)
def get_order(order_number: str, db: Session = Depends(get_db)):
    order = db.query(Order).filter(Order.order_number == order_number).first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    return order


# ── Admin Routes ────────────────────────────────────────────────────────────
@router.get("/", response_model=List[OrderResponse])
def get_all_orders(skip: int = 0, limit: int = 50, status: str = None, db: Session = Depends(get_db), admin=Depends(get_current_admin)):
    query = db.query(Order)
    if status:
        query = query.filter(Order.status == status)
    return query.order_by(Order.created_at.desc()).offset(skip).limit(limit).all()


@router.put("/{order_id}", response_model=OrderResponse)
def update_order_status(
    order_id: int,
    order_update: OrderUpdate,
    db: Session = Depends(get_db),
    admin=Depends(get_current_admin)
):
    order = db.query(Order).filter(Order.id == order_id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")

    if order_update.status:
        order.status = order_update.status
        if order_update.status == OrderStatus.delivered:
            order.delivered_at = datetime.now(timezone.utc)

    if order_update.payment_status:
        order.payment_status = order_update.payment_status

    if order_update.payment_reference:
        order.payment_reference = order_update.payment_reference

    db.commit()
    db.refresh(order)
    return order
