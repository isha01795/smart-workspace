from pydantic import BaseModel
from datetime import date


class TaskCreate(BaseModel):

    title: str
    description: str | None = None

    priority: str = "Medium"

    due_date: date | None = None


class TaskUpdate(BaseModel):

    title: str | None = None

    description: str | None = None

    completed: bool | None = None

    priority: str | None = None

    due_date: date | None = None


class TaskResponse(BaseModel):

    id: int

    title: str

    description: str | None

    completed: bool

    priority: str

    due_date: date | None

    project_id: int

    class Config:

        from_attributes = True