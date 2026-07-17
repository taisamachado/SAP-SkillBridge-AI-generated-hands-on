# SAP Consultant - Real World Use Cases

## Understanding SAP Roles

### Who Works with SAP?

1. **SAP Functional Consultant (SD/MM/FI)**
   - Understands business processes
   - Configures SAP to meet business needs
   - Supports end users
   - Investigates and resolves issues

2. **SAP End Users**
   - Sales representatives
   - Warehouse staff
   - Billing clerks
   - Credit managers
   - Accountants

3. **SAP Basis/Technical Consultant**
   - Manages SAP infrastructure
   - Handles system performance
   - Manages authorizations

4. **Business Analysts**
   - Define requirements
   - Bridge business and IT

## Daily Life of an SAP SD Consultant

### Morning Routine

**8:00 AM** - Check emails and ServiceNow tickets
- Users report issues
- Managers request reports
- Credit team escalates blocked orders

**8:30 AM** - Daily standup meeting
- Discuss ongoing issues
- Prioritize urgent tickets
- Coordinate with other teams

**9:00 AM** - Start working on tickets

---

## Use Case 1: Customer Calls About Blocked Order

### The Situation

**Who Requests**: Sales Representative (Sarah)

**The Call**:
> "Hi, I'm Sarah from the New York sales office. My customer TechMart Electronics (customer 100001) is calling me upset. They placed a large order yesterday (order 4500012345 for $129,900) but they can't get it shipped. The warehouse says it's blocked. Can you help? This is urgent - they need the laptops for a big project next week!"

### What the SAP Consultant Does

#### Step 1: Understand the Problem
**Consultant thinks**: "Blocked order? Could be credit block, delivery block, or billing block. Let me investigate."

#### Step 2: Check the Sales Order (VA03)
```
Transaction: VA03
Input: Order Number 4500012345
```

**What the consultant sees**:
- Order Type: OR (Standard Order)
- Customer: 100001 - TechMart Electronics Inc.
- Net Value: $129,900.00
- Status: **CREDIT BLOCKED** ❌
- Delivery Status: Not Delivered
- Billing Status: Not Billed

**Consultant thinks**: "Ah! It's a credit block. The order is valid, but credit management is blocking it."

#### Step 3: Check Customer Credit Status (VKM3)
```
Transaction: VKM3
Input: Customer 100001, Credit Control Area 1000
```

**What the consultant sees**:
- Credit Limit: $500,000
- Current Exposure: $425,000
- This Order: $129,900
- Total if Released: $554,900 (EXCEEDS LIMIT by $54,900)
- Utilization: 110.98% ❌

**Consultant thinks**: "The customer has already used $425K of their $500K limit. This new order would push them to $555K, which exceeds their limit by $55K."

#### Step 4: Check Open Orders (VA05)
```
Transaction: VA05
Input: Customer 100001, Credit Blocked checkbox
```

**What the consultant sees**:
- Order 4500012345: $129,900 (NEW - blocked)
- Order 4500012289: $85,000 (blocked - from last month)
- Order 4500012156: $45,000 (blocked - from 2 weeks ago)

**Consultant thinks**: "They have 3 blocked orders totaling $259,900. The old orders are also contributing to the credit exposure."

#### Step 5: Call the Customer Back

**Consultant to Sarah**:
> "Hi Sarah, I found the issue. TechMart has exceeded their credit limit. They have a $500K limit but currently have $425K in open invoices. Your new order for $130K would push them over the limit.
>
> They also have two other blocked orders from the past month totaling $130K. 
>
> Here are your options:
> 1. **Customer pays outstanding invoices** - This frees up credit immediately
> 2. **Request credit limit increase** - I can submit to credit management, but needs approval (takes 2-3 days)
> 3. **Partial release** - Credit manager can release part of the order if it's urgent
> 4. **Cancel old orders** - If those old orders aren't needed, we can cancel them to free up credit
>
> What would you like to do?"

**Sarah**: "Let me call the customer. They usually pay quickly. I'll ask them to pay the oldest invoices today."

#### Step 6: Document in ServiceNow Ticket

**Consultant writes**:
```
TICKET #INC0012345 - Order 4500012345 Blocked

ROOT CAUSE: Credit limit exceeded
- Customer 100001 has $500K credit limit
- Current exposure: $425K
- New order: $130K
- Total would be: $555K (exceeds by $55K)

ACTIONS TAKEN:
1. Verified order details in VA03
2. Checked credit status in VKM3
3. Reviewed all blocked orders in VA05
4. Contacted sales rep with options

RESOLUTION:
- Advised sales rep to request customer payment
- Order will auto-release when credit exposure drops below limit
- Monitoring for payment posting

STATUS: Waiting for customer payment
```

