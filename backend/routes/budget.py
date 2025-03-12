from fastapi import APIRouter

router = APIRouter(prefix="/budget", tags=["budget"])

@router.get("/")
def get_budget():
    # Mock data for now; you can connect to a database later
    return {"category": "Food", "amount": 500, "month": "March"}