from pydantic import BaseModel
from typing import List

class SpendingData(BaseModel):
    month: str
    amount: float

class DashboardData(BaseModel):
    balance: float
    monthly_income: float
    monthly_expenses: float
    monthly_savings: float
    spending_data: List[SpendingData]

    class Config:
        orm_mode = True