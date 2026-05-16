from fastapi import FastAPI, Depends

from app.core.database import Base, engine
from fastapi.middleware.cors import (
    CORSMiddleware
)

from app.models.user import User
from app.models.project import Project
from app.models.task import Task
from app.api.auth import router as auth_router

from app.core.dependencies import get_current_user
from app.api.projects import (
    router as project_router
)
from app.api.tasks import (
    router as task_router
)
from fastapi.responses import JSONResponse

from app.core.exceptions import (
    ProjectNotFoundException,
    UnauthorizedException
)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,

    allow_origins=[
    "https://smart-workspace-cbv7zc4l9-isha-gupta-s-projects1.vercel.app",
    "https://smart-workspace-rust.vercel.app", 
    "http://localhost:5173",
],

    allow_credentials=True,

    allow_methods=["*"],

    allow_headers=["*"],
)

@app.on_event("startup")
async def startup():

    async with engine.begin() as conn:

        await conn.run_sync(
            Base.metadata.create_all
        )


@app.exception_handler(
    ProjectNotFoundException
)
async def project_not_found_handler(
    request,
    exc
):

    return JSONResponse(
        status_code=404,
        content={
            "message": "Project not found"
        }
    )


@app.exception_handler(
    UnauthorizedException
)
async def unauthorized_handler(
    request,
    exc
):

    return JSONResponse(
        status_code=401,
        content={
            "message": "Unauthorized"
        }
    )

app.include_router(auth_router)
app.include_router(project_router)
app.include_router(task_router)

@app.get("/")
def root():

    return {
        "message": "Smart Workspace API"
    }

@app.get("/me")
def get_me(
    current_user: User = Depends(get_current_user)
):

    return {
        "id": current_user.id,
        "email": current_user.email
    }
