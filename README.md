# IBM Bob: SAP SkillBridge Sandbox

**IBM Bob: SAP SkillBridge Sandbox** is a browser-based SAP S/4HANA simulator focused on
**hands-on troubleshooting and business process simulation for SAP Functional Consultants**.

Built for the **IBMer watsonx Challenge 2026**, it enables IBMers on the bench to develop
real consultant-level SAP skills without requiring an SAP license, a sandbox environment,
or formal training access.

> **Live on GitHub:** https://github.com/taisamachado/SAP-SkillBridge-AI-generated-hands-on

---

## The Core Distinction: Consultant, Not End User

This simulator trains **SAP Functional Consultants** — not end users.

| End User | SAP Functional Consultant |
|---|---|
| Executes daily work in SAP | Configures, implements and troubleshoots SAP |
| Knows the transactions for their role | Understands the system logic and how it was configured |
| Does not change system settings | Changes processes, rules and parametrizations |
| Focused on the business task | Focused on the functional and technical solution |
| Learns: *"Click here"* | Learns: *"Why did this happen?"* |

### What this means in practice

When a user reports:

> *"The customer is being blocked for billing."*

An **end user** opens a ticket.

A **consultant** investigates:

- Is it a Credit Management block?
- What is the credit limit and current exposure?
- Is there overdue AR driving the breach?
- Has the delivery been fully goods-issued?
- Is there an accounting hold in FI?

Every scenario in this simulator trains the second type of thinking.

---

## Current Version: v1.1 — Consultant Mode (watsonx Challenge 2026)

Consultant Mode presents realistic SAP incidents and requires the user to:

1. Understand the business context and the reported problem
2. Choose the correct SAP transactions to investigate
3. Interpret realistic SAP outputs (selection screens, result grids, terminal output)
4. Identify the root cause across modules (FI, CO, SD, MM)
5. Formulate a governance-compliant recommendation for a senior stakeholder (CFO, Controller, client)

This is the skillset that differentiates an IBM SAP consultant in client engagements.

---

## Scenarios Implemented (5 total)

### Interactive Scenario Engine (`scenarios.html`)

Step-by-step modal with situation context, SAP terminal output, multiple-choice questions,
detailed right/wrong feedback, and a scored completion screen. Progress is saved across sessions.

| # | Scenario | Module | Transaction Chain | Difficulty |
|---|---|---|---|---|
| 1 | Payment Run Blocked: Vendor Invoice Under Review | FI-AP | F110 → FBL1N → FB03 | Medium |
| 2 | IT Cost Center Over-Budget: Period Close at Risk | CO-OM | KSB1 → FB03 → FS10N | Medium |
| 3 | CO-PA Board Report: Segment Profitability Analysis | CO-PA | KE30 → KSB1 → FS10N | Hard |
| 4 | Billing Blocked by Credit Management | SD-FI | VKM3 → FBL5N → F-28 | Medium |
| 5 | GR/IR Mismatch: Invoice Posted Before Goods Receipt | MM-FI | MB51 → ME23N → FB03 | Hard |

Each scenario includes:
- Business context with real stakeholder pressure (CFO, Controller, Audit deadline)
- Step-by-step investigation using real SAP transaction outputs
- Multiple-choice questions with detailed explanations for every option
- Root cause identification and governance recommendation
- Completion screen with performance score
- **Persistent progress** — completion badges saved via localStorage

---

## SAP Transactions Implemented

### Financial Accounting (FI)

| Transaction | Description |
|---|---|
| F110 | Automatic Payment Transactions — proposal, exceptions, payment blocks |
| FBL1N | Vendor Line Items — open items, payment blocks, AP reconciliation |
| FBL5N | Customer Line Items — open AR, overdue analysis, credit exposure |
| FB03 | Display FI Document — line items, account assignments, source tracing |
| FS10N | G/L Account Balance Display — period-by-period totals, month-end close |
| F-28 | Post Incoming Payment — clears AR open items |

### Controlling (CO)

| Transaction | Description |
|---|---|
| KSB1 | Cost Centers: Actual Line Items — plan vs actual variance analysis |
| KE30 | Execute CO-PA Profitability Report — segment EBIT margin analysis |

### Sales & Distribution (SD)

| Transaction | Description |
|---|---|
| VA03 | Display Sales Order |
| VA05 | List Sales Orders |
| VF01 | Create Billing Document |
| VF04 | Billing Due List |
| VKM3 | Blocked SD Documents for Credit Management |
| VL03N | Display Outbound Delivery |

### Materials Management (MM)

| Transaction | Description |
|---|---|
| MMBE | Stock Overview — plant / storage location level |
| MB51 | Material Document List — goods movements, GR confirmation |
| MIRO | Enter Incoming Invoice — GR/IR posting, three-way match |

---

## Interface

The simulator replicates the **SAP Fiori** interface — the current standard for SAP S/4HANA:

- **Shell bar** — SAP logo, transaction code search field, 🎯 Scenarios shortcut, user avatar
- **Left navigation** — collapsible menu organised by module (FI, CO, SD, MM, Training)
- **Content area** — transaction selection screens, result grids, coaching workspace
- **Bob Coaching Console** — real-time guidance panel at the bottom
- **Right sidebar** — active scenario, progress tracker, hints, learning objectives, quick reference
- **Status bar** — SAP-style message bar with mode toggle

### Two simulator modes

| Mode | Description |
|---|---|
| **Coaching Mode** | Bob guides the user step by step through a scenario. Each transaction triggers contextual coaching, hints, and progress tracking. Best for learning the investigation logic. |
| **Professional Mode** | Real SAP workflow: Selection Screen → Execute (F8) → Result Grid. No coaching — just like the real system. Best for interview preparation and timed practice. |

