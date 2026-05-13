from sqlalchemy.ext.asyncio import (
    AsyncSession
)

from app.repositories.project_repository import (
    ProjectRepository
)


class ProjectService:

    @staticmethod
    async def create_project(
        db: AsyncSession,
        name: str,
        description: str,
        owner_id: int
    ):

        return await (
            ProjectRepository.create_project(
                db=db,
                name=name,
                description=description,
                owner_id=owner_id
            )
        )

    @staticmethod
    async def get_projects(
        db: AsyncSession,
        owner_id: int
    ):

        return await (
            ProjectRepository.get_projects(
                db=db,
                owner_id=owner_id
            )
        )

    @staticmethod
    async def get_project_by_id(
        db: AsyncSession,
        project_id: int,
        owner_id: int
    ):

        return await (
            ProjectRepository.get_project_by_id(
                db=db,
                project_id=project_id,
                owner_id=owner_id
            )
        )

    @staticmethod
    async def delete_project(
        db: AsyncSession,
        project
    ):

        return await (
            ProjectRepository.delete_project(
                db=db,
                project=project
            )
        )