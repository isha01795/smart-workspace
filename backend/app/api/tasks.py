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

from app.schemas.task import (
    TaskCreate,
    TaskResponse,
    TaskUpdate
)
from app.services.task_service import (
    TaskService
)
from app.core.exceptions import (
    ProjectNotFoundException
)

router = APIRouter(
    prefix="/tasks",
    tags=["Tasks"]
)


@router.post(
    "/{project_id}",
    response_model=TaskResponse
)
async def create_task(
    project_id: int,
    task: TaskCreate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(
        get_current_user
    )
):

    from app.services.project_service import (
        ProjectService
    )

    project = await (
        ProjectService.get_project_by_id(
            db=db,
            project_id=project_id,
            owner_id=current_user.id
        )
    )

    if not project:

        raise ProjectNotFoundException()

    new_task = await (
        TaskService.create_task(
            db=db,
            title=task.title,
            description=task.description,
            project_id=project.id
        )
    )

    return new_task

@router.get(
    "/{project_id}",
    response_model=list[TaskResponse]
)
async def get_tasks(
    project_id: int,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(
        get_current_user
    )
):

    from app.services.project_service import (
        ProjectService
    )

    project = await (
        ProjectService.get_project_by_id(
            db=db,
            project_id=project_id,
            owner_id=current_user.id
        )
    )

    if not project:

        raise ProjectNotFoundException()

    tasks = await (
        TaskService.get_tasks_by_project(
            db=db,
            project_id=project.id
        )
    )

    return tasks

@router.patch(
    "/update/{task_id}",
    response_model=TaskResponse
)
async def update_task(
    task_id: int,
    task_data: TaskUpdate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(
        get_current_user
    )
):

    task = await (
        TaskService.get_task_by_id(
            db=db,
            task_id=task_id
        )
    )

    if not task:

        raise HTTPException(
            status_code=404,
            detail="Task not found"
        )

    if task_data.title is not None:

        task.title = task_data.title

    if task_data.description is not None:

        task.description = (
            task_data.description
        )

    if task_data.completed is not None:

        task.completed = (
            task_data.completed
        )

    await db.commit()

    await db.refresh(task)

    return task

@router.delete("/{task_id}")
async def delete_task(
    task_id: int,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(
        get_current_user
    )
):

    task = await (
        TaskService.get_task_by_id(
            db=db,
            task_id=task_id
        )
    )

    if not task:

        raise HTTPException(
            status_code=404,
            detail="Task not found"
        )

    await TaskService.delete_task(
        db=db,
        task=task
    )

    return {
        "message": "Task deleted"
    }