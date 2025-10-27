"""
Review model
"""
from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Text, func
from sqlalchemy.orm import relationship
from app.core.database import Base


class Review(Base):
    __tablename__ = "reviews"

    id = Column(Integer, primary_key=True, index=True)
    repository_id = Column(Integer, ForeignKey("repositories.id"), nullable=False)
    commit_sha = Column(String(40), nullable=False, index=True)
    pr_number = Column(Integer, nullable=True)
    pr_url = Column(Text, nullable=True)
    status = Column(String(50), nullable=False, index=True)  # 'pending', 'in_progress', 'completed', 'failed'
    quality_score = Column(Integer, nullable=True)  # 0-100
    total_issues = Column(Integer, default=0)
    critical_issues = Column(Integer, default=0)
    high_issues = Column(Integer, default=0)
    medium_issues = Column(Integer, default=0)
    low_issues = Column(Integer, default=0)
    analysis_time_seconds = Column(Integer, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    completed_at = Column(DateTime(timezone=True), nullable=True)

    # Relationships
    # repository = relationship("Repository", back_populates="reviews")
    # issues = relationship("Issue", back_populates="review")

    def __repr__(self):
        return f"<Review {self.id} - {self.commit_sha[:7]}>"
