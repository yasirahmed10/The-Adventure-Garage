from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from sqlalchemy import or_
from typing import List, Optional
import re

from backend.database.db import get_db
from backend.models.food import Food, FoodImage
from backend.schemas.food import FoodCreate, FoodUpdate, FoodResponse
from backend.auth.jwt import get_current_admin

router = APIRouter(prefix="/foods", tags=["Foods"])


def create_slug(name: str) -> str:
    slug = name.lower()
    slug = re.sub(r'[^a-z0-9]+', '-', slug)
    return slug.strip('-')


@router.get("/", response_model=List[FoodResponse])
def get_foods(
    search: Optional[str] = None,
    category_id: Optional[int] = None,
    food_type: Optional[str] = None,
    spice_level: Optional[str] = None,
    is_featured: Optional[bool] = None,
    is_popular: Optional[bool] = None,
    sort_by: str = "display_order",
    active_only: bool = True,
    skip: int = 0,
    limit: int = 50,
    db: Session = Depends(get_db)
):
    query = db.query(Food)

    if active_only:
        query = query.filter(Food.is_available == True)

    if search:
        query = query.filter(or_(Food.name.ilike(f"%{search}%"), Food.description.ilike(f"%{search}%")))

    if category_id:
        query = query.filter(Food.category_id == category_id)

    if food_type:
        query = query.filter(Food.food_type == food_type)

    if spice_level:
        query = query.filter(Food.spice_level == spice_level)

    if is_featured is not None:
        query = query.filter(Food.is_featured == is_featured)

    if is_popular is not None:
        query = query.filter(Food.is_popular == is_popular)

    if sort_by == "price_asc":
        query = query.order_by(Food.price.asc())
    elif sort_by == "price_desc":
        query = query.order_by(Food.price.desc())
    elif sort_by == "newest":
        query = query.order_by(Food.created_at.desc())
    else:
        query = query.order_by(Food.display_order.asc())

    return query.offset(skip).limit(limit).all()


@router.get("/{slug}", response_model=FoodResponse)
def get_food(slug: str, db: Session = Depends(get_db)):
    food = db.query(Food).filter(Food.slug == slug).first()
    if not food:
        # fallback to ID
        try:
            food_id = int(slug)
            food = db.query(Food).filter(Food.id == food_id).first()
        except ValueError:
            pass

    if not food:
        raise HTTPException(status_code=404, detail="Food not found")
    return food


@router.post("/", response_model=FoodResponse)
def create_food(food: FoodCreate, db: Session = Depends(get_db), admin=Depends(get_current_admin)):
    base_slug = create_slug(food.name)
    slug = base_slug
    counter = 1
    while db.query(Food).filter(Food.slug == slug).first():
        slug = f"{base_slug}-{counter}"
        counter += 1

    new_food = Food(**food.model_dump(), slug=slug)
    db.add(new_food)
    db.commit()
    db.refresh(new_food)
    return new_food


@router.put("/{food_id}", response_model=FoodResponse)
def update_food(food_id: int, food: FoodUpdate, db: Session = Depends(get_db), admin=Depends(get_current_admin)):
    db_food = db.query(Food).filter(Food.id == food_id).first()
    if not db_food:
        raise HTTPException(status_code=404, detail="Food not found")

    update_data = food.model_dump(exclude_unset=True)
    if "name" in update_data and update_data["name"] != db_food.name:
        base_slug = create_slug(update_data["name"])
        slug = base_slug
        counter = 1
        while db.query(Food).filter(Food.slug == slug, Food.id != food_id).first():
            slug = f"{base_slug}-{counter}"
            counter += 1
        update_data["slug"] = slug

    for key, value in update_data.items():
        setattr(db_food, key, value)

    db.commit()
    db.refresh(db_food)
    return db_food


@router.delete("/{food_id}")
def delete_food(food_id: int, db: Session = Depends(get_db), admin=Depends(get_current_admin)):
    db_food = db.query(Food).filter(Food.id == food_id).first()
    if not db_food:
        raise HTTPException(status_code=404, detail="Food not found")
    db.delete(db_food)
    db.commit()
    return {"message": "Food deleted"}
