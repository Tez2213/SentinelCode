# SentinelCode - Page Navigation Guide

## 🎯 All Available Pages

### 1. **Landing Page** - `/landing`
**Purpose:** First entry point, onboarding screen  
**Features:**
- Matrix background animation
- GitHub/GitLab OAuth buttons
- Feature showcase cards
- Demo link
- Terminal-style hero section

**Route:** `http://localhost:3000/landing`

---

### 2. **Demo Page** - `/demo`
**Purpose:** Interactive walkthrough  
**Features:**
- 5-step automated demo
- Play/Pause controls
- Terminal output simulation
- Progress tracking
- Step navigation

**Route:** `http://localhost:3000/demo`

---

### 3. **Repository Setup** - `/setup`
**Purpose:** Connect and select repositories  
**Features:**
- Repository list with toggles
- Search and filters
- Language filtering
- Stats dashboard
- Enable/disable repos

**Route:** `http://localhost:3000/setup`

---

### 4. **Dashboard** - `/dashboard`
**Purpose:** Main project overview  
**Features:**
- Code quality metrics
- Security issues counter
- Area/Pie charts
- Recent reviews table
- Contributor leaderboard
- Sidebar navigation

**Route:** `http://localhost:3000/dashboard`

---

### 5. **Review Report** - `/review/[id]`
**Purpose:** Detailed code review analysis  
**Features:**
- Issue cards with severity
- Suggested patches
- Copy-to-clipboard
- Expand explanations
- Feedback buttons
- Tabbed navigation (AI/Static/Combined)

**Route:** `http://localhost:3000/review/1`  
(Replace `1` with any ID)

---

### 6. **AI Insights** - `/insights`
**Purpose:** Learning analytics and model performance  
**Features:**
- Accuracy improvement chart
- False positives list
- Confidence distribution
- Team customization rules
- Pattern ignore settings

**Route:** `http://localhost:3000/insights`

---

### 7. **Settings** - `/settings`
**Purpose:** Configuration and preferences  
**Features:**
- AI sensitivity levels (Low/Medium/Strict)
- Ruleset selection (PEP8/Airbnb/etc)
- Integration toggles (Slack/Email/Jira)
- API key management
- Danger zone (reset/disconnect)

**Route:** `http://localhost:3000/settings`

---

## 🔗 Quick Navigation Flow

```
/ (root)
  ↓
/landing (Welcome)
  ↓
/demo (Optional: See how it works)
  ↓
/setup (Connect repos)
  ↓
/dashboard (Main view)
  ├→ /review/[id] (View specific review)
  ├→ /insights (AI learning metrics)
  └→ /settings (Configure preferences)
```

---

## 🎨 Component Reusability

### Shared Components Used Across Pages:
- `MatrixBackground` - Used on all pages
- `Button` - All pages
- `Card` - Dashboard, Setup, Review, Insights, Settings
- Charts (Recharts) - Dashboard, Insights

### Navigation Elements:
- Dashboard has permanent sidebar (desktop)
- All other pages have back button to previous page
- Consistent header with page title

---

## 🚀 Quick Start Commands

```bash
# Start development server
npm run dev

# Visit pages:
Landing:     http://localhost:3000/landing
Demo:        http://localhost:3000/demo
Setup:       http://localhost:3000/setup
Dashboard:   http://localhost:3000/dashboard
Review:      http://localhost:3000/review/1
Insights:    http://localhost:3000/insights
Settings:    http://localhost:3000/settings
```

---

## 📱 Responsive Breakpoints

- **Mobile:** < 768px (md)
- **Tablet:** 768px - 1024px (lg)
- **Desktop:** > 1024px

All pages are fully responsive with:
- Collapsible sidebars
- Stacked cards on mobile
- Touch-friendly buttons
- Responsive charts

---

## 🎨 Design Consistency

All pages follow the same design system:
- **Background:** Black with Matrix animation
- **Primary Color:** Emerald (#10b981)
- **Font:** Geist Mono (monospace)
- **Cards:** Glassmorphic with backdrop blur
- **Borders:** Zinc-800 with emerald glow on hover
- **Buttons:** Terminal-style with glow effects

---

## 🔧 Customization Points

Want to customize? Edit these files:
- **Colors:** `src/app/globals.css`
- **Components:** `src/components/ui/*.tsx`
- **Animation:** `src/components/matrix-bg.tsx`
- **Layout:** `src/app/layout.tsx`

---

## 📊 Data Flow (Mock Data)

Currently using mock data in:
- `/setup` - mockRepos array
- `/dashboard` - trendData, severityData, recentReviews
- `/review/[id]` - mockIssues array
- `/insights` - accuracyData, falsePositives

**To connect real API:**
Replace mock data with fetch calls or use React Query/SWR

---

## 🎯 Next Steps

1. ✅ All 7 screens implemented
2. ✅ Hacker-themed UI complete
3. ✅ Responsive design
4. ✅ Animations and interactions
5. 🔲 Connect to real backend API
6. 🔲 Add authentication
7. 🔲 Implement OAuth flows
8. 🔲 WebSocket for real-time updates

---

Happy coding! 🚀
