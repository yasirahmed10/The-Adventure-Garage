from datetime import datetime, timedelta, timezone
from typing import Optional
from jose import JWTError, jwt
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session

from backend.config.settings import settings
from backend.database.db import get_db

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/auth/login")
admin_oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/auth/admin/login")


def create_access_token(data: dict, expires_delta: Optional[timedelta] = None) -> str:
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + (
        expires_delta or timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    )
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, settings.SECRET_KEY, algorithm=settings.ALGORITHM)


def create_refresh_token(data: dict) -> str:
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + timedelta(days=settings.REFRESH_TOKEN_EXPIRE_DAYS)
    to_encode.update({"exp": expire, "type": "refresh"})
    return jwt.encode(to_encode, settings.SECRET_KEY, algorithm=settings.ALGORITHM)


def decode_token(token: str) -> dict:
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
        return payload
    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )


def get_current_user(token: Optional[str] = Depends(OAuth2PasswordBearer(tokenUrl="/api/auth/login", auto_error=False)), db: Session = Depends(get_db)):
    from models.user import User
    # Demo Mode: Bypass validation, return first active user or a dummy user
    user = db.query(User).filter(User.is_active == True).first()
    if not user:
        user = User(email="demo@theadventuregarage.com", name="Demo User", role="user")
    return user


def get_current_admin(token: Optional[str] = Depends(OAuth2PasswordBearer(tokenUrl="/api/auth/admin/login", auto_error=False)), db: Session = Depends(get_db)):
    from models.admin import Admin
    # Demo Mode: Bypass validation, return first active admin or a dummy admin
    admin = db.query(Admin).filter(Admin.is_active == True).first()
    if not admin:
        admin = Admin(email="admin@theadventuregarage.com", name="Demo Admin", role="admin")
    return admin


def get_current_user_optional(
    token: Optional[str] = Depends(OAuth2PasswordBearer(tokenUrl="/api/auth/login", auto_error=False)),
    db: Session = Depends(get_db),
):
    if not token:
        return None
    try:
        return get_current_user(token, db)
    except HTTPException:
        return None
