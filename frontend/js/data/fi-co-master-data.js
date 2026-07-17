/**
 * SAP FI/CO Master Data Repository
 * Financial Accounting and Controlling data for Senior Manager / Principal Consultant simulation
 * All data follows SAP S/4HANA naming conventions, chart of accounts, and real business logic
 */

export const FI_CO_MASTER_DATA = {

    // ─── ENTERPRISE STRUCTURE ──────────────────────────────────────────────────

    // Controlling Areas (CO-OM-CCA)
    controllingAreas: [
        {
            code: "1000",
            name: "North America Controlling Area",
            currency: "USD",
            fiscalVariant: "K4",         // K4 = calendar year Jan–Dec
            companyCode: "1000",
            costCenterHierarchy: "H-NA-STD"
        },
        {
            code: "2000",
            name: "Europe Controlling Area",
            currency: "EUR",
            fiscalVariant: "K4",
            companyCode: "2000",
            costCenterHierarchy: "H-EU-STD"
        }
    ],

    // Company Codes (FI-GL)
    companyCodes: [
        {
            code: "1000",
            name: "TechMart Group USA Inc.",
            country: "US",
            currency: "USD",
            chartOfAccounts: "CAUS",
            fiscalYear: "K4",
            language: "EN",
            taxProcedure: "TAXUS"
        },
        {
            code: "2000",
            name: "TechMart Group Europe GmbH",
            country: "DE",
            currency: "EUR",
            chartOfAccounts: "CADE",
            fiscalYear: "K4",
            language: "EN",
            taxProcedure: "TAXD"
        }
    ],

    // ─── CHART OF ACCOUNTS (FI-GL) ─────────────────────────────────────────────

    // General Ledger Accounts – CAUS (North America)
    glAccounts: [
        // Assets
        { account: "100000", description: "Cash – Operating Account",          type: "BSA", category: "Current Assets",       normal: "D" },
        { account: "110000", description: "Accounts Receivable – Trade",        type: "BSA", category: "Current Assets",       normal: "D" },
        { account: "119900", description: "Allowance for Doubtful Accounts",    type: "BSA", category: "Current Assets",       normal: "K" },
        { account: "130000", description: "Inventory – Raw Materials",          type: "BSA", category: "Current Assets",       normal: "D" },
        { account: "131000", description: "Inventory – Finished Goods",         type: "BSA", category: "Current Assets",       normal: "D" },
        { account: "200000", description: "Property Plant and Equipment",       type: "BSA", category: "Fixed Assets",         normal: "D" },
        { account: "201000", description: "Accumulated Depreciation – PP&E",    type: "BSA", category: "Fixed Assets",         normal: "K" },
        // Liabilities
        { account: "300000", description: "Accounts Payable – Trade",           type: "BSA", category: "Current Liabilities",  normal: "K" },
        { account: "310000", description: "VAT / Sales Tax Payable",            type: "BSA", category: "Current Liabilities",  normal: "K" },
        { account: "320000", description: "Accrued Liabilities",                type: "BSA", category: "Current Liabilities",  normal: "K" },
        { account: "400000", description: "Long-term Debt",                     type: "BSA", category: "Long-term Liabilities", normal: "K" },
        // Equity
        { account: "500000", description: "Share Capital",                      type: "BSA", category: "Equity",               normal: "K" },
        { account: "510000", description: "Retained Earnings",                  type: "BSA", category: "Equity",               normal: "K" },
        // Revenue (P&L)
        { account: "600000", description: "Revenue – Product Sales",            type: "P&L", category: "Revenue",              normal: "K" },
        { account: "601000", description: "Revenue – Service Sales",            type: "P&L", category: "Revenue",              normal: "K" },
        { account: "609000", description: "Sales Deductions and Rebates",       type: "P&L", category: "Revenue",              normal: "D" },
        // Cost of Goods Sold
        { account: "700000", description: "Cost of Goods Sold – Products",      type: "P&L", category: "COGS",                 normal: "D" },
        { account: "701000", description: "Cost of Services Rendered",          type: "P&L", category: "COGS",                 normal: "D" },
        // Expenses
        { account: "800000", description: "Personnel Costs – Salaries",         type: "P&L", category: "Operating Expenses",   normal: "D" },
        { account: "801000", description: "Personnel Costs – Benefits",         type: "P&L", category: "Operating Expenses",   normal: "D" },
        { account: "810000", description: "Travel and Entertainment",            type: "P&L", category: "Operating Expenses",   normal: "D" },
        { account: "820000", description: "IT Infrastructure and Software",     type: "P&L", category: "Operating Expenses",   normal: "D" },
        { account: "830000", description: "Marketing and Advertising",          type: "P&L", category: "Operating Expenses",   normal: "D" },
        { account: "840000", description: "Depreciation Expense",               type: "P&L", category: "Operating Expenses",   normal: "D" },
        { account: "850000", description: "Rent and Facility Costs",            type: "P&L", category: "Operating Expenses",   normal: "D" },
        { account: "900000", description: "Interest Income",                    type: "P&L", category: "Financial Result",     normal: "K" },
        { account: "901000", description: "Interest Expense",                   type: "P&L", category: "Financial Result",     normal: "D" },
        { account: "910000", description: "Foreign Exchange Gain / Loss",       type: "P&L", category: "Financial Result",     normal: "D" }
    ],

    // ─── COST CENTERS (CO-OM-CCA) ──────────────────────────────────────────────

    costCenters: [
        // North America – Management
        { code: "10101000", name: "CEO Office",              controllingArea: "1000", companyCode: "1000", category: "MGMT",  responsibleManager: "John Harper",    costCenterGroup: "10-TOP",   currency: "USD", validFrom: "2020-01-01" },
        { code: "10102000", name: "CFO Finance",             controllingArea: "1000", companyCode: "1000", category: "MGMT",  responsibleManager: "Sarah Kim",      costCenterGroup: "10-FIN",   currency: "USD", validFrom: "2020-01-01" },
        { code: "10103000", name: "IT Operations",           controllingArea: "1000", companyCode: "1000", category: "ADMIN", responsibleManager: "Mark Torres",    costCenterGroup: "10-IT",    currency: "USD", validFrom: "2020-01-01" },
        { code: "10104000", name: "Human Resources",         controllingArea: "1000", companyCode: "1000", category: "ADMIN", responsibleManager: "Lisa Park",      costCenterGroup: "10-HR",    currency: "USD", validFrom: "2020-01-01" },
        // North America – Sales & Marketing
        { code: "10201000", name: "US Sales – East Coast",   controllingArea: "1000", companyCode: "1000", category: "SALES", responsibleManager: "Tom Bradley",    costCenterGroup: "10-SALES", currency: "USD", validFrom: "2020-01-01" },
        { code: "10202000", name: "US Sales – West Coast",   controllingArea: "1000", companyCode: "1000", category: "SALES", responsibleManager: "Alice Nguyen",   costCenterGroup: "10-SALES", currency: "USD", validFrom: "2020-01-01" },
        { code: "10203000", name: "Marketing Americas",      controllingArea: "1000", companyCode: "1000", category: "SALES", responsibleManager: "Brian Walsh",    costCenterGroup: "10-MKTG",  currency: "USD", validFrom: "2020-01-01" },
        // North America – Production
        { code: "10301000", name: "Manufacturing Plant NY",  controllingArea: "1000", companyCode: "1000", category: "PROD",  responsibleManager: "Carlos Mendez",  costCenterGroup: "10-PROD",  currency: "USD", validFrom: "2020-01-01" },
        { code: "10302000", name: "Manufacturing Plant LA",  controllingArea: "1000", companyCode: "1000", category: "PROD",  responsibleManager: "Diana Flores",   costCenterGroup: "10-PROD",  currency: "USD", validFrom: "2020-01-01" },
        { code: "10303000", name: "Logistics and Warehouse", controllingArea: "1000", companyCode: "1000", category: "PROD",  responsibleManager: "Frank Zhou",     costCenterGroup: "10-LOG",   currency: "USD", validFrom: "2020-01-01" },
        // Europe – Management
        { code: "20101000", name: "Europe HQ Management",   controllingArea: "2000", companyCode: "2000", category: "MGMT",  responsibleManager: "Hans Mueller",   costCenterGroup: "20-TOP",   currency: "EUR", validFrom: "2020-01-01" },
        { code: "20102000", name: "EU Finance Control",     controllingArea: "2000", companyCode: "2000", category: "MGMT",  responsibleManager: "Claudia Becker", costCenterGroup: "20-FIN",   currency: "EUR", validFrom: "2020-01-01" },
        // Europe – Sales
        { code: "20201000", name: "Germany Sales",          controllingArea: "2000", companyCode: "2000", category: "SALES", responsibleManager: "Stefan Richter", costCenterGroup: "20-SALES", currency: "EUR", validFrom: "2020-01-01" },
        { code: "20202000", name: "UK and France Sales",    controllingArea: "2000", companyCode: "2000", category: "SALES", responsibleManager: "Sophie Martin",  costCenterGroup: "20-SALES", currency: "EUR", validFrom: "2020-01-01" }
    ],

    // ─── PROFIT CENTERS (CO-PCA) ───────────────────────────────────────────────

    profitCenters: [
        { code: "PC-ELEC-NA",  name: "Electronics – North America", controllingArea: "1000", segment: "Electronics",  responsibleManager: "Mark Torres",  hierarchyNode: "ELECTRONICS" },
        { code: "PC-IND-NA",   name: "Industrial – North America",  controllingArea: "1000", segment: "Industrial",   responsibleManager: "Diana Flores",  hierarchyNode: "INDUSTRIAL"  },
        { code: "PC-CONS-NA",  name: "Consumer Goods – N. America", controllingArea: "1000", segment: "ConsumerGoods", responsibleManager: "Alice Nguyen",  hierarchyNode: "CONSUMER"   },
        { code: "PC-ELEC-EU",  name: "Electronics – Europe",        controllingArea: "2000", segment: "Electronics",  responsibleManager: "Stefan Richter", hierarchyNode: "ELECTRONICS" },
        { code: "PC-CONS-EU",  name: "Consumer Goods – Europe",     controllingArea: "2000", segment: "ConsumerGoods", responsibleManager: "Sophie Martin", hierarchyNode: "CONSUMER"   }
    ],

    // ─── VENDORS (FI-AP) ──────────────────────────────────────────────────────

    vendors: [
        {
            code: "V100001",
            name: "Precision Parts Manufacturing",
            country: "US",
            city: "Detroit",
            companyCode: "1000",
            paymentTerms: "0001",
            currency: "USD",
            bankAccount: "US-BANK-001",
            blocked: false,
            openItems: 3,
            openBalance: 145000.00
        },
        {
            code: "V100002",
            name: "Global Component Supply",
            country: "CN",
            city: "Shenzhen",
            companyCode: "1000",
            paymentTerms: "0002",
            currency: "USD",
            bankAccount: "CN-BANK-001",
            blocked: false,
            openItems: 7,
            openBalance: 890000.00
        },
        {
            code: "V200001",
            name: "EuroSteelworks AG",
            country: "DE",
            city: "Essen",
            companyCode: "2000",
            paymentTerms: "0001",
            currency: "EUR",
            bankAccount: "DE-BANK-001",
            blocked: false,
            openItems: 4,
            openBalance: 320000.00
        },
        {
            code: "V200002",
            name: "Rheingold Logistics GmbH",
            country: "DE",
            city: "Cologne",
            companyCode: "2000",
            paymentTerms: "Z001",
            currency: "EUR",
            bankAccount: "DE-BANK-002",
            blocked: true,
            blockReason: "Master data review in progress",
            openItems: 2,
            openBalance: 48000.00
        }
    ],

    // ─── FI DOCUMENTS (FI-GL / FI-AR / FI-AP) ─────────────────────────────────

    fiDocuments: [
        {
            docNumber: "1900012345",
            companyCode: "1000",
            fiscalYear: "2026",
            period: "6",
            docDate: "2026-06-30",
            postingDate: "2026-06-30",
            docType: "RV",                        // RV = SD billing transfer
            currency: "USD",
            reference: "9000012345",              // billing document
            headerText: "SD Invoice – Industrial Supply Corp",
            status: "Posted",
            lineItems: [
                { lineItem: "001", account: "110000", description: "AR TechMart – Industrial Supply",  debit:  229500.00, credit: 0,         costCenter: null,       profitCenter: "PC-IND-NA"  },
                { lineItem: "002", account: "600000", description: "Revenue – Pump X500 Sales",        debit:  0,          credit: 212500.00, costCenter: null,       profitCenter: "PC-IND-NA"  },
                { lineItem: "003", account: "310000", description: "Sales Tax Payable",                debit:  0,          credit: 17000.00,  costCenter: null,       profitCenter: null         }
            ]
        },
        {
            docNumber: "1900012346",
            companyCode: "1000",
            fiscalYear: "2026",
            period: "6",
            docDate: "2026-06-28",
            postingDate: "2026-06-28",
            docType: "KR",                        // KR = Vendor Invoice
            currency: "USD",
            reference: "SUPP-INV-8876",
            headerText: "Vendor Invoice – Precision Parts Manufacturing",
            status: "Posted",
            lineItems: [
                { lineItem: "001", account: "300000", description: "AP Precision Parts Mfg",          debit:  0,          credit: 145000.00, costCenter: null,       profitCenter: null },
                { lineItem: "002", account: "130000", description: "Raw Materials Inventory",          debit:  145000.00,  credit: 0,         costCenter: null,       profitCenter: null }
            ]
        },
        {
            docNumber: "1900012347",
            companyCode: "1000",
            fiscalYear: "2026",
            period: "6",
            docDate: "2026-07-01",
            postingDate: "2026-07-01",
            docType: "SA",                        // SA = G/L Account posting
            currency: "USD",
            reference: "ACCRUAL-JUN-2026",
            headerText: "June 2026 Accrual – Personnel Costs",
            status: "Posted",
            lineItems: [
                { lineItem: "001", account: "800000", description: "Salary Accrual June 2026",         debit:  320000.00,  credit: 0,         costCenter: "10201000", profitCenter: "PC-ELEC-NA" },
                { lineItem: "002", account: "320000", description: "Accrued Payroll Liability",         debit:  0,          credit: 320000.00, costCenter: null,       profitCenter: null }
            ]
        }
    ],

    // ─── COST CENTER PLAN vs ACTUAL (CO-OM-CCA) ───────────────────────────────

    costCenterActuals: [
        // Period 6 (June 2026) – NA
        { costCenter: "10101000", period: "006", fiscalYear: "2026", glAccount: "800000", actual: 125000.00, plan: 120000.00, currency: "USD", variance: 5000.00 },
        { costCenter: "10102000", period: "006", fiscalYear: "2026", glAccount: "800000", actual: 98000.00,  plan: 95000.00,  currency: "USD", variance: 3000.00 },
        { costCenter: "10103000", period: "006", fiscalYear: "2026", glAccount: "820000", actual: 215000.00, plan: 190000.00, currency: "USD", variance: 25000.00 },
        { costCenter: "10201000", period: "006", fiscalYear: "2026", glAccount: "800000", actual: 320000.00, plan: 310000.00, currency: "USD", variance: 10000.00 },
        { costCenter: "10202000", period: "006", fiscalYear: "2026", glAccount: "810000", actual: 87000.00,  plan: 75000.00,  currency: "USD", variance: 12000.00 },
        { costCenter: "10301000", period: "006", fiscalYear: "2026", glAccount: "700000", actual: 540000.00, plan: 520000.00, currency: "USD", variance: 20000.00 },
        { costCenter: "10302000", period: "006", fiscalYear: "2026", glAccount: "840000", actual: 48000.00,  plan: 48000.00,  currency: "USD", variance: 0.00 }
    ],

    // ─── OPEN ITEMS / PAYMENT PROPOSALS (FI-AP) ───────────────────────────────

    openVendorItems: [
        {
            vendor: "V100001",
            docNumber: "1900012346",
            companyCode: "1000",
            docDate: "2026-06-28",
            netDueDate: "2026-07-28",
            invoiceRef: "SUPP-INV-8876",
            amount: 145000.00,
            currency: "USD",
            paymentTerms: "0001",
            clearingStatus: "Open",
            paymentBlock: null
        },
        {
            vendor: "V100002",
            docNumber: "1900012350",
            companyCode: "1000",
            docDate: "2026-06-10",
            netDueDate: "2026-08-09",
            invoiceRef: "GLOB-INV-44512",
            amount: 420000.00,
            currency: "USD",
            paymentTerms: "0002",
            clearingStatus: "Open",
            paymentBlock: null
        },
        {
            vendor: "V100002",
            docNumber: "1900012351",
            companyCode: "1000",
            docDate: "2026-06-20",
            netDueDate: "2026-08-19",
            invoiceRef: "GLOB-INV-44518",
            amount: 470000.00,
            currency: "USD",
            paymentTerms: "0002",
            clearingStatus: "Open",
            paymentBlock: "R"                     // R = payment block – review required
        },
        {
            vendor: "V200001",
            docNumber: "1900015001",
            companyCode: "2000",
            docDate: "2026-06-25",
            netDueDate: "2026-07-25",
            invoiceRef: "ES-INV-20261",
            amount: 320000.00,
            currency: "EUR",
            paymentTerms: "0001",
            clearingStatus: "Open",
            paymentBlock: null
        }
    ],

    // ─── PAYMENT RUNS (FI-AP F110) ────────────────────────────────────────────

    paymentRuns: [
        {
            runId: "20260705-A",
            companyCode: "1000",
            paymentDate: "2026-07-05",
            identificationCode: "RUN-A",
            status: "Proposal Created",
            totalProposed: 565000.00,
            currency: "USD",
            vendorCount: 2,
            documentCount: 2,
            exceptions: 1,
            exceptionReason: "Payment block on document 1900012351 – manual release required"
        }
    ],

    // ─── GL ACCOUNT BALANCES (FS10N input data) ────────────────────────────────

    glBalances: [
        { account: "110000", companyCode: "1000", fiscalYear: "2026", period: "006", openingBalance: 1850000.00, debit: 229500.00,  credit: 0,          closingBalance: 2079500.00, currency: "USD" },
        { account: "600000", companyCode: "1000", fiscalYear: "2026", period: "006", openingBalance: 0,          debit: 0,          credit: 212500.00,  closingBalance: 212500.00,  currency: "USD" },
        { account: "300000", companyCode: "1000", fiscalYear: "2026", period: "006", openingBalance: 980000.00,  debit: 0,          credit: 145000.00,  closingBalance: 1125000.00, currency: "USD" },
        { account: "800000", companyCode: "1000", fiscalYear: "2026", period: "006", openingBalance: 1600000.00, debit: 320000.00,  credit: 0,          closingBalance: 1920000.00, currency: "USD" }
    ]
};

