# 🎯 What's Next? - SentinelCode Development Roadmap

**Last Updated:** October 27, 2025  
**Current Phase:** Phase 2 - GitHub Integration (80% Complete)

---

## ✅ What We've Accomplished

### Phase 2: GitHub Integration - MAJOR MILESTONE! 🎉

**Completed:**
- ✅ GitHub OAuth App registered and configured
- ✅ Backend authentication fully working
- ✅ User account created (Tez2213 / tejasvikes@gmail.com)
- ✅ Database setup with all tables (users, repositories, reviews, issues)
- ✅ JWT token generation (30-day expiration)
- ✅ GitHub access tokens stored securely
- ✅ API routes properly structured (`/api/v1/*`)
- ✅ Documentation complete (OAUTH_SUCCESS.md, OAUTH_TEST_READY.md)

**Test Results:**
- OAuth flow: ✅ Working end-to-end
- User creation: ✅ Successful
- Token storage: ✅ Verified in database
- Backend server: ✅ Running stable on port 8000

---

## 🚀 Immediate Next Steps (This Week)

### **Priority 1: Complete Frontend Token Handling** 🔥 URGENT

**Why:** Your login works, but the dashboard needs to handle the JWT token properly.

**What to do:**

1. **Update Dashboard to Handle JWT Token**
   ```bash
   # File to edit: src/app/dashboard/page.tsx
   ```

   **Tasks:**
   - Extract JWT token from URL query parameter (`?token=...`)
   - Store token in localStorage
   - Fetch user data from `/api/v1/auth/me` endpoint
   - Redirect to landing if no token found
   - Clear URL after token extraction

2. **Implement `/api/v1/auth/me` Endpoint**
   ```bash
   # File to edit: backend/app/routers/auth.py
   ```

   **Tasks:**
   - Add JWT token validation
   - Extract user ID from token
   - Fetch user from database
   - Return user data (username, email, avatar, etc.)

3. **Create Auth Middleware**
   ```bash
   # File to create: backend/app/core/auth.py
   ```

   **Tasks:**
   - JWT verification function
   - Get current user dependency
   - Handle expired tokens
   - Return 401 for invalid tokens

**Estimated Time:** 2-3 hours

---

### **Priority 2: GitHub API Service** 🔧 IMPORTANT

**Why:** Need to fetch user repositories from GitHub.

**What to do:**

1. **Create GitHub Service**
   ```bash
   # File to create: backend/app/services/github.py
   ```

   **Functions to implement:**
   ```python
   async def get_user_repositories(access_token: str)
   async def get_repository_details(owner: str, repo: str, access_token: str)
   async def get_commit_diff(owner: str, repo: str, commit_sha: str, access_token: str)
   async def post_pr_comment(owner: str, repo: str, pr_number: int, comment: str, access_token: str)
   async def create_webhook(owner: str, repo: str, webhook_url: str, access_token: str)
   ```

2. **Add Repository Listing Endpoint**
   ```bash
   # File to edit: backend/app/routers/repos.py
   ```

   **Endpoint:**
   ```python
   @router.get("/")
   async def list_repositories(
       current_user: User = Depends(get_current_user),
       db: Session = Depends(get_db)
   ):
       # Fetch from GitHub API using user's access_token
       # Return list of repositories
   ```

3. **Update Dashboard UI to Show Repositories**
   ```bash
   # File to edit: src/app/dashboard/page.tsx
   ```

   **Tasks:**
   - Fetch repositories from `/api/v1/repos`
   - Display repository cards
   - Add "Enable Monitoring" button per repo
   - Show repository stats

**Estimated Time:** 3-4 hours

---

### **Priority 3: Repository Management** 📦 IMPORTANT

**Why:** Users need to select which repos to monitor.

**What to do:**

1. **Enable/Disable Repository Monitoring**
   ```bash
   # File to edit: backend/app/routers/repos.py
   ```

   **Endpoints:**
   ```python
   @router.post("/{repo_id}/enable")
   async def enable_repository(repo_id: int, ...)
   
   @router.delete("/{repo_id}/disable")
   async def disable_repository(repo_id: int, ...)
   ```

