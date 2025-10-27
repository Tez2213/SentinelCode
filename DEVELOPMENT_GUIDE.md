# SentinelCode – Development Guide & Architecture

**Project Title:** SentinelCode – Autonomous Code Intelligence for Continuous Review

**Last Updated:** October 27, 2025

---

## 📋 Table of Contents

1. [Project Overview](#project-overview)
2. [Problem Statement](#problem-statement)
3. [Core Innovation](#core-innovation)
4. [Key Features](#key-features)
5. [Success Metrics](#success-metrics)
6. [Tech Stack](#tech-stack)
7. [GCP Architecture](#gcp-architecture)
8. [Development Phases](#development-phases)
9. [Stage-by-Stage Implementation Flow](#stage-by-stage-implementation-flow)
10. [API Design](#api-design)
11. [Database Schema](#database-schema)
12. [Integration Points](#integration-points)
13. [Security & Privacy](#security--privacy)
14. [Deployment Strategy](#deployment-strategy)
15. [Future Enhancements](#future-enhancements)

---

## 🎯 Project Overview

SentinelCode is an AI-driven code intelligence layer that continuously analyzes every commit across repositories — even before pull requests are created — to detect vulnerabilities, enforce best practices, and automatically propose fixes.

It acts as a **"security and quality sentinel"** that watches the codebase in real time, learns from past reviews, and adapts to a team's unique coding patterns.

### Track 4: Automated Code Review and Quality Assurance

**The Challenge:**
- Development teams spend 25-30% of their time on code reviews
- Bottlenecks in software delivery
- Manual reviews miss security vulnerabilities, coding standard violations, and potential bugs
- Inconsistent review quality leads to technical debt accumulation

**Your Mission:**
Develop an AI-powered code review assistant that:
- Automatically identifies coding standard violations
- Detects potential security vulnerabilities
- Suggests code improvements and optimizations
- Provides consistent review quality metrics
- Integrates with popular version control systems

**Success Metrics:**
- 50% reduction in manual review time
- 80% accuracy in identifying critical issues
- Integration with 5+ development platforms
- Developer satisfaction score above 4.0/5

---

## ❌ Problem Statement

Traditional static analysis tools catch surface-level issues but fail at:

1. **Understanding Context** – Why a piece of code might be risky
2. **Learning from Previous Patterns** – No memory of past review decisions
3. **Project-Specific Insights** – Cannot detect internal API misuse
4. **Explainable Feedback** – Inconsistent across developers and tools

---

## 💡 Core Innovation

SentinelCode operates **continuously** — analyzing every commit, correlating patterns across files, and learning from team decisions.

**Key Differentiators:**
- Most tools perform static review only at PR level
- SentinelCode becomes a **living quality gatekeeper**
- Improves accuracy the more it's used
- Combines **LLM reasoning + graph-based insights + human feedback loops**

### Core Technology Stack

**Self-Learning Code Review Agent:**
- Graph-based static analysis
- LLM reasoning (Gemini 1.5 Pro / Claude)
- Behavioral memory system

**Capabilities:**
- Detect security, performance, and design flaws
- Recommend concrete fixes in developer-friendly patches
- Track project health metrics (code churn, complexity, risk trends)
- Learn from accepted and rejected suggestions

---

## 🚀 Key Features

| Category | Description |
|----------|-------------|
| **1. Contextual AI Review** | Uses LLM (Gemini Pro/Claude) fine-tuned for reasoning over code graphs. Instead of plain text, model sees structured code context (imports, dependencies, AST). |
| **2. Vulnerability Detection** | Leverages rule-based security scanners (Bandit, Semgrep) and fuses output with LLM reasoning to confirm or dismiss false positives. |
| **3. Auto-Patch Generation** | Not only flags issues but generates tested code patches as pull requests. Developers can accept or reject them directly. |
| **4. Continuous Learning Feedback Loop** | When a developer accepts/rejects an AI suggestion, it trains a feedback model that adjusts future suggestions for that repo. |
| **5. Risk Heatmap Dashboard** | Visualize hotspots of risk or technical debt using dependency graphs, showing which files/modules need urgent attention. |
| **6. Multi-Repo & Multi-Platform Integration** | Works across GitHub, GitLab, and Bitbucket through webhooks. Supports major languages: Python, JS/TS, Go, Java. |

---

## 📊 Success Metrics

| Metric | Target |
|--------|--------|
| Reduction in manual review time | >60% |
| Accuracy in identifying critical issues | >85% |
| False-positive rate | <10% |
| Integration coverage | 5+ major CI/CD platforms |
| Developer satisfaction | 4.5/5 average feedback score |

---

## 🛠️ Tech Stack

### Frontend (✅ Already Built)
- **Framework:** Next.js 16 with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4
- **Components:** Radix UI, Framer Motion
- **Charts:** Recharts
- **Icons:** Lucide React

### Backend (To Build)
- **API Framework:** FastAPI (Python)
- **LLM Integration:** Google Vertex AI (Gemini 1.5 Pro)
- **Static Analysis:**
  - **Python:** Bandit, pylint
  - **JavaScript/TypeScript:** ESLint, Semgrep
  - **Go:** staticcheck, gosec
  - **Java:** SpotBugs, PMD
- **AST Parsing:** Tree-sitter
- **Task Queue:** Cloud Tasks
- **Authentication:** OAuth 2.0 (GitHub, GitLab, Bitbucket)

### Database
- **Primary Database:** Cloud SQL (PostgreSQL)
- **Vector Store:** Vertex AI Vector Search (for code embeddings)
- **Cache:** Cloud Memorystore (Redis)
- **Object Storage:** Cloud Storage (for code snapshots, reports)

### Infrastructure (GCP)
- **Compute:** Cloud Run (serverless containers)
- **AI/ML:** Vertex AI (Gemini 1.5 Pro API)
- **Networking:** Cloud Load Balancing, Cloud Armor
- **Monitoring:** Cloud Monitoring, Cloud Logging
- **CI/CD:** Cloud Build
- **Secrets:** Secret Manager

---

## ☁️ GCP Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         FRONTEND TIER                            │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  Next.js App (Cloud Run)                                  │  │
│  │  - Dashboard UI                                           │  │
│  │  - Repository Setup                                       │  │
│  │  - Review Insights                                        │  │
│  └──────────────────────────────────────────────────────────┘  │
│                              ↓                                   │
│                    Cloud Load Balancer                           │
└─────────────────────────────────────────────────────────────────┘
                               ↓
┌─────────────────────────────────────────────────────────────────┐
│                         BACKEND TIER                             │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  FastAPI Service (Cloud Run)                              │  │
│  │  ┌────────────────────────────────────────────────────┐  │  │
│  │  │ API Endpoints:                                      │  │  │
│  │  │ - /auth/github (OAuth)                             │  │  │
│  │  │ - /webhooks/github (Webhook receiver)              │  │  │
│  │  │ - /scan (Manual scan trigger)                      │  │  │
│  │  │ - /feedback (Developer feedback)                   │  │  │
│  │  │ - /reports/:id (Fetch review reports)             │  │  │
│  │  └────────────────────────────────────────────────────┘  │  │
│  └──────────────────────────────────────────────────────────┘  │
│                              ↓                                   │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  Analysis Engine (Cloud Run Jobs)                        │  │
│  │  ┌────────────────────────────────────────────────────┐  │  │
│  │  │ 1. Code Fetcher (GitHub API)                       │  │  │
│  │  │ 2. Static Analyzers (Semgrep, Bandit, ESLint)     │  │  │
│  │  │ 3. AST Parser (Tree-sitter)                        │  │  │
│  │  │ 4. AI Reasoner (Vertex AI - Gemini 1.5 Pro)       │  │  │
│  │  │ 5. Result Aggregator                               │  │  │
│  │  │ 6. Patch Generator                                 │  │  │
│  │  └────────────────────────────────────────────────────┘  │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                               ↓
┌─────────────────────────────────────────────────────────────────┐
│                        AI/ML TIER                                │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  Vertex AI                                                │  │
│  │  - Gemini 1.5 Pro (Code reasoning)                        │  │
│  │  - Vector Search (Code embeddings)                        │  │
│  │  - AutoML (Feedback learning model)                       │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                               ↓
┌─────────────────────────────────────────────────────────────────┐
│                        DATA TIER                                 │
│  ┌─────────────────────┐  ┌─────────────────────────────────┐  │
│  │ Cloud SQL           │  │ Cloud Storage                    │  │
│  │ (PostgreSQL)        │  │ - Code snapshots                 │  │
│  │ - Users             │  │ - Analysis reports               │  │
│  │ - Repositories      │  │ - Generated patches              │  │
│  │ - Reviews           │  │ - Training data                  │  │
│  │ - Issues            │  └─────────────────────────────────┘  │
│  │ - Feedback          │                                        │
│  │ - Metrics           │  ┌─────────────────────────────────┐  │
│  └─────────────────────┘  │ Memorystore (Redis)             │  │
│                            │ - Session cache                  │  │
│                            │ - Analysis queue                 │  │
│                            │ - Rate limiting                  │  │
│                            └─────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                               ↓
┌─────────────────────────────────────────────────────────────────┐
│                    INTEGRATION TIER                              │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  External Services                                        │  │
│  │  - GitHub API (PRs, Comments, Webhooks)                   │  │
│  │  - GitLab API                                             │  │
│  │  - Bitbucket API                                          │  │
│  │  - Slack API (Notifications)                              │  │
│  │  - Jira API (Issue tracking)                              │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

### GCP Service Breakdown

#### Compute Layer
- **Cloud Run:** Hosts FastAPI backend + Next.js frontend
- **Cloud Run Jobs:** Executes analysis tasks asynchronously
- **Cloud Tasks:** Queues webhook processing for reliability

#### AI/ML Layer
- **Vertex AI Gemini 1.5 Pro:** Main LLM for code reasoning
- **Vertex AI Vector Search:** Stores code embeddings for similarity search
- **Vertex AI AutoML:** Trains custom feedback model

#### Storage Layer
- **Cloud SQL (PostgreSQL):** Relational data (users, repos, reviews)
- **Cloud Storage:** Blobs (code diffs, reports, patches)
- **Memorystore (Redis):** Caching and job queues

#### Security Layer
- **Secret Manager:** API keys, OAuth secrets
- **Cloud Armor:** DDoS protection, WAF rules
- **IAM:** Fine-grained access control

#### Observability
- **Cloud Monitoring:** Metrics, alerts
- **Cloud Logging:** Centralized logs
- **Cloud Trace:** Distributed tracing

---

## 🏗️ Development Phases

### **Phase 1: Foundation (Weeks 1-2)**
**Goal:** Set up GCP infrastructure and basic backend

**Tasks:**
1. **GCP Project Setup**
   - Create GCP project
   - Enable required APIs (Cloud Run, Cloud SQL, Vertex AI, Secret Manager)
   - Set up billing alerts
   - Configure IAM roles

2. **Database Setup**
   - Deploy Cloud SQL PostgreSQL instance
   - Design initial schema (see Database Schema section)
   - Set up migrations using Alembic
   - Create database connection pool

3. **Backend Scaffolding**
   - Initialize FastAPI project structure
   - Set up Docker containerization
   - Deploy to Cloud Run (staging environment)
   - Configure Cloud Build for CI/CD

4. **Authentication**
   - Implement GitHub OAuth flow
   - Store tokens in Secret Manager
   - Create user session management
   - Build JWT-based API authentication

**Deliverables:**
- ✅ GCP infrastructure provisioned
- ✅ FastAPI backend running on Cloud Run
- ✅ Database schema deployed
- ✅ GitHub OAuth working

---

### **Phase 2: GitHub Integration (Weeks 3-4)** ✅ 80% COMPLETE
**Goal:** Connect to GitHub and receive webhook events

**Tasks:**
1. **GitHub OAuth Setup** ✅ COMPLETE
   - Created comprehensive setup guide ([GITHUB_SETUP.md](./backend/GITHUB_SETUP.md))
   - Registered GitHub OAuth App
   - Obtained Client ID: `Ov23liWwmDjbAekMWk75`
   - Generated Client Secret (stored securely)
   - Configured callback URL: `http://localhost:8000/api/v1/auth/github/callback`
   - Updated `.env` files with credentials
   - Updated frontend with GitHub login button
   - All documentation updated with OAuth setup steps

2. **Authentication Implementation** ✅ COMPLETE
   - ✅ OAuth flow implemented in `app/routers/auth.py`
   - ✅ Token exchange and user creation working
   - ✅ JWT token generation implemented (30-day expiration)
   - ✅ User account created and tested (Tez2213)
   - ✅ Access tokens stored securely in database
   - ✅ Database auto-creation on startup
   - ✅ All API routes under `/api/v1/` prefix
   - ⏳ GitHub service in `app/services/github.py` (next step)
   - ⏳ Token refresh mechanism (future enhancement)

3. **Webhook Handler** ⏳ PENDING - NEXT PRIORITY
   - Build `/webhooks/github` endpoint
   - Verify GitHub webhook signatures
   - Parse push and PR events
   - Queue analysis jobs in Cloud Tasks

4. **GitHub API Integration** ⏳ PENDING
   - Fetch repository metadata
   - Retrieve file diffs for commits
   - Post PR comments
   - Create auto-patch branches

5. **Repository Management** ⏳ PENDING
   - List user repositories
   - Enable/disable monitoring per repo
   - Store webhook registration state
   - Handle webhook deactivation

**Deliverables:**
- ✅ GitHub OAuth App registered
- ✅ Credentials configured in backend `.env`
- ✅ Frontend `.env.local` created with API URL
- ✅ GitHub login button integrated in landing page
- ✅ Backend routes fixed (`/api/v1/` prefix)
- ✅ GitHub OAuth flow WORKING END-TO-END
- ✅ User authentication complete
- ✅ Database tables created (users, repositories, reviews, issues)
- ✅ User account verified (Username: Tez2213, Email: tejasvikes@gmail.com)
- ✅ Documentation: OAUTH_SUCCESS.md, OAUTH_TEST_READY.md
- ⏳ Frontend token handling (next step)
- ⏳ GitHub API service implementation
- ⏳ Webhooks triggering analysis jobs
- ⏳ Repository selection UI functional
- ⏳ PR comments posted successfully

**Current Status:**
- ✅ Backend OAuth fully functional (tested successfully!)
- ✅ User created in database with GitHub access token
- ✅ JWT tokens generating correctly
- ✅ Database: SQLite with all tables
- 🎯 **READY FOR:** Frontend token handling + GitHub API service

---

### **Phase 3: Static Analysis Engine (Weeks 5-6)**
**Goal:** Integrate rule-based code analyzers

**Tasks:**
1. **Language Detection**
   - Detect language from file extensions
   - Route to appropriate analyzer
   - Handle multi-language repos

2. **Python Analysis**
   - Integrate Bandit (security)
   - Integrate pylint (code quality)
   - Parse JSON output to unified format

3. **JavaScript/TypeScript Analysis**
   - Integrate ESLint
   - Integrate Semgrep (security rules)
   - Parse output to unified format

4. **Go & Java Analysis**
   - Integrate gosec + staticcheck (Go)
   - Integrate SpotBugs + PMD (Java)
   - Parse output to unified format

5. **AST Parsing**
   - Set up Tree-sitter for each language
   - Extract code graph (imports, function calls, dependencies)
   - Build structured context for LLM

**Deliverables:**
- ✅ Multi-language static analysis working
- ✅ Unified issue format across analyzers
- ✅ Code graph generation functional
- ✅ 80%+ coverage of common vulnerability types

---

### **Phase 4: AI Integration (Weeks 7-8)**
**Goal:** Add LLM-based code reasoning with Gemini

**Tasks:**
1. **Vertex AI Setup**
   - Enable Vertex AI API
   - Set up authentication
   - Configure quota limits
   - Create prompt engineering pipeline

2. **Prompt Engineering**
   - Design system prompts for code review
   - Structure input: code diff + AST + static analysis results
   - Define output format: JSON with issues, severity, explanations
   - Test on diverse code samples

3. **AI Review Pipeline**
   - Send code context to Gemini 1.5 Pro
   - Parse LLM responses
   - Merge with static analysis results
   - Remove duplicate findings

4. **Confidence Scoring**
   - Assign confidence levels to AI findings
   - Filter low-confidence suggestions
   - Track accuracy over time

**Deliverables:**
- ✅ Gemini integration working
- ✅ Structured prompts generating quality reviews
- ✅ AI + static analysis results merged
- ✅ Confidence scoring implemented

---

### **Phase 5: Auto-Patch Generation (Weeks 9-10)**
**Goal:** Generate and apply code fixes automatically

**Tasks:**
1. **Patch Generation Logic**
   - Use LLM to generate fix code
   - Apply unified diff format
   - Validate syntax before suggesting

2. **GitHub Integration**
   - Create new branch for patches
   - Commit generated fixes
   - Open draft PR with explanation
   - Link to original issue

3. **User Interaction Buttons**
   - Add "Accept Fix" button in PR comments
   - Add "Ignore" and "Explain More" buttons
   - Handle button webhooks
   - Update PR state based on action

4. **Testing Framework**
   - Run unit tests on patched code
   - Report test results in PR
   - Block auto-merge if tests fail

**Deliverables:**
- ✅ Auto-patch PRs created successfully
- ✅ Developer interaction buttons working
- ✅ Test validation integrated
- ✅ 70%+ patch acceptance rate (goal)

---

### **Phase 6: Feedback Learning Loop (Weeks 11-12)**
**Goal:** Implement adaptive learning from developer feedback

**Tasks:**
1. **Feedback Collection**
   - Log all accept/reject decisions
   - Store code context with feedback
   - Track developer identity (privacy-preserving)

2. **Embedding Model**
   - Generate code embeddings with Vertex AI
   - Store in Vector Search index
   - Enable similarity-based retrieval

3. **Learning Model**
   - Train custom model using Vertex AI AutoML
   - Input: code features + past feedback
   - Output: adjusted confidence scores
   - Retrain weekly

4. **Adaptive Prompts**
   - Adjust LLM prompts based on learned patterns
   - Increase weight for frequently accepted issue types
   - Decrease weight for frequently rejected patterns
   - A/B test prompt variations

**Deliverables:**
- ✅ Feedback pipeline operational
- ✅ Vector search indexed
- ✅ Custom learning model deployed
- ✅ Measurable accuracy improvement (10%+ target)

---

### **Phase 7: Dashboard & Visualization (Weeks 13-14)**
**Goal:** Build analytics dashboard for teams

**Tasks:**
1. **Metrics Collection**
   - Track code quality scores per repo
   - Count vulnerabilities by severity
   - Measure review time savings
   - Calculate AI accuracy rates

2. **Frontend Integration**
   - Connect dashboard to backend API
   - Display real-time metrics
   - Show historical trends (charts)
   - Enable filtering (date, repo, user)

3. **Risk Heatmap**
   - Analyze file complexity metrics
   - Identify high-risk modules
   - Visualize dependency graphs
   - Highlight critical paths

4. **Export Features**
   - Generate PDF reports
   - Export JSON data for audits
   - Schedule weekly email summaries
   - Slack/Teams integrations

**Deliverables:**
- ✅ Dashboard shows live metrics
- ✅ Risk heatmap visualization working
- ✅ Export to PDF functional
- ✅ Integration with Slack/Email

---

### **Phase 8: Multi-Platform Support (Weeks 15-16)**
**Goal:** Extend beyond GitHub to GitLab and Bitbucket

**Tasks:**
1. **GitLab Integration**
   - Implement GitLab OAuth
   - Handle GitLab webhooks
   - Post merge request comments
   - Create auto-patch MRs

2. **Bitbucket Integration**
   - Implement Bitbucket OAuth
   - Handle Bitbucket webhooks
   - Post PR comments
   - Create patch PRs

3. **Unified Abstraction Layer**
   - Create platform-agnostic interfaces
   - Abstract repository, PR, webhook models
   - Maintain single analysis pipeline
   - Support multi-platform repos in one account

**Deliverables:**
- ✅ GitLab support functional
- ✅ Bitbucket support functional
- ✅ Users can connect multiple platforms
- ✅ 5+ platform integrations (including GitHub Actions, GitLab CI)

---

### **Phase 9: CI/CD Integration (Week 17)**
**Goal:** Enable command-line and pipeline usage

**Tasks:**
1. **REST API Endpoints**
   - `/scan` endpoint for manual triggers
   - Authentication via API keys
   - Return JSON results
   - Support async polling

2. **GitHub Actions**
   - Create official SentinelCode action
   - Publish to GitHub Marketplace
   - Document usage in README
   - Add status badges

3. **GitLab CI/CD**
   - Create GitLab CI template
   - Document integration steps
   - Support artifacts and reports

4. **CLI Tool**
   - Build Python CLI (`sentinelcode`)
   - Commands: `scan`, `status`, `report`
   - Install via pip
   - Support config files

**Deliverables:**
- ✅ API endpoints production-ready
- ✅ GitHub Action published
- ✅ GitLab CI template available
- ✅ CLI tool installable via pip

---

### **Phase 10: Testing & Optimization (Week 18)**
**Goal:** Ensure reliability, performance, and security

**Tasks:**
1. **Load Testing**
   - Simulate 1000+ concurrent webhooks
   - Measure Cloud Run auto-scaling
   - Optimize database queries
   - Add Redis caching where needed

2. **Security Audit**
   - Penetration testing
   - Verify webhook signature validation
   - Audit IAM permissions
   - Review secret management

3. **Accuracy Testing**
   - Test on 100+ real repos
   - Measure false positive rate
   - Validate against CVE databases
   - Compare with existing tools (SonarQube, Snyk)

4. **Cost Optimization**
   - Analyze GCP billing
   - Optimize Vertex AI usage (batch requests)
   - Implement smart caching
   - Set up budget alerts

**Deliverables:**
- ✅ System handles 10,000+ repos
- ✅ False positive rate <10%
- ✅ Security audit passed
- ✅ Monthly cost under budget

---

### **Phase 11: Beta Launch (Week 19)**
**Goal:** Onboard early users and collect feedback

**Tasks:**
1. **Beta Program**
   - Invite 50 teams
   - Provide onboarding support
   - Collect satisfaction surveys
   - Track key metrics

2. **Documentation**
   - Write API docs (OpenAPI spec)
   - Create video tutorials
   - Build knowledge base
   - Set up community forum

3. **Support System**
   - Set up help desk (Intercom/Zendesk)
   - Create Slack community
   - Monitor user issues
   - Implement feature requests

**Deliverables:**
- ✅ 50+ beta users onboarded
- ✅ 4.0+ satisfaction score
- ✅ Comprehensive documentation
- ✅ Support system operational

---

### **Phase 12: Production Launch (Week 20)**
**Goal:** Public release with marketing and scaling

**Tasks:**
1. **Production Deployment**
   - Migrate to production GCP project
   - Enable auto-scaling
   - Set up monitoring alerts
   - Configure disaster recovery

2. **Marketing Launch**
   - Product Hunt launch
   - Blog post release
   - Social media campaign
   - Developer community outreach

3. **Pricing Model**
   - Free tier (up to 5 repos)
   - Pro tier ($49/month, unlimited repos)
   - Enterprise tier (custom pricing)
   - Annual discount (20%)

4. **Analytics**
   - Track user acquisition
   - Monitor churn rate
   - Measure feature adoption
   - Calculate LTV/CAC

**Deliverables:**
- ✅ Public launch complete
- ✅ 1000+ signups in first week
- ✅ Pricing plans live
- ✅ Analytics dashboard tracking growth

---

## 🔄 Stage-by-Stage Implementation Flow

### **Stage 1: Setup and Onboarding**

**Actors:** Developer / Team Lead  
**Goal:** Integrate SentinelCode with a repository

**Flow:**
1. Developer visits SentinelCode Dashboard (Next.js web app)
2. Logs in using GitHub OAuth
3. Selects repositories to connect
4. SentinelCode automatically registers webhooks to listen for commits and pull requests
5. Initial code scan runs — baseline report is generated

**Output:** Repository is now under continuous AI review

**Backend API Calls:**
```
POST /auth/github/callback
GET /api/user/repos
POST /api/repos/:id/enable
POST /api/repos/:id/scan (initial scan)
```

**Database Changes:**
- Insert user record
- Insert repository records
- Create initial metrics baseline

---

### **Stage 2: Code Commit / Pull Request Trigger**

**Actors:** Developer  
**Goal:** Automatically initiate an AI-powered review on new code

**Flow:**
1. Developer makes a code change → pushes to GitHub
2. GitHub webhook notifies SentinelCode backend (FastAPI)
3. System fetches only the modified files + diff using GitHub API
4. Files are passed to the Static Analysis Layer (Semgrep, ESLint, Bandit)
5. Results and context are compiled into a structured code graph (AST + dependency map)
6. This context is passed to Gemini 1.5 Pro (Vertex AI) with a reasoning prompt:
   ```
   "Analyze the following code and context for security, performance, 
   readability, and best practices. Return structured comments with 
   severity and fix suggestions."
   ```

**Output:** AI generates a JSON report with line-level issues, explanations, and potential patches

**Backend API Flow:**
```
POST /webhooks/github (webhook receiver)
  ↓
Enqueue Cloud Task → Analysis Job
  ↓
Fetch code diff from GitHub API
  ↓
Run static analyzers (parallel)
  ↓
Parse AST with Tree-sitter
  ↓
Call Vertex AI Gemini API
  ↓
Aggregate results
  ↓
Store in Cloud SQL + Cloud Storage
  ↓
Post comments to GitHub PR
```

**Database Changes:**
- Insert review record
- Insert issue records
- Update repository metrics

---

### **Stage 3: AI Review Aggregation**

**Actors:** SentinelCode backend (AI Engine)  
**Goal:** Merge rule-based and AI-based insights into unified results

**Flow:**
1. Merge static scan and Gemini results
2. Remove duplicates and rank issues by severity and confidence
3. Store results in PostgreSQL + Cloud Storage
4. Push summarized review comments back to the GitHub Pull Request as inline comments using the GitHub API

**Output:** Developer sees detailed AI comments directly on the PR — labeled with issue type (e.g., "Security Risk", "Performance", "Code Smell")

**Deduplication Logic:**
```python
def deduplicate_issues(static_issues, ai_issues):
    """
    Match issues by:
    - File path
    - Line number (±2 lines tolerance)
    - Issue category (security/performance/style)
    
    Priority: AI reasoning > Static analysis
    """
    unique_issues = []
    for ai_issue in ai_issues:
        if not has_similar_static_issue(ai_issue, static_issues):
            unique_issues.append(ai_issue)
        else:
            # Merge: use AI explanation + static rule reference
            merged = merge_issues(ai_issue, find_similar(ai_issue, static_issues))
            unique_issues.append(merged)
    return unique_issues
```

---

### **Stage 4: Developer Interaction**

**Actors:** Developer  
**Goal:** Take action on AI review feedback

**Flow:**
1. Developer opens the PR
2. Reviews AI comments inline
3. Clicks "Accept Fix", "Ignore", or "Explain More" (buttons injected by the PR comment bot)
4. Accepted fixes generate a new auto-patch branch created by SentinelCode (using GitHub Actions)
5. Developer merges or reviews those patches

**Output:** Code is improved with minimal manual effort

**GitHub PR Comment Format:**
```markdown
🤖 **SentinelCode AI Review**

**Issue:** SQL Injection Vulnerability  
**Severity:** 🔴 Critical  
**File:** `app/database.py`  
**Line:** 45  
**Confidence:** 95%

**Explanation:**
User input is directly interpolated into SQL query without sanitization.
This allows attackers to execute arbitrary SQL commands.

**Suggested Fix:**
Use parameterized queries instead of string concatenation.

**Actions:**
[✅ Accept Fix] [❌ Ignore] [💬 Explain More]

---
*Powered by SentinelCode AI • [Learn More](https://sentinelcode.dev)*
```

**Webhook Handler for Button Clicks:**
```
POST /webhooks/github/actions
{
  "action": "accept_fix",
  "issue_id": "rev_123_issue_456",
  "pr_number": 789,
  "repo": "user/repo"
}
```

---

### **Stage 5: Feedback Learning Loop**

**Actors:** AI Engine  
**Goal:** Learn from developer preferences for adaptive improvements

**Flow:**
1. Every time a suggestion is accepted or ignored:
   - System logs that response in the feedback database
   - Embedding model updates the confidence weighting for similar code patterns
   - Gemini's contextual prompt adjusts future reviews to reflect learned preferences

**Output:** Over time, SentinelCode becomes more accurate and project-aware

**Feedback Schema:**
```sql
CREATE TABLE feedback (
  id SERIAL PRIMARY KEY,
  review_id INTEGER REFERENCES reviews(id),
  issue_id INTEGER REFERENCES issues(id),
  action VARCHAR(20), -- 'accepted', 'rejected', 'explained'
  developer_id INTEGER REFERENCES users(id),
  timestamp TIMESTAMP DEFAULT NOW(),
  code_embedding VECTOR(768), -- for similarity search
  context JSONB -- store code context
);
```

**Learning Process:**
1. **Embedding Generation:** Generate vector for code snippet
2. **Vector Search:** Find similar past issues
3. **Confidence Adjustment:** 
   - If similar issues were accepted → increase confidence
   - If similar issues were rejected → decrease confidence
4. **Model Retraining:** Weekly batch update to AutoML model

---

### **Stage 6: Dashboard Visualization**

**Actors:** Team Lead / Reviewer  
**Goal:** Track overall code quality, security, and review performance

**Flow:**
1. Opens the SentinelCode dashboard
2. Views:
   - **Code Quality Score** (weighted average by severity)
   - **Security Vulnerabilities trend** (per repo)
   - **AI Detection Accuracy** (based on user feedback)
   - **Risk Heatmap** – shows hotspots in the repository (files/modules with most issues)
3. Can filter by date, branch, contributor, or issue type
4. Export reports as PDF or JSON for compliance/audit

**Output:** Continuous visibility into project health and code quality

**API Endpoints:**
```
GET /api/dashboard/metrics?repo_id=123&date_range=30d
GET /api/dashboard/heatmap?repo_id=123
GET /api/dashboard/trends?repo_id=123
POST /api/dashboard/export?format=pdf
```

**Key Metrics Calculated:**
```python
def calculate_code_quality_score(issues):
    """
    Weighted score: 100 - (critical*10 + high*5 + medium*2 + low*1)
    Normalized to 0-100 scale
    """
    weights = {'critical': 10, 'high': 5, 'medium': 2, 'low': 1}
    penalty = sum(issues[severity] * weight 
                  for severity, weight in weights.items())
    return max(0, 100 - penalty)
```

---

### **Stage 7: Integration and Automation**

**Actors:** DevOps / Admin  
**Goal:** Extend SentinelCode to CI/CD workflows

**Flow:**
1. Integrate SentinelCode via GitHub Actions or GitLab CI:
```yaml
- name: Run SentinelCode AI Review
  run: curl -X POST https://api.sentinelcode.dev/scan \
    -H "Authorization: Bearer ${{ secrets.SENTINELCODE_API_KEY }}" \
    -d '{"repo": "${{ github.repository }}", "commit": "${{ github.sha }}"}'
```

2. Optionally configure Slack / Email notifications for summaries
3. Developers get alerts like:
   ```
   "3 new high-severity security issues detected in backend/api.py — fix suggested."
   ```

**Output:** Fully automated review and alert system integrated into the development pipeline

**GitHub Action (`action.yml`):**
```yaml
name: 'SentinelCode AI Review'
description: 'Automated code review with AI-powered insights'
inputs:
  api-key:
    description: 'SentinelCode API key'
    required: true
  severity-threshold:
    description: 'Minimum severity to report (low|medium|high|critical)'
    default: 'medium'
runs:
  using: 'node20'
  main: 'dist/index.js'
```

---

## 🔌 API Design

### Authentication

**OAuth Flow:**
```
GET /auth/github
  → Redirect to GitHub OAuth
  → Callback: POST /auth/github/callback
  → Returns: JWT token

Headers for authenticated requests:
Authorization: Bearer <jwt_token>
```

### Core Endpoints

#### 1. Repository Management
```
GET /api/repos
  → List user repositories

POST /api/repos/:id/enable
  → Enable monitoring for a repository
  
DELETE /api/repos/:id/disable
  → Disable monitoring

POST /api/repos/:id/scan
  → Trigger manual scan
```

#### 2. Reviews
```
GET /api/reviews?repo_id=123&status=pending
  → List reviews with filters

GET /api/reviews/:id
  → Get detailed review with issues

POST /api/reviews/:id/feedback
  Body: { "issue_id": 456, "action": "accepted" }
  → Submit developer feedback
```

#### 3. Issues
```
GET /api/issues/:id
  → Get issue details

POST /api/issues/:id/patch
  → Generate and apply auto-patch

POST /api/issues/:id/explain
  → Get detailed explanation from LLM
```

#### 4. Webhooks
```
POST /webhooks/github
  → GitHub webhook receiver (push, pull_request events)

POST /webhooks/gitlab
  → GitLab webhook receiver

POST /webhooks/bitbucket
  → Bitbucket webhook receiver
```

#### 5. Dashboard
```
GET /api/dashboard/metrics
  Query: repo_id, date_range
  → Returns: quality score, vulnerability counts, trends

GET /api/dashboard/heatmap
  Query: repo_id
  → Returns: file-level risk scores

POST /api/dashboard/export
  Body: { "format": "pdf", "repo_id": 123 }
  → Generate downloadable report
```

---

## 🗄️ Database Schema

### PostgreSQL Tables

```sql
-- Users
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  github_id INTEGER UNIQUE,
  gitlab_id INTEGER UNIQUE,
  bitbucket_id VARCHAR(255) UNIQUE,
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255),
  avatar_url TEXT,
  access_token_encrypted TEXT, -- Store in Secret Manager ref
  created_at TIMESTAMP DEFAULT NOW(),
  last_login TIMESTAMP
);

-- Repositories
CREATE TABLE repositories (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  platform VARCHAR(50), -- 'github', 'gitlab', 'bitbucket'
  repo_name VARCHAR(255) NOT NULL,
  repo_url TEXT NOT NULL,
  default_branch VARCHAR(100) DEFAULT 'main',
  is_enabled BOOLEAN DEFAULT TRUE,
  webhook_id VARCHAR(100), -- platform webhook ID
  language_breakdown JSONB, -- {"python": 0.6, "js": 0.4}
  last_scan_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(platform, repo_name, user_id)
);

-- Reviews
CREATE TABLE reviews (
  id SERIAL PRIMARY KEY,
  repository_id INTEGER REFERENCES repositories(id),
  commit_sha VARCHAR(40) NOT NULL,
  pr_number INTEGER,
  pr_url TEXT,
  status VARCHAR(50), -- 'pending', 'in_progress', 'completed', 'failed'
  quality_score INTEGER, -- 0-100
  total_issues INTEGER,
  critical_issues INTEGER,
  high_issues INTEGER,
  medium_issues INTEGER,
  low_issues INTEGER,
  analysis_time_seconds INTEGER,
  created_at TIMESTAMP DEFAULT NOW(),
  completed_at TIMESTAMP
);

-- Issues
CREATE TABLE issues (
  id SERIAL PRIMARY KEY,
  review_id INTEGER REFERENCES reviews(id),
  file_path TEXT NOT NULL,
  line_number INTEGER,
  issue_type VARCHAR(100), -- 'security', 'performance', 'style', 'bug'
  severity VARCHAR(20), -- 'critical', 'high', 'medium', 'low'
  title TEXT NOT NULL,
  description TEXT,
  fix_suggestion TEXT,
  code_snippet TEXT,
  confidence_score FLOAT, -- 0.0-1.0
  source VARCHAR(50), -- 'static_analysis', 'ai', 'hybrid'
  static_rule_id VARCHAR(100), -- e.g., 'bandit-B608'
  is_false_positive BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Feedback
CREATE TABLE feedback (
  id SERIAL PRIMARY KEY,
  issue_id INTEGER REFERENCES issues(id),
  user_id INTEGER REFERENCES users(id),
  action VARCHAR(20), -- 'accepted', 'rejected', 'ignored', 'explained'
  comment TEXT,
  code_embedding VECTOR(768), -- for similarity search
  context JSONB, -- store full code context
  created_at TIMESTAMP DEFAULT NOW()
);

-- Patches
CREATE TABLE patches (
  id SERIAL PRIMARY KEY,
  issue_id INTEGER REFERENCES issues(id),
  patch_content TEXT, -- unified diff format
  branch_name VARCHAR(255),
  pr_number INTEGER,
  pr_url TEXT,
  status VARCHAR(50), -- 'generated', 'applied', 'merged', 'rejected'
  test_results JSONB, -- test pass/fail info
  created_at TIMESTAMP DEFAULT NOW(),
  applied_at TIMESTAMP
);

-- Metrics (aggregated daily)
CREATE TABLE daily_metrics (
  id SERIAL PRIMARY KEY,
  repository_id INTEGER REFERENCES repositories(id),
  date DATE NOT NULL,
  reviews_count INTEGER,
  issues_found INTEGER,
  issues_fixed INTEGER,
  avg_quality_score FLOAT,
  avg_review_time_seconds INTEGER,
  false_positive_rate FLOAT,
  developer_satisfaction_score FLOAT,
  UNIQUE(repository_id, date)
);

-- API Keys (for CI/CD integration)
CREATE TABLE api_keys (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  key_hash VARCHAR(255) UNIQUE NOT NULL,
  key_prefix VARCHAR(10), -- for identification (e.g., 'sk_123...')
  name VARCHAR(100),
  last_used_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  expires_at TIMESTAMP
);
```

### Indexes
```sql
CREATE INDEX idx_reviews_repo_status ON reviews(repository_id, status);
CREATE INDEX idx_issues_review_severity ON issues(review_id, severity);
CREATE INDEX idx_feedback_issue ON feedback(issue_id);
CREATE INDEX idx_repositories_user ON repositories(user_id, is_enabled);
CREATE INDEX idx_daily_metrics_repo_date ON daily_metrics(repository_id, date DESC);
```

---

## 🔗 Integration Points

### 1. GitHub Integration

**GitHub App Permissions:**
- Repository contents: Read
- Pull requests: Read & Write
- Webhooks: Read & Write
- Checks: Read & Write (for status checks)

**Webhook Events:**
- `push`
- `pull_request` (opened, synchronized, reopened)
- `pull_request_review_comment` (for button clicks)

**API Calls:**
```python
# Fetch file diff
GET https://api.github.com/repos/{owner}/{repo}/compare/{base}...{head}

# Post PR comment
POST https://api.github.com/repos/{owner}/{repo}/issues/{pr_number}/comments
Body: {"body": "🤖 SentinelCode AI Review\n..."}

# Create patch branch
POST https://api.github.com/repos/{owner}/{repo}/git/refs
Body: {"ref": "refs/heads/sentinelcode-patch-123", "sha": "..."}

# Create PR
POST https://api.github.com/repos/{owner}/{repo}/pulls
Body: {"title": "Fix: SQL Injection", "head": "sentinelcode-patch-123", ...}
```

### 2. GitLab Integration

**API Calls:**
```python
# Fetch merge request diff
GET https://gitlab.com/api/v4/projects/{id}/merge_requests/{mr_iid}/diffs

# Post comment
POST https://gitlab.com/api/v4/projects/{id}/merge_requests/{mr_iid}/notes
```

### 3. Slack Integration

**Notification Format:**
```json
{
  "blocks": [
    {
      "type": "header",
      "text": {"type": "plain_text", "text": "🚨 SentinelCode Alert"}
    },
    {
      "type": "section",
      "text": {"type": "mrkdwn", "text": "*3 critical issues* found in `backend/api.py`"}
    },
    {
      "type": "actions",
      "elements": [
        {"type": "button", "text": {"type": "plain_text", "text": "View Report"}, "url": "..."}
      ]
    }
  ]
}
```

### 4. Jira Integration

**Auto-create tickets for critical issues:**
```python
POST https://your-domain.atlassian.net/rest/api/3/issue
Body: {
  "fields": {
    "project": {"key": "SEC"},
    "summary": "Critical: SQL Injection in api.py",
    "description": "...",
    "issuetype": {"name": "Bug"},
    "priority": {"name": "Highest"}
  }
}
```

---

## 🔒 Security & Privacy

### Data Protection

1. **Code Storage**
   - Only store diffs, not full source code
   - Encrypt at rest (Cloud Storage default encryption)
   - Auto-delete after 90 days

2. **Access Tokens**
   - Store in Secret Manager (not database)
   - Use short-lived tokens (refresh every 8 hours)
   - Encrypt in transit (TLS 1.3)

3. **API Keys**
   - Hash with bcrypt before storing
   - Prefix for identification (`sk_live_`, `sk_test_`)
   - Rate limiting per key

4. **User Data**
   - GDPR compliance (data export/delete)
   - Anonymize analytics data
   - No PII in logs

### Network Security

1. **Cloud Armor**
   - DDoS protection
   - WAF rules for common attacks
   - Rate limiting (100 req/min per IP)

2. **IAM**
   - Least privilege principle
   - Service accounts per component
   - Workload Identity for GKE

3. **Webhook Validation**
   - Verify HMAC signatures
   - Replay attack prevention (timestamp check)
   - IP allowlisting for known platforms

---

## 🚀 Deployment Strategy

### Infrastructure as Code (Terraform)

```hcl
# Example: Cloud Run service
resource "google_cloud_run_service" "api" {
  name     = "sentinelcode-api"
  location = "us-central1"

  template {
    spec {
      containers {
        image = "gcr.io/sentinelcode/api:latest"
        resources {
          limits = {
            cpu    = "2"
            memory = "4Gi"
          }
        }
        env {
          name = "DATABASE_URL"
          value_from {
            secret_key_ref {
              name = "database-url"
              key  = "latest"
            }
          }
        }
      }
      service_account_name = google_service_account.api.email
    }
    metadata {
      annotations = {
        "autoscaling.knative.dev/maxScale" = "100"
        "autoscaling.knative.dev/minScale" = "1"
      }
    }
  }
}
```

### CI/CD Pipeline (Cloud Build)

```yaml
# cloudbuild.yaml
steps:
  # Build Docker image
  - name: 'gcr.io/cloud-builders/docker'
    args: ['build', '-t', 'gcr.io/$PROJECT_ID/api:$SHORT_SHA', '.']
  
  # Push to Container Registry
  - name: 'gcr.io/cloud-builders/docker'
    args: ['push', 'gcr.io/$PROJECT_ID/api:$SHORT_SHA']
  
  # Run tests
  - name: 'gcr.io/$PROJECT_ID/api:$SHORT_SHA'
    entrypoint: 'pytest'
    args: ['tests/', '--cov']
  
  # Deploy to Cloud Run
  - name: 'gcr.io/google.com/cloudsdktool/cloud-sdk'
    entrypoint: gcloud
    args:
      - 'run'
      - 'deploy'
      - 'sentinelcode-api'
      - '--image=gcr.io/$PROJECT_ID/api:$SHORT_SHA'
      - '--region=us-central1'
      - '--platform=managed'
```

### Monitoring & Alerts

**Key Metrics to Track:**
- Request latency (p50, p95, p99)
- Error rate (5xx responses)
- Webhook processing time
- Vertex AI API latency
- Database connection pool usage
- Cost per analysis

**Alert Policies:**
```yaml
# Example: High error rate alert
alertPolicy:
  displayName: "High API Error Rate"
  conditions:
    - displayName: "Error rate > 5%"
      conditionThreshold:
        filter: 'resource.type="cloud_run_revision" metric.type="run.googleapis.com/request_count"'
        comparison: COMPARISON_GT
        thresholdValue: 0.05
        duration: 300s
  notificationChannels:
    - projects/sentinelcode/notificationChannels/slack-ops
```

---

## 🔮 Future Enhancements

### Phase 13+ Ideas

1. **IDE Extensions**
   - VS Code extension for real-time suggestions
   - IntelliJ plugin
   - Vim/Neovim LSP integration

2. **Custom Rules Engine**
   - Allow teams to define project-specific rules
   - YAML-based configuration
   - Rule marketplace

3. **Multi-Language Expansion**
   - Rust, Swift, Kotlin support
   - Infrastructure-as-Code analysis (Terraform, CloudFormation)
   - Docker/Kubernetes manifest security checks

4. **Advanced Learning**
   - Reinforcement learning from code changes over time
   - Multi-repo pattern correlation
   - Team-specific coding style learning

5. **Compliance Automation**
   - SOC 2, ISO 27001 checklist automation
   - PCI-DSS code scanning
   - HIPAA compliance validation

6. **Performance Profiling**
   - Detect performance regressions
   - Suggest algorithmic optimizations
   - Database query analysis

7. **Dependency Management**
   - Auto-upgrade vulnerable dependencies
   - License compliance checking
   - Dependency graph visualization

8. **Collaboration Features**
   - Team chat for discussing issues
   - Code review workspaces
   - Knowledge sharing (wiki integration)

---

## 📚 Resources & References

### Documentation Links
- **Vertex AI Gemini API:** https://cloud.google.com/vertex-ai/docs/generative-ai/model-reference/gemini
- **GitHub REST API:** https://docs.github.com/en/rest
- **GitLab API:** https://docs.gitlab.com/ee/api/
- **Semgrep Rules:** https://semgrep.dev/docs/writing-rules/overview/
- **Tree-sitter:** https://tree-sitter.github.io/tree-sitter/

### Competitor Analysis
- **SonarQube:** Static analysis, lacks AI reasoning
- **Snyk:** Security-focused, no auto-patching
- **CodeClimate:** Code quality metrics, no LLM integration
- **DeepCode (Snyk):** AI-based, but no learning from feedback

### Key Differentiators
✅ **Continuous monitoring** (not just PR-level)  
✅ **LLM reasoning** (context-aware, explainable)  
✅ **Auto-patch generation** (actionable fixes)  
✅ **Feedback learning** (improves over time)  
✅ **Multi-platform** (GitHub, GitLab, Bitbucket)

---

## 📞 Contact & Support

**Project Lead:** [Your Name]  
**Email:** support@sentinelcode.dev  
**Website:** https://sentinelcode.dev  
**GitHub:** https://github.com/sentinelcode  
**Discord:** https://discord.gg/sentinelcode

---

## 📝 License

This project is licensed under the **MIT License**.

---

**Last Updated:** October 27, 2025  
**Version:** 1.0.0  
**Status:** Frontend Complete ✅ | Backend In Progress 🚧
