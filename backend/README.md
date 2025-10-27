# SentinelCode Backend

FastAPI backend for the SentinelCode AI-powered code review platform.

## 🚀 Quick Start

### Prerequisites
- Python 3.11+
- PostgreSQL 14+ (for local development)
- Git

### Setup

1. **Create virtual environment**
```bash
python -m venv venv
.\venv\Scripts\Activate.ps1  # Windows PowerShell
# or
source venv/bin/activate  # Linux/Mac
```

2. **Install dependencies**
```bash
pip install -r requirements.txt
```

3. **Set up environment variables**
```bash
cp .env.example .env
# Edit .env with your configuration
```

4. **Set up PostgreSQL** (local development)
```bash
# Create database
createdb sentinelcode_dev
```

5. **Run database migrations**
```bash
alembic upgrade head
```

6. **Start the server**
```bash
uvicorn app.main:app --reload
```

The API will be available at `http://localhost:8000`

## 📚 API Documentation

- Swagger UI: `http://localhost:8000/api/docs`
- ReDoc: `http://localhost:8000/api/redoc`

## 🏗️ Project Structure

```
backend/
├── app/
│   ├── core/           # Core configuration
│   │   ├── config.py   # Settings
│   │   ├── database.py # Database setup
│   │   └── security.py # Security utilities
│   ├── models/         # SQLAlchemy models
│   │   ├── user.py
│   │   ├── repository.py
│   │   ├── review.py
│   │   └── issue.py
│   ├── routers/        # API endpoints
│   │   ├── auth.py     # Authentication
│   │   ├── repos.py    # Repository management
│   │   ├── reviews.py  # Review operations
│   │   ├── webhooks.py # Webhook handlers
│   │   └── dashboard.py # Dashboard metrics
│   ├── schemas/        # Pydantic schemas
│   ├── services/       # Business logic
│   ├── utils/          # Utilities
│   └── main.py         # FastAPI app
├── tests/              # Test files
├── alembic/            # Database migrations
├── scripts/            # Utility scripts
├── Dockerfile
├── requirements.txt
└── .env.example
```

## 🔧 Development

### Running Tests
```bash
pytest
```

### Code Formatting
```bash
black app/
```

### Type Checking
```bash
mypy app/
```

### Database Migrations

Create a new migration:
```bash
alembic revision --autogenerate -m "description"
```

Apply migrations:
```bash
alembic upgrade head
```

Rollback:
```bash
alembic downgrade -1
```

## 🐳 Docker

Build:
```bash
docker build -t sentinelcode-backend .
```

Run:
```bash
docker run -p 8000:8000 --env-file .env sentinelcode-backend
```

## 📝 Environment Variables

See `.env.example` for all required environment variables.

Key variables:
- `DATABASE_URL`: PostgreSQL connection string
- `SECRET_KEY`: Application secret key
- `GITHUB_CLIENT_ID`: GitHub OAuth app ID
- `GITHUB_CLIENT_SECRET`: GitHub OAuth secret
- `JWT_SECRET_KEY`: JWT signing key

## 🔒 Security

- JWT-based authentication
- GitHub OAuth integration
- Webhook signature verification
- Password hashing with bcrypt
- CORS protection

## 📖 Next Steps

1. Set up GitHub OAuth app
2. Configure database connection
3. Test authentication flow
4. Implement webhook handling
5. Integrate with AI services (Phase 4)

## 🤝 Contributing

See the main project README for contribution guidelines.

## 📄 License

MIT License - see LICENSE file for details
