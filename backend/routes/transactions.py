from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from utils.db import get_db
from schemas.db import Transaction as DBTransaction
from models.transactions import Transaction, TransactionCreate
from typing import List
from routes.dashboard import get_current_user, security

router = APIRouter(prefix="/transactions", tags=["transactions"])

@router.post("/", response_model=Transaction)
def create_transaction(
    transaction: TransactionCreate,
    user_id: str = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    db_transaction = DBTransaction(**transaction.dict(), user_id=user_id)
    db.add(db_transaction)
    db.commit()
    db.refresh(db_transaction)
    return db_transaction

@router.get("/", response_model=List[Transaction])
def get_transactions(user_id: str = Depends(get_current_user), db: Session = Depends(get_db)):
    transactions = db.query(DBTransaction).filter(DBTransaction.user_id == user_id).all()
    return transactions