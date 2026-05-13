import pytest


async def get_token(client):

    await client.post(
        "/auth/signup",
        json={
            "email": "task@test.com",
            "password": "123456"
        }
    )

    response = await client.post(
        "/auth/login",
        data={
            "username": "task@test.com",
            "password": "123456"
        }
    )

    data = response.json()

    return data["access_token"]


@pytest.mark.asyncio
async def test_create_task(client):

    token = await get_token(client)

    project_response = await client.post(
        "/projects/",
        headers={
            "Authorization": f"Bearer {token}"
        },
        json={
            "name": "Task Project",
            "description": "Testing Tasks"
        }
    )

    project = project_response.json()

    response = await client.post(
        f"/tasks/{project['id']}",
        headers={
            "Authorization": f"Bearer {token}"
        },
        json={
            "title": "Test Task",
            "description": "Async Task"
        }
    )

    assert response.status_code == 200

    data = response.json()

    assert data["title"] == "Test Task"