---

## Use Case 2: Billing Team Can't Create Invoices

### The Situation

**Who Requests**: Billing Clerk (Mike)

**The Email**:
> "Hi, I'm trying to run the daily billing for orders that were delivered yesterday, but several orders are not showing up in VF04. The warehouse confirmed goods were shipped. Can you check what's wrong? We need to bill these today for month-end closing."

### What the SAP Consultant Does

#### Step 1: Check Billing Due List (VF04)
```
Transaction: VF04
Input: 
- Billing Type: F2 (Invoice)
- Sales Org: 1000
- Date From: 2026-06-28
- Date To: 2026-06-30
- Check: Ready for Billing
```

**What the consultant sees**:
- Order 4500012347: $212,500 ✅ (Ready)
- Order 4500012346: $170,000 ❌ (Not in list)

**Consultant thinks**: "Order 12346 is missing. Let me investigate why."

#### Step 2: Check the Sales Order (VA03)
```
Transaction: VA03
Input: Order 4500012346
```

**What the consultant sees**:
- Delivery Status: **Partially Delivered** ⚠️
- Item 10: Coffee Makers - Delivered ✅
- Item 20: Cookware Sets - **Not Delivered** ❌
- Billing Status: Not Billed

**Consultant thinks**: "Ah! Only one item was delivered. The second item is still pending. That's why it's not in the billing due list."

#### Step 3: Check the Delivery (VL03N)
```
Transaction: VL03N
Input: Delivery 8000012345
```

**What the consultant sees**:
- Item 10: Coffee Makers - Picked ✅, Goods Issue Posted ✅
- Item 20: Cookware Sets - **Not Picked** ❌

**Consultant thinks**: "The cookware wasn't picked. Let me check why."

#### Step 4: Check Stock (MMBE)
```
Transaction: MMBE
Input: Material MAT-30002, Plant 1010
```

**What the consultant sees**:
- Unrestricted Stock: **50 EA**
- Order Quantity Needed: **200 EA**
- **INSUFFICIENT STOCK** ❌

**Consultant thinks**: "There's not enough stock. Only 50 units available, but the order needs 200."

#### Step 5: Email the Billing Clerk

**Consultant to Mike**:
> "Hi Mike,
>
> I investigated order 4500012346. Here's what I found:
>
> **Why it's not in VF04:**
> - The order has 2 items
> - Item 1 (Coffee Makers) was delivered and is ready for billing ✅
> - Item 2 (Cookware Sets) was NOT delivered due to insufficient stock ❌
>
> **Current Situation:**
> - Stock available: 50 units
> - Order quantity: 200 units
> - Shortage: 150 units
>
> **Options:**
> 1. **Partial billing** - Bill only the coffee makers now ($100K), wait for cookware
> 2. **Wait for stock** - Purchasing says new stock arrives Friday
> 3. **Split delivery** - Ship 50 units now, 150 units later
>
> For month-end closing, I recommend option 1 (partial billing). This gets $100K revenue recognized this month.
>
> Let me know what you prefer."

**Mike**: "Yes, let's do partial billing. I'll process the coffee makers today."

---

## Use Case 3: Warehouse Can't Create Delivery

### The Situation

**Who Requests**: Warehouse Manager (Lisa)

**The Phone Call**:
> "Hi, this is Lisa from the New York warehouse. I'm trying to create a delivery for order 4500012349, but the system won't let me. It says 'No stock available' but I'm looking at the shelf right now and we have plenty of laptops. What's going on?"

### What the SAP Consultant Does

#### Step 1: Check the Sales Order (VA03)
```
Transaction: VA03
Input: Order 4500012349
```

**What the consultant sees**:
- Material: MAT-10001 (Laptop Computer)
- Quantity: 100 EA
- Plant: **1020** (Los Angeles) ⚠️
- Delivery Status: Not Delivered

**Consultant thinks**: "Wait, the order is assigned to Plant 1020 (Los Angeles), but Lisa is in Plant 1010 (New York). That's the problem!"

#### Step 2: Check Stock in Both Plants (MMBE)

