/**
 * Generates a "Stuck? Click to reveal" hint pill for coaching screens.
 * @param {string} nextTcode - The transaction code to reveal, e.g. "FBL1N"
 * @param {string} hint - Short description, e.g. "Vendor Line Items"
 */
function hintPill(nextTcode, hint) {
    return `
        <button class="bob-hint-pill" onclick="
            this.classList.add('revealed');
            document.getElementById('commandField').value='${nextTcode}';
            document.getElementById('commandField').focus();
        ">
            <span class="pill-label">💡 Stuck? Click to reveal the next transaction</span>
            <span class="pill-answer">→ ${nextTcode} — ${hint}</span>
        </button>`;
}

const transactionResponses = {

    // ───── FI/CO TRANSACTIONS (COACHING MODE) ─────────────────────────────────

    // ─── SCENARIO: Payment Run Exception ──────────────────────────────────────
    F110: {
        completedStep: "review_payment_run",
        hint: "You confirmed the payment run has an exception. Now drill into the vendor open items using FBL1N to understand why the invoice is blocked.",
        statusMessage: "Payment run proposal created with 1 exception. Review vendor line items before posting.",
        statusType: "warning",
        screen: {
            title: "F110 Payment Run Proposal – Exception Detected",
            subtitle: "Automatic Payment Transactions",
            html: `
                <div class="training-callout warning">
                    <strong>Payment Run Status:</strong> Proposal Created with 1 exception. Payment posting has NOT been executed.
                </div>

                <table class="training-grid">
                    <thead>
                        <tr>
                            <th>Vendor</th>
                            <th>Document</th>
                            <th>Invoice Ref.</th>
                            <th>Net Due Date</th>
                            <th>Amount (USD)</th>
                            <th>Payment Block</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>V100001</td>
                            <td>1900012346</td>
                            <td>SUPP-INV-8876</td>
                            <td>2026-07-28</td>
                            <td class="number">145,000.00</td>
                            <td class="status-ok">[OK]</td>
                        </tr>
                        <tr class="highlight-row">
                            <td>V100002</td>
                            <td>1900012351</td>
                            <td>GLOB-INV-44518</td>
                            <td>2026-08-19</td>
                            <td class="number">470,000.00</td>
                            <td class="status-blocked">[!] Payment Block R</td>
                        </tr>
                    </tbody>
                </table>

                <div class="training-callout info">
                    <strong>Bob Coaching:</strong> Document 1900012351 has a payment block R – manual release required. Before releasing this USD 470K payment, you must investigate the vendor open items and document the business justification. Which transaction would you use to review vendor V100002's open items?
                    ${hintPill("FBL1N", "Vendor Line Items")}
                </div>
            `
        },
        lines: [
            { text: "You entered F110 to review the automated payment run proposal.", type: "prompt" },
            { text: "Bob: Good choice. F110 is the standard transaction for managing large-scale vendor payments.", type: "success" },
            { text: "Bob: The proposal has been created, but payment posting is blocked. One vendor invoice (V100002, USD 470,000) is flagged with payment block R.", type: "warning" },
            { text: "Bob: Before you release this block, you must investigate why it was placed and whether release is justified. Which transaction displays vendor line items?", type: "info" }
        ]
    },

    FBL1N: {
        completedStep: "investigate_vendor_items",
        hint: "You confirmed the invoice 1900012351 is blocked with payment block R. Now display the FI document using FB03 to validate the invoice details.",
        statusMessage: "Vendor open items displayed. Payment block R detected on document 1900012351.",
        statusType: "warning",
        screen: {
            title: "Vendor Open Items – V100002 (Global Component Supply)",
            subtitle: "FBL1N – Vendor Line Item Display",
            html: `
                <div class="training-callout success">
                    <strong>Vendor:</strong> V100002 – Global Component Supply
                </div>

                <table class="training-grid">
                    <thead>
                        <tr>
                            <th>Document</th>
                            <th>Doc Date</th>
                            <th>Invoice Ref.</th>
                            <th>Net Due Date</th>
                            <th>Amount (USD)</th>
                            <th>Payment Block</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1900012350</td>
                            <td>2026-06-10</td>
                            <td>GLOB-INV-44512</td>
                            <td>2026-08-09</td>
                            <td class="number">420,000.00</td>
                            <td class="status-ok">[OK]</td>
                        </tr>
                        <tr class="highlight-row">
                            <td>1900012351</td>
                            <td>2026-06-20</td>
                            <td>GLOB-INV-44518</td>
                            <td>2026-08-19</td>
                            <td class="number">470,000.00</td>
                            <td class="status-blocked">[!] Block R</td>
                        </tr>
                    </tbody>
                </table>

                <div class="training-callout info">
                    <strong>Bob Coaching:</strong> Document 1900012351 is marked with payment block R. This means a manual review is required before payment can be released. To validate the invoice details and confirm whether the block should be lifted, which transaction would you use to display the accounting document?
                    ${hintPill("FB03", "Display FI Document")}
                </div>
            `
        },
        lines: [
            { text: "You entered FBL1N to review vendor V100002 open items.", type: "prompt" },
            { text: "Bob: Excellent. FBL1N is the correct transaction for AP reconciliation and vendor line item investigation.", type: "success" },
            { text: "Bob: You found that invoice 1900012351 (GLOB-INV-44518) has payment block R. This is USD 470,000.", type: "warning" },
            { text: "Bob: To validate the invoice details before making your release recommendation to the CFO, which transaction displays the underlying FI document?", type: "info" }
        ]
    },

    FB03: {
        completedStep: "display_fi_document",
        hint: "Scenario completed. You investigated the F110 exception, reviewed vendor open items in FBL1N, and validated the FI document in FB03. Now prepare your recommendation: release or hold?",
        statusMessage: "FI document 1900012351 displayed. Ready for release decision documentation.",
        statusType: "success",
        screen: {
            title: "FI Document 1900012351 – Vendor Invoice",
            subtitle: "FB03 – Display Document",
            html: `
                <div class="training-callout success">
                    <strong>Document Confirmed:</strong> 1900012351 | Company Code: 1000 | Fiscal Year: 2026 | Period: 006
                </div>

                <table class="training-grid">
                    <thead>
                        <tr>
                            <th>Line Item</th>
                            <th>Account</th>
                            <th>Description</th>
                            <th>Debit (USD)</th>
                            <th>Credit (USD)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>001</td>
                            <td>300000</td>
                            <td>AP Global Component Supply</td>
                            <td class="number">—</td>
                            <td class="number">470,000.00</td>
                        </tr>
                        <tr>
                            <td>002</td>
                            <td>130000</td>
                            <td>Raw Materials Inventory</td>
                            <td class="number">470,000.00</td>
                            <td class="number">—</td>
                        </tr>
                    </tbody>
                </table>

                <div class="training-callout success">
                    <strong>Bob Coaching:</strong> Well done. You traced the payment exception from F110 → FBL1N → FB03 and confirmed the invoice is legitimate. The payment block R is a governance control requiring documented approval before release. You now have everything you need to prepare the CFO recommendation: "Release payment block R on document 1900012351 after confirming goods receipt and management approval." This is how Senior FI Managers operate in high-stakes SAP implementations.
                </div>
            `
        },
        lines: [
            { text: "You entered FB03 to display the FI document 1900012351.", type: "prompt" },
            { text: "Bob: Perfect. FB03 shows you the complete accounting document with all line items and account assignments.", type: "success" },
            { text: "Bob: The document is a vendor invoice posting (doc type KR) for USD 470,000 – inventory purchase from Global Component Supply.", type: "info" },
            { text: "Bob: Scenario complete. You followed the correct investigation path: F110 → FBL1N → FB03. You can now recommend whether to release or hold this payment block, with documented justification.", type: "success" }
        ]
    },

    // ─── SCENARIO: Cost Center Overrun ────────────────────────────────────────
    KSB1: {
        completedStep: "review_cost_center_actuals",
        hint: "You identified the G/L account 820000 (IT Infrastructure) variance. Now use FB03 to display the underlying FI document that drove the over-budget posting.",
        statusMessage: "Cost center variance displayed. IT Infrastructure account 820000 shows +13% overrun.",
        statusType: "warning",
        screen: {
            title: "Cost Center 10103000 – Actual vs Plan Variance",
            subtitle: "KSB1 – Cost Centers: Actual Line Items",
            html: `
                <div class="training-callout warning">
                    <strong>Cost Center:</strong> 10103000 – IT Operations | <strong>Manager:</strong> Mark Torres
                </div>

                <table class="training-grid">
                    <thead>
                        <tr>
                            <th>Period</th>
                            <th>G/L Account</th>
                            <th>Description</th>
                            <th>Plan (USD)</th>
                            <th>Actual (USD)</th>
                            <th>Variance</th>
                            <th>Var %</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="highlight-row">
                            <td>006</td>
                            <td>820000</td>
                            <td>IT Infrastructure and Software</td>
                            <td class="number">190,000.00</td>
                            <td class="number">215,000.00</td>
                            <td class="number variance-over">+25,000.00</td>
                            <td class="number variance-over">+13.2%</td>
                        </tr>
                    </tbody>
                </table>

                <div class="training-callout info">
                    <strong>Bob Coaching:</strong> The IT Operations cost center is USD 25,000 over-budget on account 820000 (IT Infrastructure and Software). This is a 13.2% overrun and must be explained before the Controller can close period 006. To trace the root cause, which transaction would you use to display the originating FI accounting document?
                    ${hintPill("FB03", "Display FI Document")}
                </div>
            `
        },
        lines: [
            { text: "You entered KSB1 to review cost center actuals vs plan.", type: "prompt" },
            { text: "Bob: Excellent choice. KSB1 is the core CO transaction for cost center variance analysis.", type: "success" },
            { text: "Bob: You identified the variance on G/L account 820000 (IT Infrastructure). Period 006 actual is USD 215,000 vs plan of USD 190,000 (+13.2%).", type: "warning" },
            { text: "Bob: To understand what caused this cost spike, you need to display the underlying FI document. Which transaction shows FI accounting documents?", type: "info" }
        ]
    },

    // ─── SCENARIO: CO-PA Margin Analysis ──────────────────────────────────────
    KE30: {
        completedStep: "run_copa_report",
        hint: "You executed the CO-PA segment profitability report. The Electronics segment has the highest revenue but you should validate whether its margin is competitive. Consider using KSB1 to drill into the cost centre drivers.",
        statusMessage: "CO-PA segment profitability report executed. Electronics segment shows highest revenue with 21.6% EBIT margin.",
        statusType: "success",
        screen: {
            title: "CO-PA Segment Profitability Report – H1 2026",
            subtitle: "KE30 – Profitability Analysis",
            html: `
                <div class="training-callout success">
                    <strong>Operating Concern:</strong> 1000 | <strong>Report:</strong> COPA-01-SEGMENT | <strong>Period:</strong> 001–006 / 2026
                </div>

                <table class="training-grid">
                    <thead>
                        <tr>
                            <th>Profit Center</th>
                            <th>Segment</th>
                            <th>Revenue (USD)</th>
                            <th>COGS (USD)</th>
                            <th>EBIT (USD)</th>
                            <th>Margin %</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="highlight-row">
                            <td>PC-ELEC-NA</td>
                            <td>Electronics – North America</td>
                            <td class="number">4,850,000</td>
                            <td class="number">2,912,000</td>
                            <td class="number">1,048,000</td>
                            <td class="number">21.6%</td>
                        </tr>
                        <tr>
                            <td>PC-IND-NA</td>
                            <td>Industrial – North America</td>
                            <td class="number">2,130,000</td>
                            <td class="number">1,450,000</td>
                            <td class="number">360,000</td>
                            <td class="number">16.9%</td>
                        </tr>
                        <tr>
                            <td>PC-CONS-NA</td>
                            <td>Consumer Goods – N. America</td>
                            <td class="number">1,760,000</td>
                            <td class="number">990,000</td>
                            <td class="number">360,000</td>
                            <td class="number">20.5%</td>
                        </tr>
                    </tbody>
                </table>

                <div class="training-callout success">
                    <strong>Bob Coaching:</strong> You successfully executed the KE30 CO-PA report. The Electronics segment (PC-ELEC-NA) delivers the highest revenue (USD 4.85M) with a 21.6% EBIT margin. This is strong, but the CFO suspected margin compression. Your next step is to translate this into executive-level language for the Board: "Electronics segment is the revenue leader with healthy margin. Industrial segment margin is lower (16.9%) – recommend cost review." This is how Principal Consultants prepare CFO briefings.
                    ${hintPill("KSB1", "Cost Center Actuals — validate Industrial cost drivers")}
                </div>
            `
        },
        lines: [
            { text: "You entered KE30 to execute the CO-PA profitability report.", type: "prompt" },
            { text: "Bob: Excellent. KE30 is the key CO-PA transaction for segment profitability analysis and Board-level reporting.", type: "success" },
            { text: "Bob: The report shows three segments: Electronics (21.6% margin), Industrial (16.9%), and Consumer Goods (20.5%).", type: "info" },
            { text: "Bob: The Electronics segment is performing well. The Industrial segment has a lower margin and may require cost discipline. You now have the data to prepare your CFO executive summary.", type: "success" }
        ]
    },

    FS10N: {
        completedStep: "confirm_gl_balance",
        hint: "You confirmed the G/L account 110000 (Accounts Receivable) closing balance. This cross-checks with the revenue and profitability data you analysed earlier.",
        statusMessage: "G/L account balance displayed for period 006 / 2026.",
        statusType: "success",
        screen: {
            title: "G/L Account 110000 – Accounts Receivable Balance",
            subtitle: "FS10N – G/L Account Balance Display",
            html: `
                <div class="training-callout success">
                    <strong>G/L Account:</strong> 110000 – Accounts Receivable – Trade | <strong>Company Code:</strong> 1000 | <strong>Fiscal Year:</strong> 2026
                </div>

                <table class="training-grid">
                    <thead>
                        <tr>
                            <th>Period</th>
                            <th>Debit (USD)</th>
                            <th>Credit (USD)</th>
                            <th>Cumulative Balance (USD)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>001 (Opening)</td>
                            <td class="number">—</td>
                            <td class="number">—</td>
                            <td class="number">1,850,000.00</td>
                        </tr>
                        <tr class="highlight-row">
                            <td>006 (Jun)</td>
                            <td class="number">229,500.00</td>
                            <td class="number">—</td>
                            <td class="number">2,079,500.00</td>
                        </tr>
                    </tbody>
                </table>

                <div class="training-callout success">
                    <strong>Bob Coaching:</strong> FS10N shows the AR balance increased by USD 229,500 in period 006, reflecting the SD invoice you saw earlier. This cross-checks with the revenue postings. FS10N is a critical tool for month-end close validation and balance sheet reconciliation. You now understand how FI and CO data flows connect across modules.
                </div>
            `
        },
        lines: [
            { text: "You entered FS10N to review the G/L account balance.", type: "prompt" },
            { text: "Bob: Good. FS10N is the standard transaction for reviewing G/L account period-by-period balances during month-end close.", type: "success" },
            { text: "Bob: Account 110000 (Accounts Receivable) shows a closing balance of USD 2,079,500 for period 006. This aligns with the revenue and billing activity you analysed earlier.", type: "info" },
            { text: "Bob: You now have the tools to navigate FI-GL, CO-CCA, and CO-PA transactions at a Senior Manager level.", type: "success" }
        ]
    },

    // ───── SD/FI TRANSACTIONS – SCENARIO 4 (Credit Block / Billing) ──────────

    FBL5N: {
        completedStep: "review_customer_ar",
        hint: "You reviewed customer AR open items. The overdue balance is the root cause of the credit limit breach. Now prepare the resolution path: collect overdue AR to bring exposure below the credit limit.",
        statusMessage: "Customer open receivables displayed. Overdue balance identified as credit block driver.",
        statusType: "warning",
        screen: {
            title: "Customer 1000234 – Open Receivables (FBL5N)",
            subtitle: "FBL5N – Customer Line Item Display",
            html: `
                <div class="training-callout warning">
                    <strong>Customer:</strong> 1000234 – Precision Manufacturing Inc. | <strong>Company Code:</strong> 1000
                </div>

                <table class="training-grid">
                    <thead>
                        <tr>
                            <th>Document</th>
                            <th>Date</th>
                            <th>Invoice Ref.</th>
                            <th>Net Due Date</th>
                            <th>Amount (USD)</th>
                            <th>Overdue?</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="highlight-row">
                            <td>1800033201</td>
                            <td>2026-04-15</td>
                            <td>PMI-PO-4501</td>
                            <td>2026-05-15</td>
                            <td class="number">78,940.00</td>
                            <td class="status-blocked">[X] 46 days overdue</td>
                        </tr>
                        <tr class="highlight-row">
                            <td>1800033288</td>
                            <td>2026-04-28</td>
                            <td>PMI-PO-4502</td>
                            <td>2026-05-28</td>
                            <td class="number">65,340.00</td>
                            <td class="status-blocked">[X] 33 days overdue</td>
                        </tr>
                        <tr>
                            <td>1800034102</td>
                            <td>2026-05-30</td>
                            <td>PMI-PO-4503</td>
                            <td>2026-06-29</td>
                            <td class="number">57,438.00</td>
                            <td class="status-warn">[!] 1 day overdue</td>
                        </tr>
                    </tbody>
                </table>

                <div class="training-callout info">
                    <strong>Bob Coaching:</strong> The overdue balance (USD 201,718) is the root cause of the credit limit breach. If the customer pays docs 1800033201 + 1800033288 (USD 144,280), the credit exposure drops below USD 500K and the billing block releases automatically. Contact the customer today — do not release the block manually.
                    ${hintPill("FBL5N", "Customer Line Items — confirm overdue AR")}
                </div>
            `
        },
        lines: [
            { text: "You entered FBL5N to review customer 1000234 open receivables.", type: "prompt" },
            { text: "Bob: Correct. FBL5N is the AR equivalent of FBL1N. It shows all customer open items — perfect for understanding the credit exposure picture.", type: "success" },
            { text: "Bob: You found USD 201,718 in overdue AR — this is driving the credit limit breach and the billing block.", type: "warning" },
            { text: "Bob: The resolution is to collect the overdue AR. If USD 144,280 is paid, the credit block releases automatically. Post the incoming payment with F-28.", type: "info" }
        ]
    },

    // ─── MM/FI TRANSACTIONS – SCENARIO 5 (GR/IR Mismatch) ──────────────────

    MB51: {
        completedStep: "confirm_no_gr_posted",
        hint: "MB51 confirmed no goods receipt exists for PO 4500099901. Now open the PO in ME23N to verify the full procurement status and expected delivery date.",
        statusMessage: "No GR material document found for PO 4500099901. GR/IR mismatch confirmed.",
        statusType: "warning",
        screen: {
            title: "MB51 – Material Document List",
            subtitle: "Goods Receipt Confirmation for PO 4500099901",
            html: `
                <div class="training-callout warning">
                    <strong>Search:</strong> PO 4500099901 | Movement Types: 101, 102 | Plant: 1010 | Date: Jun 2026
                </div>

                <table class="training-grid">
                    <thead>
                        <tr>
                            <th>Material Doc</th>
                            <th>PO</th>
                            <th>Material</th>
                            <th>Plant</th>
                            <th>Mvmt Type</th>
                            <th>Quantity</th>
                            <th>Posting Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colspan="7" class="status-blocked" style="text-align:center;">[X] No material documents found for this PO in the selected period.</td>
                        </tr>
                    </tbody>
                </table>

                <div class="training-callout info">
                    <strong>Bob Coaching:</strong> MB51 confirms no goods receipt has been posted for PO 4500099901. The GR/IR account has a debit because the invoice was posted (MIRO) but no matching GR exists yet. The goods are in transit. Next step: open the PO in ME23N to review the expected delivery date and confirm the vendor shipment status.
                    ${hintPill("MIRO", "Review the MIRO invoice posting")}
                </div>
            `
        },
        lines: [
            { text: "You entered MB51 to review goods movements for PO 4500099901.", type: "prompt" },
            { text: "Bob: Correct. MB51 is the material document list — it shows every goods movement posted against a material, PO, or plant.", type: "success" },
            { text: "Bob: No goods receipt material document found. This confirms the GR/IR mismatch: invoice posted (MIRO) but no GR yet.", type: "warning" },
            { text: "Bob: Review the PO in ME23N to understand the full delivery status before making a period-close decision.", type: "info" }
        ]
    },

    MIRO: {
        completedStep: "review_miro_posting",
        hint: "The MIRO posting is confirmed. The invoice was posted correctly. The issue is that the GR has not yet been received. Check the PO status in ME23N.",
        statusMessage: "Vendor invoice posting (MIRO) confirmed. FI document 1900016001 posted USD 95,000.",
        statusType: "info",
        screen: {
            title: "MIRO – Vendor Invoice Posting Confirmed",
            subtitle: "Enter Incoming Invoice – Document 1900016001",
            html: `
                <div class="training-callout success">
                    <strong>Invoice Posted:</strong> FI Document 1900016001 | Vendor: V100004 – Apex Technology Components | Date: 2026-06-29
                </div>

                <table class="training-grid">
                    <thead>
                        <tr>
                            <th>Account</th>
                            <th>Description</th>
                            <th>Debit (USD)</th>
                            <th>Credit (USD)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="highlight-row">
                            <td>191100</td>
                            <td>GR/IR Clearing Account</td>
                            <td class="number">95,000.00</td>
                            <td class="number">—</td>
                        </tr>
                        <tr>
                            <td>300000</td>
                            <td>AP – Apex Technology Components</td>
                            <td class="number">—</td>
                            <td class="number">95,000.00</td>
                        </tr>
                    </tbody>
                </table>

                <div class="training-callout info">
                    <strong>Bob Coaching:</strong> This is the standard 2-step MM/FI posting. When MIRO is posted (invoice receipt), SAP debits GR/IR 191100 and credits AP 300000. When the GR is posted via MIGO, SAP debits Inventory 130000 and credits GR/IR 191100 — completing the three-way match. Until the GR is posted, 191100 has an open debit balance.
                </div>
            `
        },
        lines: [
            { text: "You entered MIRO to review the vendor invoice entry.", type: "prompt" },
            { text: "Bob: Good. MIRO is used to post or review vendor invoices against purchase orders.", type: "success" },
            { text: "Bob: Document 1900016001 posted a debit to GR/IR account 191100 (USD 95,000) and a credit to AP 300000.", type: "info" },
            { text: "Bob: The GR/IR will clear automatically when the goods receipt is posted via MIGO in period 007.", type: "info" }
        ]
    },

    // ───── SD/O2C TRANSACTIONS (EXISTING COACHING MODE) ──────────────────────

    VF01: {
        completedStep: "observe_billing_error",
        hint: "Good start. Now investigate whether the billing issue is caused by credit management or logistics status.",
        statusMessage: "Billing creation failed. Review the blocking reason before retrying.",
        statusType: "warning",
        screen: {
            title: "Billing Error Investigation",
            subtitle: "VF01",
            html: `
                <div class="training-callout warning">
                    <strong>System Message:</strong> Billing document was not created.
                </div>

                <table class="training-grid">
                    <thead>
                        <tr>
                            <th>Sales Document</th>
                            <th>Logistics Status</th>
                            <th>Billing Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1000234</td>
                            <td>Completed</td>
                            <td>Blocked for credit review</td>
                        </tr>
                    </tbody>
                </table>

                <div class="training-callout info">
                    <strong>Bob Coaching:</strong> You confirmed that billing failed, but the logistics process is already complete. That means you should now investigate whether a financial or credit-related control is blocking the document.
                    ${hintPill("VKM3", "Blocked SD Documents for Credit Management")}
                </div>
            `
        },
        lines: [
            { text: "You entered VF01 to attempt billing creation.", type: "prompt" },
            { text: "Bob: Good choice. Always start by reproducing the issue reported by the business user.", type: "success" },
            { text: "Bob: The output shows that logistics is complete, so the next step is to investigate a possible credit block.", type: "info" },
            { text: "Bob: Which transaction would you use to analyze blocked documents for credit review?", type: "warning" }
        ]
    },

    VKM3: {
        completedStep: "analyze_credit_block",
        hint: "You found the credit block. Now validate the sales document context before deciding what should be checked for release.",
        statusMessage: "Credit block analysis displayed successfully.",
        statusType: "success",
        screen: {
            title: "Credit Block Analysis",
            subtitle: "VKM3",
            html: `
                <div class="training-callout success">
                    <strong>System Finding:</strong> The sales document is listed in credit management review.
                </div>

                <table class="training-grid">
                    <thead>
                        <tr>
                            <th>Sales Document</th>
                            <th>Customer</th>
                            <th>Credit Status</th>
                            <th>Release Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1000234</td>
                            <td>1000234</td>
                            <td>Blocked</td>
                            <td>Pending review</td>
                        </tr>
                    </tbody>
                </table>

                <div class="training-callout info">
                    <strong>Bob Coaching:</strong> Excellent choice. You accessed VKM3 and confirmed that the document is blocked for credit review. Before releasing it, you should validate the customer, document value, risk exposure, and whether the release follows governance rules.
                    ${hintPill("VA03", "Display Sales Order — validate the document context")}
                </div>
            `
        },
        lines: [
            { text: "You entered VKM3 to analyze the credit block.", type: "prompt" },
            { text: "Bob: Excellent choice. VKM3 is the correct transaction to review blocked documents for credit management.", type: "success" },
            { text: "Bob: Before releasing the document, validate the customer account, credit exposure, document value, and approval rules.", type: "info" },
            { text: "Bob: To explain the business context clearly, which transaction would you use to review the sales document itself?", type: "warning" }
        ]
    },

    VA03: {
        completedStep: "validate_document_context",
        hint: "Scenario completed. You followed the correct investigation path from billing failure to credit analysis and document validation.",
        statusMessage: "Sales document context displayed successfully.",
        statusType: "success",
        screen: {
            title: "Sales Document Context Review",
            subtitle: "VA03",
            html: `
                <div class="training-callout success">
                    <strong>Business Context Confirmed:</strong> The sales document is complete from a logistics perspective but blocked for billing due to credit review.
                </div>

                <table class="training-grid">
                    <thead>
                        <tr>
                            <th>Sales Document</th>
                            <th>Customer</th>
                            <th>Sales Area</th>
                            <th>Overall Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1000234</td>
                            <td>1000234</td>
                            <td>1000 / 10 / 00</td>
                            <td>Billing blocked by credit management</td>
                        </tr>
                    </tbody>
                </table>

                <div class="training-callout success">
                    <strong>Bob Coaching:</strong> Well done. You confirmed that the issue is not a logistics failure. The correct explanation is that billing is blocked by credit management, so the analyst must validate governance checks before any release decision.
                </div>
            `
        },
        lines: [
            { text: "You entered VA03 to review the sales document context.", type: "prompt" },
            { text: "Bob: Great. VA03 helps you explain the issue in business language, not only technical language.", type: "success" },
            { text: "Bob: You now know the root cause chain: billing failed -> credit block identified -> document context validated.", type: "info" },
            { text: "Bob: Scenario complete. You investigated the issue in the correct sequence.", type: "success" }
        ]
    }
};

export function getTransactionResponse(code) {
    return transactionResponses[code] || null;
}

// Made with Bob – FI/CO transaction responses added for Senior Manager / Principal Consultant coaching
