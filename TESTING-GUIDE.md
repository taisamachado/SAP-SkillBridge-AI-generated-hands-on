# SAP SkillBridge Simulator - Testing Guide

## Quick Start

### 1. Start the Backend Server

```bash
cd /Users/taisacarladossantosmachado/git/SAP-SkillBridge-AI-generated-hands-on
python3 backend/app.py
```

The server will start on `http://localhost:8000`

### 2. Open in Browser

Navigate to: `http://localhost:8000`

## Testing Checklist

### ✅ Beginner Mode Tests

1. **Initial Load**
   - [ ] Page loads without errors
   - [ ] Bob's welcome message appears
   - [ ] Sidebar shows scenario information
   - [ ] Command input is ready

2. **Transaction Execution**
   - [ ] Enter `VF01` - Bob explains billing issue
   - [ ] Enter `VKM3` - Bob suggests checking credit
   - [ ] Enter `VA03` - Bob shows order details
   - [ ] Enter `HELP` - Bob provides guidance

3. **Scenario Progress**
   - [ ] Sidebar updates with completed steps
   - [ ] Hints change based on progress
   - [ ] Status bar shows appropriate messages

### ✅ Professional Mode Tests

1. **Mode Toggle**
   - [ ] Click "Switch to Professional Mode" button
   - [ ] Button text changes to "Switch to Beginner Mode"
   - [ ] Screen shows Professional Mode welcome message
   - [ ] Status bar indicates Professional Mode active

2. **VA03 - Display Sales Order**
   - [ ] Enter `VA03`
   - [ ] Selection screen appears with fields:
     - Sales Order (required)
     - Sales Organization
     - Distribution Channel
     - Division
   - [ ] Fill: Order `4500012345`, Sales Org `1000`
   - [ ] Click Execute (F8)
   - [ ] Result shows order details with CREDIT BLOCKED badge
   - [ ] SAP message V1 401 appears

3. **VA05 - List of Sales Orders**
   - [ ] Enter `VA05`
   - [ ] Selection screen shows multiple filter sections
   - [ ] Fill: Sales Org `1000`, Date From `2026-06-01`, Date To `2026-06-30`
   - [ ] Check "Credit Blocked" checkbox
   - [ ] Click Execute (F8)
   - [ ] Result grid shows orders with credit blocks highlighted

4. **VKM3 - Display Credit Master Data**
   - [ ] Enter `VKM3`
   - [ ] Fill: Customer `100001`, Credit Control Area `1000`
   - [ ] Click Execute (F8)
   - [ ] Result shows:
     - Credit Limit: $500,000
     - Credit Exposure: $425,000
     - Utilization: 85%
     - Status: BLOCKED
   - [ ] SAP message BRAIN 601 appears

5. **VL03N - Display Outbound Delivery**
   - [ ] Enter `VL03N`
   - [ ] Fill: Delivery `8000012345`
   - [ ] Click Execute (F8)
   - [ ] Result shows delivery details with goods issue status

6. **VF04 - Billing Due List**
   - [ ] Enter `VF04`
   - [ ] Fill: Sales Org `1000`, Billing Type `F2`
   - [ ] Check "Ready for Billing"
   - [ ] Click Execute (F8)
   - [ ] Result shows orders ready for billing

7. **MMBE - Stock Overview**
   - [ ] Enter `MMBE`
   - [ ] Fill: Material `MAT-10001`, Plant `1010`
   - [ ] Click Execute (F8)
   - [ ] Result shows stock levels and value

8. **MB51 - Material Document List**
   - [ ] Enter `MB51`
   - [ ] Fill: Plant `1010`, Date From `2026-06-01`, Date To `2026-06-30`
   - [ ] Click Execute (F8)
   - [ ] Result shows goods movements with movement types

### ✅ Integration Tests

1. **Mode Switching**
   - [ ] Switch from Beginner to Professional
   - [ ] Execute a transaction in Professional Mode
   - [ ] Switch back to Beginner Mode
   - [ ] Scenario resumes correctly

