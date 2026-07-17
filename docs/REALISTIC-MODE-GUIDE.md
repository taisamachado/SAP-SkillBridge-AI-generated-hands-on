# SAP SkillBridge Simulator - Realistic Mode Guide

## Overview

The SAP SkillBridge Simulator now includes a **Professional Mode** that provides a high-fidelity simulation of real SAP S/4HANA workflows. This mode is designed to prepare learners for job interviews by matching the actual SAP user experience.

## Dual-Mode Architecture

### Beginner Mode (Default)
- **Purpose**: Learn business logic and SAP concepts
- **Features**: Bob coaching, plain English guidance, step-by-step investigation
- **Best for**: Understanding WHY things happen in SAP

### Professional Mode
- **Purpose**: Practice real SAP workflows for interview preparation
- **Features**: Realistic selection screens, dense filter fields, result grids, SAP messages
- **Best for**: Learning HOW to use SAP transactions

## How to Switch Modes

Click the **"Switch to Professional Mode"** button in the top-right corner of the simulator.

## Professional Mode - Available Transactions

### Sales & Distribution (SD)
- **VA03** - Display Sales Order
- **VA05** - List of Sales Orders
- **VF01** - Create Billing Document
- **VF04** - Billing Due List

### Shipping (LE)
- **VL03N** - Display Outbound Delivery

### Credit Management (FI-AR)
- **VKM3** - Display Credit Master Data

### Materials Management (MM)
- **MMBE** - Stock Overview
- **MB51** - Material Document List

## Realistic Master Data

The simulator includes comprehensive S/4HANA master data:

### Customers
- **100001** - TechMart Electronics Inc. (US) - **CREDIT BLOCKED** (425K/500K used)
- **100002** - Global Retail Solutions (US) - OK (320K/750K used)
- **100003** - Industrial Supply Corp (US) - OK (850K/1M used)
- **200001** - EuroTech Distribution GmbH (DE) - OK
- **200002** - Deutsche Einzelhandel AG (DE) - **CREDIT BLOCKED** (395K/400K used)
- **300001** - Brasil Comércio Ltda (BR) - OK

### Materials
- **MAT-10001** - Laptop Computer Pro 15-inch ($1,299.00, 450 EA available)
- **MAT-10002** - Wireless Mouse Ergonomic ($49.99, 2,500 EA available)
- **MAT-10003** - 4K Monitor 27-inch Professional ($599.00, 180 EA available)
- **MAT-20001** - Industrial Pump Model X500 ($8,500.00, 25 EA available)
- **MAT-20002** - Hydraulic Valve Assembly ($1,250.00, 150 EA available)
- **MAT-30001** - Premium Coffee Maker Deluxe ($199.99, 850 EA available)
- **MAT-30002** - Stainless Steel Cookware Set ($349.99, 320 EA available)

### Sales Orders
- **4500012345** - TechMart Electronics - **CREDIT BLOCKED** - $129,900
- **4500012346** - Global Retail Solutions - Partially Delivered - $169,991.50
- **4500012347** - Industrial Supply Corp - Delivered, Ready for Billing - $212,500
- **4500012348** - Deutsche Einzelhandel AG - **CREDIT BLOCKED** - €69,996.50

### Organizational Data
- **Sales Org 1000** - Global Sales US (USD)
- **Sales Org 2000** - Global Sales Europe (EUR)
- **Sales Org 3000** - Global Sales LATAM (BRL)
- **Plant 1010** - New York Distribution Center
- **Plant 1020** - Los Angeles Manufacturing
- **Plant 2010** - Hamburg Logistics Hub
- **Plant 3010** - São Paulo Distribution

## Realistic SAP Messages

The simulator displays authentic SAP messages with real message IDs:

### Credit Management Messages
- **V1 401** - Credit limit exceeded for customer {customer}
- **VF 003** - Credit block active for customer {customer} - billing not allowed
- **BRAIN 601** - Credit limit of {amount} {currency} exceeded for customer {customer}

### Billing Messages
- **VF 001** - Billing document cannot be created: Delivery {delivery} not goods issued
- **VF 002** - Sales order {order} is blocked for billing
- **VF 101** - Billing document {billing} has been created

### Delivery Messages
- **VL 311** - Delivery {delivery} cannot be created: No stock available
- **VL 421** - Delivery {delivery} has been saved
- **VL 611** - Goods issue posted for delivery {delivery}

### Materials Management Messages
- **M7 021** - Material {material} does not exist in plant {plant}
- **M7 305** - Negative stock not allowed for material {material} in plant {plant}

## Professional Mode Workflow Examples

### Example 1: Display Sales Order with Credit Block

1. Switch to Professional Mode
2. Enter transaction: **VA03**
3. Fill selection screen:
   - Sales Order: **4500012345**
   - Sales Org: **1000**
4. Press **Execute (F8)**
5. Result: Order details with **CREDIT BLOCKED** status badge
6. SAP Message: **V1 401** - Credit limit exceeded

### Example 2: Check Customer Credit Status

1. Enter transaction: **VKM3**
2. Fill selection screen:
   - Customer: **100001**
   - Credit Control Area: **1000**
3. Press **Execute (F8)**
4. Result: Credit master data showing:
   - Credit Limit: $500,000
   - Credit Exposure: $425,000
   - Available Credit: $75,000
   - Utilization: 85% (Warning)
   - Status: **BLOCKED**

### Example 3: Find Orders Ready for Billing

1. Enter transaction: **VF04**
2. Fill selection screen:
   - Billing Type: **F2** (Invoice)
   - Sales Org: **1000**
   - Date From: **2026-06-01**
   - Date To: **2026-06-30**
   - Check: **Ready for Billing**
