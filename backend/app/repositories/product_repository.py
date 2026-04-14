from __future__ import annotations

from abc import ABC, abstractmethod

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.product import Product


class ProductRepositoryBase(ABC):
    @abstractmethod
    async def get_all(self) -> list[Product]:
        ...

    @abstractmethod
    async def get_by_id(self, product_id: int) -> Product | None:
        ...


class ProductRepository(ProductRepositoryBase):
    def __init__(self, session: AsyncSession) -> None:
        self._session = session

    async def get_all(self) -> list[Product]:
        result = await self._session.execute(select(Product))
        return list(result.scalars().all())

    async def get_by_id(self, product_id: int) -> Product | None:
        result = await self._session.execute(
            select(Product).where(Product.id == product_id)
        )
        return result.scalar_one_or_none()