**Plant 1010 (New York)**:
```
Transaction: MMBE
Input: Material MAT-10001, Plant 1010
```
Result: **450 EA available** ✅

**Plant 1020 (Los Angeles)**:
```
Transaction: MMBE
Input: Material MAT-10001, Plant 1020
```
Result: **0 EA available** ❌

**Consultant thinks**: "The stock is in New York, but the order is assigned to Los Angeles. We need to either transfer stock or change the order."

#### Step 3: Call Lisa Back

**Consultant to Lisa**:
> "Hi Lisa, I found the issue. The order is assigned to Plant 1020 (Los Angeles), not your plant (1010 New York). That's why the system says no stock - it's looking in LA, not NY.
>
> The good news is you DO have the stock in New York (450 units available).
>
> **Options:**
> 1. **Change the order** - I can change the plant from 1020 to 1010 (takes 5 minutes)
> 2. **Transfer stock** - Use MB1B to transfer from NY to LA (takes longer)
> 3. **Contact LA warehouse** - Maybe they can fulfill it
>
> Since you have the stock and the customer is on the East Coast anyway, option 1 makes the most sense. Should I change it?"

**Lisa**: "Yes, please change it to my plant. The customer is in New York, so it makes more sense to ship from here anyway."

#### Step 4: Change the Order (VA02)
```
Transaction: VA02
Input: Order 4500012349
Change: Plant from 1020 to 1010
Save
```

**Consultant to Lisa**:
> "Done! I changed the plant to 1010. You should be able to create the delivery now. Try transaction VL01N."

**Lisa**: "Perfect! It's working now. Thanks!"

---

## Use Case 4: Month-End Closing - Credit Manager Review

### The Situation

**Who Requests**: Credit Manager (Robert)

**The Meeting**:
> "Hi, it's month-end and I need to review all customers with credit issues. Can you pull a report showing all customers who are over their credit limit or close to it? I need to decide who to call for payment and who might need limit increases."

### What the SAP Consultant Does

#### Step 1: Create a List of Customers to Review

**Consultant thinks**: "I need to check each customer's credit status and create a summary."

#### Step 2: Check Each Customer (VKM3)

**Customer 100001 - TechMart Electronics**:
```
Transaction: VKM3
Input: Customer 100001
```
Result:
- Limit: $500,000
- Exposure: $425,000
- Utilization: 85% ⚠️
- Status: BLOCKED
- Open Orders: 3 orders, $260K blocked

**Customer 100002 - Global Retail Solutions**:
```
Transaction: VKM3
Input: Customer 100002
```
Result:
- Limit: $750,000
- Exposure: $320,000
- Utilization: 43% ✅
- Status: OK

**Customer 100003 - Industrial Supply Corp**:
```
Transaction: VKM3
Input: Customer 100003
```
Result:
- Limit: $1,000,000
- Exposure: $850,000
- Utilization: 85% ⚠️
- Status: OK (but close to limit)

#### Step 3: Check Blocked Orders (VA05)
```
Transaction: VA05
Input: Credit Blocked checkbox, All customers
```

Result:
- 5 orders blocked totaling $485,000
- Affecting 2 customers

#### Step 4: Create Summary Report for Credit Manager

**Consultant creates Excel report**:

```
CREDIT REVIEW - JUNE 2026

HIGH RISK CUSTOMERS (>80% utilization):
┌──────────┬─────────────────────────┬───────────┬────────────┬──────────┬────────────┐
│ Customer │ Name                    │ Limit     │ Exposure   │ Util %   │ Status     │
├──────────┼─────────────────────────┼───────────┼────────────┼──────────┼────────────┤
│ 100001   │ TechMart Electronics    │ $500,000  │ $425,000   │ 85%      │ BLOCKED    │
│ 100003   │ Industrial Supply Corp  │ $1,000,000│ $850,000   │ 85%      │ OK         │
│ 200002   │ Deutsche Einzelhandel   │ €400,000  │ €395,000   │ 99%      │ BLOCKED    │
└──────────┴─────────────────────────┴───────────┴────────────┴──────────┴────────────┘

BLOCKED ORDERS SUMMARY:
- Total Value: $485,000
- Number of Orders: 5
- Customers Affected: 2

RECOMMENDATIONS:
1. TechMart (100001): Call for payment - has $130K in old invoices
2. Industrial Supply (100003): Monitor closely - approaching limit
3. Deutsche Einzelhandel (200002): URGENT - at 99% utilization

ACTIONS NEEDED:
- Contact TechMart for payment by Friday
- Consider limit increase for Industrial Supply (+$200K)
- Hold all new orders for Deutsche Einzelhandel until payment received
```

