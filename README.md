# SentinelCode - AI-Powered Code Review Platform

<div align="center">
  
  **Automated, Intelligent Code Review – Continuous. Adaptive. Secure.**
  
  A Next.js-based web application with a hacker-themed UI for automated AI code reviews.

  [Live Demo](http://localhost:3000) | [Documentation](#features) | [Contributing](#contributing)

</div>

---

## 🚀 Features

### 1. **Landing / Onboarding Screen** (`/landing`)
- Matrix-style animated background with binary rain effect
- Terminal-themed typography and animations
- OAuth integration UI for GitHub and GitLab
- Feature showcase with glassmorphic cards
- Interactive demo preview in terminal style

### 2. **Repository Setup** (`/setup`)
- Repository selection interface with search and filters
- Real-time toggle switches for enabling/disabling repos
- Language and visibility filters
- Live statistics dashboard
- Smooth animations with Framer Motion

### 3. **Project Dashboard** (`/dashboard`)
- **Metrics Overview:**
  - Code Quality Score (0-100)
  - Security Issues Counter with trends
  - Review Time Savings percentage
  - AI Accuracy metrics
  
- **Interactive Charts:**
  - Issues trend over time (Area chart)
  - Severity distribution (Pie chart)
  - Real-time data visualization with Recharts

- **Recent Reviews Table:**
  - Live commit tracking
  - Author attribution
  - Issue severity indicators
  - Quick action buttons

- **Contributor Leaderboard:**
  - Top performers ranked
  - Code quality scores
  - Issues fixed tracking

### 4. **Review Report Screen** (`/review/[id]`)
- **Detailed Issue Cards:**
  - File location and line numbers
  - Severity badges (Critical/High/Medium/Low)
  - AI-generated explanations
  - Suggested code patches
  
- **Interactive Features:**
  - Expandable explanations
  - One-click patch copy
  - Apply fix automation
  - Thumbs up/down feedback system

- **Tabbed Navigation:**
  - AI Suggestions
  - Static Analysis
  - Combined Summary

### 5. **AI Learning Insights** (`/insights`)
- Accuracy improvement timeline
- Accepted vs Ignored fixes tracking
- False positive pattern detection
- Model confidence distribution
- Team customization rules
- Pattern ignore settings

### 6. **Settings & Configuration** (`/settings`)
- **AI Sensitivity Levels:**
  - Low (Critical only)
  - Medium (Balanced)
  - Strict (Comprehensive)

- **Ruleset Configuration:**
  - PEP8, Airbnb, Google Style Guide
  - Type checking toggles
  - Docstring coverage
  - Line length enforcement

- **Integrations:**
  - Slack notifications
  - Email alerts
  - Jira ticket creation

- **API Key Management:**
  - Token generation
  - Key rotation
  - Access control

---

## 🎨 Design System

### Color Palette
```css
/* Primary Colors */
--emerald-400: #10b981   /* Success, Active states */
--emerald-500: #059669   /* Primary actions */

/* Severity Colors */
--red-400: #ef4444       /* Critical issues */
--orange-400: #f59e0b    /* High priority */
--yellow-400: #eab308    /* Medium priority */
--emerald-400: #10b981   /* Low priority */

/* Background */
--black: #000000         /* Base background */
--zinc-800: #27272a      /* Card borders */
--zinc-900: #18181b      /* Darker sections */

/* Text */
--white: #ffffff         /* Primary text */
--zinc-400: #a1a1aa      /* Secondary text */
```

### Components Architecture

#### UI Components (`/src/components/ui/`)
- **Button** - Multiple variants (default, ghost, outline, terminal)
- **Card** - Glassmorphic cards with backdrop blur
- All components use Radix UI primitives for accessibility

#### Custom Components
- **MatrixBackground** - Animated binary rain canvas effect
- **TerminalText** - Typewriter animation effect
- **Charts** - Recharts-based data visualizations

---

## 🛠️ Tech Stack

### Core
- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4
- **React:** v19.2

### UI Libraries
- **Animations:** Framer Motion
- **Charts:** Recharts
- **Icons:** Lucide React
- **Components:** Radix UI
  - Dialog
  - Dropdown Menu
  - Tabs
  - Switch
  - Select

### Utilities
- **Class Merging:** clsx + tailwind-merge
- **Fonts:** Geist Sans, Geist Mono

---

## 📦 Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd codesage

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

The app will be available at `http://localhost:3000`

---

## 📁 Project Structure

```
codesage/
├── src/
│   ├── app/
│   │   ├── landing/          # Onboarding screen
│   │   ├── setup/            # Repository selection
│   │   ├── dashboard/        # Main overview
│   │   ├── review/[id]/      # Detailed review
│   │   ├── insights/         # AI learning metrics
│   │   ├── settings/         # Configuration
│   │   ├── layout.tsx        # Root layout
│   │   ├── page.tsx          # Redirect to landing
│   │   └── globals.css       # Global styles
│   ├── components/
│   │   ├── ui/              # Reusable UI components
│   │   ├── matrix-bg.tsx    # Background animation
│   │   └── terminal-text.tsx # Text animation
│   └── lib/
│       └── utils.ts         # Utility functions
├── public/                  # Static assets
├── package.json
├── tsconfig.json
├── next.config.ts
└── postcss.config.mjs
```

---

## 🎯 Navigation

- **/** - Redirects to `/landing`
- **/landing** - Welcome screen with OAuth options
- **/setup** - Repository selection and configuration
- **/dashboard** - Main project overview with metrics
- **/review/[id]** - Detailed code review report
- **/insights** - AI learning and improvement analytics
- **/settings** - Configuration and preferences

---

## 🎨 Key Features Implementation

### 1. Matrix Background Animation
- Canvas-based binary rain effect
- Configurable drop speed and density
- Auto-adjusts to window resize
- Performance optimized with RAF

### 2. Terminal Aesthetic
- Monospace fonts (Geist Mono)
- Emerald green color scheme (#10b981)
- Glowing borders and shadows
- Backdrop blur effects

### 3. Data Visualization
- Real-time chart updates
- Custom tooltips with dark theme
- Monospace font consistency
- Responsive container sizing

### 4. Responsive Design
- Mobile-first approach
- Collapsible sidebar on mobile
- Grid layouts with breakpoints
- Touch-friendly interactions

---

## 🔧 Configuration

### Tailwind CSS
The project uses Tailwind CSS 4 with custom theme configuration in `globals.css`:

```css
@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --font-sans: var(--font-geist-sans);
  --font-mono: var(--font-geist-mono);
}
```

### TypeScript
Strict mode enabled with Next.js optimizations.

---

## 🚦 Roadmap

### Planned Features
- [ ] GitHub OAuth integration
- [ ] GitLab OAuth integration
- [ ] Real API backend integration
- [ ] WebSocket for real-time updates
- [ ] Export reports (PDF/JSON)
- [ ] Multi-repository support
- [ ] Custom rule editor
- [ ] Team management
- [ ] Issues page with filters
- [ ] Metrics deep dive page

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

## 🙏 Acknowledgments

- Design inspiration: Hacker aesthetics and terminal UIs
- UI Components: Radix UI team
- Charts: Recharts library
- Icons: Lucide React
- Framework: Next.js by Vercel

---

<div align="center">
  
  **Built with ❤️ using Next.js and TypeScript**
  
  Star ⭐ this repo if you find it useful!

</div>
