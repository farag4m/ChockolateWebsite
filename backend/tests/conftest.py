from __future__ import annotations

from collections.abc import AsyncGenerator

import pytest
from httpx import ASGITransport, AsyncClient
from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker, create_async_engine

from app.database import get_session
from app.main import app
from app.models.product import Base, Product
from app.repositories.cart_repository import clear_cart_store

TEST_DB_URL = "sqlite+aiosqlite:///:memory:"


@pytest.fixture(autouse=True)
def reset_cart_store() -> None:
    clear_cart_store()


@pytest.fixture()
async def db_session() -> AsyncGenerator[AsyncSession, None]:
    engine = create_async_engine(TEST_DB_URL)
    factory = async_sessionmaker(engine, expire_on_commit=False)

    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

    async with factory() as session:
        yield session

    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.drop_all)
    await engine.dispose()


@pytest.fixture()
async def seeded_session(db_session: AsyncSession) -> AsyncGenerator[AsyncSession, None]:
    products = [
        Product(
            name="Dark Velvet 70%",
            description="Rich dark chocolate.",
            price=8.99,
            image_url="/images/dark-velvet.jpg",
            category="dark",
        ),
        Product(
            name="Milk Classic",
            description="Smooth milk chocolate.",
            price=6.99,
            image_url="/images/milk-classic.jpg",
            category="milk",
        ),
    ]
    for p in products:
        db_session.add(p)
    await db_session.commit()
    yield db_session


@pytest.fixture()
async def async_client(seeded_session: AsyncSession) -> AsyncGenerator[AsyncClient, None]:
    async def override_get_session() -> AsyncGenerator[AsyncSession, None]:
        yield seeded_session

    app.dependency_overrides[get_session] = override_get_session

    async with AsyncClient(
        transport=ASGITransport(app=app),
        base_url="http://test",
    ) as client:
        yield client

    app.dependency_overrides.clear()
