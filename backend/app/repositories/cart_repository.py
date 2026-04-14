from __future__ import annotations

import uuid
from abc import ABC, abstractmethod
from dataclasses import dataclass, field


@dataclass
class CartItem:
    item_id: str
    product_id: int
    quantity: int
    unit_price: float


# In-memory store: {session_id: {item_id: CartItem}}
_cart_store: dict[str, dict[str, CartItem]] = {}


def clear_cart_store() -> None:
    """Clear all in-memory cart data. Used in tests."""
    _cart_store.clear()


class CartRepositoryBase(ABC):
    @abstractmethod
    def get_cart(self, session_id: str) -> dict[str, CartItem]:
        ...

    @abstractmethod
    def add_item(
        self, session_id: str, product_id: int, quantity: int, unit_price: float
    ) -> CartItem:
        ...

    @abstractmethod
    def update_item(self, session_id: str, item_id: str, quantity: int) -> CartItem | None:
        ...

    @abstractmethod
    def remove_item(self, session_id: str, item_id: str) -> bool:
        ...

    @abstractmethod
    def find_by_product(self, session_id: str, product_id: int) -> CartItem | None:
        ...


@dataclass
class CartRepository(CartRepositoryBase):
    _store: dict[str, dict[str, CartItem]] = field(default_factory=lambda: _cart_store)

    def get_cart(self, session_id: str) -> dict[str, CartItem]:
        return dict(self._store.get(session_id, {}))

    def add_item(
        self, session_id: str, product_id: int, quantity: int, unit_price: float
    ) -> CartItem:
        if session_id not in self._store:
            self._store[session_id] = {}

        item_id = str(uuid.uuid4())
        item = CartItem(
            item_id=item_id,
            product_id=product_id,
            quantity=quantity,
            unit_price=unit_price,
        )
        self._store[session_id][item_id] = item
        return item

    def update_item(self, session_id: str, item_id: str, quantity: int) -> CartItem | None:
        cart = self._store.get(session_id, {})
        item = cart.get(item_id)
        if item is None:
            return None
        item.quantity = quantity
        return item

    def remove_item(self, session_id: str, item_id: str) -> bool:
        cart = self._store.get(session_id, {})
        if item_id not in cart:
            return False
        del cart[item_id]
        return True

    def find_by_product(self, session_id: str, product_id: int) -> CartItem | None:
        cart = self._store.get(session_id, {})
        for item in cart.values():
            if item.product_id == product_id:
                return item
        return None
