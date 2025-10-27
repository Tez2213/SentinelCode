"""
User model
"""
from sqlalchemy import Column, Integer, String, DateTime, func
from app.core.database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    github_id = Column(Integer, unique=True, nullable=True, index=True)
    gitlab_id = Column(Integer, unique=True, nullable=True, index=True)
    bitbucket_id = Column(String, unique=True, nullable=True, index=True)
    username = Column(String, nullable=False, index=True)
    email = Column(String, nullable=True)
    avatar_url = Column(String, nullable=True)
    access_token = Column(String, nullable=True)  # GitHub access token (stored temporarily)
    access_token_ref = Column(String, nullable=True)  # Reference to Secret Manager
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now(), nullable=True)
    last_login = Column(DateTime(timezone=True), nullable=True)

    def __repr__(self):
        return f"<User {self.username}>"
