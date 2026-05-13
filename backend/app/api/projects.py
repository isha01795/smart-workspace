from fastapi import (
    APIRouter,
    Depends,
    HTTPException
)

from sqlalchemy.ext.asyncio import (
    AsyncSession
)

from app.core.database import get_db

from app.core.dependencies import (
    get_current_user
)

from app.models.user import User
from app.models.project import Project

from app.schemas.project import (
    ProjectCreate,
    ProjectResponse,
    ProjectUpdate
)

from app.services.project_service import (
    ProjectService
)
from app.core.exceptions import (
    ProjectNotFoundException
)

router = APIRouter(
    prefix="/projects",
    tags=["Projects"]
)


@router.post(
    "/",
    response_model=ProjectResponse
)
async def create_project(
    project: ProjectCreate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(
        get_current_user
    )
):

    return await ProjectService.create_project(
        db=db,
        name=project.name,
        description=project.description,
        owner_id=current_user.id
    )


@router.get(
    "/",
    response_model=list[ProjectResponse]
)
async def get_projects(
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(
        get_current_user
    )
):

    return ProjectService.get_user_projects(
        db=db,
        owner_id=current_user.id
    )


@router.patch(
    "/{project_id}",
    response_model=ProjectResponse
)
async def update_project(
    project_id: int,
    project_data: ProjectUpdate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(
        get_current_user
    )
):

    project = await (
        ProjectService.get_project_by_id(
            db=db,
            project_id=project_id,
            owner_id=current_user.id
        )
    )

    if not project:

        raise ProjectNotFoundException()

    if project_data.name is not None:

        project.name = project_data.name

    if project_data.description is not None:

        project.description = (
            project_data.description
        )

    await db.commit()

    await db.refresh(project)

    return project


@router.delete("/{project_id}")
async def delete_project(
    project_id: int,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(
        get_current_user
    )
):

    project = await (
        ProjectService.get_project_by_id(
            db=db,
            project_id=project_id,
            owner_id=current_user.id
        )
    )

    if not project:

        raise ProjectNotFoundException()

    await ProjectService.delete_project(
        db=db,
        project=project
    )

    return {
        "message": "Project deleted"
    }