from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from utils.db import get_db
from schemas.db import Insight as DBInsight
from models.insights import Insight, InsightCreate
from typing import List
from routes.dashboard import get_current_user, security

router = APIRouter(prefix="/insights", tags=["insights"])

@router.post("/", response_model=Insight)
def create_insight(
    insight: InsightCreate,
    user_id: str = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    db_insight = DBInsight(**insight.dict(), user_id=user_id)
    db.add(db_insight)
    db.commit()
    db.refresh(db_insight)
    return db_insight

@router.get("/", response_model=List[Insight])
def get_insights(user_id: str = Depends(get_current_user), db: Session = Depends(get_db)):
    insights = db.query(DBInsight).filter(DBInsight.user_id == user_id).all()
    return insights