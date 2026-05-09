# Hybrid Smart Expense Tracker Backend

Production-grade Spring Boot backend for a fintech-style expense tracker with JWT auth, transaction management, analytics, budgets, and Telegram ingestion.

## Tech Stack
- Java 17, Spring Boot 3
- Spring Security + JWT
- Spring Data JPA + Hibernate
- PostgreSQL
- Validation, Lombok, OpenAPI/Swagger
- Docker + docker-compose
- JUnit + Mockito

## Folder Architecture
`src/main/java/com/expensetracker/`
- `controller/`
- `service/`
- `repository/`
- `entity/`
- `dto/`
- `config/`
- `security/`
- `telegram/`
- `analytics/`
- `budget/`
- `exception/`
- `util/`

## Main APIs
- Auth: `/api/auth/signup`, `/api/auth/login`, `/api/auth/profile`, `/api/auth/change-password`
- Transactions: `/api/transactions/add`, `/api/transactions/all`, `/api/transactions/history`, `/api/transactions/filter`, `/api/transactions/search`
- Categories: `/api/categories`, `/api/categories/add`
- Analytics: `/api/analytics/monthly`, `/api/analytics/category`, `/api/analytics/savings`, `/api/dashboard/summary`
- Budget: `/api/budget/set`, `/api/budget/all`, `/api/budget/status`, `/api/budget/update`
- Telegram: `/api/telegram/webhook`, `/api/telegram/status`, `/api/telegram/history`

## Run Locally
1. Start PostgreSQL (local or Docker)
2. Copy `.env.example` values into environment variables
3. Run:
   - `mvn clean install`
   - `mvn spring-boot:run`

Swagger UI: `http://localhost:8080/swagger-ui.html`

## Docker Run
- `docker compose up --build`

## Testing
- `mvn test`

## Telegram Parsing
Uses regex + keyword mapping:
- Example input: `Spent 500 on food`
- Parsed to amount `500`, category `Food`, type `DEBIT`, source `TELEGRAM`
