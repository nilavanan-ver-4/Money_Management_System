from pydantic import BaseModel
from datetime import datetime

class TransactionCreate(BaseModel):
    amount: float
    category: str
    description: str | None = None
    date: datetime

class Transaction(BaseModel):
    id: int
    user_id: str
    amount: float
    category: str
    description: str | None
    date: datetime

    class Config:
        orm_mode = True