from __future__ import annotations

from unittest.mock import AsyncMock, MagicMock

import pytest

from app.exceptions import NotFoundException
from app.models.product import Product
from app.repositories.product_repository import ProductRepositoryBase
from app.services.product_service import ProductService


def _make_repo(products: list[Product] | None = None) -> ProductRepositoryBase:
    repo = MagicMock(spec=ProductRepositoryBase)
    repo.get_all = AsyncMock(return_value=products or [])
    repo.get_by_id = AsyncMock(return_value=None)
    return repo  # type: ignore[return-value]


def _make_product(product_id: int = 1) -> Product:
    p = Product(
        name="Test Choc",
        description="Desc",
        price=5.99,
        image_url="/img.jpg",
        category="dark",
    )
    p.id = product_id
    return p


async def test_get_all_returns_product_list() -> None:
    product = _make_product()
    repo = _make_repo([product])
    service = ProductService(repo)

    result = await service.get_all()

    assert len(result) == 1
    assert result[0].name == "Test Choc"
    assert result[0].price == 5.99


async def test_get_all_empty_returns_empty_list() -> None:
    repo = _make_repo([])
    service = ProductService(repo)

    result = await service.get_all()

    assert result == []


async def test_get_by_id_found_returns_product() -> None:
    product = _make_product(1)
    repo = _make_repo()
    repo.get_by_id = AsyncMock(return_value=product)
    service = ProductService(repo)

    result = await service.get_by_id(1)

    assert result.id == 1
    assert result.name == "Test Choc"


async def test_get_by_id_not_found_raises_not_found_exception() -> None:
    repo = _make_repo()
    repo.get_by_id = AsyncMock(return_value=None)
    service = ProductService(repo)

    with pytest.raises(NotFoundException) as exc_info:
        await service.get_by_id(999)

    assert "999" in exc_info.value.message
    assert exc_info.value.status_code == 404