3. Press **Execute (F8)**
4. Result: List of deliveries ready for billing
5. Select orders and click **Create Billing Documents**

### Example 4: Check Material Stock

1. Enter transaction: **MMBE**
2. Fill selection screen:
   - Material: **MAT-10001**
   - Plant: **1010**
   - Storage Location: **0001**
3. Press **Execute (F8)**
4. Result: Stock overview showing:
   - Unrestricted: 450 EA
   - Total Stock: 450 EA
   - Value: $584,550 USD

### Example 5: Review Material Movements

1. Enter transaction: **MB51**
2. Fill selection screen:
   - Plant: **1010**
   - Storage Location: **0001**
   - Posting Date From: **2026-06-01**
   - Posting Date To: **2026-06-30**
3. Press **Execute (F8)**
4. Result: List of goods movements with:
   - Movement Type 101 (Goods Receipt)
   - Movement Type 601 (Goods Issue for Sales Order)

## Interview Preparation Tips

### What Interviewers Look For

1. **Navigation Skills**: Can you quickly find the right transaction?
2. **Selection Screen Knowledge**: Do you know which fields are mandatory?
3. **Data Interpretation**: Can you read SAP result grids and understand status indicators?
4. **Problem Solving**: Can you investigate issues using multiple transactions?
5. **SAP Terminology**: Do you use correct SAP terms (Sold-to Party, Distribution Channel, etc.)?

### Practice Scenarios

#### Scenario 1: Credit Block Investigation
**Interview Question**: "A customer calls saying their order is blocked. How do you investigate?"

**Answer Using Simulator**:
1. VA05 - Find the order (filter by customer)
2. VA03 - Display the order details (check credit status)
3. VKM3 - Check customer credit master data
4. Explain: "The order is blocked because the customer has exceeded their credit limit. Credit exposure is $425K against a limit of $500K, but with this new order, they would exceed the limit."

#### Scenario 2: Billing Block Resolution
**Interview Question**: "Why can't we create a billing document for this order?"

**Answer Using Simulator**:
1. VF04 - Check billing due list
2. VA03 - Display the sales order
3. VL03N - Check delivery status
4. Explain possible reasons:
   - Delivery not goods issued
   - Credit block active
   - Billing block set on order

#### Scenario 3: Stock Shortage
**Interview Question**: "A delivery cannot be created due to insufficient stock. How do you verify?"

**Answer Using Simulator**:
1. MMBE - Check current stock levels
2. MB51 - Review recent goods movements
3. Explain: "Current unrestricted stock is X units, but the order requires Y units. Recent goods issues show high consumption."

## Selection Screen Best Practices

### Mandatory Fields
- Always fill fields marked with **red labels** or **"required"**
- Common mandatory fields:
  - Document numbers (Order, Delivery, Billing)
  - Organizational data (Sales Org, Plant)
  - Date ranges (From/To dates)

### Using Ranges
- Use **"to"** fields for range selections
- Example: Order Number 4500012345 to 4500012350
- Leave "to" field empty to search from starting value onwards

### Status Checkboxes
- Select relevant status filters to narrow results
- Common filters:
  - Open Orders
  - Credit Blocked
  - Delivery Blocked
  - Billing Blocked
  - Completely Delivered
  - Completely Billed

### Date Selection
- Always specify date ranges to avoid performance issues
- Use realistic date ranges (e.g., current month)
- Default dates in simulator: 2026-06-01 to 2026-06-30

## Result Grid Interpretation

### Status Badges
- **Green (Success)**: OK, Released, Posted, Ready
- **Yellow (Warning)**: In Process, Partially Delivered, Approaching Limit
- **Red (Error)**: Blocked, Failed, Exceeded

### Common Status Values

#### Credit Status
- **A** - Released
- **B** - Blocked
- **C** - Partially Released

#### Delivery Status
- **Not Delivered** - No delivery created
- **Partially Delivered** - Some items delivered
- **Delivered** - All items delivered

#### Billing Status
- **Not Billed** - No billing document created
- **Partially Billed** - Some items billed
- **Fully Billed** - All items billed

## Keyboard Shortcuts (SAP Standard)

- **F3** - Back
- **F8** - Execute
- **Ctrl+S** - Save
- **Ctrl+F** - Find
- **Ctrl+G** - Find Next

## Next Steps

After mastering Professional Mode:

1. **Practice all 8 transactions** until you can navigate without thinking
2. **Memorize key master data** (customer numbers, material codes, plants)
3. **Learn SAP message IDs** and what they mean
4. **Practice explaining** your investigation process out loud
5. **Combine transactions** to solve complex business problems

## Troubleshooting

### Selection Screen Not Showing
- Verify you're in Professional Mode (button should say "Switch to Beginner Mode")
- Check that you entered a supported transaction code
- Supported: VA03, VA05, VL03N, VF01, VF04, VKM3, MMBE, MB51

### Execute Button Not Working
- Ensure all mandatory fields are filled
- Check that date ranges are valid
- Verify filter values match available master data

### No Results Found
- Check your filter criteria
- Try broader date ranges
- Verify organizational data (Sales Org, Plant) matches master data
- Use VA05 with minimal filters to see all available orders

## Additional Resources

- **Master Data Reference**: See `frontend/js/data/master-data.js` for complete data
- **SAP Messages**: See `frontend/js/data/sap-messages.js` for all message IDs
- **First Scenario**: See `docs/first-scenario.md` for beginner mode walkthrough

## Feedback and Improvements

This simulator is continuously evolving. Future enhancements will include:
- More transactions (VA01, VA02, VL01N, VL02N, VF02, VKM1, FD32)
- Additional master data
- More complex business scenarios
- Integration with other SAP modules (PP, QM, WM)

---

**Made with Bob for the IBMer watsonx Challenge 2026**