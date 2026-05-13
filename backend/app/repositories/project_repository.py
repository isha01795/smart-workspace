from sqlalchemy.ext.asyncio import (
    AsyncSession
)

from sqlalchemy import select

from app.models.project import Project


class ProjectRepository:

    @staticmethod
    async def create_project(
        db: AsyncSession,
        name: str,
        description: str,
        owner_id: int
    ):

        project = Project(
            name=name,
            description=description,
            owner_id=owner_id
        )

        db.add(project)

        await db.commit()

        await db.refresh(project)

        return project

    @staticmethod
    async def get_projects(
        db: AsyncSession,
        owner_id: int
    ):

        result = await db.execute(
            select(Project).where(
                Project.owner_id == owner_id
            )
        )

        return result.scalars().all()

    @staticmethod
    async def get_project_by_id(
        db: AsyncSession,
        project_id: int,
        owner_id: int
    ):

        result = await db.execute(
            select(Project).where(
                Project.id == project_id,
                Project.owner_id == owner_id
            )
        )

        return result.scalars().first()

    @staticmethod
    async def delete_project(
        db: AsyncSession,
        project: Project
    ):

        await db.delete(project)

        await db.commit()