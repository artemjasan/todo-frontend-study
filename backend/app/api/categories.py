import typing
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.exc import IntegrityError

from app.crud.crud_categories import category_service
from app.database.connection import get_session
from app.schemas import CategoryCreate, CategoryUpdate, CategoryResponse, BaseDeleteResponse

DOES_NOT_EXIST_ERROR_TEMPLATE: typing.Final[str] = "Category with id: {id} does not exist"
ALREADY_EXISTS_ERROR_TEMPLATE: typing.Final[str] = "Category with name: {name} already exists"

category_router = APIRouter()


@category_router.post(
    "/",
    description="Create a new category",
    responses={
        status.HTTP_201_CREATED: {"description": "Category created", "model": CategoryResponse},
        status.HTTP_409_CONFLICT: {
            "description": "Category already exists",
            "content": {
                "application/json": {
                    "example": {
                        "detail": ALREADY_EXISTS_ERROR_TEMPLATE.format(name="test category name")
                    }
                }
            }
        },
    },
)
async def create_category(
        category: CategoryCreate,
        session: AsyncSession = Depends(get_session)
):
    try:
        return await category_service.create(session=session, obj_in=category)
    except IntegrityError:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail=ALREADY_EXISTS_ERROR_TEMPLATE.format(name=category.name)
        )


@category_router.get(
    "/{category_id}",
    description="Get a category by id",
    responses={
        status.HTTP_200_OK: {"description": "Category found", "model": CategoryResponse},
        status.HTTP_404_NOT_FOUND: {
            "description": "Category not found",
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
async def get_category(
        category_id: UUID, session: AsyncSession = Depends(get_session)
):
    category = await category_service.get(session=session, id_=category_id)
    if category is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=DOES_NOT_EXIST_ERROR_TEMPLATE.format(id=category_id)
        )
    return category


@category_router.get(
    "/",
    description="Get all categories",
    responses={
        status.HTTP_200_OK: {"description": "Categories found", "model": list[CategoryResponse]},
    },
)
async def get_all_categories(session: AsyncSession = Depends(get_session)):
    return await category_service.get_all(session=session)


@category_router.put(
    "/{category_id}",
    description="Update a category",
    responses={
        status.HTTP_200_OK: {"description": "Category updated", "model": CategoryResponse},
        status.HTTP_404_NOT_FOUND: {
            "description": "Category not found",
            "content": {
                "application/json": {
                    "example": {
                        "detail": DOES_NOT_EXIST_ERROR_TEMPLATE.format(id="00000000-0000-0000-0000-000000000000")
                    }
                }
            }
        },
        status.HTTP_409_CONFLICT: {
            "description": "Category already exists",
            "content": {
                "application/json": {
                    "example": {
                        "detail": ALREADY_EXISTS_ERROR_TEMPLATE.format(name="test category name")
                    }
                }
            }
        },
    },
)
async def update_category(
        category_id: UUID,
        category_in: CategoryUpdate,
        session: AsyncSession = Depends(get_session)
):
    current_category = await category_service.get(session=session, id_=category_id)
    if not current_category:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=DOES_NOT_EXIST_ERROR_TEMPLATE.format(id=category_id)
        )
    try:
        return await category_service.update(session=session, obj_current=current_category, obj_in=category_in)
    except IntegrityError:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail=ALREADY_EXISTS_ERROR_TEMPLATE.format(name=category_in.name)
        )


@category_router.delete(
    "/{category_id}",
    description="Delete a category",
    responses={
        status.HTTP_200_OK: {"description": "Category deleted", "model": BaseDeleteResponse},
        status.HTTP_409_CONFLICT: {
            "description": "Category already exists",
            "content": {
                "application/json": {
                    "example": {
                        "status_code": status.HTTP_409_CONFLICT,
                        "detail": ALREADY_EXISTS_ERROR_TEMPLATE.format(name="test category name")
                    }
                }
            }
        },
    },
)
async def delete_category(
        category_id: UUID, session: AsyncSession = Depends(get_session)
):
    category = await category_service.get(session=session, id_=category_id)
    if not category:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=DOES_NOT_EXIST_ERROR_TEMPLATE.format(id=category_id)
        )
    return await category_service.delete(session=session, id_=category_id)
