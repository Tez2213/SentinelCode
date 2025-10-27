"""
Issue model
"""
from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Text, Float, Boolean, func
from app.core.database import Base


class Issue(Base):
    __tablename__ = "issues"

    id = Column(Integer, primary_key=True, index=True)
    review_id = Column(Integer, ForeignKey("reviews.id"), nullable=False)
    file_path = Column(Text, nullable=False)
    line_number = Column(Integer, nullable=True)
    issue_type = Column(String(100), nullable=False)  # 'security', 'performance', 'style', 'bug'
    severity = Column(String(20), nullable=False, index=True)  # 'critical', 'high', 'medium', 'low'
    title = Column(Text, nullable=False)
    description = Column(Text, nullable=True)
    fix_suggestion = Column(Text, nullable=True)
    code_snippet = Column(Text, nullable=True)
    confidence_score = Column(Float, nullable=True)  # 0.0-1.0
    source = Column(String(50), nullable=False)  # 'static_analysis', 'ai', 'hybrid'
    static_rule_id = Column(String, nullable=True)  # e.g., 'bandit-B608'
    is_false_positive = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    def __repr__(self):
        return f"<Issue {self.id} - {self.severity} - {self.title[:30]}>"
