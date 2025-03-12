from utils.db import Base, engine
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.sql import text  # Import text for raw SQL

try:
    with engine.connect() as connection:
        # Use text() for raw SQL in SQLAlchemy 2.x
        connection.execute(text("SELECT 1"))
    print("Database connection successful!")
    Base.metadata.create_all(bind=engine)
    print("Tables created successfully!")
except SQLAlchemyError as e:
    print(f"Database error: {str(e)}")
except Exception as e:
    print(f"Unexpected error: {str(e)}")