# ✅ Backend Setup Checklist

Copy this checklist to track your setup progress!

## 📋 Initial Setup

- [ ] Navigate to backend folder: `cd backend`
- [ ] Create virtual environment: `python -m venv venv`
- [ ] Activate venv: `.\venv\Scripts\Activate.ps1`
- [ ] Install dependencies: `pip install -r requirements.txt`
- [ ] Copy environment template: `copy .env.example .env`

## 🔑 GitHub OAuth Setup

**📖 Detailed guide: [GITHUB_SETUP.md](./GITHUB_SETUP.md)**

- [ ] **Go to GitHub Developer Settings**
  - Visit: https://github.com/settings/developers
  - Click "OAuth Apps" in sidebar

- [ ] **Create New OAuth App**
  - Click "New OAuth App" button
  - Application name: `SentinelCode Local`
  - Homepage URL: `http://localhost:3000`
  - Callback URL: `http://localhost:8000/api/v1/auth/github/callback`
  - Click "Register application"

- [ ] **Copy Client ID**
  - Displayed on app settings page
  - Format: `Iv1.xxxxxxxxxx`
  - Add to `.env` as `GITHUB_CLIENT_ID`

- [ ] **Generate Client Secret**
  - Click "Generate a new client secret"
  - **⚠️ Copy immediately** (you can't see it again!)
  - Format: long alphanumeric string
  - Add to `.env` as `GITHUB_CLIENT_SECRET`

- [ ] **Verify callback URL**
  - Double-check it matches: `http://localhost:8000/api/v1/auth/github/callback`
  - No trailing slash
  - Exact match required

## 🗄️ Database Setup

### Option A: Docker PostgreSQL (Recommended for Quick Start)
- [ ] Run: `docker run --name sentinelcode-postgres -e POSTGRES_PASSWORD=password -e POSTGRES_DB=sentinelcode_dev -p 5432:5432 -d postgres:14`
- [ ] Update `.env`: `DATABASE_URL=postgresql://postgres:password@localhost:5432/sentinelcode_dev`

### Option B: Local PostgreSQL
- [ ] Install PostgreSQL 14+
- [ ] Create database: `createdb sentinelcode_dev`
- [ ] Update `.env` with your PostgreSQL connection string

## 🔐 Security Configuration

- [ ] **Generate SECRET_KEY**
  - Run: `python -c "import secrets; print(secrets.token_urlsafe(32))"`
  - Copy the output
  - Add to `.env`: `SECRET_KEY=<your-random-key>`

- [ ] **Verify all environment variables**
  - `DATABASE_URL` set correctly
  - `GITHUB_CLIENT_ID` added
  - `GITHUB_CLIENT_SECRET` added
  - `GITHUB_REDIRECT_URI` set to callback URL
  - `SECRET_KEY` generated and added
  - `ALGORITHM=HS256`
  - `ACCESS_TOKEN_EXPIRE_MINUTES=43200`

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
