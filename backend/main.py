from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import os

from backend.config.settings import settings
from backend.database.db import Base, engine

# Create tables (For dev only, in production use Alembic)
import backend.models  # Trigger model import and registration
Base.metadata.create_all(bind=engine)

from backend.routers import (
    auth, users, services, bookings, before_after, team,
    offers, gallery, testimonials, settings as settings_router,
    media, analytics
)

app = FastAPI(
    title="THE ADVENTURE GARAGE (TAG) API",
    description="Backend API for TAG Premium Automotive Detailing and Customization Studio",
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
os.makedirs(os.path.join(settings.UPLOAD_DIR, "images"), exist_ok=True)
os.makedirs(os.path.join(settings.UPLOAD_DIR, "videos"), exist_ok=True)
app.mount("/uploads", StaticFiles(directory=settings.UPLOAD_DIR), name="uploads")

# Include Routers
api_prefix = "/api"
app.include_router(auth.router, prefix=api_prefix)
app.include_router(users.router, prefix=api_prefix)
app.include_router(services.router, prefix=api_prefix)
app.include_router(bookings.router, prefix=api_prefix)
app.include_router(before_after.router, prefix=api_prefix)
app.include_router(team.router, prefix=api_prefix)
app.include_router(offers.router, prefix=api_prefix)
app.include_router(gallery.router, prefix=api_prefix)
app.include_router(testimonials.router, prefix=api_prefix)
app.include_router(settings_router.router, prefix=api_prefix)
app.include_router(media.router, prefix=api_prefix)
app.include_router(analytics.router, prefix=api_prefix)

@app.get("/")
def read_root():
    return {"message": "Welcome to THE ADVENTURE GARAGE (TAG) API"}
