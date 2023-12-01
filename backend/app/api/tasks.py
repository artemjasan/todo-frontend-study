import typing
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.exc import IntegrityError
from sqlalchemy.ext.asyncio import AsyncSession

from app.crud.crud_tasks import task_service
from app.database.connection import get_session
from app.schemas import TaskCreate, TaskUpdate, TaskResponse, BaseDeleteResponse

DOES_NOT_EXIST_ERROR_TEMPLATE: typing.Final[str] = "Task with id: {id} does not exist"

task_router = APIRouter()


@task_router.get(
    "/",
    description="Get all tasks",
    responses={
        status.HTTP_200_OK: {"description": "Tasks list", "model": list[TaskResponse]},
    },
)
async def get_all_categories(session: AsyncSession = Depends(get_session)):
    return await task_service.get_all(session=session)


@task_router.get(
    "/{task_id}",
    description="Get a task by id",
    responses={
        status.HTTP_200_OK: {"description": "Task found", "model": TaskResponse},
        status.HTTP_404_NOT_FOUND: {
            "description": "Task not found",
            "content": {
                "application/json": {
                    "example": {
                        "detail": DOES_NOT_EXIST_ERROR_TEMPLATE.format(id="00000000-0000-0000-0000-000000000000")
                    }
                }
            }
        },
    },
)
async def get_task(
        task_id: UUID, session: AsyncSession = Depends(get_session)
):
    task = await task_service.get(session=session, id_=task_id)
    if task is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=DOES_NOT_EXIST_ERROR_TEMPLATE.format(id=task_id)
        )
    return task


@task_router.post(
    "/",
    description="Create a new task",
    status_code=status.HTTP_201_CREATED,
    responses={
        status.HTTP_201_CREATED: {"description": "Task created", "model": TaskResponse},
        status.HTTP_404_NOT_FOUND: {
            "description": "Category with id: {id} does not exist",
            "content": {
                "application/json": {
                    "example": {
                        "detail": "Category with id: 00000000-0000-0000-0000-000000000000 does not exist"
                    }
                }
            }
        },
    },
)
async def create_task(
        task: TaskCreate,
        session: AsyncSession = Depends(get_session)
):
    try:
        return await task_service.create(session=session, obj_in=task)
    except IntegrityError:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Category with id: {task.category_id} does not exist"
        )


@task_router.patch(
    "/{task_id}",
    description="Update a task",
    responses={
        status.HTTP_200_OK: {"description": "Task updated", "model": TaskResponse},
        status.HTTP_404_NOT_FOUND: {
            "description": "Task not found",
            "content": {
                "application/json": {
                    "example": {
                        "detail": DOES_NOT_EXIST_ERROR_TEMPLATE.format(id="00000000-0000-0000-0000-000000000000")
                    }
                }
            }
        },
    },
)
async def update_task(
    task_id: UUID, task_in: TaskUpdate, session: AsyncSession = Depends(get_session)
):
    task = await task_service.get(session=session, id_=task_id)
    if not task:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=DOES_NOT_EXIST_ERROR_TEMPLATE.format(id=task_id)
        )
    return await task_service.update(session=session, obj_current=task, obj_in=task_in)


@task_router.delete(
    "/{task_id}",
    description="Delete a task",
    responses={
        status.HTTP_200_OK: {"description": "Task deleted", "model": BaseDeleteResponse},
        status.HTTP_404_NOT_FOUND: {
            "description": "Task not found",
            "content": {
                "application/json": {
                    "example": {
                        "detail": DOES_NOT_EXIST_ERROR_TEMPLATE.format(id="00000000-0000-0000-0000-000000000000")
                    }
                }
            }
        },
    },
)
async def delete_task(
    task_id: UUID, session: AsyncSession = Depends(get_session)
):
    task = await task_service.get(session=session, id_=task_id)
    if not task:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=DOES_NOT_EXIST_ERROR_TEMPLATE.format(id=task_id)
        )
    return await task_service.delete(session=session, id_=task_id)
