from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List, Optional

from backend.database.db import get_db
from backend.models.team import TeamMember
from backend.schemas.team import TeamMemberCreate, TeamMemberUpdate, TeamMemberResponse
from backend.auth.jwt import get_current_admin

router = APIRouter(prefix="/team", tags=["Team Members"])


@router.get("/", response_model=List[TeamMemberResponse])
def get_team_members(active_only: bool = True, db: Session = Depends(get_db)):
    query = db.query(TeamMember)
    if active_only:
        query = query.filter(TeamMember.is_active == True)
    return query.order_by(TeamMember.display_order.asc()).all()


@router.post("/", response_model=TeamMemberResponse)
def create_team_member(
    tm: TeamMemberCreate,
    db: Session = Depends(get_db),
    admin=Depends(get_current_admin)
):
    new_tm = TeamMember(**tm.model_dump())
    db.add(new_tm)
    db.commit()
    db.refresh(new_tm)
    return new_tm


@router.put("/{tm_id}", response_model=TeamMemberResponse)
def update_team_member(
    tm_id: int,
    tm: TeamMemberUpdate,
    db: Session = Depends(get_db),
    admin=Depends(get_current_admin)
):
    db_tm = db.query(TeamMember).filter(TeamMember.id == tm_id).first()
    if not db_tm:
        raise HTTPException(status_code=404, detail="Team member not found")

    update_data = tm.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_tm, key, value)

    db.commit()
    db.refresh(db_tm)
    return db_tm


@router.delete("/{tm_id}")
def delete_team_member(tm_id: int, db: Session = Depends(get_db), admin=Depends(get_current_admin)):
    db_tm = db.query(TeamMember).filter(TeamMember.id == tm_id).first()
    if not db_tm:
        raise HTTPException(status_code=404, detail="Team member not found")
    db.delete(db_tm)
    db.commit()
    return {"message": "Team member deleted"}
