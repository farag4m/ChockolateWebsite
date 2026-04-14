from __future__ import annotations

import uuid
from typing import Annotated

from fastapi import Cookie, Depends, Response
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import get_session
from app.repositories.cart_repository import CartRepository, CartRepositoryBase
from app.repositories.product_repository import ProductRepository, ProductRepositoryBase
from app.services.cart_service import CartService, CartServiceBase
from app.services.product_service import ProductService, ProductServiceBase

SESSION_COOKIE = "choc_session"


def get_product_repository(
    session: Annotated[AsyncSession, Depends(get_session)],
) -> ProductRepositoryBase:
    return ProductRepository(session)


def get_product_service(
    repo: Annotated[ProductRepositoryBase, Depends(get_product_repository)],
) -> ProductServiceBase:
    return ProductService(repo)


def get_cart_repository() -> CartRepositoryBase:
    return CartRepository()


def get_session_id(
    response: Response,
    choc_session: Annotated[str | None, Cookie()] = None,
) -> str:
    if choc_session is None:
        new_id = str(uuid.uuid4())
        response.set_cookie(
            key=SESSION_COOKIE,
            value=new_id,
            httponly=True,
            samesite="lax",
        )
        return new_id
    return choc_session


def get_cart_service(
    cart_repo: Annotated[CartRepositoryBase, Depends(get_cart_repository)],
    product_repo: Annotated[ProductRepositoryBase, Depends(get_product_repository)],
) -> CartServiceBase:
    return CartService(cart_repo, product_repo)
