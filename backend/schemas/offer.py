from datetime import datetime
from typing import Optional, List
from pydantic import BaseModel


class OfferCreate(BaseModel):
    title: str
    description: Optional[str] = None
    offer_type: str = "seasonal"
    discount_type: str = "percentage"
    discount_value: float
    min_amount: float = 0.0
    applicable_service_ids: Optional[List[int]] = None
    valid_from: Optional[datetime] = None
    valid_until: Optional[datetime] = None
    is_active: bool = True
    priority: int = 0


class OfferUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    offer_type: Optional[str] = None
    discount_type: Optional[str] = None
    discount_value: Optional[float] = None
    min_amount: Optional[float] = None
    applicable_service_ids: Optional[List[int]] = None
    valid_from: Optional[datetime] = None
    valid_until: Optional[datetime] = None
    is_active: Optional[bool] = None
    priority: Optional[int] = None


class OfferResponse(BaseModel):
    id: int
    title: str
    description: Optional[str]
    offer_type: str
    discount_type: str
    discount_value: float
    banner_image: Optional[str]
    min_amount: float
    applicable_service_ids: Optional[List[int]]
    valid_from: Optional[datetime]
    valid_until: Optional[datetime]
    is_active: bool
    priority: int
    created_at: datetime

    class Config:
        from_attributes = True
