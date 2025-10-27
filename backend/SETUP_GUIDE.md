# 🚀 SentinelCode Backend - Complete Setup Guide

## ✅ What We've Built

Your backend structure is now complete with:

- ✅ FastAPI application with all routers
- ✅ SQLAlchemy models (User, Repository, Review, Issue)
- ✅ Database configuration and migrations (Alembic)
- ✅ GitHub OAuth authentication
- ✅ JWT security implementation
- ✅ API endpoints for all features
- ✅ Docker configuration
- ✅ Complete documentation

## 📁 Project Structure

```
backend/
├── app/
│   ├── core/               # Core configuration
│   │   ├── config.py      # Settings from environment
│   │   ├── database.py    # Database connection
│   │   └── security.py    # JWT & password hashing
│   ├── models/            # Database models
│   │   ├── user.py
│   │   ├── repository.py
│   │   ├── review.py
│   │   └── issue.py
│   ├── routers/           # API endpoints
│   │   ├── auth.py        # GitHub OAuth
│   │   ├── repos.py       # Repository management
│   │   ├── reviews.py     # Review operations
│   │   ├── webhooks.py    # GitHub webhooks
│   │   └── dashboard.py   # Metrics & analytics
│   ├── schemas/           # Pydantic schemas (ready for your definitions)
│   ├── services/          # Business logic (ready for implementation)
│   ├── utils/             # Utility functions
│   └── main.py            # FastAPI application
├── alembic/               # Database migrations
├── tests/                 # Test files
├── Dockerfile             # Container configuration
├── requirements.txt       # Python dependencies
├── .env.example          # Environment template
└── README.md             # Documentation
```

## 🛠️ Setup Instructions

### Step 1: Navigate to Backend Directory

```powershell
cd backend
```

### Step 2: Create Python Virtual Environment

```powershell
python -m venv venv
```

### Step 3: Activate Virtual Environment

```powershell
.\venv\Scripts\Activate.ps1
```

### Step 4: Install Dependencies

```powershell
pip install -r requirements.txt
```

### Step 5: Set Up Environment Variables

```powershell
# Copy the example file
copy .env.example .env

# Open .env and configure these REQUIRED variables:
# - SECRET_KEY (generate a random string)
# - JWT_SECRET_KEY (generate another random string)
# - DATABASE_URL (PostgreSQL connection)
# - GITHUB_CLIENT_ID (create GitHub OAuth app)
# - GITHUB_CLIENT_SECRET (from GitHub OAuth app)
```

### Step 6: Set Up PostgreSQL Database

#### Option A: Local PostgreSQL
```powershell
# Install PostgreSQL if not already installed
# Then create database:
psql -U postgres
CREATE DATABASE sentinelcode_dev;
\q
```

#### Option B: Docker PostgreSQL
```powershell
docker run --name sentinelcode-postgres `
  -e POSTGRES_PASSWORD=password `
  -e POSTGRES_DB=sentinelcode_dev `
  -p 5432:5432 `
  -d postgres:14
```

### Step 7: Run Database Migrations

```powershell
# Create initial migration
alembic revision --autogenerate -m "Initial schema"

# Apply migrations
alembic upgrade head
```

### Step 8: Start the Backend Server

```powershell
uvicorn app.main:app --reload
```

The API will be running at: **http://localhost:8000**

## 📚 API Endpoints

### Documentation
- **Swagger UI**: http://localhost:8000/api/docs
- **ReDoc**: http://localhost:8000/api/redoc

### Available Endpoints

#### Authentication
- `GET /api/auth/github` - GitHub OAuth login
- `GET /api/auth/github/callback` - OAuth callback
- `GET /api/auth/me` - Get current user

#### Repositories
- `GET /api/repos` - List repositories
- `POST /api/repos/{id}/enable` - Enable monitoring
- `DELETE /api/repos/{id}/disable` - Disable monitoring
- `POST /api/repos/{id}/scan` - Trigger manual scan

#### Reviews
- `GET /api/reviews` - List reviews
- `GET /api/reviews/{id}` - Get review details
- `POST /api/reviews/{id}/feedback` - Submit feedback

#### Webhooks
- `POST /api/webhooks/github` - GitHub webhook handler
- `POST /api/webhooks/gitlab` - GitLab webhook handler
- `POST /api/webhooks/bitbucket` - Bitbucket webhook handler

