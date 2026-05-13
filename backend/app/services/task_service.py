from sqlalchemy.ext.asyncio import (
    AsyncSession
)

from app.repositories.task_repository import (
    TaskRepository
)


class TaskService:

    @staticmethod
    async def create_task(
        db: AsyncSession,
        title: str,
        description: str,
        project_id: int
    ):

        return await (
            TaskRepository.create_task(
                db=db,
                title=title,
                description=description,
                project_id=project_id
            )
        )

    @staticmethod
    async def get_tasks_by_project(
        db: AsyncSession,
        project_id: int
    ):

        return await (
            TaskRepository.get_tasks_by_project(
                db=db,
                project_id=project_id
            )
        )

    @staticmethod
    async def get_task_by_id(
        db: AsyncSession,
        task_id: int
    ):

        return await (
            TaskRepository.get_task_by_id(
                db=db,
                task_id=task_id
            )
        )

    @staticmethod
    async def delete_task(
        db: AsyncSession,
        task
    ):

        return await (
            TaskRepository.delete_task(
                db=db,
                task=task
            )
        )