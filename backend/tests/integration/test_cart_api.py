from __future__ import annotations

from httpx import AsyncClient


async def test_get_cart_empty_returns_success(async_client: AsyncClient) -> None:
    response = await async_client.get("/api/cart")

    assert response.status_code == 200
    body = response.json()
    assert body["success"] is True
    assert body["data"]["items"] == []
    assert body["data"]["total"] == 0.0


async def test_post_cart_adds_item(async_client: AsyncClient) -> None:
    response = await async_client.post("/api/cart", json={"product_id": 1, "quantity": 2})

    assert response.status_code == 200
    body = response.json()
    assert body["success"] is True
    assert len(body["data"]["items"]) == 1
    assert body["data"]["items"][0]["product_id"] == 1
    assert body["data"]["items"][0]["quantity"] == 2
    assert abs(body["data"]["total"] - 17.98) < 0.001


async def test_post_cart_product_not_found_returns_404(async_client: AsyncClient) -> None:
    response = await async_client.post("/api/cart", json={"product_id": 9999, "quantity": 1})

    assert response.status_code == 404
    body = response.json()
    assert body["success"] is False


async def test_post_cart_invalid_quantity_returns_422(async_client: AsyncClient) -> None:
    response = await async_client.post("/api/cart", json={"product_id": 1, "quantity": 0})

    assert response.status_code == 422


async def test_put_cart_item_updates_quantity(async_client: AsyncClient) -> None:
    add_resp = await async_client.post("/api/cart", json={"product_id": 1, "quantity": 1})
    item_id = add_resp.json()["data"]["items"][0]["item_id"]

    session_cookie = add_resp.cookies.get("choc_session")
    cookies: dict[str, str] = {}
    if session_cookie:
        cookies["choc_session"] = session_cookie

    response = await async_client.put(
        f"/api/cart/{item_id}",
        json={"quantity": 5},
        cookies=cookies,
    )

    assert response.status_code == 200
    body = response.json()
    assert body["success"] is True
    assert body["data"]["items"][0]["quantity"] == 5


async def test_put_cart_item_not_found_returns_404(async_client: AsyncClient) -> None:
    response = await async_client.put("/api/cart/nonexistent-id", json={"quantity": 1})

    assert response.status_code == 404
    body = response.json()
    assert body["success"] is False


async def test_delete_cart_item_removes_item(async_client: AsyncClient) -> None:
    add_resp = await async_client.post("/api/cart", json={"product_id": 1, "quantity": 1})
    item_id = add_resp.json()["data"]["items"][0]["item_id"]
    session_cookie = add_resp.cookies.get("choc_session")
    cookies: dict[str, str] = {}
    if session_cookie:
        cookies["choc_session"] = session_cookie

    response = await async_client.delete(f"/api/cart/{item_id}", cookies=cookies)

    assert response.status_code == 200
    body = response.json()
    assert body["success"] is True
    assert body["data"]["items"] == []
    assert body["data"]["total"] == 0.0


async def test_delete_cart_item_not_found_returns_404(async_client: AsyncClient) -> None:
    response = await async_client.delete("/api/cart/nonexistent-id")

    assert response.status_code == 404
    body = response.json()
    assert body["success"] is False
