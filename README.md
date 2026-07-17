# IBM Bob: SAP SkillBridge Sandbox

**IBM Bob: SAP SkillBridge Sandbox** is a browser-based SAP S/4HANA simulator focused on  
**hands-on troubleshooting and business process simulation for SAP Functional Consultants**.

Built for the **IBMer watsonx Challenge 2026**, it enables IBMers on the bench to develop  
real consultant-level SAP skills without requiring an SAP license, a sandbox environment,  
or formal training access.

---

## The Core Distinction: Consultant, Not End User

This simulator is designed to train **SAP Functional Consultants**, not end users.

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
- Is the SD document status correct?
- Has the delivery been fully goods-issued?
- Is there an accounting hold in FI?

Every scenario in this simulator trains the second type of thinking.

---

## Current Mode: Consultant Mode (MVP)

The current version is **Consultant Mode** — the MVP scope for the watsonx Challenge.

Consultant Mode presents realistic SAP incidents and requires the user to:

1. Understand the business context and the reported problem
2. Choose the correct SAP transactions to investigate
3. Interpret realistic SAP outputs (selection screens, result grids, terminal output)
4. Identify the root cause across modules (FI, CO, SD, MM)
5. Formulate a governance-compliant recommendation for a senior stakeholder (CFO, Controller, client)

This is the skillset that differentiates an IBM SAP consultant in client engagements.

---

## Scenarios Implemented

### FI / CO — Senior Manager / Principal Consultant Level

| # | Scenario | Module | Transaction Chain | Difficulty |
|---|---|---|---|---|
| 1 | Payment Run Blocked: Vendor Invoice Under Review | FI-AP | F110 → FBL1N → FB03 | Medium |
| 2 | IT Cost Center Over-Budget: Period Close at Risk | CO-OM | KSB1 → FB03 → FS10N | Medium |
| 3 | CO-PA Board Report: Segment Profitability Analysis | CO-PA | KE30 → KSB1 → FS10N | Hard |

### SD / FI — Consultant Level

| # | Scenario | Module | Transaction Chain | Difficulty |
|---|---|---|---|---|
| 4 | Billing Blocked by Credit Management | SD-FI | VF01 → VKM3 → VA03 | Easy |

Each scenario includes:
- Business context and stakeholder pressure (CFO, Controller, Audit)
- Step-by-step investigation using real SAP transaction outputs
- Multiple-choice questions with detailed right/wrong explanations
- Root cause identification and governance recommendation
- Completion screen with performance score

---

## SAP Transactions Implemented

### Financial Accounting (FI)

| Transaction | Description |
|---|---|
| F110 | Automatic Payment Transactions — proposal, exceptions, posting |
| FBL1N | Vendor Line Items — open items, payment blocks, AP reconciliation |
| FB03 | Display FI Document — line items, account assignments, source tracing |
| FS10N | G/L Account Balance Display — period-by-period totals |

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
| VL03N | Display Delivery |

### Materials Management (MM)

| Transaction | Description |
|---|---|
| MMBE | Stock Overview |
| MB51 | Material Document List |

---

## Interface

The simulator replicates the **SAP Fiori** interface — the current standard for SAP S/4HANA:

- **Shell bar** — SAP logo, global search / transaction code field, user avatar
- **Left navigation** — collapsible menu organised by module (FI, CO, SD, MM, Training)
- **Content area** — transaction selection screens, result grids, coaching workspace
- **Bob Coaching Console** — real-time guidance panel at the bottom
- **Right sidebar** — active scenario, progress tracker, hints, learning objectives
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
git clone https://github.com/your-org/SAP-SkillBridge-AI-generated-hands-on.git
cd SAP-SkillBridge-AI-generated-hands-on

# Start the local server
python3 backend/app.py

