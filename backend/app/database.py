from __future__ import annotations

from collections.abc import AsyncGenerator

from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker, create_async_engine

from app.models.product import Base, Product

DATABASE_URL = "sqlite+aiosqlite:///./chocolate.db"

engine = create_async_engine(DATABASE_URL, echo=False)
async_session_factory = async_sessionmaker(engine, expire_on_commit=False)

SEED_PRODUCTS: list[dict[str, object]] = [
    {
        "name": "Dark Velvet 70%",
        "description": "Rich single-origin dark chocolate with deep cocoa notes.",
        "price": 8.99,
        "image_url": "/images/dark-velvet.jpg",
        "category": "dark",
    },
    {
        "name": "Midnight Noir 85%",
        "description": "Intensely dark chocolate for the purist — bold and bittersweet.",
        "price": 10.49,
        "image_url": "/images/midnight-noir.jpg",
        "category": "dark",
    },
    {
        "name": "Creamy Milk Classic",
        "description": "Smooth, melt-in-your-mouth milk chocolate with a sweet finish.",
        "price": 6.99,
        "image_url": "/images/milk-classic.jpg",
        "category": "milk",
    },
    {
        "name": "Hazelnut Milk Dream",
        "description": "Milk chocolate blended with roasted hazelnuts for a nutty crunch.",
        "price": 9.49,
        "image_url": "/images/hazelnut-milk.jpg",
        "category": "milk",
    },
    {
        "name": "White Velvet Bliss",
        "description": "Silky white chocolate with a hint of Madagascar vanilla.",
        "price": 7.99,
        "image_url": "/images/white-velvet.jpg",
        "category": "white",
    },
    {
        "name": "White Berry Swirl",
        "description": "White chocolate with tangy raspberry and strawberry swirls.",
        "price": 9.99,
        "image_url": "/images/white-berry.jpg",
        "category": "white",
    },
]


async def get_session() -> AsyncGenerator[AsyncSession, None]:
    async with async_session_factory() as session:
        yield session


async def init_db() -> None:
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

    async with async_session_factory() as session:
        from sqlalchemy import select

        result = await session.execute(select(Product).limit(1))
        if result.scalar_one_or_none() is None:
            for data in SEED_PRODUCTS:
                session.add(
                    Product(
                        name=str(data["name"]),
                        description=str(data["description"]),
                        price=float(data["price"]),  # type: ignore[arg-type]
                        image_url=str(data["image_url"]),
                        category=str(data["category"]),
                    )
                )
            await session.commit()
