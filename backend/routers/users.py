from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from backend.database.db import get_db
from backend.models.user import User
from backend.schemas.auth import UserResponse, UserUpdate
from backend.auth.jwt import get_current_user, get_current_admin

router = APIRouter(prefix="/users", tags=["Users"])


@router.get("/me", response_model=UserResponse)
def get_me(current_user: User = Depends(get_current_user)):
    return current_user


@router.put("/me", response_model=UserResponse)
def update_me(user_update: UserUpdate, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    if user_update.name:
        current_user.name = user_update.name
    if user_update.phone:
        current_user.phone = user_update.phone
    if user_update.address:
        current_user.address = user_update.address

    db.commit()
    db.refresh(current_user)
    return current_user


# Admin routes
@router.get("/", response_model=List[UserResponse])
def get_all_users(skip: int = 0, limit: int = 100, db: Session = Depends(get_db), admin=Depends(get_current_admin)):
    users = db.query(User).offset(skip).limit(limit).all()
    return users


@router.put("/{user_id}/status", response_model=UserResponse)
def change_user_status(user_id: int, is_active: bool, db: Session = Depends(get_db), admin=Depends(get_current_admin)):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    user.is_active = is_active
    db.commit()
    db.refresh(user)
    return user
