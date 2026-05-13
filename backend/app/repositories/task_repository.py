from sqlalchemy.ext.asyncio import (
    AsyncSession
)

from sqlalchemy import select

from app.models.task import Task


class TaskRepository:

    @staticmethod
    async def create_task(
        db: AsyncSession,
        title: str,
        description: str,
        project_id: int
    ):

        task = Task(
            title=title,
            description=description,
            project_id=project_id
        )

        db.add(task)

        await db.commit()

        await db.refresh(task)

        return task

    @staticmethod
    async def get_tasks_by_project(
        db: AsyncSession,
        project_id: int
    ):

        result = await db.execute(
            select(Task).where(
                Task.project_id == project_id
            )
        )

        return result.scalars().all()

    @staticmethod
    async def get_task_by_id(
        db: AsyncSession,
        task_id: int
    ):

        result = await db.execute(
            select(Task).where(
                Task.id == task_id
            )
        )

        return result.scalars().first()

    @staticmethod
    async def delete_task(
        db: AsyncSession,
        task: Task
    ):

        await db.delete(task)

        await db.commit()