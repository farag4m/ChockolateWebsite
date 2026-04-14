from __future__ import annotations

from abc import ABC, abstractmethod

from app.exceptions import NotFoundException
from app.repositories.product_repository import ProductRepositoryBase
from app.schemas.product import ProductResponse


class ProductServiceBase(ABC):
    @abstractmethod
    async def get_all(self) -> list[ProductResponse]:
        ...

    @abstractmethod
    async def get_by_id(self, product_id: int) -> ProductResponse:
        ...


class ProductService(ProductServiceBase):
    def __init__(self, repository: ProductRepositoryBase) -> None:
        self._repository = repository

    async def get_all(self) -> list[ProductResponse]:
        products = await self._repository.get_all()
        return [ProductResponse.model_validate(p) for p in products]

    async def get_by_id(self, product_id: int) -> ProductResponse:
        product = await self._repository.get_by_id(product_id)
        if product is None:
            raise NotFoundException(f"Product {product_id} not found")
        return ProductResponse.model_validate(product)
