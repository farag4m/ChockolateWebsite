from __future__ import annotations

from typing import Annotated

from fastapi import APIRouter, Depends

from app.api.dependencies import get_cart_service, get_session_id
from app.schemas.api_response import ApiResponse
from app.schemas.cart import AddCartItemRequest, CartResponse, UpdateCartItemRequest
from app.services.cart_service import CartServiceBase

router = APIRouter(prefix="/api/cart", tags=["cart"])


@router.post("", response_model=ApiResponse[CartResponse])
async def create(
    body: AddCartItemRequest,
    session_id: Annotated[str, Depends(get_session_id)],
    service: Annotated[CartServiceBase, Depends(get_cart_service)],
) -> ApiResponse[CartResponse]:
    result = await service.add_item(session_id, body)
    return ApiResponse.ok(result)


@router.get("", response_model=ApiResponse[CartResponse])
async def get_all(
    session_id: Annotated[str, Depends(get_session_id)],
    service: Annotated[CartServiceBase, Depends(get_cart_service)],
) -> ApiResponse[CartResponse]:
    result = await service.get_cart(session_id)
    return ApiResponse.ok(result)


@router.put("/{item_id}", response_model=ApiResponse[CartResponse])
async def update(
    item_id: str,
    body: UpdateCartItemRequest,
    session_id: Annotated[str, Depends(get_session_id)],
    service: Annotated[CartServiceBase, Depends(get_cart_service)],
) -> ApiResponse[CartResponse]:
    result = await service.update_item(session_id, item_id, body)
    return ApiResponse.ok(result)


@router.delete("/{item_id}", response_model=ApiResponse[CartResponse])
async def delete(
    item_id: str,
    session_id: Annotated[str, Depends(get_session_id)],
    service: Annotated[CartServiceBase, Depends(get_cart_service)],
) -> ApiResponse[CartResponse]:
    result = await service.remove_item(session_id, item_id)
    return ApiResponse.ok(result)
