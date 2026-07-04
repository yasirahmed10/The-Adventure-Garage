from fastapi import FastAPI
# pyrefly: ignore [missing-import]
from fastapi.middleware.cors import CORSMiddleware
# pyrefly: ignore [missing-import]
from fastapi.staticfiles import StaticFiles

from backend.config.settings import settings
from backend.database.db import Base, engine

# Create tables (For dev only, in production use Alembic)
Base.metadata.create_all(bind=engine)


from backend.routers import (
    auth, users, categories, foods, orders, reservations,
    offers, coupons, gallery, testimonials, homepage, settings as settings_router,
    media, analytics
)


app = FastAPI(
    title=settings.APP_NAME,
    description="Backend API for Jaffa Premium Food Outlet",
    version="1.0.0"
)

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Static files for uploads
import os
os.makedirs(os.path.join(settings.UPLOAD_DIR, "images"), exist_ok=True)
os.makedirs(os.path.join(settings.UPLOAD_DIR, "videos"), exist_ok=True)
app.mount("/uploads", StaticFiles(directory=settings.UPLOAD_DIR), name="uploads")

# Include Routers
api_prefix = "/api"
app.include_router(auth.router, prefix=api_prefix)
app.include_router(users.router, prefix=api_prefix)
app.include_router(categories.router, prefix=api_prefix)
app.include_router(foods.router, prefix=api_prefix)
app.include_router(orders.router, prefix=api_prefix)
app.include_router(reservations.router, prefix=api_prefix)
app.include_router(offers.router, prefix=api_prefix)
app.include_router(coupons.router, prefix=api_prefix)
app.include_router(gallery.router, prefix=api_prefix)
app.include_router(testimonials.router, prefix=api_prefix)
app.include_router(homepage.router, prefix=api_prefix)
app.include_router(settings_router.router, prefix=api_prefix)
app.include_router(media.router, prefix=api_prefix)
app.include_router(analytics.router, prefix=api_prefix)

@app.get("/")
def read_root():
    return {"message": f"Welcome to {settings.APP_NAME} API"}
