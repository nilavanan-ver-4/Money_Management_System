from pydantic import BaseModel

class BudgetCreate(BaseModel):
    category: str
    amount: float
    month: str

class Budget(BaseModel):
    id: int
    user_id: str
    category: str
    amount: float
    month: str

    class Config:
        from_attributes = True  # Updated from orm_mode