2. **Store Repository in Database**
   - Save GitHub repo metadata to `repositories` table
   - Link to user via `user_id`
   - Mark as enabled/disabled

3. **Update Frontend**
   - Add toggle buttons for each repo
   - Show enabled/disabled status
   - Sync with backend state

**Estimated Time:** 2-3 hours

---

## 📅 This Week's Plan (Oct 27 - Nov 3)

### Day 1-2: Frontend Token Handling ✅ Priority 1
- [ ] Update dashboard to extract and store JWT token
- [ ] Implement `/api/v1/auth/me` endpoint
- [ ] Create auth middleware for protected routes
- [ ] Test login flow end-to-end

### Day 3-4: GitHub API Integration ✅ Priority 2
- [ ] Create GitHub service with API functions
- [ ] Add repository listing endpoint
- [ ] Update dashboard to show user repositories
- [ ] Test fetching repositories from GitHub

### Day 5-6: Repository Management ✅ Priority 3
- [ ] Implement enable/disable endpoints
- [ ] Add repository storage to database
- [ ] Build repository selection UI
- [ ] Test enabling monitoring on a test repo

### Day 7: Testing & Documentation
- [ ] End-to-end testing of all features
- [ ] Update documentation
- [ ] Fix any bugs found
- [ ] Prepare for Phase 3 (webhook handlers)

---

## 🎯 Quick Start Guide

### 1. Start Development Environment

```powershell
# Terminal 1 - Backend (if not running)
cd c:\Users\tejas\OneDrive\Desktop\codesage\backend
python -m uvicorn app.main:app --reload

# Terminal 2 - Frontend
cd c:\Users\tejas\OneDrive\Desktop\codesage
npm run dev
```

### 2. Test Current OAuth Flow

1. Open: `http://localhost:3000/landing`
2. Click "Login with GitHub"
3. You'll be redirected to dashboard with token in URL
4. **Expected:** Dashboard should extract token and show your profile

### 3. Start Implementing Priority 1

**File to edit first:** `src/app/dashboard/page.tsx`

Add this code at the top of the component:

