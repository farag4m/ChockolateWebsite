from __future__ import annotations

from unittest.mock import AsyncMock, MagicMock

import pytest

from app.exceptions import NotFoundException
from app.models.product import Product
from app.repositories.cart_repository import CartRepository
from app.repositories.product_repository import ProductRepositoryBase
from app.schemas.cart import AddCartItemRequest, UpdateCartItemRequest
from app.services.cart_service import CartService

SESSION = "test-session-abc"


def _make_product_repo(product: Product | None) -> ProductRepositoryBase:
    repo = MagicMock(spec=ProductRepositoryBase)
    repo.get_by_id = AsyncMock(return_value=product)
    return repo  # type: ignore[return-value]


def _make_product(price: float = 8.99) -> Product:
    p = Product(
        name="Dark Velvet",
        description="Rich.",
        price=price,
        image_url="/img.jpg",
        category="dark",
    )
    p.id = 1
    return p


async def test_add_item_new_product_adds_to_cart() -> None:
    product_repo = _make_product_repo(_make_product(8.99))
    cart_repo = CartRepository()
    service = CartService(cart_repo, product_repo)

    result = await service.add_item(SESSION, AddCartItemRequest(product_id=1, quantity=2))

    assert len(result.items) == 1
    assert result.items[0].product_id == 1
    assert result.items[0].quantity == 2
    assert result.items[0].unit_price == 8.99
    assert result.items[0].subtotal == 17.98
    assert result.total == 17.98


async def test_add_item_existing_product_increments_quantity() -> None:
    product_repo = _make_product_repo(_make_product(8.99))
    cart_repo = CartRepository()
    service = CartService(cart_repo, product_repo)

    await service.add_item(SESSION, AddCartItemRequest(product_id=1, quantity=1))
    result = await service.add_item(SESSION, AddCartItemRequest(product_id=1, quantity=2))

    assert len(result.items) == 1
    assert result.items[0].quantity == 3


async def test_add_item_product_not_found_raises_not_found() -> None:
    product_repo = _make_product_repo(None)
    cart_repo = CartRepository()
    service = CartService(cart_repo, product_repo)

    with pytest.raises(NotFoundException):
        await service.add_item(SESSION, AddCartItemRequest(product_id=999, quantity=1))


async def test_get_cart_empty_returns_empty_cart() -> None:
    product_repo = _make_product_repo(None)
    cart_repo = CartRepository()
    service = CartService(cart_repo, product_repo)

    result = await service.get_cart(SESSION)

    assert result.items == []
    assert result.total == 0.0
    assert result.session_id == SESSION


async def test_update_item_changes_quantity() -> None:
    product_repo = _make_product_repo(_make_product(10.0))
    cart_repo = CartRepository()
    service = CartService(cart_repo, product_repo)

    cart = await service.add_item(SESSION, AddCartItemRequest(product_id=1, quantity=1))
    item_id = cart.items[0].item_id

    result = await service.update_item(SESSION, item_id, UpdateCartItemRequest(quantity=5))

    assert result.items[0].quantity == 5
    assert result.total == 50.0


async def test_update_item_not_found_raises_not_found() -> None:
    product_repo = _make_product_repo(None)
    cart_repo = CartRepository()
    service = CartService(cart_repo, product_repo)

    with pytest.raises(NotFoundException):
        await service.update_item(SESSION, "nonexistent-id", UpdateCartItemRequest(quantity=1))


async def test_remove_item_removes_from_cart() -> None:
    product_repo = _make_product_repo(_make_product(8.99))
    cart_repo = CartRepository()
    service = CartService(cart_repo, product_repo)

    cart = await service.add_item(SESSION, AddCartItemRequest(product_id=1, quantity=1))
    item_id = cart.items[0].item_id

    result = await service.remove_item(SESSION, item_id)

    assert result.items == []
    assert result.total == 0.0


async def test_remove_item_not_found_raises_not_found() -> None:
    product_repo = _make_product_repo(None)
    cart_repo = CartRepository()
    service = CartService(cart_repo, product_repo)

    with pytest.raises(NotFoundException):
        await service.remove_item(SESSION, "nonexistent-id")
