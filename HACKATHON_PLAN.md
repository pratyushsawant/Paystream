# PayStream × Codebase Intelligence — Hackathon Implementation Plan
> ETHDenver 2026 | Strategy Doc | Priority-Ordered

---

## What We're Building

A **Codebase Intelligence Platform** powered by 4 AI agents that analyze any GitHub repo, explain it to humans (not just engineers), and get paid in **real HBAR** on Hedera for every unit of work — all provable on-chain.

The pitch in one sentence:
> *"Drop a GitHub link. Four AI agents decompose your codebase, explain it in plain English, flag risks, generate a CEO deck — and every agent gets paid in crypto, on-chain, in real time."*

---

## App Flow (High Level)

```
┌─────────────────────────────────────────────────────────────┐
│                    LANDING PAGE                             │
│   Hero: "Understand Any Codebase in 60 Seconds"            │
│   CTA: [ Analyze Your Repo → ]                             │
└─────────────────────────┬───────────────────────────────────┘
                          │ GitHub URL + Budget (HBAR)
                          ▼
┌─────────────────────────────────────────────────────────────┐
│                    ANALYSIS PAGE                            │
│   Live feed: agents spinning up, paying HBAR per step      │
│   Tabs: Architecture | Tech Stack | Insights | CEO Deck    │
└─────────────────────────┬───────────────────────────────────┘
                          │ SSE stream from backend
                          ▼
┌─────────────────────────────────────────────────────────────┐
│                BACKEND AGENT ORCHESTRATOR                   │
│                                                             │
│  ┌─────────────────┐   ┌─────────────────────────────────┐ │
│  │  GitHub Fetcher │→  │         agentService.js          │ │
│  │  (repo content) │   │   runCodebaseAnalysis()          │ │
│  └─────────────────┘   │                                 │ │
│                        │  4 Agents run sequentially:      │ │
│                        │  1. Code Reader Agent            │ │
│                        │  2. Simplifier Agent             │ │
│                        │  3. Analogy Agent                │ │
│                        │  4. Insight Agent                │ │
│                        └────────────┬────────────────────┘ │
└─────────────────────────────────────┼───────────────────────┘
                                      │ pay each agent in HBAR
                                      ▼
┌─────────────────────────────────────────────────────────────┐
│                  HEDERA BLOCKCHAIN                          │
│   hederaService.js (existing, unchanged)                    │
│   • TransferTx — real HBAR to each agent                   │
│   • HCS Topic  — immutable audit trail per agent            │
│   • Scheduled Auto-Refund — 10 min failsafe                 │
│   • HashScan links in UI for every tx                       │
└─────────────────────────────────────────────────────────────┘
                                      │
                          ▼ Results streamed back
┌─────────────────────────────────────────────────────────────┐
│                    RESULTS DASHBOARD                        │
│                                                             │
│  [Architecture]  Mermaid diagram auto-rendered              │
│  [Tech Stack]    Analogy cards (Redis = sticky note)        │
│  [Insights]      Risk flags, complexity score, debt         │
│  [CEO Deck]      5 slide-ready panels, exportable           │
│  [Dev Docs]      Onboarding doc + README generator          │
│                                                             │
│  CTAs:  [ Export PDF ]  [ Copy README ]  [ Share Link ]     │
└─────────────────────────────────────────────────────────────┘
```

---

## Agent Responsibilities Map

| Agent | Powered By | Outputs | HBAR Weight |
|-------|-----------|---------|-------------|
| **Code Reader Agent** | Claude Sonnet | Architecture Map, Tech Stack, Module Cards, Dependency Web | 30% |
| **Simplifier Agent** | Claude Sonnet | Plain English explanations, Jargon Glossary, Onboarding Doc | 20% |
| **Analogy Agent** | Claude Sonnet | Tech analogies, Code Flow story, CEO Deck (5 slides) | 25% |
| **Insight Agent** | Claude Sonnet | Risk Report, Scalability, Tech Debt, Rebuild suggestions | 25% |

---

## Priority Stack — What to Build First (Ranked for Max Hackathon Impact)

### TIER 1 — Must Have (Core Demo, Build First)
These are the features judges will see and remember. Without these, we don't demo.

#### 1. GitHub Repo Fetcher (Backend)
- Accept GitHub URL → use GitHub API (no auth needed for public repos)
- Recursively list all files → fetch content of key files
- Smart filtering: read `.js`, `.ts`, `.py`, `.json`, `.md`, config files only
- Cap at ~150KB of content to stay within Claude token limits
- **Why first:** Everything else depends on this

#### 2. 4-Agent Codebase Analysis Pipeline (Backend)
- New route: `GET /api/analyze?repo=<github_url>&budget=<hbar>`
- Replace the current 3-agent system with 4 specialized agents
- Each agent gets structured prompt with repo content
- Returns structured JSON per section (not free text)
- Stream via SSE (reuse existing infrastructure)
- **Why second:** This IS the product

#### 3. Mermaid Architecture Diagram (Frontend)
- Code Reader Agent outputs valid Mermaid syntax
- Frontend renders it using `mermaid` npm package
- Single most visually impactful thing to show judges
- Exportable as SVG
- **Why third:** Visual proof the AI understood the code

