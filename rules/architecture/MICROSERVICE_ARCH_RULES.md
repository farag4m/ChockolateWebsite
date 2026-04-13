[MICROSERVICE CONTRACT — HARD RULES]

BOUNDARIES
- Each service owns its data
- No direct DB sharing between services

COMMUNICATION
- API → HTTP only (via httpx)
- Async messaging for events (Celery/Dramatiq if used)

COUPLING
- Services must be independent
- No shared internal models

STRUCTURE
- Each service:
  - Router (FastAPI APIRouter)
  - Service layer
  - Repository (DataAPI only)
  - DB (accessed only via DataAPI)

DEPLOYMENT
- Services must be deployable independently via Docker

FORBIDDEN
- Cross-service DB joins
- Shared SQLAlchemy Session across services
- Tight coupling via shared internal models
