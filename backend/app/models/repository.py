"""
Repository model
"""
from sqlalchemy import Column, Integer, String, DateTime, Boolean, ForeignKey, Text, JSON, func
from sqlalchemy.orm import relationship
from app.core.database import Base


class Repository(Base):
    __tablename__ = "repositories"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    platform = Column(String(50), nullable=False)  # 'github', 'gitlab', 'bitbucket'
    repo_name = Column(String, nullable=False, index=True)
    repo_url = Column(Text, nullable=False)
    default_branch = Column(String, default="main")
    is_enabled = Column(Boolean, default=True)
    webhook_id = Column(String, nullable=True)
    language_breakdown = Column(JSON, nullable=True)  # {"python": 0.6, "js": 0.4}
    last_scan_at = Column(DateTime(timezone=True), nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    # Relationships
    # user = relationship("User", back_populates="repositories")
    # reviews = relationship("Review", back_populates="repository")

    def __repr__(self):
        return f"<Repository {self.repo_name}>"
