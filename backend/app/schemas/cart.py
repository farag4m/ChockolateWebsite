from __future__ import annotations

from pydantic import BaseModel, Field


class AddCartItemRequest(BaseModel):
    product_id: int
    quantity: int = Field(gt=0)


class UpdateCartItemRequest(BaseModel):
    quantity: int = Field(gt=0)


class CartItemResponse(BaseModel):
    item_id: str
    product_id: int
    quantity: int
    unit_price: float
    subtotal: float


class CartResponse(BaseModel):
    session_id: str
    items: list[CartItemResponse]
    total: float
