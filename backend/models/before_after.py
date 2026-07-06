from datetime import datetime, timezone
from sqlalchemy import Column, Integer, String, DateTime, Text
from backend.database.db import Base


class BeforeAfter(Base):
    __tablename__ = "before_after"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(200), nullable=True)
    description = Column(Text, nullable=True)
    before_image = Column(String(500), nullable=False)
    after_image = Column(String(500), nullable=False)
    category = Column(String(100), nullable=True) # Thar, Jeep, SUV, Custom wrap, etc.
    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