---

## Running Locally

```bash
# Clone the repository
git clone https://github.com/taisamachado/SAP-SkillBridge-AI-generated-hands-on.git
cd SAP-SkillBridge-AI-generated-hands-on

# Kill any process already on port 8000 (if needed)
lsof -ti tcp:8000 | xargs kill -9

# Start the local server
python3 backend/app.py

# Open in browser
# http://localhost:8000/frontend/pages/index.html        ← Main simulator (Fiori)
# http://localhost:8000/frontend/pages/scenarios.html    ← Interactive scenarios
```

No npm, no build step, no SAP license required. Pure HTML/CSS/JavaScript + one Python file.

---

## Project Structure

```text
SAP-SkillBridge-AI-generated-hands-on/
├── backend/
│   └── app.py                        ← Python HTTP server (handles MIME types, path resolution)
├── frontend/
│   ├── css/
│   │   ├── fiori.css                 ← SAP Fiori visual theme (shell bar, nav, layout, grids)
│   │   └── styles.css                ← Component styles (cards, tables, coaching console)
│   ├── js/
│   │   ├── app/
│   │   │   └── main.js               ← Application entry point, event binding, mode toggle
│   │   ├── core/
│   │   │   └── state.js              ← Application state (scenario, mode, progress, steps)
│   │   ├── data/
│   │   │   ├── fi-co-master-data.js  ← FI/CO master data (GL accounts, cost centers, vendors, profit centers)
│   │   │   ├── master-data.js        ← SD/MM master data (customers, materials, orders, deliveries)
│   │   │   ├── sap-messages.js       ← SAP message catalog (V1, M7, ZP, FI message IDs)
│   │   │   └── transaction-data.js   ← Coaching mode transaction responses + Bob commentary
│   │   ├── scenarios/
│   │   │   └── scenario-registry.js  ← 5 scenario definitions (FI-AP, CO-OM, CO-PA, SD-FI, MM-FI)
│   │   ├── transactions/
│   │   │   └── transaction-router.js ← Transaction execution router with module-aware guidance
│   │   └── ui/
│   │       ├── console-ui.js         ← Coaching UI: welcome screen, sidebar, progress, hints
│   │       └── professional-mode.js  ← 18 selection screens + 18 result grids (FI, CO, SD, MM)
│   └── pages/
│       ├── index.html                ← Main simulator (SAP Fiori layout)
│       └── scenarios.html            ← Interactive step-by-step scenario engine (5 scenarios)
└── docs/
    ├── first-scenario.md
    ├── REALISTIC-MODE-GUIDE.md
    └── REAL-WORLD-USE-CASES.md
```

---

## Roadmap

### v1.1 — Current (watsonx Challenge 2026 submission)
- [x] SAP Fiori interface (shell bar, left nav, content area, Bob console, sidebar, status bar)
- [x] 5 Consultant Mode scenarios: FI-AP, CO-OM, CO-PA, SD-FI, MM-FI
- [x] Interactive step-by-step scenario engine (modal, SAP terminal, multiple-choice, score)
- [x] 18 SAP transactions with selection screens and result grids
- [x] FI/CO master data (cost centers, GL accounts, vendors, profit centers, payment runs)
- [x] SD/MM master data (customers, materials, orders, deliveries, stock)
- [x] Bob Coaching Console with real-time contextual guidance
- [x] Professional Mode (real SAP Selection Screen → Execute (F8) → Result Grid workflow)
- [x] Score persistence via localStorage (completion badges, progress counter)
- [x] FBL5N customer AR + MIRO GR/IR — two new Professional Mode transactions
- [x] Module-aware coaching guidance when a transaction is not on the active path

### v2.0 — Consultant Mode expansion
- [ ] Additional FI transactions: F-03, FK03, F-02, FBS1 (accruals)
- [ ] Additional CO transactions: S_ALR_87013611, KS03, KE24
- [ ] More scenario steps (12+ per scenario)
- [ ] Score history and scenario replay
- [ ] Scenario difficulty progression (locked/unlocked based on score)

### v3.0 — End User Mode
- [ ] Guided execution of day-to-day SAP processes (not just investigation)
- [ ] O2C end-to-end flow: create order → delivery → billing → payment
- [ ] Procure-to-Pay end-to-end flow: PO → GR → invoice → payment
- [ ] Role-based learning paths (AR Analyst, AP Analyst, Financial Controller)

---

## Design Principles

**1. Consultant thinking, not button clicking**
Every scenario is structured as an incident investigation. The user is never told "click here" — they are given a business problem and must reason through it using SAP transactions.

**2. Realistic SAP fidelity**
Transaction codes, field names, organizational units, document types, message IDs (V1 801, ZP 047, M7 021), and output formats follow SAP S/4HANA conventions. No simplifications that would create wrong muscle memory.

**3. Stakeholder communication is part of the skill**
Scenarios end with a recommendation to a CFO, Controller, or client — not just a technical finding. Consultants must translate SAP findings into business language.

**4. Governance is non-negotiable**
Every scenario includes at least one "governance trap" — a shortcut that a junior consultant might take but that would fail an audit. Wrong answers explain exactly why the shortcut is dangerous.

**5. Modular architecture**
Business logic, UI rendering, master data, and scenario definitions are separated into independent modules. New transactions and scenarios can be added without touching unrelated code.

**6. English only**
All code, comments, UI labels, messages, scenarios, and documentation are in English. This is a global IBM project.

---

*Made with IBM Bob — IBMer watsonx Challenge 2026*
