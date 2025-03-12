from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from utils.db import get_db
from utils.auth import hash_password, get_current_user, oauth2_scheme, verify_password, create_access_token  # Updated to hash_password
from schemas.db import Account as DBAccount
from models.account import Account, AccountCreate, Login
from typing import List

router = APIRouter(prefix="/auth", tags=["auth"])

@router.post("/signup", response_model=Account)
async def signup(account: AccountCreate, db: Session = Depends(get_db)):
    # Check if email already exists
    existing_account = db.query(DBAccount).filter(DBAccount.email == account.email).first()
    if existing_account:
        raise HTTPException(status_code=400, detail="Email already registered")

    # Hash the password
    password_hash = hash_password(account.password)  # Updated to hash_password

    # Create new account in the database
    db_account = DBAccount(
        user_id="pending",
        full_name=account.full_name,
        email=account.email,
        password_hash=password_hash
    )
    db.add(db_account)
    db.commit()
    db.refresh(db_account)

    return db_account

@router.post("/login", response_model=dict)
async def login(account: Login, db: Session = Depends(get_db)):
    # Find the account by email
    db_account = db.query(DBAccount).filter(DBAccount.email == account.email).first()
    if not db_account or not verify_password(account.password, db_account.password_hash):
        raise HTTPException(status_code=401, detail="Invalid email or password")
    
    # Create a JWT token
    access_token = create_access_token(data={"sub": account.email})
    return {"access_token": access_token, "token_type": "bearer"}

@router.patch("/update-user-id")
async def update_user_id(data: dict, user: DBAccount = Depends(get_current_user), db: Session = Depends(get_db)):
    account_id = data.get("account_id")
    if not account_id:
        raise HTTPException(status_code=400, detail="account_id is required")
    
    account = db.query(DBAccount).filter(DBAccount.id == account_id).first()
    if not account:
        raise HTTPException(status_code=404, detail="Account not found")
    if account.user_id != "pending":
        raise HTTPException(status_code=400, detail="User ID already set")
    account.user_id = user.user_id
    db.commit()
    return {"message": "User ID updated successfully"}

@router.get("/me", response_model=Account)
def get_current_account(user: DBAccount = Depends(get_current_user), db: Session = Depends(get_db)):
    return user