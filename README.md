# PayStream — Codebase Intelligence Platform

> **ETHDenver 2026 Hackathon Project**

Drop a GitHub link. Four AI agents decompose your codebase, explain it in plain English, flag risks, generate a CEO deck — and every agent gets paid in real HBAR, on-chain, in real time.

---

## What It Does

PayStream is an AI-powered codebase intelligence platform that makes any GitHub repository understandable to anyone — engineers, CEOs, and PMs alike.

**The core loop:**
1. Paste a GitHub repo URL and set an HBAR budget
2. Four specialized Claude AI agents spin up and analyze the codebase in sequence
3. Each agent is paid in real HBAR via Hedera as it completes its work
4. Every payment and result is logged immutably on Hedera Consensus Service
5. You get: architecture diagrams, plain-English explanations, tech analogies, risk flags, and a 5-slide CEO deck

---

## The Four Agents

| Agent | What It Does | HBAR Weight |
|-------|-------------|-------------|
| **Code Reader** | Builds architecture map, tech stack breakdown, module index, dependency scan | 30% |
| **Simplifier** | Rewrites everything in plain English — zero jargon, onboarding doc included | 20% |
| **Analogy** | Explains every technology with real-world analogies + generates 5-slide CEO deck | 25% |
| **Insight** | Risk report, complexity score, scalability bottlenecks, tech debt list | 25% |

---

## Hedera Integration

- **HBAR Payments** — each agent earns real HBAR on testnet upon task completion
- **HCS Audit Trail** — immutable log of every agent action written to a Hedera Consensus Service topic
- **Scheduled Auto-Refund** — unused budget is automatically returned after 10 minutes (Hedera Scheduled Transactions)
- **HashScan Links** — every transaction is provable and linkable on HashScan
- **Zero smart contracts** — all of this runs on native Hedera primitives

---

## Monorepo Structure

```
ETHDenver/
├── paystream_Frontend/     # React 18 + Vite + TypeScript frontend
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Landing.tsx     # Animated landing page
│   │   │   └── Index.tsx       # Live analysis dashboard
│   │   └── components/
│   │       ├── WalletButton.tsx     # Hedera wallet connect (HashPack, Blade, Kabila)
│   │       ├── NeuralBackground.tsx # Canvas animated neural network
│   │       └── AICore.tsx           # React Three Fiber 3D holographic sphere
│   └── package.json
│
├── paystream_Backend/      # Node.js + Express 5 backend
│   ├── index.js            # Entry point + SSE route
│   ├── agentService.js     # 4-agent orchestration pipeline
│   ├── hederaService.js    # Hedera SDK: payments, HCS, schedules
│   └── package.json
│
├── HACKATHON_PLAN.md       # Full strategy and implementation plan
└── README.md               # This file
```

---



## Tech Stack

### Frontend
| Tech | Version | Role |
|------|---------|------|
| React | 18.3.1 | UI framework |
| Vite | 5 | Build tool |
| TypeScript | — | Type safety |
| Framer Motion | 12 | Page animations + transitions |
| React Three Fiber | 8 | 3D holographic sphere |
| Three.js / Drei | — | 3D primitives and helpers |
| Tailwind CSS | — | Utility styling |
| shadcn/ui | — | Component library |
| Mermaid.js | — | Architecture diagram rendering |

### Backend
| Tech | Version | Role |
|------|---------|------|
| Node.js | — | Runtime |
| Express | 5 | HTTP + SSE server |
| @anthropic-ai/sdk | 0.78 | Claude Sonnet 4.6 agent calls |
| @hashgraph/sdk | 2.80 | Hedera payments + HCS |
| dotenv | — | Environment config |
| cors | — | Cross-origin support |

### AI Model
- **Claude Sonnet 4.6** (`claude-sonnet-4-6`) — all four agents

### Blockchain
- **Hedera Testnet** — HBAR transfers, HCS topics, Scheduled Transactions

---

## Running Locally

### Prerequisites
- Node.js 18+
- A Hedera testnet account with HBAR (get one free at [portal.hedera.com](https://portal.hedera.com))
- Anthropic API key

### Backend

```bash
cd paystream_Backend
npm install

# Create your .env file
cp .env.example .env
# Fill in: HEDERA_ACCOUNT_ID, HEDERA_PRIVATE_KEY, ANTHROPIC_API_KEY

npm start
# Runs on http://localhost:3001
```

### Frontend

```bash
cd paystream_Frontend
npm install
npm run dev
# Runs on http://localhost:5173
```

---

## Environment Variables (Backend)

```env
HEDERA_ACCOUNT_ID=0.0.xxxxxxx
HEDERA_PRIVATE_KEY=your_ed25519_private_key
ANTHROPIC_API_KEY=sk-ant-...
```

> **Security note:** Never commit `.env`. It is gitignored. Rotate any keys that were previously exposed.

---

## How the Payment Flow Works

```
User sets HBAR budget (e.g. 4 HBAR)
          │
          ▼
Budget escrowed + Hedera Scheduled Auto-Refund created (10 min failsafe)
          │
          ├─► Code Reader completes  → 30% paid (1.2 HBAR) + HCS log
          ├─► Simplifier completes   → 20% paid (0.8 HBAR) + HCS log
          ├─► Analogy completes      → 25% paid (1.0 HBAR) + HCS log
          ├─► Insight completes      → 25% paid (1.0 HBAR) + HCS log
          │
          ▼
Remaining HBAR auto-refunded to user
All transactions visible on HashScan ↗
```

---

## Results Dashboard

After analysis, the UI shows:

- **Architecture** — Mermaid diagram rendered from agent output, exportable as SVG
- **Tech Stack** — Analogy cards (`Redis = "sticky note on your desk"`)
- **Insights** — Risk flags, complexity score 1-10, scalability bottlenecks, tech debt
- **CEO Deck** — 5 slide-ready panels: What It Is / Problem / How It Works / Key Components / Risks
- **Docs** — Onboarding guide + auto-generated README

---

## Winning Angles

1. **Novel Hedera use** — HCS as AI work log. Scheduled transactions as trustless auto-refund. Zero smart contracts.
2. **Real utility** — Onboarding takes weeks. CEOs can't read code. This solves both in 60 seconds.
3. **AI + Crypto convergence** — Agents that hire agents, pay each other in crypto, and prove their work on-chain.
4. **Broad audience** — Output formats designed for engineer, CEO, and PM simultaneously.
5. **Live demo** — Drop a URL on stage, watch agents spin up, HBAR flows, diagram appears, deck generates.

---

## Built At

**ETHDenver 2026** — Denver, Colorado

Built by **Pratyush Sawant**