#### 4. Tech Stack Analogy Cards (Frontend)
- Grid of cards, each showing: technology → analogy → what it does
- Example card: `Redis | "Sticky note on your desk" | Fast temporary cache`
- Neon card design consistent with existing dark theme
- **Why fourth:** The analogy angle is the differentiator, judges will love it

#### 5. Updated Landing Page with Strong CTAs
- Hero: `"Understand Any Codebase in 60 Seconds"`
- Sub-hero: `"4 AI agents analyze your repo — paid in real HBAR, proven on-chain"`
- Primary CTA: `[ Analyze Your Repo → ]`
- Secondary CTA: `[ Watch a Demo ]` (link to demo video / sample output)
- Stats: `4 AI Agents | Real HBAR Payments | 100% On-Chain | Zero Smart Contracts`
- **Why fifth:** First thing judges see

---

### TIER 2 — High Value (Build After Tier 1 Works)
These make the product feel complete and defensible.

#### 6. Insight Agent Dashboard (Frontend)
- "What Could Go Wrong" — red flag cards
- Complexity Score — 1-10 with breakdown, like a speedometer
- Scalability Assessment — plain English bottleneck analysis
- Tech Debt items — numbered list with severity

#### 7. CEO Deck (5 Slides UI)
- Slide-style cards in the UI:
  1. What It Is
  2. Problem It Solves
  3. How It Works (flow diagram)
  4. Key Components
  5. Current State + Risks
- "Download as PDF" or copy button
- This is the output format that makes the tool useful to non-engineers

#### 8. Module Purpose Cards
- Grid layout, each card = one folder/module
- Single sentence, zero jargon
- Color coded by type (frontend/backend/config/tests)

#### 9. Live Payment Feed (upgrade existing)
- Show all 4 agents working in real-time with HBAR amounts
- Progress bar per agent
- HashScan links per payment
- Total spent + refund remaining

---

### TIER 3 — Nice to Have (Polish, Build If Time Allows)
#### 10. README Generator
- If no README exists or it's weak, generate a full one
- Output with copy button + syntax highlighted preview

#### 11. Onboarding Doc
- "Week 1 guide" for new devs, generated from codebase
- Downloadable markdown

#### 12. Jargon Glossary
- Every tech term in the codebase → plain English
- Searchable list

#### 13. "If You Were to Rebuild This" Section
- Honest modern alternatives
- Formatted as a short opinionated report

#### 14. Dependency Risk Flags
- Highlight packages not updated in 2+ years
- Simple npm registry date check

---

## CTAs — Calls to Action (Every Screen)

| Screen | Primary CTA | Secondary CTA |
|--------|------------|---------------|
| Landing | `Analyze Your Repo →` | `See Sample Output` |
| Input Form | `Deploy Agents` | `Try with this example` |
| Live Feed | (no CTA, user is watching) | `View on HashScan ↗` |
| Results | `Export CEO Deck` | `Copy README` |
| Results | `Share This Report` | `Analyze Another Repo` |
| Results | `View Audit Trail on HashScan` | — |

---

## Implementation Steps (Ordered)

### Step 1 — Backend: GitHub Fetcher
**File:** `paystream_Backend/githubService.js` (new)
```
fetchRepoContent(githubUrl)
  → parse owner/repo from URL
  → GET /repos/{owner}/{repo}/git/trees/HEAD?recursive=1
  → filter to important files
  → fetch file contents in parallel
  → return { files: [{path, content}], summary: {languages, fileCount} }
```

### Step 2 — Backend: New Agent System
**File:** `paystream_Backend/agentService.js` (modify)
```
runCodebaseAnalysis(repoContent, budget, onEvent)
  → initClient + createHCSTopic + fundAgent + createSchedule
  → Code Reader Agent  → paySubAgent → emit event
  → Simplifier Agent   → paySubAgent → emit event
  → Analogy Agent      → paySubAgent → emit event
  → Insight Agent      → paySubAgent → emit event
  → combine all outputs into structured result
  → emit final 'analysis_complete' event
  → refundRemainder → emit 'refund' event
```

### Step 3 — Backend: New Route
**File:** `paystream_Backend/server.js` (add route)
```
GET /api/analyze?repo=<url>&budget=<hbar>
  → SSE headers
  → fetchRepoContent(repo)
  → runCodebaseAnalysis(content, budget, onEvent)
```

### Step 4 — Frontend: Results Page
**File:** `paystream_Frontend/src/pages/Analysis.tsx` (new)
```
Tabs: Architecture | Tech Stack | Insights | CEO Deck | Docs
Each tab renders the structured JSON from its agent
Architecture tab: renders Mermaid diagram
Tech Stack tab: analogy cards grid
Insights tab: risk cards + complexity gauge
CEO Deck tab: 5 slide panels
```

### Step 5 — Frontend: Update Landing
**File:** `paystream_Frontend/src/pages/Landing.tsx` (modify)
```
New hero copy + GitHub URL input form
Strong CTA buttons
Updated stats block
```

