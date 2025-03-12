from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from utils.db import get_db
from schemas.db import DashboardData as DBDashboardData  # Only import DashboardData from schemas
from models.dashboard import DashboardData as DashboardDataModel, SpendingData  # Import SpendingData from models
from typing import List
import jwt
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
import os

router = APIRouter(prefix="/dashboard", tags=["dashboard"])
security = HTTPBearer()

SUPABASE_JWT_SECRET = os.getenv("SUPABASE_JWT_SECRET", "your-supabase-jwt-secret")

def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    token = credentials.credentials
    try:
        payload = jwt.decode(token, SUPABASE_JWT_SECRET, algorithms=["HS256"])
        user_id = payload.get("sub")
        if not user_id:
            raise HTTPException(status_code=401, detail="Invalid token")
        return user_id
    except jwt.PyJWTError:
        raise HTTPException(status_code=401, detail="Invalid token")

@router.get("/", response_model=DashboardDataModel)
def get_dashboard_data(user_id: str = Depends(get_current_user), db: Session = Depends(get_db)):
    dashboard_data = db.query(DBDashboardData).filter(DBDashboardData.user_id == user_id).first()
    if not dashboard_data:
        dashboard_data = DBDashboardData(
            user_id=user_id,
            balance=12420.0,
            monthly_income=4200.0,
            monthly_expenses=2700.0,
            monthly_savings=1500.0
        )
        db.add(dashboard_data)
        db.commit()
        db.refresh(dashboard_data)

    # Mock spending data
    spending_data = [
        {"month": "Jan", "amount": 3000.0},
        {"month": "Feb", "amount": 2800.0},
        {"month": "Mar", "amount": 3200.0},
        {"month": "Apr", "amount": 2900.0},
        {"month": "May", "amount": 3100.0},
        {"month": "Jun", "amount": 2700.0},
    ]

    return {
        "balance": dashboard_data.balance,
        "monthly_income": dashboard_data.monthly_income,
        "monthly_expenses": dashboard_data.monthly_expenses,
        "monthly_savings": dashboard_data.monthly_savings,
        "spending_data": [SpendingData(**data) for data in spending_data]  # Convert to Pydantic model
    }