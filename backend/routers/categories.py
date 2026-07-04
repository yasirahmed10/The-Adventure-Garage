from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
import re

from backend.database.db import get_db
from backend.models.category import Category
from backend.schemas.food import CategoryCreate, CategoryUpdate, CategoryResponse
from backend.auth.jwt import get_current_admin

router = APIRouter(prefix="/categories", tags=["Categories"])


def create_slug(name: str) -> str:
    slug = name.lower()
    slug = re.sub(r'[^a-z0-9]+', '-', slug)
    return slug.strip('-')


@router.get("/", response_model=List[CategoryResponse])
def get_categories(active_only: bool = True, db: Session = Depends(get_db)):
    query = db.query(Category)
    if active_only:
        query = query.filter(Category.is_active == True)
    return query.order_by(Category.display_order).all()


@router.get("/{category_id}", response_model=CategoryResponse)
def get_category(category_id: int, db: Session = Depends(get_db)):
    category = db.query(Category).filter(Category.id == category_id).first()
    if not category:
        raise HTTPException(status_code=404, detail="Category not found")
    return category


@router.post("/", response_model=CategoryResponse)
def create_category(category: CategoryCreate, db: Session = Depends(get_db), admin=Depends(get_current_admin)):
    slug = create_slug(category.name)
    if db.query(Category).filter(Category.slug == slug).first():
        raise HTTPException(status_code=400, detail="Category with similar name exists")

    new_cat = Category(**category.model_dump(), slug=slug)
    db.add(new_cat)
    db.commit()
    db.refresh(new_cat)
    return new_cat


@router.put("/{category_id}", response_model=CategoryResponse)
def update_category(category_id: int, category: CategoryUpdate, db: Session = Depends(get_db), admin=Depends(get_current_admin)):
    db_cat = db.query(Category).filter(Category.id == category_id).first()
    if not db_cat:
        raise HTTPException(status_code=404, detail="Category not found")

    update_data = category.model_dump(exclude_unset=True)
    if "name" in update_data:
        update_data["slug"] = create_slug(update_data["name"])

    for key, value in update_data.items():
        setattr(db_cat, key, value)

    db.commit()
    db.refresh(db_cat)
    return db_cat


@router.delete("/{category_id}")
def delete_category(category_id: int, db: Session = Depends(get_db), admin=Depends(get_current_admin)):
    db_cat = db.query(Category).filter(Category.id == category_id).first()
    if not db_cat:
        raise HTTPException(status_code=404, detail="Category not found")
    db.delete(db_cat)
    db.commit()
    return {"message": "Category deleted"}
