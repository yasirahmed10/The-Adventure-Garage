from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from backend.database.db import get_db
from backend.models.outlet import Outlet
from backend.schemas.outlet import OutletCreate, OutletUpdate, OutletResponse

router = APIRouter(prefix="/outlets", tags=["Outlets"])


@router.get("/", response_model=List[OutletResponse])
def get_outlets(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    outlets = db.query(Outlet).offset(skip).limit(limit).all()
    return outlets


@router.post("/", response_model=OutletResponse, status_code=status.HTTP_201_CREATED)
def create_outlet(outlet: OutletCreate, db: Session = Depends(get_db)):
    db_outlet = Outlet(**outlet.model_dump())
    db.add(db_outlet)
    db.commit()
    db.refresh(db_outlet)
    return db_outlet


@router.put("/{outlet_id}", response_model=OutletResponse)
def update_outlet(outlet_id: int, outlet: OutletUpdate, db: Session = Depends(get_db)):
    db_outlet = db.query(Outlet).filter(Outlet.id == outlet_id).first()
    if not db_outlet:
        raise HTTPException(status_code=404, detail="Outlet not found")
        
    for key, value in outlet.model_dump(exclude_unset=True).items():
        setattr(db_outlet, key, value)
        
    db.commit()
    db.refresh(db_outlet)
    return db_outlet


@router.delete("/{outlet_id}")
def delete_outlet(outlet_id: int, db: Session = Depends(get_db)):
    db_outlet = db.query(Outlet).filter(Outlet.id == outlet_id).first()
    if not db_outlet:
        raise HTTPException(status_code=404, detail="Outlet not found")
        
    db.delete(db_outlet)
    db.commit()
    return {"message": "Outlet deleted successfully"}