#### Dashboard
- `GET /api/dashboard/metrics` - Get metrics
- `GET /api/dashboard/heatmap` - Get risk heatmap
- `GET /api/dashboard/trends` - Get trends
- `POST /api/dashboard/export` - Export report

## 🔑 GitHub OAuth Setup

1. Go to GitHub → Settings → Developer settings → OAuth Apps
2. Click "New OAuth App"
3. Fill in:
   - **Application name**: SentinelCode Dev
   - **Homepage URL**: http://localhost:3000
   - **Authorization callback URL**: http://localhost:8000/api/auth/github/callback
4. Save the Client ID and Client Secret to your `.env` file

## 🧪 Testing the Backend

### Test Health Check
```powershell
curl http://localhost:8000/health
```

### Test GitHub OAuth Flow
1. Visit: http://localhost:8000/api/auth/github
2. Authorize with GitHub
3. You'll be redirected to frontend with JWT token

### Test API Endpoints
```powershell
# List repositories
curl http://localhost:8000/api/repos

# Get metrics
curl http://localhost:8000/api/dashboard/metrics
```

## 📝 Next Development Steps

### Phase 1: Core Features (Current)
- ✅ Backend structure created
- ✅ Database models defined
- ✅ API endpoints scaffolded
- ✅ GitHub OAuth ready

### Phase 2: GitHub Integration (Next)
- [ ] Complete GitHub API client service
- [ ] Implement repository fetching
- [ ] Set up webhook signature verification
- [ ] Test webhook event handling

### Phase 3: Static Analysis (After Phase 2)
- [ ] Integrate Bandit for Python security
- [ ] Integrate ESLint for JavaScript
- [ ] Integrate Semgrep for multi-language
- [ ] Create unified issue format

### Phase 4: AI Integration (After Phase 3)
- [ ] Set up Google Vertex AI
- [ ] Implement Gemini 1.5 Pro integration
- [ ] Create prompt engineering pipeline
- [ ] Merge AI + static analysis results

## 🐳 Docker Deployment

### Build Docker Image
```powershell
docker build -t sentinelcode-backend .
```

### Run Container
```powershell
docker run -p 8000:8000 --env-file .env sentinelcode-backend
```

## 🔧 Development Commands

### Run Tests
```powershell
pytest
```

### Code Formatting
```powershell
black app/
```

### Type Checking
```powershell
mypy app/
```

### Create Migration
```powershell
alembic revision --autogenerate -m "description"
```

### Apply Migration
```powershell
alembic upgrade head
```

### Rollback Migration
```powershell
alembic downgrade -1
```

## 🌐 Connecting Frontend to Backend

Update your Next.js `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

The frontend is already configured to connect to the backend API.

## 📊 Database Schema

Your database includes these tables:

- **users** - User accounts from GitHub/GitLab/Bitbucket
- **repositories** - Connected repositories
- **reviews** - Code review records
- **issues** - Detected issues in reviews
- **feedback** - (to be added) Developer feedback on AI suggestions
- **patches** - (to be added) Auto-generated code fixes
- **daily_metrics** - (to be added) Aggregated metrics

## 🚨 Common Issues & Solutions

### Issue: Port 8000 already in use
```powershell
# Find process using port 8000
netstat -ano | findstr :8000

# Kill the process (use PID from above)
taskkill /PID <PID> /F
```

### Issue: Database connection failed
- Check PostgreSQL is running
- Verify DATABASE_URL in .env
- Ensure database exists: `sentinelcode_dev`

### Issue: Module not found errors
- Ensure virtual environment is activated
- Reinstall dependencies: `pip install -r requirements.txt`

## 📖 Additional Resources

- **FastAPI Docs**: https://fastapi.tiangolo.com
- **SQLAlchemy Docs**: https://docs.sqlalchemy.org
- **Alembic Docs**: https://alembic.sqlalchemy.org
- **GitHub OAuth**: https://docs.github.com/en/developers/apps/oauth-apps

## 🎯 Ready to Build!

Your backend is now fully set up and ready for development. The next steps are:

1. ✅ **Test the current setup** - Make sure everything runs
2. ⏭️ **Implement GitHub service** - Complete the GitHub API integration
3. ⏭️ **Add webhook handling** - Process GitHub events
4. ⏭️ **Connect to frontend** - Test the full flow

Happy coding! 🚀