2. **Data Consistency**
   - [ ] Customer 100001 shows as credit blocked in all transactions
   - [ ] Order 4500012345 consistently shows credit block
   - [ ] Material MAT-10001 shows same stock in MMBE
   - [ ] Dates and values are consistent across transactions

3. **Button Functionality**
   - [ ] Execute (F8) button works
   - [ ] Clear button resets form fields
   - [ ] Back button returns to transaction entry
   - [ ] Reset Scenario button works in Beginner Mode

### ✅ UI/UX Tests

1. **Visual Consistency**
   - [ ] SAP Belize/Quartz theme applied
   - [ ] Status badges use correct colors (green/yellow/red)
   - [ ] Tables are properly formatted
   - [ ] Selection screens are dense and SAP-like

2. **Responsive Behavior**
   - [ ] Console scrolls properly
   - [ ] Sidebar is visible
   - [ ] Tables fit within viewport
   - [ ] No horizontal scrolling issues

3. **Error Handling**
   - [ ] Invalid transaction code shows error message
   - [ ] Missing required fields show validation
   - [ ] Non-existent data shows appropriate SAP message

## Common Issues and Solutions

### Issue: Module Import Errors

**Symptom**: Browser console shows "Failed to load module"

**Solution**: 
- Check that all JavaScript files exist in correct locations
- Verify file paths in import statements
- Ensure backend server is running

### Issue: Selection Screen Not Rendering

**Symptom**: Blank screen after entering transaction

**Solution**:
- Check browser console for JavaScript errors
- Verify professional-mode.js is loaded
- Confirm transaction code is in supported list

### Issue: Execute Button Does Nothing

**Symptom**: Clicking Execute (F8) has no effect

**Solution**:
- Check that event handlers are bound
- Verify filter values are being captured
- Look for JavaScript errors in console

### Issue: Data Not Showing in Result Grid

**Symptom**: Result grid is empty or shows "not found"

**Solution**:
- Verify master-data.js is loaded
- Check filter values match available data
- Confirm data filtering logic is correct

## Browser Console Debugging

Open browser developer tools (F12) and check:

1. **Console Tab**: Look for JavaScript errors
2. **Network Tab**: Verify all files are loading (200 status)
3. **Sources Tab**: Check that all .js files are present

## Expected Console Output

### Successful Load
```
Loading SAP SkillBridge Simulator...
Master data loaded: 6 customers, 7 materials, 4 sales orders
SAP messages loaded: 50+ message definitions
Professional mode initialized
Beginner mode scenario loaded
```

### Professional Mode Transaction
```
Transaction VA03 opened.
Selection screen rendered.
Execute button clicked.
Filters captured: {orderNumber: "4500012345", salesOrg: "1000"}
Result grid rendered successfully.
```

## Performance Benchmarks

- **Initial Page Load**: < 2 seconds
- **Mode Toggle**: < 500ms
- **Transaction Execution**: < 1 second
- **Result Grid Rendering**: < 500ms

## Test Data Reference

### Credit Blocked Customers
- 100001 - TechMart Electronics ($425K/$500K)
- 200002 - Deutsche Einzelhandel AG (€395K/€400K)

### Credit Blocked Orders
- 4500012345 - TechMart Electronics - $129,900
- 4500012348 - Deutsche Einzelhandel AG - €69,996.50

### Ready for Billing
- 4500012347 - Industrial Supply Corp - $212,500

### Available Stock
- MAT-10001: 450 EA @ Plant 1010
- MAT-10002: 2,500 EA @ Plant 1010
- MAT-10003: 180 EA @ Plant 1010

## Reporting Issues

When reporting issues, include:
1. Browser and version
2. Steps to reproduce
3. Expected vs actual behavior
4. Browser console errors
5. Screenshot if applicable

## Next Steps After Testing

1. Document any bugs found
2. Test on different browsers (Chrome, Firefox, Safari, Edge)
3. Test on different screen sizes
4. Verify all master data is accessible
5. Confirm all SAP messages display correctly

---

**Testing completed successfully? Move on to creating additional transactions and scenarios!**