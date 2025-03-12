from pydantic import BaseModel
from datetime import datetime

class InsightCreate(BaseModel):
    title: str
    description: str

class Insight(BaseModel):
    id: int
    user_id: str
    title: str
    description: str
    created_at: datetime

    class Config:
        orm_mode = True