# Smart Workspace

A full-stack productivity and task management application built using React, FastAPI, and PostgreSQL.

## Features

* User Authentication (JWT)
* Protected Routes
* Create Projects
* Create/Edit/Delete Tasks
* Task Priorities
* Due Dates
* Search & Filters
* Dark Mode
* Responsive UI

## Tech Stack

### Frontend

* React
* Vite
* Tailwind CSS
* React Router
* Axios

### Backend

* FastAPI
* SQLAlchemy
* PostgreSQL
* JWT Authentication

## Screenshots

(Add screenshots here later)

## Installation

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Backend

```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload
```

## Environment Variables

Create `.env` file in backend:

```env
DATABASE_URL=
SECRET_KEY=
ALGORITHM=
```

