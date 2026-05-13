import pytest


async def get_token(client):

    await client.post(
        "/auth/signup",
        json={
            "email": "project@test.com",
            "password": "123456"
        }
    )

    response = await client.post(
        "/auth/login",
        data={
            "username": "project@test.com",
            "password": "123456"
        }
    )

    data = response.json()

    return data["access_token"]


@pytest.mark.asyncio
async def test_create_project(client):

    token = await get_token(client)

    response = await client.post(
        "/projects/",
        headers={
            "Authorization": f"Bearer {token}"
        },
        json={
            "name": "Test Project",
            "description": "Backend API"
        }
    )

    assert response.status_code == 200

    data = response.json()

    assert data["name"] == "Test Project"