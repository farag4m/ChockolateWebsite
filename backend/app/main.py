from __future__ import annotations

from collections.abc import AsyncGenerator
from contextlib import asynccontextmanager

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from app.api.cart import router as cart_router
from app.api.products import router as products_router
from app.config import settings
from app.database import init_db
from app.exceptions import DomainException
from app.middleware import SecurityHeadersMiddleware
from app.schemas.api_response import ApiResponse


@asynccontextmanager
async def lifespan(app: FastAPI) -> AsyncGenerator[None, None]:
    await init_db()
    yield


app = FastAPI(title="Chocolate Website API", lifespan=lifespan)

app.add_middleware(SecurityHeadersMiddleware)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(products_router)
app.include_router(cart_router)


@app.exception_handler(DomainException)
async def domain_exception_handler(
    request: Request, exc: DomainException
) -> JSONResponse:
    response = ApiResponse[None].fail([exc.message])
    return JSONResponse(status_code=exc.status_code, content=response.model_dump())


@app.exception_handler(Exception)
async def unhandled_exception_handler(
    request: Request, exc: Exception
) -> JSONResponse:
    response = ApiResponse[None].fail(["An unexpected error occurred"])
    return JSONResponse(status_code=500, content=response.model_dump())
