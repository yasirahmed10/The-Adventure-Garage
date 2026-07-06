from datetime import datetime
from typing import Optional
from pydantic import BaseModel


class TeamMemberCreate(BaseModel):
    name: str
    role: str
    image: Optional[str] = None
    bio: Optional[str] = None
    display_order: Optional[int] = 0
    is_active: Optional[bool] = True


class TeamMemberUpdate(BaseModel):
    name: Optional[str] = None
    role: Optional[str] = None
    image: Optional[str] = None
    bio: Optional[str] = None
    display_order: Optional[int] = None
    is_active: Optional[bool] = None


class TeamMemberResponse(BaseModel):
    id: int
    name: str
    role: str
    image: Optional[str]
    bio: Optional[str]
    display_order: int
    is_active: bool
    created_at: datetime

    class Config:
        from_attributes = True
