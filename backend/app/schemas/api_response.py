from __future__ import annotations

from typing import Generic, TypeVar

from pydantic import BaseModel

T = TypeVar("T")
_DataT = TypeVar("_DataT")


class ApiResponse(BaseModel, Generic[T]):
    success: bool
    data: T | None
    errors: list[str]
    meta: dict[str, object] | None

    @staticmethod
    def ok(
        data: _DataT, meta: dict[str, object] | None = None
    ) -> ApiResponse[_DataT]:
        return ApiResponse(success=True, data=data, errors=[], meta=meta)

    @staticmethod
    def fail(
        errors: list[str], meta: dict[str, object] | None = None
    ) -> ApiResponse[None]:
        return ApiResponse[None](success=False, data=None, errors=errors, meta=meta)