#### Step 5: Meeting with Credit Manager

**Consultant presents**:
> "Robert, here's the credit review. We have 3 customers at high risk:
>
> **TechMart (100001)** - They're blocked with $425K exposure against $500K limit. They have 3 blocked orders worth $260K. I recommend calling them for payment on their oldest invoices.
>
> **Industrial Supply (100003)** - They're at 85% utilization but still OK. However, they're a good customer with consistent payment history. I recommend increasing their limit to $1.2M.
>
> **Deutsche Einzelhandel (200002)** - This is urgent. They're at 99% utilization in Germany. We should hold all new orders until they pay.
>
> What would you like me to do?"

**Robert**: "Good analysis. Call TechMart today. Approve the limit increase for Industrial Supply. For the German customer, send them a formal letter and CC their sales rep."

---

## Use Case 5: Sales Rep Needs Order Status for Customer Meeting

### The Situation

**Who Requests**: Sales Representative (Jennifer)

**The Slack Message**:
> "Hey! I have a customer meeting in 30 minutes with Global Retail Solutions. They're asking about their recent orders. Can you quickly tell me the status of all their orders from this month? Thanks!"

### What the SAP Consultant Does

#### Step 1: Quick Order Search (VA05)
```
Transaction: VA05
Input:
- Customer: 100002 (Global Retail Solutions)
- Date From: 2026-06-01
- Date To: 2026-06-30
```

**Result in 10 seconds**:
```
ORDER STATUS FOR GLOBAL RETAIL SOLUTIONS (100002)

Order 4500012346 - $169,991.50 - June 18
├─ Item 10: Coffee Makers (500 EA) - ✅ DELIVERED June 28
├─ Item 20: Cookware Sets (200 EA) - ⏳ PENDING (stock shortage)
└─ Status: Partially delivered, partially billed

Order 4500012389 - $45,000 - June 25
├─ Item 10: Monitors (75 EA) - ✅ DELIVERED June 29
└─ Status: Ready for billing

Order 4500012401 - $89,500 - June 30
├─ Item 10: Laptops (50 EA) - 📦 IN WAREHOUSE (picking today)
└─ Status: Delivery in progress
```

#### Step 2: Slack Response to Jennifer

**Consultant**:
> "Hi Jennifer! Here's the quick summary for your meeting:
>
> **Order 12346** ($170K):
> - Coffee makers delivered ✅
> - Cookware sets delayed (stock arrives Friday)
> - Partial invoice sent
>
> **Order 12389** ($45K):
> - Monitors delivered ✅
> - Invoice being processed today
>
> **Order 12401** ($90K):
> - Laptops being picked right now
> - Should ship today
>
> Overall: They're a great customer, no credit issues, 2 of 3 orders completed on time. The cookware delay is due to supplier issue, not our fault.
>
> Good luck with the meeting! 👍"

**Jennifer**: "Perfect! Thanks so much! 🙏"

---

## Key Takeaways for SAP Consultants

### Daily Tasks Include:
1. **Investigating issues** reported by users
2. **Checking order status** for sales teams
3. **Resolving blocks** (credit, delivery, billing)
4. **Creating reports** for management
5. **Explaining SAP data** to non-technical users
6. **Coordinating** between departments (sales, warehouse, credit, billing)

### Most Used Transactions:
- **VA03/VA05** - Check orders (used 20+ times per day)
- **VKM3** - Check credit (used 5-10 times per day)
- **VL03N** - Check deliveries (used 10-15 times per day)
- **VF04** - Billing due list (used daily for month-end)
- **MMBE** - Check stock (used when investigating delivery issues)

### Skills Needed:
1. **Technical**: Know SAP transactions and navigation
2. **Business**: Understand Order-to-Cash process
3. **Communication**: Explain technical issues in business terms
4. **Problem-Solving**: Investigate root causes, not just symptoms
5. **Time Management**: Handle multiple urgent requests
6. **Documentation**: Write clear ticket resolutions

### Who Requests Help:
- Sales representatives (40% of tickets)
- Warehouse staff (25% of tickets)
- Billing clerks (20% of tickets)
- Credit managers (10% of tickets)
- Management (5% of tickets - usually reports)

---

**This is what you'll do as an SAP consultant! The simulator prepares you for these real scenarios.**