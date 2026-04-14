from __future__ import annotations

from httpx import AsyncClient


async def test_get_all_products_returns_success(async_client: AsyncClient) -> None:
    response = await async_client.get("/api/products")

    assert response.status_code == 200
    body = response.json()
    assert body["success"] is True
    assert isinstance(body["data"], list)
    assert len(body["data"]) == 2
    assert body["errors"] == []


async def test_get_all_products_returns_correct_fields(async_client: AsyncClient) -> None:
    response = await async_client.get("/api/products")

    product = response.json()["data"][0]
    assert "id" in product
    assert "name" in product
    assert "description" in product
    assert "price" in product
    assert "image_url" in product
    assert "category" in product


async def test_get_product_by_id_found(async_client: AsyncClient) -> None:
    response = await async_client.get("/api/products/1")

    assert response.status_code == 200
    body = response.json()
    assert body["success"] is True
    assert body["data"]["id"] == 1
    assert body["data"]["name"] == "Dark Velvet 70%"


async def test_get_product_by_id_not_found_returns_404(async_client: AsyncClient) -> None:
    response = await async_client.get("/api/products/9999")

    assert response.status_code == 404
    body = response.json()
    assert body["success"] is False
    assert len(body["errors"]) > 0