### Step 6 — Frontend: Install Mermaid
```bash
npm install mermaid
```
Create `MermaidDiagram.tsx` component that renders Mermaid syntax to SVG.

---

## Output Data Schema (What Agents Return)

```json
{
  "codeReader": {
    "architectureMap": {
      "mermaid": "graph TD\n  Frontend --> API\n  API --> DB",
      "description": "3-layer architecture..."
    },
    "techStack": [
      { "name": "PostgreSQL", "role": "Main database", "analogy": "Filing cabinet for permanent data" }
    ],
    "modules": [
      { "path": "src/auth", "purpose": "Handles user login and session management" }
    ],
    "dependencies": [
      { "name": "lodash", "version": "3.x", "risk": "outdated", "note": "Last updated 4 years ago" }
    ]
  },
  "simplifier": {
    "codeFlow": "When a user logs in → auth checks password → token generated...",
    "onboardingDoc": "# Welcome to the project\n...",
    "jargonGlossary": [
      { "term": "JWT", "plain": "A signed ticket that proves who you are" }
    ]
  },
  "analogy": {
    "techAnalogies": [...],
    "ceoDecks": {
      "slide1": { "title": "What It Is", "content": "..." },
      "slide2": { "title": "Problem It Solves", "content": "..." },
      "slide3": { "title": "How It Works", "content": "..." },
      "slide4": { "title": "Key Components", "content": "..." },
      "slide5": { "title": "Current State & Risks", "content": "..." }
    }
  },
  "insight": {
    "complexityScore": { "score": 7, "reasoning": "Heavy use of microservices for a small team..." },
    "redFlags": [
      { "severity": "high", "issue": "No error handling in payment module", "location": "src/payments/index.js" }
    ],
    "scalability": { "bottleneck": "No caching layer — will struggle past 10k users", "suggestions": [...] },
    "techDebt": [ { "item": "...", "effort": "low", "impact": "high" } ],
    "rebuild": "If starting today, we'd use a monorepo with tRPC and Planetscale..."
  }
}
```

---

## Winning Angles — Hackathon Judge Talking Points

1. **Novel use of Hedera** — Not just tokens. Using HCS as an immutable AI work log. Scheduled transactions as trustless auto-refund. Zero smart contracts.

2. **Real-world utility** — Every engineering team has this problem. Onboarding takes weeks. CEOs can't read code. This solves it.

3. **AI + Crypto convergence** — Agents that hire other agents, pay each other in crypto, and prove they did work on-chain. This is the agentic economy in miniature.

4. **Accessibility** — Output formats for CEO, developer, and PM. Not just a devtool.

5. **Demo moment** — Drop a GitHub URL live on stage → watch 4 agents spin up → watch HBAR flow → Mermaid diagram appears → CEO deck generates. Hard to forget.

---

## Tech Stack We're Using

| Layer | Tech | Why |
|-------|------|-----|
| Backend | Node.js + Express 5 | Already set up, SSE works |
| AI | Claude Sonnet (claude-sonnet-4-6) | Already integrated |
| Blockchain | Hedera SDK (@hashgraph/sdk) | Already integrated |
| Payments | HBAR on testnet | Already working |
| Audit | Hedera Consensus Service | Already working |
| Frontend | React 18 + Vite + TypeScript | Already set up |
| Styling | Tailwind + shadcn/ui | Already set up |
| Diagrams | Mermaid.js | New addition |
| Data Fetch | GitHub REST API (unauthenticated) | New addition |

---

## What NOT to Build (Save Time)

- ❌ File upload (GitHub URL is cleaner for demo)
- ❌ User auth / accounts (adds complexity, no value for hackathon)
- ❌ Database storage of past analyses (in-memory is fine)
- ❌ PDF export (too complex; copy-to-clipboard is enough)
- ❌ Private repo support (requires OAuth, skip for now)
- ❌ Dependency deep-scan via npm registry (too slow, fake it with Claude analysis)

---

## Rough Build Order & Time Estimate

| # | Task | Complexity | Priority |
|---|------|-----------|---------|
| 1 | GitHub fetcher service | Medium | 🔴 Critical |
| 2 | 4-agent prompt engineering | High | 🔴 Critical |
| 3 | `/api/analyze` route | Low | 🔴 Critical |
| 4 | Mermaid component + install | Low | 🔴 Critical |
| 5 | Analysis results page (tabs) | Medium | 🔴 Critical |
| 6 | Tech Stack analogy cards UI | Low | 🟠 High |
| 7 | Update landing page CTAs | Low | 🟠 High |
| 8 | Insight dashboard UI | Medium | 🟠 High |
| 9 | CEO Deck slide UI | Medium | 🟠 High |
| 10 | Live agent payment feed | Low | 🟠 High |
| 11 | Module purpose cards | Low | 🟡 Medium |
| 12 | README generator | Low | 🟡 Medium |
| 13 | Jargon glossary | Low | 🟡 Medium |
| 14 | Dependency risk flags | Medium | 🟢 Low |
| 15 | Onboarding doc page | Low | 🟢 Low |
