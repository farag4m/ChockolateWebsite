from __future__ import annotations

from typing import Annotated

from fastapi import APIRouter, Depends

from app.api.dependencies import get_product_service
from app.schemas.api_response import ApiResponse
from app.schemas.product import ProductResponse
from app.services.product_service import ProductServiceBase

router = APIRouter(prefix="/api/products", tags=["products"])


@router.get("", response_model=ApiResponse[list[ProductResponse]])
async def get_all(
    service: Annotated[ProductServiceBase, Depends(get_product_service)],
) -> ApiResponse[list[ProductResponse]]:
    result = await service.get_all()
    return ApiResponse.ok(result)


@router.get("/{product_id}", response_model=ApiResponse[ProductResponse])
async def get_by_id(
    product_id: int,
    service: Annotated[ProductServiceBase, Depends(get_product_service)],
) -> ApiResponse[ProductResponse]:
    result = await service.get_by_id(product_id)
    return ApiResponse.ok(result)
