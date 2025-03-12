from sqlalchemy import Column, BigInteger, String, Float, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from utils.db import Base
from datetime import datetime

# Dashboard data table (balance, income, expenses, savings)
class DashboardData(Base):
    __tablename__ = "dashboard_data"

    id = Column(BigInteger, primary_key=True, index=True)
    user_id = Column(String, nullable=False, index=True)  # Supabase Auth user ID
    balance = Column(Float, nullable=False)
    monthly_income = Column(Float, nullable=False)
    monthly_expenses = Column(Float, nullable=False)
    monthly_savings = Column(Float, nullable=False)

# Transactions table
class Transaction(Base):
    __tablename__ = "transactions"

    id = Column(BigInteger, primary_key=True, index=True)
    user_id = Column(String, nullable=False, index=True)  # Supabase Auth user ID
    amount = Column(Float, nullable=False)
    category = Column(String, nullable=False)
    description = Column(String, nullable=True)
    date = Column(DateTime, nullable=False, default=datetime.utcnow)

# Budget table
class Budget(Base):
    __tablename__ = "budgets"

    id = Column(BigInteger, primary_key=True, index=True)
    user_id = Column(String, nullable=False, index=True)  # Supabase Auth user ID
    category = Column(String, nullable=False)
    amount = Column(Float, nullable=False)
    month = Column(String, nullable=False)

# Insights table (for AI-generated insights)
class Insight(Base):
    __tablename__ = "insights"

    id = Column(BigInteger, primary_key=True, index=True)
    user_id = Column(String, nullable=False, index=True)  # Supabase Auth user ID
    title = Column(String, nullable=False)
    description = Column(String, nullable=False)
    created_at = Column(DateTime, nullable=False, default=datetime.utcnow)

# Accounts table (for login/signup data)
class Account(Base):
    __tablename__ = "accounts"

    id = Column(BigInteger, primary_key=True, index=True)
    user_id = Column(String, nullable=False, unique=True, index=True)  # Supabase Auth user ID
    full_name = Column(String, nullable=False)
    email = Column(String, nullable=False, unique=True, index=True)
    password_hash = Column(String, nullable=False)  # Store hashed password
    created_at = Column(DateTime, nullable=False, default=datetime.utcnow)