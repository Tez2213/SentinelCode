# ✅ Backend Setup Checklist

Copy this checklist to track your setup progress!

## 📋 Initial Setup

- [ ] Navigate to backend folder: `cd backend`
- [ ] Create virtual environment: `python -m venv venv`
- [ ] Activate venv: `.\venv\Scripts\Activate.ps1`
- [ ] Install dependencies: `pip install -r requirements.txt`
- [ ] Copy environment template: `copy .env.example .env`

## 🔑 GitHub OAuth Setup

- [ ] Go to GitHub Settings → Developer settings → OAuth Apps
- [ ] Click "New OAuth App"
- [ ] Set Application name: "SentinelCode Dev"
- [ ] Set Homepage URL: `http://localhost:3000`
- [ ] Set Callback URL: `http://localhost:8000/api/auth/github/callback`
- [ ] Copy Client ID to `.env` file
- [ ] Copy Client Secret to `.env` file

## 🗄️ Database Setup

### Option A: Docker PostgreSQL (Recommended for Quick Start)
- [ ] Run: `docker run --name sentinelcode-postgres -e POSTGRES_PASSWORD=password -e POSTGRES_DB=sentinelcode_dev -p 5432:5432 -d postgres:14`
- [ ] Update `.env`: `DATABASE_URL=postgresql://postgres:password@localhost:5432/sentinelcode_dev`

### Option B: Local PostgreSQL
- [ ] Install PostgreSQL 14+
- [ ] Create database: `createdb sentinelcode_dev`
- [ ] Update `.env` with your PostgreSQL connection string

## 🔐 Security Configuration

- [ ] Generate SECRET_KEY (random string): `openssl rand -hex 32`
- [ ] Add to `.env`: `SECRET_KEY=<your-random-key>`
- [ ] Generate JWT_SECRET_KEY: `openssl rand -hex 32`
- [ ] Add to `.env`: `JWT_SECRET_KEY=<your-jwt-key>`

## 🗃️ Database Migrations

- [ ] Create initial migration: `alembic revision --autogenerate -m "Initial schema"`
- [ ] Apply migrations: `alembic upgrade head`
- [ ] Verify tables created: Check PostgreSQL or use pgAdmin

## 🚀 Start Backend

- [ ] Start server: `uvicorn app.main:app --reload`
- [ ] Server should start on `http://localhost:8000`
- [ ] Check for any startup errors

## ✅ Test Backend

- [ ] Open: `http://localhost:8000` (should see API info)
- [ ] Open: `http://localhost:8000/health` (should see `{"status": "healthy"}`)
- [ ] Open: `http://localhost:8000/api/docs` (Swagger UI)
- [ ] Test GitHub OAuth: `http://localhost:8000/api/auth/github`

## 🔗 Connect Frontend

- [ ] Open frontend `.env.local`
- [ ] Verify: `NEXT_PUBLIC_API_URL=http://localhost:8000`
- [ ] Start frontend: `npm run dev` (in main project folder)
- [ ] Test login flow from frontend

## 📝 Verify Everything Works

- [ ] Backend running on port 8000
- [ ] Frontend running on port 3000
- [ ] Database accessible
- [ ] GitHub OAuth redirects working
- [ ] API docs accessible
- [ ] No console errors

## 🎯 Ready for Development!

Once all boxes are checked, you're ready to start building features!

**Next Steps:**
1. Read `STATUS.md` to see what to build next
2. Follow `DEVELOPMENT_GUIDE.md` for phase-by-phase implementation
3. Use `SETUP_GUIDE.md` for detailed help

---

## 🐛 Troubleshooting Quick Reference

**Port 8000 in use?**
```powershell
netstat -ano | findstr :8000
taskkill /PID <PID> /F
```

**Database connection failed?**
- Check PostgreSQL is running
- Verify DATABASE_URL in .env
- Test connection: `psql -U postgres -d sentinelcode_dev`

**Module import errors?**
- Ensure venv is activated (you should see `(venv)` in prompt)
- Reinstall: `pip install -r requirements.txt`

**GitHub OAuth not working?**
- Check Client ID and Secret in .env
- Verify callback URL matches GitHub app settings
- Ensure frontend URL is correct

---

**Need detailed help?** See `SETUP_GUIDE.md`  
**Track progress?** See `STATUS.md`  
**Understanding architecture?** See `../DEVELOPMENT_GUIDE.md`
