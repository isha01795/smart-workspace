from fastapi import (
    APIRouter,
    Depends,
    HTTPException
)

from sqlalchemy.ext.asyncio import (
    AsyncSession
)

from sqlalchemy import select

from fastapi.security import (
    OAuth2PasswordRequestForm
)

from app.core.database import get_db

from app.models.user import User

from app.schemas.user import (
    UserCreate,
    UserResponse,
    Token
)

from app.core.security import (
    hash_password,
    verify_password,
    create_access_token
)

router = APIRouter(
    prefix="/auth",
    tags=["Auth"]
)


@router.post(
    "/signup",
    response_model=UserResponse
)
async def signup(
    user: UserCreate,
    db: AsyncSession = Depends(get_db)
):

    result = await db.execute(
        select(User).where(
            User.email == user.email
        )
    )

    existing_user = result.scalars().first()

    if existing_user:

        raise HTTPException(
            status_code=400,
            detail="Email already registered"
        )

    new_user = User(
        email=user.email,
        hashed_password=hash_password(
            user.password
        )
    )

    db.add(new_user)

    await db.commit()

    await db.refresh(new_user)

    return new_user


@router.post(
    "/login",
    response_model=Token
)
async def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: AsyncSession = Depends(get_db)
):

    result = await db.execute(
        select(User).where(
            User.email == form_data.username
        )
    )

    db_user = result.scalars().first()

    if not db_user:

        raise HTTPException(
            status_code=401,
            detail="Invalid credentials"
        )

    if not verify_password(
        form_data.password,
        db_user.hashed_password
    ):

        raise HTTPException(
            status_code=401,
            detail="Invalid credentials"
        )

    access_token = create_access_token(
        data={"user_id": db_user.id}
    )

    return {
        "access_token": access_token,
        "token_type": "bearer"
    }