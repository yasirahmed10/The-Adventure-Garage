from datetime import datetime, date, time
from typing import Optional, List
from pydantic import BaseModel, EmailStr
from .food import FoodResponse


# ── Order Item ──────────────────────────────────────────────────────────────
class OrderItemCreate(BaseModel):
    food_id: int
    quantity: int


class OrderItemResponse(BaseModel):
    id: int
    food_id: Optional[int]
    food_name: str
    food_image: Optional[str]
    price: float
    quantity: int
    total: float

    class Config:
        from_attributes = True


# ── Order ───────────────────────────────────────────────────────────────────
class OrderCreate(BaseModel):
    customer_name: str
    customer_phone: str
    customer_email: Optional[EmailStr] = None
    address: str
    landmark: Optional[str] = None
    city: str
    pincode: str
    delivery_notes: Optional[str] = None
    payment_method: str = "cod"
    coupon_code: Optional[str] = None
    items: List[OrderItemCreate]


class OrderUpdate(BaseModel):
    status: Optional[str] = None
    payment_status: Optional[str] = None
    payment_reference: Optional[str] = None


class OrderResponse(BaseModel):
    id: int
    order_number: str
    user_id: Optional[int]
    customer_name: str
    customer_phone: str
    customer_email: Optional[str]
    address: str
    landmark: Optional[str]
    city: str
    pincode: str
    delivery_notes: Optional[str]
    subtotal: float
    discount_amount: float
    delivery_charge: float
    gst_amount: float
    total_amount: float
    coupon_id: Optional[int]
    coupon_code: Optional[str]
    status: str
    payment_method: str
    payment_status: str
    payment_reference: Optional[str]
    created_at: datetime
    updated_at: datetime
    delivered_at: Optional[datetime]
    items: List[OrderItemResponse]

    class Config:
        from_attributes = True
