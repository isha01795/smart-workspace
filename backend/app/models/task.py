from sqlalchemy import (
    Column,
    Integer,
    String,
    Boolean,
    ForeignKey,
    Date
)

from sqlalchemy.orm import relationship

from app.core.database import Base


class Task(Base):

    __tablename__ = "tasks"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    title = Column(
        String,
        nullable=False
    )

    description = Column(String)

    completed = Column(
        Boolean,
        default=False
    )

    priority = Column(
        String,
        default="Medium"
    )

    due_date = Column(
        Date,
        nullable=True
    )

    project_id = Column(
        Integer,
        ForeignKey(
            "projects.id",
            ondelete="CASCADE"
        )
    )

    project = relationship(
        "Project",
        back_populates="tasks"
    )