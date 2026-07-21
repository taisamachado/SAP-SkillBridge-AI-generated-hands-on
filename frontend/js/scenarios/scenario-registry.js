const scenarios = {

    // ─── SCENARIO 1 – FI/AP: Payment Run Exception (F110) ──────────────────────
    payment_run_exception: {
        id: "payment_run_exception",
        module: "FI-AP",
        level: "Senior Manager",
        title: "Payment Run Blocked: Vendor Invoice Under Review",
        summary: "The weekly automated payment run (F110) produced exceptions. One vendor invoice is payment-blocked. The CFO is asking for a status report before authorising payment posting.",
        businessContext: "Company Code 1000 runs weekly AP payment cycles. Today's run ID RUN-A has completed the proposal step but raised an exception flag. Vendor V100002 (Global Component Supply) has an invoice of USD 470,000 blocked with payment block R. Before posting payments, the Finance Manager must investigate and document the decision.",
        initialProblem: "F110 payment run RUN-A returned status: Proposal Created with 1 exception. Payment posting has NOT been executed. The exception requires manual review before USD 470,000 can be released.",
        bobIntro: "Scenario: You are the SAP FI Senior Manager at the client. The payment run for today (2026-07-05) produced an exception on vendor V100002. The CFO wants a recommendation: release or hold? Start your investigation.",
        learningObjectives: [
            "Understand the F110 automatic payment run workflow: parameters → proposal → exceptions → posting.",
            "Identify payment blocks and their business implications in Accounts Payable.",
            "Use FBL1N to investigate vendor open items and verify the block reason.",
            "Apply governance principles: document the decision before manual release.",
            "Communicate a risk-aware recommendation to senior stakeholders."
        ],
        transactions: [
            { code: "F110",  purpose: "Review the payment run proposal status and exception list." },
            { code: "FBL1N", purpose: "Drill into vendor V100002 open items to understand the block." },
            { code: "FB03",  purpose: "Display FI document 1900012351 to confirm the invoice details." }
        ],
        investigationPath: [
            { id: "review_payment_run",     label: "Review the F110 payment run proposal and exception" },
            { id: "investigate_vendor_items", label: "Investigate vendor V100002 open items in FBL1N" },
            { id: "display_fi_document",    label: "Display the blocked FI document in FB03" }
        ],
        successCriteria: [
            "Learner correctly identifies the exception is a payment block R on document 1900012351.",
            "Learner uses FBL1N to validate open items and confirm the block reason.",
            "Learner can articulate why payment should not be posted without documented approval.",
            "Learner can explain the governance risk of bypassing the payment block check."
        ]
    },

    // ─── SCENARIO 2 – CO: Month-End Budget Variance (KSB1) ─────────────────────
    cost_center_overrun: {
        id: "cost_center_overrun",
        module: "CO-OM-CCA",
        level: "Senior Manager",
        title: "IT Cost Center Over-Budget – Period Close at Risk",
        summary: "The IT Operations cost center (10103000) is 13% over budget for period 006. Period-end close is in 24 hours. The Controller needs a root-cause finding and a recommendation for the CFO.",
        businessContext: "Controlling Area 1000. Cost center 10103000 (IT Operations, responsible manager: Mark Torres) posted USD 215,000 actual IT infrastructure costs against a period plan of USD 190,000. This is a USD 25,000 over-run (+13.2%). The variance must be explained and either absorbed, accrued, or escalated before the close window.",
        initialProblem: "The period-close checklist shows cost center 10103000 has an unresolved variance. KSB1 must be used to identify the specific cost posting causing the over-run before a management decision can be made.",
        bobIntro: "Scenario: You are the CO Principal Consultant supporting the client through June 2026 period-end close. The Controller flagged an IT cost center overrun. Investigate and prepare your finding for the CFO briefing in 2 hours.",
        learningObjectives: [
            "Use KSB1 to perform cost center actual vs plan variance analysis.",
            "Identify the G/L account and cost driver causing an over-budget situation.",
            "Apply the month-end close decision framework: absorb, defer, accrual or escalate.",
            "Understand the relationship between cost center management, controlling area, and company code.",
            "Practice framing a financial finding for a CFO-level audience."
        ],
        transactions: [
            { code: "KSB1",  purpose: "Review actual cost postings for cost center 10103000." },
            { code: "FB03",  purpose: "Display the FI document driving the largest variance posting." },
            { code: "FS10N", purpose: "Confirm the G/L account 820000 balance for the period." }
        ],
        investigationPath: [
            { id: "review_cost_center_actuals", label: "Review KSB1 actuals vs plan for cost center 10103000" },
            { id: "display_source_document",    label: "Display the source FI document in FB03" },
            { id: "confirm_gl_balance",         label: "Confirm the G/L account balance in FS10N" }
        ],
        successCriteria: [
            "Learner correctly identifies the over-run is on G/L 820000 (IT Infrastructure and Software).",
            "Learner uses FB03 to trace the cost to the originating FI document.",
            "Learner can recommend one of three actions: absorb within budget, raise supplementary, or defer to next period.",
            "Learner explains the risk of not resolving the variance before period close."
        ]
    },

    // ─── SCENARIO 3 – CO-PA: Profitability Reporting (KE30) ────────────────────
    copa_margin_analysis: {
        id: "copa_margin_analysis",
        module: "CO-PA",
        level: "Senior Manager / Principal Consultant",
        title: "CO-PA Segment Profitability: Board Review Preparation",
        summary: "The Board of Directors review is tomorrow. The CFO needs a profitability report by business segment for H1 2026. CO-PA must be interrogated and the key findings prepared in business language.",
        businessContext: "Operating Concern 1000. Three active segments in North America: Electronics (PC-ELEC-NA), Industrial (PC-IND-NA), and Consumer Goods (PC-CONS-NA). The CFO suspects margin compression in the Electronics segment and wants to understand which segment is delivering the strongest contribution margin.",
        initialProblem: "The standard Board report template has not been refreshed for H1 2026. The KE30 CO-PA report must be run, the segment margins analysed, and the findings translated into executive-level language before the 09:00 Board session.",
        bobIntro: "Scenario: You are the SAP Principal Consultant advising the CFO's office. The Board meeting is tomorrow morning. Run the CO-PA profitability report, identify the margin story, and prepare your executive summary. Start with KE30.",
        learningObjectives: [
            "Execute a CO-PA profitability report using KE30 with correct operating concern and period selection.",
            "Analyse segment revenue, COGS, gross profit, OpEx, and EBIT margin in a structured way.",
            "Identify margin compression and its potential causes in the context of a SAP implementation.",
            "Translate SAP CO-PA output into executive-level business insights.",
            "Understand the relationship between profit centres, operating concern, and CO-PA reporting dimensions."
        ],
        transactions: [
            { code: "KE30",  purpose: "Execute the segment profitability report for H1 2026." },
            { code: "KSB1",  purpose: "Validate specific cost centre postings that drive the EBIT difference between segments." },
            { code: "FS10N", purpose: "Confirm revenue G/L account 600000 balance for cross-check." }
        ],
        investigationPath: [
            { id: "run_copa_report",         label: "Run KE30 CO-PA segment profitability report" },
            { id: "validate_cost_drivers",   label: "Validate cost drivers in KSB1 for Electronics segment" },
            { id: "cross_check_gl_revenue",  label: "Cross-check G/L 600000 revenue balance in FS10N" }
        ],
        successCriteria: [
            "Learner executes KE30 and correctly reads the three-segment P&L structure.",
            "Learner identifies that the Electronics segment (PC-ELEC-NA) has the highest revenue but analyses whether margin is competitive.",
            "Learner can explain EBIT margin calculation and compare across segments.",
            "Learner translates findings into Board-level language: which segment should receive more investment, which needs cost discipline.",
            "Learner identifies the link between KSB1 cost centre data and KE30 segment margin."
        ]
    },

    // ─── SCENARIO 4 – SD-FI: Billing Blocked by Credit Management ──────────────
    billing_credit_block: {
        id: "billing_credit_block",
        module: "SD-FI",
        level: "Consultant",
        title: "Billing Blocked by Credit Management",
        summary: "A customer cannot be billed because the sales document is blocked for credit review.",
        businessContext: "Customer 1000234 reports that billing cannot be completed for a sales order in the SD process. The logistics status is complete, but billing remains blocked.",
        initialProblem: "Transaction VF01 returns a billing creation failure because the document is blocked for credit review.",
        bobIntro: "Scenario: The customer reports that they cannot bill a sales order in SD. VF01 is returning a billing creation error. Your job is to investigate the cause and decide which transaction to use first.",
        learningObjectives: [
            "Understand how credit management can block downstream billing in Order-to-Cash.",
            "Learn how to investigate a billing issue using SAP transactions in the correct sequence.",
            "Recognize the difference between logistics completion and financial release readiness.",
            "Practice explaining SAP findings in plain business language."
        ],
        transactions: [
            { code: "VF01", purpose: "Attempt billing creation and observe the blocking message." },
            { code: "VKM3", purpose: "Review and analyze the credit block." },
            { code: "VA03", purpose: "Review the sales document status and business context." }
        ],
        investigationPath: [
            { id: "observe_billing_error",      label: "Observe the billing error in VF01" },
            { id: "analyze_credit_block",       label: "Analyze the blocked document in VKM3" },
            { id: "validate_document_context",  label: "Validate the sales document context in VA03" }
        ],
        successCriteria: [
            "The learner identifies that billing is blocked by credit management rather than logistics failure.",
            "The learner uses VKM3 to investigate the blocked document.",
            "The learner explains which business checks should be validated before releasing the document."
        ]
    },

    // ─── SCENARIO 5 – MM-FI: GR/IR Mismatch at Period-End ─────────────────────
    grir_mismatch_period_end: {
        id: "grir_mismatch_period_end",
        module: "MM-FI",
        level: "Consultant / Senior Manager",
        title: "GR/IR Mismatch: Vendor Invoice Posted Without Goods Receipt",
        summary: "GR/IR account 191100 shows a USD 95,000 debit at period-end. A vendor invoice was posted in MIRO before the goods arrived. Period-end close is blocked until the mismatch is investigated and documented.",
        businessContext: "Company Code 1000. Plant 1010. Vendor V100004 (Apex Technology Components) sent invoice APEX-2026-5540 for PO 4500099901 (200 units server components, USD 95,000). The invoice was posted in MIRO on 2026-06-29 before the goods were physically received. The GR/IR clearing account 191100 shows an open debit. Goods are confirmed in transit — vendor shipped on 2026-06-27.",
        initialProblem: "Period-close checklist: GR/IR account 191100 has an unexplained debit balance of USD 95,000. The Controller cannot sign off on period close until the balance is investigated and documented.",
        bobIntro: "Scenario: You are the SAP MM/FI Consultant supporting the client's period-end close. The Controller flagged a GR/IR open item. Use MB51 to confirm whether a Goods Receipt exists, ME23N to check the PO status, and FB03 to review the MIRO posting. Document your finding for the close checklist.",
        learningObjectives: [
            "Understand the SAP three-way match: Purchase Order → Goods Receipt → Invoice Receipt.",
            "Use MB51 to confirm whether a goods receipt material document has been posted.",
            "Understand how GR/IR account 191100 works: debited by MIRO, credited by MIGO.",
            "Apply correct period-close treatment for GR/IR timing differences.",
            "Distinguish between errors (require correction) and timing differences (require disclosure)."
        ],
        transactions: [
            { code: "MB51",  purpose: "Confirm no GR material document exists for PO 4500099901." },
            { code: "MIRO",  purpose: "Review the MIRO FI document posted on 2026-06-29 for correctness." },
            { code: "FB03",  purpose: "Display the FI document 1900016001 to confirm GR/IR posting entries." }
        ],
        investigationPath: [
            { id: "confirm_no_gr_posted",    label: "Confirm no GR posted for PO 4500099901 (MB51)" },
            { id: "review_miro_posting",     label: "Review the MIRO invoice posting (MIRO / FB03)" },
            { id: "document_grir_open_item", label: "Document GR/IR open item in period-close checklist" }
        ],
        successCriteria: [
            "Learner uses MB51 to confirm no goods receipt has been posted.",
            "Learner uses MIRO or FB03 to review the FI document entries for account 191100.",
            "Learner correctly identifies this as a timing difference, not an error.",
            "Learner recommends disclosing the open item in the close checklist rather than posting a manual journal entry.",
            "Learner understands that posting the GR via MIGO in period 007 will automatically clear the GR/IR account."
        ]
    }
};

export function getScenarioById(id) {
    return scenarios[id];
}

export function getAllScenarios() {
    return Object.values(scenarios);
}

// Made with Bob - FI/CO scenarios added for Senior Manager / Principal Consultant preparation
