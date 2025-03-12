from pydantic import BaseModel, EmailStr
from datetime import datetime

class AccountCreate(BaseModel):
    full_name: str
    email: EmailStr
    password: str

class Login(BaseModel):
    email: EmailStr
    password: str

class Account(BaseModel):
    id: int
    user_id: str
    full_name: str
    email: EmailStr
    password_hash: str
    created_at: datetime

    class Config:
        from_attributes = True  # Updated from orm_mode