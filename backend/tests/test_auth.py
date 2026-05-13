import pytest


@pytest.mark.asyncio
async def test_signup(client):

    response = await client.post(
        "/auth/signup",
        json={
            "email": "test@example.com",
            "password": "123456"
        }
    )

    assert response.status_code == 200