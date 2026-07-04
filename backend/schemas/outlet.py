from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class OutletBase(BaseModel):
    name: str
    address: str
    city: str
    phone: Optional[str] = None
    is_active: Optional[bool] = True
    manager_name: Optional[str] = None


class OutletCreate(OutletBase):
    pass


class OutletUpdate(OutletBase):
    name: Optional[str] = None
    address: Optional[str] = None
    city: Optional[str] = None


class OutletResponse(OutletBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
