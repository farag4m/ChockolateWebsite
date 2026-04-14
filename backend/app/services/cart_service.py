from __future__ import annotations

from abc import ABC, abstractmethod

from app.exceptions import DomainException, NotFoundException
from app.repositories.cart_repository import CartRepositoryBase
from app.repositories.product_repository import ProductRepositoryBase
from app.schemas.cart import (
    AddCartItemRequest,
    CartItemResponse,
    CartResponse,
    UpdateCartItemRequest,
)


class CartServiceBase(ABC):
    @abstractmethod
    async def add_item(self, session_id: str, request: AddCartItemRequest) -> CartResponse:
        ...

    @abstractmethod
    async def get_cart(self, session_id: str) -> CartResponse:
        ...

    @abstractmethod
    async def update_item(
        self, session_id: str, item_id: str, request: UpdateCartItemRequest
    ) -> CartResponse:
        ...

    @abstractmethod
    async def remove_item(self, session_id: str, item_id: str) -> CartResponse:
        ...


class CartService(CartServiceBase):
    def __init__(
        self,
        cart_repository: CartRepositoryBase,
        product_repository: ProductRepositoryBase,
    ) -> None:
        self._cart_repo = cart_repository
        self._product_repo = product_repository

    async def add_item(self, session_id: str, request: AddCartItemRequest) -> CartResponse:
        product = await self._product_repo.get_by_id(request.product_id)
        if product is None:
            raise NotFoundException(f"Product {request.product_id} not found")

        existing = self._cart_repo.find_by_product(session_id, request.product_id)
        if existing is not None:
            new_quantity = existing.quantity + request.quantity
            self._cart_repo.update_item(session_id, existing.item_id, new_quantity)
        else:
            self._cart_repo.add_item(
                session_id,
                product_id=request.product_id,
                quantity=request.quantity,
                unit_price=product.price,
            )

        return self._build_cart_response(session_id)

    async def get_cart(self, session_id: str) -> CartResponse:
        return self._build_cart_response(session_id)

    async def update_item(
        self, session_id: str, item_id: str, request: UpdateCartItemRequest
    ) -> CartResponse:
        item = self._cart_repo.update_item(session_id, item_id, request.quantity)
        if item is None:
            raise NotFoundException(f"Cart item {item_id} not found")
        return self._build_cart_response(session_id)

    async def remove_item(self, session_id: str, item_id: str) -> CartResponse:
        removed = self._cart_repo.remove_item(session_id, item_id)
        if not removed:
            raise NotFoundException(f"Cart item {item_id} not found")
        return self._build_cart_response(session_id)

    def _build_cart_response(self, session_id: str) -> CartResponse:
        cart = self._cart_repo.get_cart(session_id)
        items = [
            CartItemResponse(
                item_id=item.item_id,
                product_id=item.product_id,
                quantity=item.quantity,
                unit_price=item.unit_price,
                subtotal=round(item.unit_price * item.quantity, 2),
            )
            for item in cart.values()
        ]
        total = round(sum(i.subtotal for i in items), 2)
        return CartResponse(session_id=session_id, items=items, total=total)


class CartServiceConfigError(DomainException):
    pass
