from jose import jwt, JWTError

from fastapi import (
    Depends,
    HTTPException
)

from fastapi.security import (
    OAuth2PasswordBearer
)

from sqlalchemy.ext.asyncio import (
    AsyncSession
)

from sqlalchemy import select

from app.core.database import get_db

from app.core.config import settings

from app.models.user import User


oauth2_scheme = OAuth2PasswordBearer(
    tokenUrl="/auth/login"
)


async def get_current_user(
    token: str = Depends(oauth2_scheme),
    db: AsyncSession = Depends(get_db)
):

    credentials_exception = HTTPException(
        status_code=401,
        detail="Could not validate credentials"
    )

    try:

        payload = jwt.decode(
            token,
            settings.SECRET_KEY,
            algorithms=[settings.ALGORITHM]
        )

        user_id = payload.get("user_id")

        if user_id is None:

            raise credentials_exception

    except JWTError:

        raise credentials_exception

    result = await db.execute(
        select(User).where(
            User.id == user_id
        )
    )

    user = result.scalars().first()

    if user is None:

        raise credentials_exception

    return user