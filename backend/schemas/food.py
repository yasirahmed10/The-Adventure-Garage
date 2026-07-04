from datetime import datetime
from typing import Optional, List
from pydantic import BaseModel


# ── Category ────────────────────────────────────────────────────────────────
class CategoryCreate(BaseModel):
    name: str
    description: Optional[str] = None
    display_order: int = 0
    is_active: bool = True


class CategoryUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    display_order: Optional[int] = None
    is_active: Optional[bool] = None


class CategoryResponse(BaseModel):
    id: int
    name: str
    slug: str
    description: Optional[str]
    image: Optional[str]
    display_order: int
    is_active: bool
    created_at: datetime

    class Config:
        from_attributes = True


# ── Food ────────────────────────────────────────────────────────────────────
class FoodImageResponse(BaseModel):
    id: int
    image_url: str
    alt_text: Optional[str]
    display_order: int

    class Config:
        from_attributes = True


class FoodCreate(BaseModel):
    name: str
    description: Optional[str] = None
    short_description: Optional[str] = None
    category_id: Optional[int] = None
    price: float
    discount_percent: float = 0.0
    food_type: str = "veg"
    spice_level: str = "mild"
    preparation_time: int = 20
    ingredients: Optional[str] = None
    allergens: Optional[str] = None
    nutrition_info: Optional[dict] = None
    is_available: bool = True
    is_featured: bool = False
    is_bestseller: bool = False
    is_new_arrival: bool = False
    is_popular: bool = False
    display_order: int = 0


class FoodUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    short_description: Optional[str] = None
    category_id: Optional[int] = None
    price: Optional[float] = None
    discount_percent: Optional[float] = None
    food_type: Optional[str] = None
    spice_level: Optional[str] = None
    preparation_time: Optional[int] = None
    ingredients: Optional[str] = None
    allergens: Optional[str] = None
    nutrition_info: Optional[dict] = None
    is_available: Optional[bool] = None
    is_featured: Optional[bool] = None
    is_bestseller: Optional[bool] = None
    is_new_arrival: Optional[bool] = None
    is_popular: Optional[bool] = None
    display_order: Optional[int] = None


class FoodResponse(BaseModel):
    id: int
    name: str
    slug: str
    description: Optional[str]
    short_description: Optional[str]
    category_id: Optional[int]
    category: Optional[CategoryResponse]
    price: float
    discount_percent: float
    food_type: str
    spice_level: str
    preparation_time: int
    ingredients: Optional[str]
    allergens: Optional[str]
    nutrition_info: Optional[dict]
    is_available: bool
    is_featured: bool
    is_bestseller: bool
    is_new_arrival: bool
    is_popular: bool
    rating: float
    rating_count: int
    primary_image: Optional[str]
    images: List[FoodImageResponse] = []
    display_order: int
    created_at: datetime

    class Config:
        from_attributes = True
