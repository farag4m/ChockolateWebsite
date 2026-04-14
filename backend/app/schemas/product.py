from __future__ import annotations

from pydantic import BaseModel


class ProductResponse(BaseModel):
    id: int
    name: str
    description: str
    price: float
    image_url: str
    category: str

    model_config = {"from_attributes": True}