// ─── HELPER FUNCTIONS ─────────────────────────────────────────────────────────

export function getCostCenterByCode(code) {
    return FI_CO_MASTER_DATA.costCenters.find(c => c.code === code);
}

export function getGLAccountByNumber(account) {
    return FI_CO_MASTER_DATA.glAccounts.find(a => a.account === account);
}

export function getProfitCenterByCode(code) {
    return FI_CO_MASTER_DATA.profitCenters.find(p => p.code === code);
}

export function getVendorByCode(code) {
    return FI_CO_MASTER_DATA.vendors.find(v => v.code === code);
}

export function getFIDocumentByNumber(docNumber) {
    return FI_CO_MASTER_DATA.fiDocuments.find(d => d.docNumber === docNumber);
}

export function filterCostCenterActuals(filters) {
    let items = [...FI_CO_MASTER_DATA.costCenterActuals];
    if (filters.costCenter) items = items.filter(i => i.costCenter.startsWith(filters.costCenter));
    if (filters.period)     items = items.filter(i => i.period === filters.period);
    if (filters.fiscalYear) items = items.filter(i => i.fiscalYear === filters.fiscalYear);
    return items;
}

export function filterOpenVendorItems(filters) {
    let items = [...FI_CO_MASTER_DATA.openVendorItems];
    if (filters.vendor)      items = items.filter(i => i.vendor === filters.vendor);
    if (filters.companyCode) items = items.filter(i => i.companyCode === filters.companyCode);
    return items;
}

// Made with Bob