# Open in browser
# http://localhost:8000/frontend/pages/index.html        ← Main simulator
# http://localhost:8000/frontend/pages/scenarios.html    ← Interactive scenarios
```

No npm, no build step, no SAP license required.

---

## Project Structure

```text
SAP-SkillBridge-AI-generated-hands-on/
├── backend/
│   └── app.py                        ← Python HTTP server
├── frontend/
│   ├── css/
│   │   ├── fiori.css                 ← SAP Fiori visual theme
│   │   └── styles.css                ← Component styles
│   ├── js/
│   │   ├── app/
│   │   │   └── main.js               ← Application entry point, event binding
│   │   ├── core/
│   │   │   └── state.js              ← Application state
│   │   ├── data/
│   │   │   ├── fi-co-master-data.js  ← FI/CO master data (GL accounts, cost centers, vendors...)
│   │   │   ├── master-data.js        ← SD/MM master data (customers, materials, orders...)
│   │   │   ├── sap-messages.js       ← SAP message catalog
│   │   │   └── transaction-data.js   ← Coaching mode transaction responses
│   │   ├── scenarios/
│   │   │   └── scenario-registry.js  ← Scenario definitions
│   │   ├── transactions/
│   │   │   └── transaction-router.js ← Transaction execution router
│   │   └── ui/
│   │       ├── console-ui.js         ← Coaching UI rendering
│   │       └── professional-mode.js  ← Selection screens + result grids
│   └── pages/
│       ├── index.html                ← Main simulator (Fiori layout)
│       └── scenarios.html            ← Interactive step-by-step scenarios
└── docs/
    ├── first-scenario.md
    ├── REALISTIC-MODE-GUIDE.md
    └── REAL-WORLD-USE-CASES.md
```

---

## Roadmap

### v1.0 — MVP (current, watsonx Challenge 2026)
- [x] SAP Fiori interface
- [x] Consultant Mode with 4 scenarios (FI-AP, CO-OM, CO-PA, SD-FI)
- [x] Interactive step-by-step scenario engine (modal, multiple choice, score)
- [x] 14 SAP transactions with selection screens and result grids
- [x] FI/CO master data (cost centers, GL accounts, vendors, profit centers)
- [x] Bob Coaching Console with real-time guidance
- [x] Professional Mode (real SAP Selection Screen → Execute → Result Grid workflow)

### v1.1 — Consultant Mode expansion
- [ ] Additional FI transactions: F-28, FBL5N, FK03
- [ ] Additional CO transactions: S_ALR_87013611, KS03, KE24
- [ ] More scenario steps (12+ steps like the AIX HMC simulator)
- [ ] Progress persistence via localStorage
- [ ] Score history and scenario replay

### v2.0 — End User Mode
- [ ] End User Mode: guided execution of day-to-day SAP processes
- [ ] O2C end-to-end flow: create order → delivery → billing → payment
- [ ] Procure-to-Pay end-to-end flow: PO → GR → invoice → payment
- [ ] Role-based learning paths (AR Analyst, AP Analyst, Financial Controller)

---

## Design Principles

**1. Consultant thinking, not button clicking**  
Every scenario is structured as an incident investigation. The user is never told "click here" — they are given a business problem and must reason through it using SAP transactions.

**2. Realistic SAP fidelity**  
Transaction codes, field names, organizational units, document types, message IDs, and output formats follow SAP S/4HANA conventions. No simplifications that would create wrong muscle memory.

**3. Stakeholder communication is part of the skill**  
Scenarios end with a recommendation to a CFO, Controller, or client — not just a technical finding. Consultants must translate SAP findings into business language.

**4. Modular architecture**  
Business logic, UI rendering, master data, and scenario definitions are separated into independent modules. New transactions and scenarios can be added without touching unrelated code.

**5. English only**  
All code, comments, UI labels, scenarios, and documentation are in English. This is a global IBM project.

---

## Language Standard

All code, comments, UI labels, messages, scenarios, and documentation in this project are written in English.

---

*Made with IBM Bob — IBMer watsonx Challenge 2026*
