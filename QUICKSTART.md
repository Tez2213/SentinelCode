# 🚀 Quick Start Guide - SentinelCode

**Last Updated:** November 7, 2025

---

## ⚡ Run the Project (2 Simple Steps)

### Step 1: Start Backend (Terminal 1)

```powershell
cd backend
python -m uvicorn app.main:app --reload
```

**✅ Backend Running:**
- API Server: `http://127.0.0.1:8000`
- API Docs: `http://127.0.0.1:8000/api/docs`
- Health Check: `http://127.0.0.1:8000/health`

---

### Step 2: Start Frontend (Terminal 2)

```powershell
npm run dev
```

**✅ Frontend Running:**
- App: `http://localhost:3000`
- Landing Page: `http://localhost:3000/landing`
- Dashboard: `http://localhost:3000/dashboard`

---

## 🎯 Quick Access

### Main URLs:
| Service | URL | Description |
|---------|-----|-------------|
| **Frontend** | http://localhost:3000/landing | Main landing page |
| **Dashboard** | http://localhost:3000/dashboard | User dashboard |
| **Backend API** | http://127.0.0.1:8000 | API root |
| **API Docs** | http://127.0.0.1:8000/api/docs | Swagger UI |
| **Health Check** | http://127.0.0.1:8000/health | Server status |

### Test the App:
1. Open: `http://localhost:3000/landing`
2. Click **"Login with GitHub"**
3. Authorize the app
4. You'll be redirected to the dashboard with your profile

---

## 📋 Project Structure

```
SentinelCode/
├── frontend (Next.js 16)
│   ├── src/app/          # Pages and routes
│   ├── components/       # React components
│   └── .env.local       # Frontend config
│
├── backend (FastAPI)
│   ├── app/
│   │   ├── routers/     # API endpoints
│   │   ├── models/      # Database models
│   │   ├── core/        # Configuration
│   │   └── main.py      # App entry point
│   ├── .env             # Backend config
│   └── sentinelcode.db  # SQLite database
│
└── Documentation
    ├── DEVELOPMENT_GUIDE.md
    ├── NEXT_STEPS.md
    └── OAUTH_SUCCESS.md
```

---

## 🔧 Configuration Files

### Backend Config: `backend/.env`
```env
# Already configured with:
- GitHub OAuth credentials ✅
- Database (SQLite) ✅
- JWT secrets ✅
- CORS settings ✅
```

### Frontend Config: `.env.local`
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_GITHUB_CLIENT_ID=Ov23liWwmDjbAekMWk75
```

---

## 🗄️ Database

**Type:** SQLite (no setup needed!)
**Location:** `backend/sentinelcode.db`

**Tables:**
- `users` - User accounts
- `repositories` - Connected repos
- `reviews` - Code reviews
- `issues` - Detected issues

**View Database:**
- Use [DB Browser for SQLite](https://sqlitebrowser.org/)
- Or VS Code extension: SQLite Viewer

---

## 🎨 Features Already Working

### ✅ Authentication
- GitHub OAuth login
- JWT token generation
- User account creation
- Session management

### ✅ Database
- SQLite auto-creation
- All tables with proper schema
- User data storage
- Access token encryption

### ✅ API Endpoints
- `GET /api/v1/auth/github` - Start OAuth
- `GET /api/v1/auth/github/callback` - OAuth callback
- `GET /api/v1/auth/me` - Get current user
- `GET /health` - Health check
- `GET /api/docs` - API documentation

---

## 🐛 Troubleshooting

### Backend won't start?
```powershell
# Make sure you're in the backend directory
cd backend

# Check Python version (need 3.11+)
python --version

# Install dependencies if needed
pip install -r requirements.txt

# Then start
python -m uvicorn app.main:app --reload
```

### Frontend won't start?
```powershell
# Make sure you're in the root directory
cd c:\Users\tejas\OneDrive\Desktop\codesage

# Install dependencies if needed
npm install

# Then start
npm run dev
```

### Port already in use?
```powershell
# Backend (port 8000)
# Kill process using port 8000
netstat -ano | findstr :8000
taskkill /PID <PID> /F

# Frontend (port 3000)
# Kill process using port 3000
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### CORS errors?
- Check `backend/.env` has: `CORS_ORIGINS=["http://localhost:3000","http://localhost:8000"]`
- Restart backend server after changing `.env`

---

## 📊 Development Status

### ✅ Completed:
- [x] Frontend UI (8 screens)
- [x] Backend structure
- [x] GitHub OAuth integration
- [x] Database setup
- [x] User authentication
- [x] JWT token system

### ⏳ In Progress:
- [ ] Frontend token handling
- [ ] GitHub API integration
- [ ] Repository management
- [ ] Webhook handlers

### 📅 Coming Next:
- [ ] Code analysis engine
- [ ] AI integration (Gemini)
- [ ] Auto-patch generation
- [ ] Dashboard metrics

---

## 📚 Documentation

- **DEVELOPMENT_GUIDE.md** - Complete project roadmap
- **NEXT_STEPS.md** - Detailed action plan
- **OAUTH_SUCCESS.md** - OAuth setup & testing
- **backend/GITHUB_SETUP.md** - GitHub OAuth guide

---

## 🎯 Quick Commands Reference

```powershell
# Start backend
cd backend
python -m uvicorn app.main:app --reload

# Start frontend
npm run dev

# Build frontend
npm run build

# Run frontend in production
npm start

# Check backend health
curl http://localhost:8000/health

# View API docs
# Open: http://localhost:8000/api/docs
```

---

## 🔐 Current Credentials

### GitHub OAuth:
- **Client ID:** `Ov23liWwmDjbAekMWk75`
- **Callback URL:** `http://localhost:8000/api/v1/auth/github/callback`
- **Status:** ✅ Working

### Database:
- **Type:** SQLite
- **File:** `backend/sentinelcode.db`
- **Status:** ✅ Created with all tables

### User Account:
- **Username:** Tez2213
- **Email:** tejasvikes@gmail.com
- **GitHub ID:** 178496036
- **Status:** ✅ Active in database

---

## 🚀 Next Steps After Starting

1. **Test OAuth Flow:**
   - Go to http://localhost:3000/landing
   - Click "Login with GitHub"
   - Verify you're redirected to dashboard

2. **Explore API:**
   - Visit http://localhost:8000/api/docs
   - Test endpoints interactively
   - View schemas and responses

3. **Check Database:**
   - Open `backend/sentinelcode.db` in DB Browser
   - View your user record
   - Explore table schemas

4. **Start Development:**
   - Read `NEXT_STEPS.md` for tasks
   - Follow the priority order
   - Test as you build

---

**Need Help?**
- Check `NEXT_STEPS.md` for detailed guides
- View `DEVELOPMENT_GUIDE.md` for architecture
- See `OAUTH_SUCCESS.md` for auth testing

---

**Happy Coding! 🎉**

The project is ready to run - just start both servers and you're good to go!
