from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from routes import dashboard, transactions, budget, insights, auth
from utils.db import get_db, SessionLocal
from sqlalchemy.orm import Session

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(dashboard.router)
app.include_router(transactions.router)
app.include_router(budget.router)
app.include_router(insights.router)
app.include_router(auth.router)

@app.get("/")
def read_root():
    return {"message": "Welcome to Money Master AI Backend!"}

@app.get("/test-db")
def test_db(db: Session = Depends(get_db)):
    try:
        db.execute("SELECT 1")
        return {"message": "Database connection successful!"}
    except Exception as e:
        return {"message": f"Database connection failed: {str(e)}"}