```typescript
'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function Dashboard() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get token from URL
    const token = searchParams.get('token');
    
    if (token) {
      // Store token in localStorage
      localStorage.setItem('auth_token', token);
      
      // Remove token from URL for security
      router.replace('/dashboard');
      
      // Fetch user data
      fetchUserData(token);
    } else {
      // Check if token exists in localStorage
      const storedToken = localStorage.getItem('auth_token');
      if (storedToken) {
        fetchUserData(storedToken);
      } else {
        // No token found, redirect to landing
        router.push('/landing');
      }
    }
  }, [searchParams, router]);

  const fetchUserData = async (token: string) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/me`,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch user');
      }
      
      const data = await response.json();
      setUser(data);
    } catch (error) {
      console.error('Failed to fetch user:', error);
      // If token is invalid, clear and redirect
      localStorage.removeItem('auth_token');
      router.push('/landing');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return null; // Will redirect
  }

  // Rest of your dashboard component...
}
```

---

## 🗺️ Big Picture Roadmap

### ✅ Phase 1: Foundation (COMPLETE)
- GCP infrastructure (planned)
- Database schema
- Backend scaffolding
- Authentication

### 🔄 Phase 2: GitHub Integration (80% COMPLETE)
- OAuth ✅
- Token handling ⏳ IN PROGRESS
- Repository fetching ⏳ NEXT
- Webhook setup ⏳ UPCOMING

### 📅 Phase 3: Static Analysis (Starting Nov 10)
- Language detection
- Integrate Bandit, ESLint, Semgrep
- AST parsing with Tree-sitter
- Unified issue format

### 📅 Phase 4: AI Integration (Starting Nov 24)
- Vertex AI Gemini setup
- Prompt engineering
- AI review pipeline
- Confidence scoring

### 📅 Phase 5: Auto-Patch Generation (Starting Dec 8)
- Patch generation logic
- GitHub PR creation
- User interaction buttons
- Test validation

---

## 📊 Progress Tracker

| Phase | Status | Completion | ETA |
|-------|--------|-----------|-----|
| Phase 1: Foundation | ✅ Complete | 100% | Done |
| Phase 2: GitHub Integration | 🔄 In Progress | 80% | Nov 3 |
| Phase 3: Static Analysis | ⏳ Planned | 0% | Nov 17 |
| Phase 4: AI Integration | ⏳ Planned | 0% | Dec 1 |
| Phase 5: Auto-Patch | ⏳ Planned | 0% | Dec 15 |
| Phase 6: Feedback Loop | ⏳ Planned | 0% | Jan 5 |
| Phase 7: Dashboard | ⏳ Planned | 0% | Jan 19 |
| Phase 8: Multi-Platform | ⏳ Planned | 0% | Feb 2 |

**Overall Project Progress:** 30% Complete

---

## 🎓 Learning Resources

### For Frontend Token Handling:
- [Next.js useSearchParams](https://nextjs.org/docs/app/api-reference/functions/use-search-params)
- [localStorage API](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)
- [JWT Best Practices](https://jwt.io/introduction)

### For GitHub API:
- [GitHub REST API Docs](https://docs.github.com/en/rest)
- [GitHub OAuth Apps](https://docs.github.com/en/apps/oauth-apps)
- [Python httpx Library](https://www.python-httpx.org/)

### For FastAPI:
- [FastAPI Dependencies](https://fastapi.tiangolo.com/tutorial/dependencies/)
- [JWT with FastAPI](https://fastapi.tiangolo.com/tutorial/security/oauth2-jwt/)
- [SQLAlchemy Relationships](https://docs.sqlalchemy.org/en/20/orm/relationships.html)

---

## 🐛 Common Issues & Solutions

### Issue: Token not extracted from URL
**Solution:** Make sure you're using `useSearchParams()` from `next/navigation`, not `next/router`

### Issue: CORS error when calling `/api/v1/auth/me`
**Solution:** Verify backend `CORS_ORIGINS` includes `http://localhost:3000`

### Issue: "Invalid token" error
**Solution:** Check JWT_SECRET_KEY is the same in backend `.env` and token generation

### Issue: GitHub API rate limit
**Solution:** Use authenticated requests (include access token in headers)

---

## 💡 Pro Tips

1. **Test Incrementally:** Don't implement all features at once. Test after each small change.

2. **Use Browser DevTools:** Check Network tab for API calls, Console for errors.

3. **Database Inspection:** Use DB Browser for SQLite to view database directly.

4. **API Documentation:** Visit `http://localhost:8000/api/docs` for Swagger UI.

5. **Git Commits:** Commit after each working feature for easy rollback.

---

## 🎯 Success Criteria for This Week

By end of this week, you should have:

- ✅ Dashboard showing your GitHub profile (username, email, avatar)
- ✅ List of your repositories displayed in dashboard
- ✅ Ability to enable/disable monitoring per repository
- ✅ JWT token properly stored and used for API calls
- ✅ All features tested and working smoothly

**Then you're ready for Phase 3: Building the actual code analysis engine!**

---

## 📞 Need Help?

- **Backend Issues:** Check `backend/app/` files and logs
- **Frontend Issues:** Check browser console and Next.js terminal
- **Database Issues:** Inspect `backend/sentinelcode.db` with DB Browser
- **API Issues:** Use `http://localhost:8000/api/docs` to test endpoints

**Quick Debug Command:**
```powershell
# Check backend status
curl http://localhost:8000/health

# Test auth endpoint (replace TOKEN with your JWT)
curl http://localhost:8000/api/v1/auth/me -H "Authorization: Bearer TOKEN"
```

---

**Let's build something amazing! 🚀**

Your OAuth is working perfectly - now let's make the dashboard come alive!
