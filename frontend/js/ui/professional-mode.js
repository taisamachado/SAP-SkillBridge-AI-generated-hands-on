/**
 * Professional Mode - Realistic SAP Selection Screens and Result Grids
 * Integrated with master data and SAP messages for authentic simulation
 */

import { MASTER_DATA, filterSalesOrders, filterDeliveries, filterBillingDocuments, getCustomerByCode, getSalesOrderByNumber } from "../data/master-data.js";
import { getSAPMessage, formatMessageForConsole } from "../data/sap-messages.js";
import { FI_CO_MASTER_DATA, filterCostCenterActuals, filterOpenVendorItems } from "../data/fi-co-master-data.js";

export function renderSelectionScreen(transactionCode, state) {
    const screens = {
        VA03:  renderVA03SelectionScreen,
        VA05:  renderVA05SelectionScreen,
        VL03N: renderVL03NSelectionScreen,
        VF01:  renderVF01SelectionScreen,
        VF04:  renderVF04SelectionScreen,
        VKM3:  renderVKM3SelectionScreen,
        MMBE:  renderMMBESelectionScreen,
        MB51:  renderMB51SelectionScreen,
        // FI / CO transactions
        FB03:  renderFB03SelectionScreen,
        FS10N: renderFS10NSelectionScreen,
        KSB1:  renderKSB1SelectionScreen,
        F110:  renderF110SelectionScreen,
        KE30:  renderKE30SelectionScreen,
        FBL1N: renderFBL1NSelectionScreen
    };

    const renderer = screens[transactionCode];
    if (!renderer) {
        return `
            <div class="training-callout warning">
                <strong>Selection screen not yet implemented for ${transactionCode}</strong>
            </div>
            <p>Professional Mode is available for: VA03, VA05, VL03N, VF01, VF04, VKM3, MMBE, MB51, FB03, FS10N, KSB1, F110, KE30, FBL1N</p>
        `;
    }

    return renderer(state);
}

function renderVA03SelectionScreen(state) {
    return `
        <div class="sap-selection-screen">
            <div class="selection-header">
                <h3>Display Sales Order: Initial Screen</h3>
                <p>VA03</p>
            </div>

            <div class="selection-section">
                <div class="section-title">Order Data</div>
                <div class="selection-fields">
                    <div class="sap-field-row">
                        <label class="required">Sales Order</label>
                        <input type="text" id="filter_orderNumber" class="sap-input" placeholder="4500012345" maxlength="10">
                    </div>
                </div>
            </div>

            <div class="selection-section">
                <div class="section-title">Organizational Data</div>
                <div class="selection-fields">
                    <div class="sap-field-row">
                        <label>Sales Organization</label>
                        <input type="text" id="filter_salesOrg" class="sap-input" value="1000" maxlength="4">
                        <span class="field-help">Global Sales US</span>
                    </div>
                    <div class="sap-field-row">
                        <label>Distribution Channel</label>
                        <input type="text" id="filter_distChannel" class="sap-input" value="10" maxlength="2">
                        <span class="field-help">Wholesale</span>
                    </div>
                    <div class="sap-field-row">
                        <label>Division</label>
                        <input type="text" id="filter_division" class="sap-input" value="01" maxlength="2">
                        <span class="field-help">Electronics</span>
                    </div>
                </div>
            </div>

            <div class="selection-actions">
                <button class="sap-button sap-button-primary" id="executeButton">
                    <span class="button-icon">▶</span> Execute (F8)
                </button>
                <button class="sap-button" id="clearButton">Clear</button>
                <button class="sap-button" id="backButton">
                    <span class="button-icon">←</span> Back (F3)
                </button>
            </div>
        </div>
    `;
}

function renderVL03NSelectionScreen(state) {
    return `
        <div class="sap-selection-screen">
            <div class="selection-header">
                <h3>Display Outbound Delivery: Initial Screen</h3>
                <p>VL03N</p>
            </div>

            <div class="selection-section">
                <div class="section-title">Delivery Data</div>
                <div class="selection-fields">
                    <div class="sap-field-row">
                        <label class="required">Outbound Delivery</label>
                        <input type="text" id="filter_deliveryNumber" class="sap-input" placeholder="8000012345" maxlength="10">
                    </div>
                </div>
            </div>

            <div class="selection-actions">
                <button class="sap-button sap-button-primary" id="executeButton">
                    <span class="button-icon">▶</span> Execute (F8)
                </button>
                <button class="sap-button" id="clearButton">Clear</button>
                <button class="sap-button" id="backButton">
                    <span class="button-icon">←</span> Back (F3)
                </button>
            </div>
        </div>
    `;
}

function renderVF01SelectionScreen(state) {
    return `
        <div class="sap-selection-screen">
            <div class="selection-header">
                <h3>Create Billing Document</h3>
                <p>VF01</p>
            </div>

            <div class="selection-section">
                <div class="section-title">Document Selection</div>
                <div class="selection-fields">
                    <div class="sap-field-row">
                        <label>Billing Type</label>
                        <input type="text" id="filter_billingType" class="sap-input" value="F2" maxlength="4">
                        <span class="field-help">Invoice</span>
                    </div>
                    <div class="sap-field-row">
                        <label>Sales Order</label>
                        <input type="text" id="filter_salesOrder" class="sap-input" placeholder="4500012345" maxlength="10">
                    </div>
                </div>
            </div>

            <div class="selection-actions">
                <button class="sap-button sap-button-primary" id="executeButton">
                    <span class="button-icon">▶</span> Execute (F8)
                </button>
                <button class="sap-button" id="clearButton">Clear</button>
                <button class="sap-button" id="backButton">
                    <span class="button-icon">←</span> Back (F3)
                </button>
            </div>
        </div>
    `;
}

function renderVKM3SelectionScreen(state) {
    return `
        <div class="sap-selection-screen">
            <div class="selection-header">
                <h3>Display Credit Master Data</h3>
                <p>VKM3</p>
            </div>

            <div class="selection-section">
                <div class="section-title">Credit Control Data</div>
                <div class="selection-fields">
                    <div class="sap-field-row">
                        <label class="required">Customer</label>
                        <input type="text" id="filter_customer" class="sap-input" placeholder="100001" maxlength="10">
                    </div>
                    <div class="sap-field-row">
                        <label class="required">Credit Control Area</label>
                        <input type="text" id="filter_creditControlArea" class="sap-input" value="1000" maxlength="4">
                    </div>
                </div>
            </div>

            <div class="selection-actions">
                <button class="sap-button sap-button-primary" id="executeButton">
                    <span class="button-icon">▶</span> Execute (F8)
                </button>
                <button class="sap-button" id="clearButton">Clear</button>
                <button class="sap-button" id="backButton">
                    <span class="button-icon">←</span> Back (F3)
                </button>
            </div>
        </div>
    `;
}

function renderMMBESelectionScreen(state) {
    return `
        <div class="sap-selection-screen">
            <div class="selection-header">
                <h3>Stock Overview</h3>
                <p>MMBE</p>
            </div>

            <div class="selection-section">
                <div class="section-title">Material Selection</div>
                <div class="selection-fields">
                    <div class="sap-field-row">
                        <label class="required">Material</label>
                        <input type="text" id="filter_material" class="sap-input" placeholder="MAT-10001" maxlength="18">
                    </div>
                    <div class="sap-field-row">
                        <label>Plant</label>
                        <input type="text" id="filter_plant" class="sap-input" value="1010" maxlength="4">
                    </div>
                </div>
            </div>

            <div class="selection-actions">
                <button class="sap-button sap-button-primary" id="executeButton">
                    <span class="button-icon">▶</span> Execute (F8)
                </button>
                <button class="sap-button" id="clearButton">Clear</button>
                <button class="sap-button" id="backButton">
                    <span class="button-icon">←</span> Back (F3)
                </button>
            </div>
        </div>
    `;
}

function renderVA05SelectionScreen(state) {
    return `
        <div class="sap-selection-screen">
            <div class="selection-header">
                <h3>List of Sales Orders</h3>
                <p>VA05</p>
            </div>

            <div class="selection-section">
                <div class="section-title">Order Selection</div>
                <div class="selection-fields">
                    <div class="sap-field-row">
                        <label>Sales Document</label>
                        <input type="text" id="filter_salesDocument" class="sap-input" placeholder="50000000 to 50999999">
                    </div>
                    <div class="sap-field-row">
                        <label>Document Type</label>
                        <input type="text" id="filter_documentType" class="sap-input" placeholder="OR">
                    </div>
                    <div class="sap-field-row">
                        <label>Sales Organization</label>
                        <input type="text" id="filter_salesOrg" class="sap-input" value="1000">
                    </div>
                    <div class="sap-field-row">
                        <label>Distribution Channel</label>
                        <input type="text" id="filter_distChannel" class="sap-input" value="10">
                    </div>
                    <div class="sap-field-row">
                        <label>Division</label>
                        <input type="text" id="filter_division" class="sap-input" value="00">
                    </div>
                </div>
            </div>

            <div class="selection-section">
                <div class="section-title">Customer Selection</div>
                <div class="selection-fields">
                    <div class="sap-field-row">
                        <label>Sold-to Party</label>
                        <input type="text" id="filter_soldTo" class="sap-input" placeholder="100000">
                    </div>
                    <div class="sap-field-row">
                        <label>Ship-to Party</label>
                        <input type="text" id="filter_shipTo" class="sap-input">
                    </div>
                </div>
            </div>

            <div class="selection-section">
                <div class="section-title">Date Selection</div>
                <div class="selection-fields">
                    <div class="sap-field-row">
                        <label>Document Date From</label>
                        <input type="date" id="filter_dateFrom" class="sap-input" value="2026-01-01">
                    </div>
                    <div class="sap-field-row">
                        <label>Document Date To</label>
                        <input type="date" id="filter_dateTo" class="sap-input" value="2026-12-31">
                    </div>
                </div>
            </div>

            <div class="selection-section">
                <div class="section-title">Status Selection</div>
                <div class="selection-fields">
                    <div class="sap-checkbox-row">
                        <input type="checkbox" id="filter_statusOpen" checked>
                        <label for="filter_statusOpen">Open</label>
                    </div>
                    <div class="sap-checkbox-row">
                        <input type="checkbox" id="filter_statusInProcess" checked>
                        <label for="filter_statusInProcess">In Process</label>
                    </div>
                    <div class="sap-checkbox-row">
                        <input type="checkbox" id="filter_statusCompleted">
                        <label for="filter_statusCompleted">Completed</label>
                    </div>
                </div>
            </div>

            <div class="selection-actions">
                <button class="sap-button sap-button-primary" id="executeButton">Execute (F8)</button>
                <button class="sap-button" id="clearButton">Clear</button>
                <button class="sap-button" id="backButton">Back</button>
            </div>
        </div>
    `;
}

function renderVF04SelectionScreen(state) {
    return `
        <div class="sap-selection-screen">
            <div class="selection-header">
                <h3>Maintain Billing Due List</h3>
                <p>VF04</p>
            </div>

            <div class="selection-section">
                <div class="section-title">Billing Selection</div>
                <div class="selection-fields">
                    <div class="sap-field-row">
                        <label>Billing Type</label>
                        <input type="text" id="filter_billingType" class="sap-input" value="F2">
                    </div>
                    <div class="sap-field-row">
                        <label>Sales Organization</label>
                        <input type="text" id="filter_salesOrg" class="sap-input" value="1000">
                    </div>
                    <div class="sap-field-row">
                        <label>Distribution Channel</label>
                        <input type="text" id="filter_distChannel" class="sap-input" value="10">
                    </div>
                    <div class="sap-field-row">
                        <label>Division</label>
                        <input type="text" id="filter_division" class="sap-input" value="00">
                    </div>
                </div>
            </div>

            <div class="selection-section">
                <div class="section-title">Date Selection</div>
                <div class="selection-fields">
                    <div class="sap-field-row">
                        <label>Billing Date From</label>
                        <input type="date" id="filter_dateFrom" class="sap-input" value="2026-01-01">
                    </div>
                    <div class="sap-field-row">
                        <label>Billing Date To</label>
                        <input type="date" id="filter_dateTo" class="sap-input" value="2026-12-31">
                    </div>
                </div>
            </div>

            <div class="selection-actions">
                <button class="sap-button sap-button-primary" id="executeButton">Execute (F8)</button>
                <button class="sap-button" id="clearButton">Clear</button>
                <button class="sap-button" id="backButton">Back</button>
            </div>
        </div>
    `;
}

function renderMB51SelectionScreen(state) {
    return `
        <div class="sap-selection-screen">
            <div class="selection-header">
                <h3>Material Document List</h3>
                <p>MB51</p>
            </div>

            <div class="selection-section">
                <div class="section-title">Material Selection</div>
                <div class="selection-fields">
                    <div class="sap-field-row">
                        <label>Material</label>
                        <input type="text" id="filter_material" class="sap-input" placeholder="TG11">
                    </div>
                    <div class="sap-field-row">
                        <label>Plant</label>
                        <input type="text" id="filter_plant" class="sap-input" value="1710">
                    </div>
                    <div class="sap-field-row">
                        <label>Storage Location</label>
                        <input type="text" id="filter_storageLocation" class="sap-input" value="171A">
                    </div>
                </div>
            </div>

            <div class="selection-section">
                <div class="section-title">Movement Type Selection</div>
                <div class="selection-fields">
                    <div class="sap-field-row">
                        <label>Movement Type</label>
                        <input type="text" id="filter_movementType" class="sap-input" placeholder="101, 261, 311">
                    </div>
                </div>
            </div>

            <div class="selection-section">
                <div class="section-title">Date Selection</div>
                <div class="selection-fields">
                    <div class="sap-field-row">
                        <label>Posting Date From</label>
                        <input type="date" id="filter_dateFrom" class="sap-input" value="2026-01-01">
                    </div>
                    <div class="sap-field-row">
                        <label>Posting Date To</label>
                        <input type="date" id="filter_dateTo" class="sap-input" value="2026-12-31">
                    </div>
                </div>
            </div>

            <div class="selection-actions">
                <button class="sap-button sap-button-primary" id="executeButton">Execute (F8)</button>
                <button class="sap-button" id="clearButton">Clear</button>
                <button class="sap-button" id="backButton">Back</button>
            </div>
        </div>
    `;
}


export function renderResultGrid(transactionCode, filters, state) {
    const grids = {
        VA03:  renderVA03ResultGrid,
        VA05:  renderVA05ResultGrid,
        VL03N: renderVL03NResultGrid,
        VF01:  renderVF01ResultGrid,
        VF04:  renderVF04ResultGrid,
        VKM3:  renderVKM3ResultGrid,
        MMBE:  renderMMBEResultGrid,
        MB51:  renderMB51ResultGrid,
        // FI / CO transactions
        FB03:  renderFB03ResultGrid,
        FS10N: renderFS10NResultGrid,
        KSB1:  renderKSB1ResultGrid,
        F110:  renderF110ResultGrid,
        KE30:  renderKE30ResultGrid,
        FBL1N: renderFBL1NResultGrid
    };

    const renderer = grids[transactionCode];
    if (!renderer) {
        return `<p>Result grid not yet implemented for ${transactionCode}</p>`;
    }

    return renderer(filters, state);
}

function renderVA03ResultGrid(filters, state) {
    const orderNumber = filters.filter_orderNumber || "4500012345";
    const order = getSalesOrderByNumber(orderNumber);

    if (!order) {
        const msg = getSAPMessage("V1", "201", [orderNumber]);
        return `
            <div class="sap-message error">
                ${msg.icon} ${msg.text}
            </div>
        `;
    }

    return `
        <div class="result-grid-container">
            <div class="result-header">
                <h3>Sales Order ${order.orderNumber}</h3>
                <div class="status-badges">
                    <span class="status-badge ${order.creditStatus === 'B' ? 'status-error' : 'status-success'}">
                        Credit: ${order.creditStatus === 'B' ? 'BLOCKED' : 'Released'}
                    </span>
                    <span class="status-badge status-info">Delivery: ${order.deliveryStatus}</span>
                    <span class="status-badge status-info">Billing: ${order.billingStatus}</span>
                </div>
            </div>

            <div class="data-section">
                <h4>Header Data</h4>
                <table class="data-table">
                    <tr>
                        <td class="label">Order Type:</td>
                        <td>${order.orderType}</td>
                        <td class="label">Order Date:</td>
                        <td>${order.orderDate}</td>
                    </tr>
                    <tr>
                        <td class="label">Sold-to Party:</td>
                        <td>${order.customer} - ${order.customerName}</td>
                        <td class="label">Net Value:</td>
                        <td class="number">${order.netValue.toLocaleString()} ${order.currency}</td>
                    </tr>
                    <tr>
                        <td class="label">Sales Org:</td>
                        <td>${order.salesOrg}</td>
                        <td class="label">Dist. Channel:</td>
                        <td>${order.distChannel}</td>
                    </tr>
                </table>
            </div>

            <div class="data-section">
                <h4>Line Items</h4>
                <table class="sap-result-grid">
                    <thead>
                        <tr>
                            <th>Item</th>
                            <th>Material</th>
                            <th>Description</th>
                            <th>Quantity</th>
                            <th>UoM</th>
                            <th>Net Price</th>
                            <th>Net Value</th>
                            <th>Plant</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${order.items.map(item => `
                            <tr>
                                <td>${item.item}</td>
                                <td>${item.material}</td>
                                <td>${item.description}</td>
                                <td class="number">${item.quantity}</td>
                                <td>${item.uom}</td>
                                <td class="number">${item.netPrice.toFixed(2)}</td>
                                <td class="number">${item.netValue.toFixed(2)}</td>
                                <td>${item.plant}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>

            ${order.creditStatus === 'B' ? `
                <div class="sap-message error">
                    ${formatMessageForConsole("V1", "401", [order.customer])}
                </div>
            ` : ''}
        </div>
    `;
}

function renderVA05ResultGrid(filters, state) {
    const orders = filterSalesOrders({
        orderNumber: filters.filter_orderNumber,
        customer: filters.filter_customer,
        salesOrg: filters.filter_salesOrg,
        dateFrom: filters.filter_dateFrom,
        dateTo: filters.filter_dateTo,
        creditBlocked: filters.filter_creditBlocked
    });

    if (orders.length === 0) {
        return `
            <div class="sap-message info">
                No sales orders found matching the selection criteria.
            </div>
        `;
    }

    return `
        <div class="result-grid-container">
            <div class="result-header">
                <h3>Sales Order List</h3>
                <p>${orders.length} orders found</p>
            </div>

            <table class="sap-result-grid">
                <thead>
                    <tr>
                        <th>Order Number</th>
                        <th>Type</th>
                        <th>Order Date</th>
                        <th>Customer</th>
                        <th>Customer Name</th>
                        <th>Net Value</th>
                        <th>Currency</th>
                        <th>Credit</th>
                        <th>Delivery</th>
                        <th>Billing</th>
                    </tr>
                </thead>
                <tbody>
                    ${orders.map(order => `
                        <tr class="${order.creditStatus === 'B' ? 'row-error' : ''}">
                            <td><a href="#" class="sap-link">${order.orderNumber}</a></td>
                            <td>${order.orderType}</td>
                            <td>${order.orderDate}</td>
                            <td>${order.customer}</td>
                            <td>${order.customerName}</td>
                            <td class="number">${order.netValue.toLocaleString()}</td>
                            <td>${order.currency}</td>
                            <td>
                                <span class="status-badge ${order.creditStatus === 'B' ? 'status-error' : 'status-success'}">
                                    ${order.creditStatus === 'B' ? 'BLOCKED' : 'OK'}
                                </span>
                            </td>
                            <td>${order.deliveryStatus}</td>
                            <td>${order.billingStatus}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `;
}

function renderVL03NResultGrid(filters, state) {
    const deliveryNumber = filters.filter_deliveryNumber || "8000012345";
    const delivery = MASTER_DATA.deliveries.find(d => d.deliveryNumber === deliveryNumber);

    if (!delivery) {
        return `<div class="sap-message error">Delivery ${deliveryNumber} not found</div>`;
    }

    return `
        <div class="result-grid-container">
            <div class="result-header">
                <h3>Outbound Delivery ${delivery.deliveryNumber}</h3>
                <div class="status-badges">
                    <span class="status-badge ${delivery.goodsIssueStatus === 'Posted' ? 'status-success' : 'status-warning'}">
                        ${delivery.status}
                    </span>
                </div>
            </div>

            <div class="data-section">
                <h4>Header Data</h4>
                <table class="data-table">
                    <tr>
                        <td class="label">Delivery Date:</td>
                        <td>${delivery.deliveryDate}</td>
                        <td class="label">Sales Order:</td>
                        <td>${delivery.salesOrder}</td>
                    </tr>
                    <tr>
                        <td class="label">Ship-to Party:</td>
                        <td>${delivery.customer} - ${delivery.customerName}</td>
                        <td class="label">Shipping Point:</td>
                        <td>${delivery.shippingPoint}</td>
                    </tr>
                </table>
            </div>

            <div class="data-section">
                <h4>Line Items</h4>
                <table class="sap-result-grid">
                    <thead>
                        <tr>
                            <th>Item</th>
                            <th>Material</th>
                            <th>Description</th>
                            <th>Delivery Qty</th>
                            <th>Picked Qty</th>
                            <th>UoM</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${delivery.items.map(item => `
                            <tr>
                                <td>${item.item}</td>
                                <td>${item.material}</td>
                                <td>${item.description}</td>
                                <td class="number">${item.quantity}</td>
                                <td class="number">${item.pickedQuantity}</td>
                                <td>${item.uom}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    `;
}

function renderVF01ResultGrid(filters, state) {
    const salesOrder = filters.filter_salesOrder || "4500012345";
    const order = getSalesOrderByNumber(salesOrder);

    if (!order) {
        return `
            <div class="sap-message error">
                Sales order ${salesOrder} not found or not ready for billing
            </div>
        `;
    }

    // Check if order can be billed
    if (order.creditStatus === 'B') {
        const msg = getSAPMessage("VF", "001", [salesOrder]);
        return `
            <div class="sap-message error">
                ${msg.icon} ${msg.text}
            </div>
            <div class="training-callout error">
                <strong>Billing Document Creation Failed</strong>
                <p>Sales order ${salesOrder} is blocked for billing due to credit issues.</p>
                <p>Use VKM3 to check credit master data for customer ${order.customer}.</p>
            </div>
        `;
    }

    if (order.deliveryStatus !== "Delivered") {
        return `
            <div class="sap-message warning">
                ⚠ Sales order ${salesOrder} has not been fully delivered yet
            </div>
            <div class="training-callout warning">
                <strong>Billing Not Possible</strong>
                <p>Delivery status: ${order.deliveryStatus}</p>
                <p>Complete the delivery process before creating billing document.</p>
            </div>
        `;
    }

    // Simulate successful billing document creation
    const billingDoc = `9${salesOrder.substring(1)}`;
    const msg = getSAPMessage("VF", "002", [billingDoc, salesOrder]);

    return `
        <div class="result-grid-container">
            <div class="sap-message success">
                ${msg.icon} ${msg.text}
            </div>

            <div class="result-header">
                <h3>Billing Document ${billingDoc} Created</h3>
                <div class="status-badges">
                    <span class="status-badge status-success">Posted</span>
                </div>
            </div>

            <div class="data-section">
                <h4>Document Data</h4>
                <table class="data-table">
                    <tr>
                        <td class="label">Billing Document:</td>
                        <td><strong>${billingDoc}</strong></td>
                        <td class="label">Billing Type:</td>
                        <td>F2 - Invoice</td>
                    </tr>
                    <tr>
                        <td class="label">Billing Date:</td>
                        <td>${new Date().toISOString().split('T')[0]}</td>
                        <td class="label">Sales Order:</td>
                        <td>${order.orderNumber}</td>
                    </tr>
                    <tr>
                        <td class="label">Sold-to Party:</td>
                        <td>${order.customer} - ${order.customerName}</td>
                        <td class="label">Net Value:</td>
                        <td class="number">${order.netValue.toLocaleString()} ${order.currency}</td>
                    </tr>
                </table>
            </div>

            <div class="data-section">
                <h4>Billing Items</h4>
                <table class="sap-result-grid">
                    <thead>
                        <tr>
                            <th>Item</th>
                            <th>Material</th>
                            <th>Description</th>
                            <th>Billed Qty</th>
                            <th>UoM</th>
                            <th>Net Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${order.items.map(item => `
                            <tr>
                                <td>${item.item}</td>
                                <td>${item.material}</td>
                                <td>${item.description}</td>
                                <td class="number">${item.quantity}</td>
                                <td>${item.uom}</td>
                                <td class="number">${item.netValue.toFixed(2)}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>

            <div class="training-callout success">
                <strong>Next Steps</strong>
                <p>✓ Billing document posted to Financial Accounting (FI)</p>
                <p>✓ Customer account updated</p>
                <p>✓ Revenue recognized</p>
            </div>
        </div>
    `;
}

function renderVF04ResultGrid(filters, state) {
    const orders = filterSalesOrders({
        salesOrg: filters.filter_salesOrg,
        dateFrom: filters.filter_billingDateFrom,
        dateTo: filters.filter_billingDateTo
    });
    
    const readyForBilling = orders.filter(o => 
        o.deliveryStatus === "Delivered" && 
        o.billingStatus === "Not Billed" && 
        o.creditStatus !== "B"
    );

    return `
        <div class="result-grid-container">
            <div class="result-header">
                <h3>Billing Due List</h3>
                <p>${readyForBilling.length} documents ready for billing</p>
            </div>

            <table class="sap-result-grid">
                <thead>
                    <tr>
                        <th>Sales Order</th>
                        <th>Order Date</th>
                        <th>Customer</th>
                        <th>Customer Name</th>
                        <th>Net Value</th>
                        <th>Currency</th>
                        <th>Delivery Status</th>
                    </tr>
                </thead>
                <tbody>
                    ${readyForBilling.map(order => `
                        <tr>
                            <td><a href="#" class="sap-link">${order.orderNumber}</a></td>
                            <td>${order.orderDate}</td>
                            <td>${order.customer}</td>
                            <td>${order.customerName}</td>
                            <td class="number">${order.netValue.toLocaleString()}</td>
                            <td>${order.currency}</td>
                            <td><span class="status-badge status-success">${order.deliveryStatus}</span></td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `;
}

function renderVKM3ResultGrid(filters, state) {
    const customerCode = filters.filter_customer || "100001";
    const customer = getCustomerByCode(customerCode);

    if (!customer) {
        return `<div class="sap-message error">Customer ${customerCode} not found</div>`;
    }

    const creditUtilization = (customer.creditUsed / customer.creditLimit * 100).toFixed(1);
    const creditAvailable = customer.creditLimit - customer.creditUsed;

    return `
        <div class="result-grid-container">
            <div class="result-header">
                <h3>Credit Master Data - Customer ${customer.code}</h3>
                <p>${customer.name}</p>
            </div>

            <div class="data-section">
                <h4>Credit Control Area Data</h4>
                <table class="data-table">
                    <tr>
                        <td class="label">Credit Limit:</td>
                        <td class="number">${customer.creditLimit.toLocaleString()} ${customer.currency}</td>
                        <td class="label">Credit Exposure:</td>
                        <td class="number">${customer.creditUsed.toLocaleString()} ${customer.currency}</td>
                    </tr>
                    <tr>
                        <td class="label">Available Credit:</td>
                        <td class="number ${creditAvailable < 0 ? 'error' : ''}">${creditAvailable.toLocaleString()} ${customer.currency}</td>
                        <td class="label">Utilization:</td>
                        <td>
                            <span class="status-badge ${creditUtilization > 100 ? 'status-error' : creditUtilization > 90 ? 'status-warning' : 'status-success'}">
                                ${creditUtilization}%
                            </span>
                        </td>
                    </tr>
                    <tr>
                        <td class="label">Credit Block:</td>
                        <td>
                            <span class="status-badge ${customer.creditBlocked ? 'status-error' : 'status-success'}">
                                ${customer.creditBlocked ? 'BLOCKED' : 'Not Blocked'}
                            </span>
                        </td>
                        <td class="label">Payment Terms:</td>
                        <td>${customer.paymentTerms}</td>
                    </tr>
                </table>
            </div>

            ${customer.creditBlocked ? `
                <div class="sap-message error">
                    ${formatMessageForConsole("BRAIN", "601", [customer.creditLimit, customer.currency, customer.code])}
                </div>
            ` : ''}
        </div>
    `;
}

function renderMMBEResultGrid(filters, state) {
    const materialCode = filters.filter_material || "MAT-10001";
    const material = MASTER_DATA.materials.find(m => m.code === materialCode);

    if (!material) {
        return `<div class="sap-message error">Material ${materialCode} not found</div>`;
    }

    return `
        <div class="result-grid-container">
            <div class="result-header">
                <h3>Stock Overview - ${material.code}</h3>
                <p>${material.description}</p>
            </div>

            <div class="data-section">
                <h4>Stock Overview</h4>
                <table class="sap-result-grid">
                    <thead>
                        <tr>
                            <th>Plant</th>
                            <th>Storage Location</th>
                            <th>Unrestricted</th>
                            <th>Total Stock</th>
                            <th>UoM</th>
                            <th>Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>${material.plant}</td>
                            <td>0001</td>
                            <td class="number">${material.availableQty}</td>
                            <td class="number">${material.availableQty}</td>
                            <td>${material.baseUOM}</td>
                            <td class="number">${(material.availableQty * material.price).toLocaleString()} ${material.currency}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    `;
}

function renderMB51ResultGrid(filters, state) {
    return `
        <div class="result-grid-container">
            <div class="result-header">
                <h3>Material Document List</h3>
                <p>Goods movements for selected period</p>
            </div>

            <table class="sap-result-grid">
                <thead>
                    <tr>
                        <th>Material Document</th>
                        <th>Material</th>
                        <th>Plant</th>
                        <th>Movement Type</th>
                        <th>Quantity</th>
                        <th>UoM</th>
                        <th>Posting Date</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>5000012345</td>
                        <td>MAT-10001</td>
                        <td>1010</td>
                        <td>101</td>
                        <td class="number">500</td>
                        <td>EA</td>
                        <td>2026-06-15</td>
                    </tr>
                    <tr>
                        <td>5000012346</td>
                        <td>MAT-10001</td>
                        <td>1010</td>
                        <td>601</td>
                        <td class="number">-50</td>
                        <td>EA</td>
                        <td>2026-06-28</td>
                    </tr>
                </tbody>
            </table>
        </div>
    `;
}

// ─── FI/CO SELECTION SCREENS ─────────────────────────────────────────────────

/**
 * FB03 – Display FI Document
 * Allows drill-down into any FI accounting document by company code, doc number and fiscal year.
 */
function renderFB03SelectionScreen(state) {
    return `
        <div class="sap-selection-screen">
            <div class="sap-screen-header">
                <span class="sap-tcode">FB03</span>
                <span class="sap-screen-title">Display Document: Initial Screen</span>
            </div>
            <div class="sap-toolbar">
                <button class="sap-btn" id="executeButton">&#x1F50D; Display (Enter)</button>
                <button class="sap-btn" id="clearButton">Clear</button>
                <button class="sap-btn" id="backButton">Back</button>
            </div>
            <div class="sap-form-section">
                <h4 class="sap-section-title">Document Selection</h4>
                <div class="sap-form-row">
                    <label class="sap-label">Document Number</label>
                    <input class="sap-input" id="docNumber" type="text" maxlength="10"
                        placeholder="e.g. 1900012345" value="1900012345">
                </div>
                <div class="sap-form-row">
                    <label class="sap-label">Company Code</label>
                    <input class="sap-input" id="companyCode" type="text" maxlength="4"
                        placeholder="1000" value="1000">
                </div>
                <div class="sap-form-row">
                    <label class="sap-label">Fiscal Year</label>
                    <input class="sap-input" id="fiscalYear" type="text" maxlength="4"
                        placeholder="2026" value="2026">
                </div>
            </div>
            <div class="sap-hint-bar">[i] Enter the accounting document number to review its line items and account assignments.</div>
        </div>
    `;
}

/**
 * FS10N – G/L Account Balance Display
 * Shows period-by-period debit/credit/balance totals for a G/L account.
 */
function renderFS10NSelectionScreen(state) {
    return `
        <div class="sap-selection-screen">
            <div class="sap-screen-header">
                <span class="sap-tcode">FS10N</span>
                <span class="sap-screen-title">G/L Account Balances</span>
            </div>
            <div class="sap-toolbar">
                <button class="sap-btn" id="executeButton">&#x25B6; Execute (F8)</button>
                <button class="sap-btn" id="clearButton">Clear</button>
                <button class="sap-btn" id="backButton">Back</button>
            </div>
            <div class="sap-form-section">
                <h4 class="sap-section-title">Selection Criteria</h4>
                <div class="sap-form-row">
                    <label class="sap-label">G/L Account</label>
                    <input class="sap-input" id="glAccount" type="text" maxlength="10"
                        placeholder="e.g. 110000" value="110000">
                </div>
                <div class="sap-form-row">
                    <label class="sap-label">Company Code</label>
                    <input class="sap-input" id="companyCode" type="text" maxlength="4"
                        placeholder="1000" value="1000">
                </div>
                <div class="sap-form-row">
                    <label class="sap-label">Fiscal Year</label>
                    <input class="sap-input" id="fiscalYear" type="text" maxlength="4"
                        placeholder="2026" value="2026">
                </div>
            </div>
            <div class="sap-hint-bar">[i] Use FS10N to review period totals for any balance-sheet or P&amp;L account. Compare with planned values during month-end close.</div>
        </div>
    `;
}

/**
 * KSB1 – Cost Center Actual Line Items
 * Core CO transaction: shows individual cost postings per cost center per period.
 */
function renderKSB1SelectionScreen(state) {
    return `
        <div class="sap-selection-screen">
            <div class="sap-screen-header">
                <span class="sap-tcode">KSB1</span>
                <span class="sap-screen-title">Cost Centers: Actual Line Items</span>
            </div>
            <div class="sap-toolbar">
                <button class="sap-btn" id="executeButton">&#x25B6; Execute (F8)</button>
                <button class="sap-btn" id="clearButton">Clear</button>
                <button class="sap-btn" id="backButton">Back</button>
            </div>
            <div class="sap-form-section">
                <h4 class="sap-section-title">Cost Center Selection</h4>
                <div class="sap-form-row">
                    <label class="sap-label">Controlling Area</label>
                    <input class="sap-input" id="controllingArea" type="text" maxlength="4"
                        placeholder="1000" value="1000">
                </div>
                <div class="sap-form-row">
                    <label class="sap-label">Cost Center</label>
                    <input class="sap-input" id="costCenter" type="text" maxlength="10"
                        placeholder="e.g. 10103000" value="10103000">
                </div>
                <div class="sap-form-row">
                    <label class="sap-label">Fiscal Year</label>
                    <input class="sap-input" id="fiscalYear" type="text" maxlength="4"
                        placeholder="2026" value="2026">
                </div>
                <div class="sap-form-row">
                    <label class="sap-label">From Period</label>
                    <input class="sap-input short" id="periodFrom" type="text" maxlength="3"
                        placeholder="001" value="001">
                    <label class="sap-label">To Period</label>
                    <input class="sap-input short" id="periodTo" type="text" maxlength="3"
                        placeholder="006" value="006">
                </div>
            </div>
            <div class="sap-hint-bar">[i] KSB1 shows actual cost postings per cost center. Use this to investigate budget overruns before presenting variance analysis to the CFO.</div>
        </div>
    `;
}

/**
 * F110 – Automatic Payment Transactions
 * Manages vendor payment runs: proposal creation, review, exceptions, payment posting.
 */
function renderF110SelectionScreen(state) {
    return `
        <div class="sap-selection-screen">
            <div class="sap-screen-header">
                <span class="sap-tcode">F110</span>
                <span class="sap-screen-title">Automatic Payment Transactions: Status</span>
            </div>
            <div class="sap-toolbar">
                <button class="sap-btn" id="executeButton">&#x25B6; Display Run Status</button>
                <button class="sap-btn" id="clearButton">New Run Parameters</button>
                <button class="sap-btn" id="backButton">Back</button>
            </div>
            <div class="sap-form-section">
                <h4 class="sap-section-title">Run Parameters</h4>
                <div class="sap-form-row">
                    <label class="sap-label">Run Date</label>
                    <input class="sap-input" id="runDate" type="text" maxlength="10"
                        placeholder="2026-07-05" value="2026-07-05">
                </div>
                <div class="sap-form-row">
                    <label class="sap-label">Identification</label>
                    <input class="sap-input" id="identificationCode" type="text" maxlength="5"
                        placeholder="RUN-A" value="RUN-A">
                </div>
                <div class="sap-form-row">
                    <label class="sap-label">Company Code</label>
                    <input class="sap-input" id="companyCode" type="text" maxlength="4"
                        placeholder="1000" value="1000">
                </div>
                <div class="sap-form-row">
                    <label class="sap-label">Posting Date</label>
                    <input class="sap-input" id="postingDate" type="text" maxlength="10"
                        placeholder="2026-07-05" value="2026-07-05">
                </div>
            </div>
            <div class="sap-hint-bar">[!] Always review the payment proposal exceptions before authorising payment posting. Blocked items require manual release and documented approval.</div>
        </div>
    `;
}

/**
 * KE30 – Profitability Analysis (CO-PA) Report
 * Displays profitability by segment, customer, product or region – core CO-PA transaction.
 */
function renderKE30SelectionScreen(state) {
    return `
        <div class="sap-selection-screen">
            <div class="sap-screen-header">
                <span class="sap-tcode">KE30</span>
                <span class="sap-screen-title">Execute Profitability Report</span>
            </div>
            <div class="sap-toolbar">
                <button class="sap-btn" id="executeButton">&#x25B6; Execute (F8)</button>
                <button class="sap-btn" id="clearButton">Clear</button>
                <button class="sap-btn" id="backButton">Back</button>
            </div>
            <div class="sap-form-section">
                <h4 class="sap-section-title">Report Selection</h4>
                <div class="sap-form-row">
                    <label class="sap-label">Operating Concern</label>
                    <input class="sap-input" id="operatingConcern" type="text" maxlength="4"
                        placeholder="1000" value="1000">
                </div>
                <div class="sap-form-row">
                    <label class="sap-label">Report Name</label>
                    <input class="sap-input" id="reportName" type="text" maxlength="20"
                        placeholder="COPA-01-SEGMENT" value="COPA-01-SEGMENT">
                </div>
                <div class="sap-form-row">
                    <label class="sap-label">Fiscal Year</label>
                    <input class="sap-input" id="fiscalYear" type="text" maxlength="4"
                        placeholder="2026" value="2026">
                </div>
                <div class="sap-form-row">
                    <label class="sap-label">From Period</label>
                    <input class="sap-input short" id="periodFrom" type="text" maxlength="3"
                        placeholder="001" value="001">
                    <label class="sap-label">To Period</label>
                    <input class="sap-input short" id="periodTo" type="text" maxlength="3"
                        placeholder="006" value="006">
                </div>
            </div>
            <div class="sap-hint-bar">[i] CO-PA (KE30) is used by senior finance leadership to review profitability by segment. Required for business reviews and Board reporting.</div>
        </div>
    `;
}

/**
 * FBL1N – Vendor Line Items
 * Displays open, cleared and parked vendor line items. Essential for AP reconciliation.
 */
function renderFBL1NSelectionScreen(state) {
    return `
        <div class="sap-selection-screen">
            <div class="sap-screen-header">
                <span class="sap-tcode">FBL1N</span>
                <span class="sap-screen-title">Vendor Line Items</span>
            </div>
            <div class="sap-toolbar">
                <button class="sap-btn" id="executeButton">&#x25B6; Execute (F8)</button>
                <button class="sap-btn" id="clearButton">Clear</button>
                <button class="sap-btn" id="backButton">Back</button>
            </div>
            <div class="sap-form-section">
                <h4 class="sap-section-title">Selection Criteria</h4>
                <div class="sap-form-row">
                    <label class="sap-label">Vendor Account</label>
                    <input class="sap-input" id="vendorCode" type="text" maxlength="10"
                        placeholder="e.g. V100002" value="V100002">
                </div>
                <div class="sap-form-row">
                    <label class="sap-label">Company Code</label>
                    <input class="sap-input" id="companyCode" type="text" maxlength="4"
                        placeholder="1000" value="1000">
                </div>
                <div class="sap-form-row">
                    <label class="sap-label">Open Items at Key Date</label>
                    <input class="sap-input" id="keyDate" type="text" maxlength="10"
                        placeholder="2026-07-05" value="2026-07-05">
                </div>
                <div class="sap-checkbox-row">
                    <input type="checkbox" id="openItems" checked>
                    <label>Open Items</label>
                    <input type="checkbox" id="clearedItems">
                    <label>Cleared Items</label>
                    <input type="checkbox" id="parkedItems">
                    <label>Parked Items</label>
                </div>
            </div>
            <div class="sap-hint-bar">[i] FBL1N is used for AP reconciliation, payment dispute resolution, and audit evidence. Always check payment blocks before authorising a payment run.</div>
        </div>
    `;
}

// ─── FI/CO RESULT GRIDS ──────────────────────────────────────────────────────

/**
 * FB03 Result – FI Document Line Items
 */
function renderFB03ResultGrid(filters, state) {
    const docNum = filters.docNumber || "1900012345";
    const doc = FI_CO_MASTER_DATA.fiDocuments.find(d => d.docNumber === docNum)
             || FI_CO_MASTER_DATA.fiDocuments[0];

    if (!doc) {
        return `<div class="training-callout error"><strong>[X]</strong> Document ${docNum} not found in company code ${filters.companyCode || "1000"} fiscal year ${filters.fiscalYear || "2026"}.</div>`;
    }

    const itemRows = doc.lineItems.map(li => {
        const dr = li.debit  > 0 ? li.debit.toLocaleString("en-US", { minimumFractionDigits: 2 }) : "";
        const cr = li.credit > 0 ? li.credit.toLocaleString("en-US", { minimumFractionDigits: 2 }) : "";
        const ccell = li.costCenter  ? `<td>${li.costCenter}</td>`  : `<td class="sap-muted">—</td>`;
        const pcell = li.profitCenter ? `<td>${li.profitCenter}</td>` : `<td class="sap-muted">—</td>`;
        return `<tr>
            <td>${li.lineItem}</td>
            <td>${li.account}</td>
            <td>${li.description}</td>
            <td class="number">${dr}</td>
            <td class="number">${cr}</td>
            ${ccell}
            ${pcell}
        </tr>`;
    }).join("");

    const total = doc.lineItems.reduce((s, l) => s + l.debit, 0);

    return `
        <div class="sap-result-grid">
            <div class="sap-result-header">
                <div class="sap-result-meta">
                    <span class="sap-kv"><strong>Document:</strong> ${doc.docNumber}</span>
                    <span class="sap-kv"><strong>Company Code:</strong> ${doc.companyCode}</span>
                    <span class="sap-kv"><strong>Type:</strong> ${doc.docType}</span>
                    <span class="sap-kv"><strong>Date:</strong> ${doc.docDate}</span>
                    <span class="sap-kv"><strong>Posting Date:</strong> ${doc.postingDate}</span>
                    <span class="sap-kv"><strong>Currency:</strong> ${doc.currency}</span>
                </div>
                <div class="sap-result-meta secondary">
                    <span class="sap-kv"><strong>Reference:</strong> ${doc.reference}</span>
                    <span class="sap-kv"><strong>Header Text:</strong> ${doc.headerText}</span>
                    <span class="sap-kv fi-status-ok"><strong>Status:</strong> ${doc.status}</span>
                </div>
            </div>
            <table class="sap-grid-table">
                <thead>
                    <tr>
                        <th>Itm</th>
                        <th>Account</th>
                        <th>Description</th>
                        <th class="number">Debit (${doc.currency})</th>
                        <th class="number">Credit (${doc.currency})</th>
                        <th>Cost Center</th>
                        <th>Profit Center</th>
                    </tr>
                </thead>
                <tbody>${itemRows}</tbody>
                <tfoot>
                    <tr class="total-row">
                        <td colspan="3"><strong>Document Total</strong></td>
                        <td class="number"><strong>${total.toLocaleString("en-US", { minimumFractionDigits: 2 })}</strong></td>
                        <td class="number"><strong>${total.toLocaleString("en-US", { minimumFractionDigits: 2 })}</strong></td>
                        <td colspan="2"></td>
                    </tr>
                </tfoot>
            </table>
            <div class="sap-message-bar success">[OK] Document ${doc.docNumber} – ${doc.headerText}</div>
        </div>
    `;
}

/**
 * FS10N Result – G/L Account Balance Display by Period
 */
function renderFS10NResultGrid(filters, state) {
    const account = filters.glAccount    || "110000";
    const coCode  = filters.companyCode  || "1000";
    const fy      = filters.fiscalYear   || "2026";

    const balance = FI_CO_MASTER_DATA.glBalances.find(
        b => b.account === account && b.companyCode === coCode && b.fiscalYear === fy
    );

    const glDef = FI_CO_MASTER_DATA.glAccounts.find(a => a.account === account);
    const accDesc = glDef ? glDef.description : "Unknown Account";

    const periodRows = balance ? `
        <tr>
            <td>001</td><td class="number"></td><td class="number"></td><td class="number">${balance.openingBalance.toLocaleString("en-US", { minimumFractionDigits: 2 })}</td>
        </tr>
        <tr class="highlight-row">
            <td>006 (Jun)</td>
            <td class="number">${balance.debit.toLocaleString("en-US", { minimumFractionDigits: 2 })}</td>
            <td class="number">${balance.credit.toLocaleString("en-US", { minimumFractionDigits: 2 })}</td>
            <td class="number"><strong>${balance.closingBalance.toLocaleString("en-US", { minimumFractionDigits: 2 })}</strong></td>
        </tr>
    ` : `<tr><td colspan="4" class="sap-muted">No balance data found for this account / company code / fiscal year.</td></tr>`;

    return `
        <div class="sap-result-grid">
            <div class="sap-result-header">
                <div class="sap-result-meta">
                    <span class="sap-kv"><strong>G/L Account:</strong> ${account}</span>
                    <span class="sap-kv"><strong>Description:</strong> ${accDesc}</span>
                    <span class="sap-kv"><strong>Company Code:</strong> ${coCode}</span>
                    <span class="sap-kv"><strong>Fiscal Year:</strong> ${fy}</span>
                </div>
            </div>
            <table class="sap-grid-table">
                <thead>
                    <tr>
                        <th>Period</th>
                        <th class="number">Debit</th>
                        <th class="number">Credit</th>
                        <th class="number">Cumulative Balance</th>
                    </tr>
                </thead>
                <tbody>${periodRows}</tbody>
            </table>
            ${balance ? `<div class="sap-message-bar success">[OK] Account balance displayed – Closing balance period 006: ${balance.currency} ${balance.closingBalance.toLocaleString("en-US", { minimumFractionDigits: 2 })}</div>` : ""}
        </div>
    `;
}

/**
 * KSB1 Result – Cost Center Actual Line Items with Variance vs Plan
 */
function renderKSB1ResultGrid(filters, state) {
    const ccFilter = filters.costCenter || "10103000";
    const fy       = filters.fiscalYear  || "2026";

    const items = FI_CO_MASTER_DATA.costCenterActuals.filter(
        i => i.costCenter.startsWith(ccFilter) && i.fiscalYear === fy
    );

    const ccDef = FI_CO_MASTER_DATA.costCenters.find(c => c.code === ccFilter);
    const ccName = ccDef ? ccDef.name : ccFilter;
    const manager = ccDef ? ccDef.responsibleManager : "—";

    const rows = items.length > 0 ? items.map(i => {
        const variance = i.actual - i.plan;
        const varPct   = i.plan > 0 ? ((variance / i.plan) * 100).toFixed(1) : "—";
        const varClass = variance > 0 ? "variance-over" : variance < 0 ? "variance-under" : "";
        const glDef    = FI_CO_MASTER_DATA.glAccounts.find(a => a.account === i.glAccount);
        const glDesc   = glDef ? glDef.description : i.glAccount;
        return `<tr>
            <td>${i.costCenter}</td>
            <td>${i.period}</td>
            <td>${i.glAccount}</td>
            <td>${glDesc}</td>
            <td class="number">${i.plan.toLocaleString("en-US", { minimumFractionDigits: 2 })}</td>
            <td class="number">${i.actual.toLocaleString("en-US", { minimumFractionDigits: 2 })}</td>
            <td class="number ${varClass}">${variance > 0 ? "+" : ""}${variance.toLocaleString("en-US", { minimumFractionDigits: 2 })}</td>
            <td class="number ${varClass}">${varPct}%</td>
        </tr>`;
    }).join("") : `<tr><td colspan="8" class="sap-muted">No actual postings found for cost center ${ccFilter} in fiscal year ${fy}.</td></tr>`;

    return `
        <div class="sap-result-grid">
            <div class="sap-result-header">
                <div class="sap-result-meta">
                    <span class="sap-kv"><strong>Cost Center:</strong> ${ccFilter} – ${ccName}</span>
                    <span class="sap-kv"><strong>Responsible Manager:</strong> ${manager}</span>
                    <span class="sap-kv"><strong>Fiscal Year:</strong> ${fy}</span>
                    <span class="sap-kv"><strong>Records:</strong> ${items.length}</span>
                </div>
            </div>
            <table class="sap-grid-table">
                <thead>
                    <tr>
                        <th>Cost Center</th>
                        <th>Period</th>
                        <th>G/L Account</th>
                        <th>Description</th>
                        <th class="number">Plan (USD)</th>
                        <th class="number">Actual (USD)</th>
                        <th class="number">Variance</th>
                        <th class="number">Var %</th>
                    </tr>
                </thead>
                <tbody>${rows}</tbody>
            </table>
            <div class="sap-message-bar ${items.some(i => (i.actual - i.plan) > 0) ? "warning" : "success"}">
                ${items.some(i => (i.actual - i.plan) / i.plan > 0.1) ? "[!] Over-budget items detected. Review with cost center manager before period close." : "[OK] Cost center actuals displayed."}
            </div>
        </div>
    `;
}

/**
 * F110 Result – Payment Run Status / Proposal Overview
 */
function renderF110ResultGrid(filters, state) {
    const run = FI_CO_MASTER_DATA.paymentRuns.find(
        r => r.identificationCode === (filters.identificationCode || "RUN-A")
    ) || FI_CO_MASTER_DATA.paymentRuns[0];

    const openItems = FI_CO_MASTER_DATA.openVendorItems.filter(
        i => i.companyCode === (filters.companyCode || "1000")
    );
    const blocked    = openItems.filter(i => i.paymentBlock);
    const proposable = openItems.filter(i => !i.paymentBlock);
    const proposedTotal = proposable.reduce((s, i) => s + i.amount, 0);

    const itemRows = openItems.map(i => {
        const vendor = FI_CO_MASTER_DATA.vendors.find(v => v.code === i.vendor);
        const vendorName = vendor ? vendor.name : i.vendor;
        const blockIcon  = i.paymentBlock ? `<span class="status-blocked">[!] Block: ${i.paymentBlock}</span>` : `<span class="status-ok">[OK]</span>`;
        return `<tr>
            <td>${i.vendor}</td>
            <td>${vendorName}</td>
            <td>${i.docNumber}</td>
            <td>${i.invoiceRef}</td>
            <td>${i.netDueDate}</td>
            <td class="number">${i.amount.toLocaleString("en-US", { minimumFractionDigits: 2 })} ${i.currency}</td>
            <td>${blockIcon}</td>
        </tr>`;
    }).join("");

    return `
        <div class="sap-result-grid">
            <div class="sap-result-header">
                <div class="sap-result-meta">
                    <span class="sap-kv"><strong>Run Date:</strong> ${run.paymentDate}</span>
                    <span class="sap-kv"><strong>Identification:</strong> ${run.identificationCode}</span>
                    <span class="sap-kv"><strong>Status:</strong> ${run.status}</span>
                    <span class="sap-kv"><strong>Company Code:</strong> ${run.companyCode}</span>
                </div>
                <div class="sap-result-meta secondary">
                    <span class="fi-kpi-card ok">
                        <span class="fi-kpi-label">Proposed for Payment</span>
                        <span class="fi-kpi-value">USD ${proposedTotal.toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>
                        <span class="fi-kpi-count">${proposable.length} document(s)</span>
                    </span>
                    <span class="fi-kpi-card warn">
                        <span class="fi-kpi-label">Exceptions / Blocked</span>
                        <span class="fi-kpi-value">${blocked.length} document(s)</span>
                        <span class="fi-kpi-count">Require manual release</span>
                    </span>
                </div>
            </div>
            <table class="sap-grid-table">
                <thead>
                    <tr>
                        <th>Vendor</th>
                        <th>Vendor Name</th>
                        <th>Document</th>
                        <th>Invoice Ref.</th>
                        <th>Net Due Date</th>
                        <th class="number">Amount</th>
                        <th>Payment Status</th>
                    </tr>
                </thead>
                <tbody>${itemRows}</tbody>
            </table>
            <div class="sap-message-bar warning">
                [!] Payment run ${run.identificationCode}: ${blocked.length} exception(s) found. Document 1900012351 blocked – manual release required before payment posting. Message: ZP 047.
            </div>
        </div>
    `;
}

/**
 * KE30 Result – CO-PA Profitability Report by Segment
 */
function renderKE30ResultGrid(filters, state) {
    const segments = FI_CO_MASTER_DATA.profitCenters.filter(
        p => p.controllingArea === "1000"
    );

    // Synthetic P&L values per segment for realistic simulation
    const segmentPL = {
        "PC-ELEC-NA":  { revenue: 4850000, cogs: 2912000, gross: 1938000, opex: 890000,  ebit: 1048000 },
        "PC-IND-NA":   { revenue: 2130000, cogs: 1450000, gross: 680000,  opex: 320000,  ebit: 360000  },
        "PC-CONS-NA":  { revenue: 1760000, cogs: 990000,  gross: 770000,  opex: 410000,  ebit: 360000  }
    };

    const rows = segments.map(seg => {
        const pl = segmentPL[seg.code] || { revenue: 0, cogs: 0, gross: 0, opex: 0, ebit: 0 };
        const margin = pl.revenue > 0 ? ((pl.ebit / pl.revenue) * 100).toFixed(1) : "—";
        const marginClass = parseFloat(margin) >= 15 ? "variance-under" : parseFloat(margin) < 10 ? "variance-over" : "";
        return `<tr>
            <td>${seg.code}</td>
            <td>${seg.name}</td>
            <td class="number">${pl.revenue.toLocaleString("en-US", { minimumFractionDigits: 2 })}</td>
            <td class="number">${pl.cogs.toLocaleString("en-US", { minimumFractionDigits: 2 })}</td>
            <td class="number">${pl.gross.toLocaleString("en-US", { minimumFractionDigits: 2 })}</td>
            <td class="number">${pl.opex.toLocaleString("en-US", { minimumFractionDigits: 2 })}</td>
            <td class="number ${marginClass}">${pl.ebit.toLocaleString("en-US", { minimumFractionDigits: 2 })}</td>
            <td class="number ${marginClass}">${margin}%</td>
        </tr>`;
    }).join("");

    const totals = segments.reduce((acc, seg) => {
        const pl = segmentPL[seg.code] || {};
        acc.revenue += (pl.revenue || 0);
        acc.ebit    += (pl.ebit    || 0);
        return acc;
    }, { revenue: 0, ebit: 0 });
    const totalMargin = ((totals.ebit / totals.revenue) * 100).toFixed(1);

    return `
        <div class="sap-result-grid">
            <div class="sap-result-header">
                <div class="sap-result-meta">
                    <span class="sap-kv"><strong>Operating Concern:</strong> 1000</span>
                    <span class="sap-kv"><strong>Report:</strong> COPA-01-SEGMENT</span>
                    <span class="sap-kv"><strong>Fiscal Year:</strong> ${filters.fiscalYear || "2026"}</span>
                    <span class="sap-kv"><strong>Period:</strong> ${filters.periodFrom || "001"} – ${filters.periodTo || "006"}</span>
                </div>
                <div class="sap-result-meta secondary">
                    <span class="fi-kpi-card ok">
                        <span class="fi-kpi-label">Total Revenue (YTD)</span>
                        <span class="fi-kpi-value">USD ${totals.revenue.toLocaleString("en-US")}</span>
                    </span>
                    <span class="fi-kpi-card ${parseFloat(totalMargin) >= 15 ? "ok" : "warn"}">
                        <span class="fi-kpi-label">Group EBIT Margin</span>
                        <span class="fi-kpi-value">${totalMargin}%</span>
                    </span>
                </div>
            </div>
            <table class="sap-grid-table">
                <thead>
                    <tr>
                        <th>Profit Center</th>
                        <th>Segment</th>
                        <th class="number">Revenue</th>
                        <th class="number">COGS</th>
                        <th class="number">Gross Profit</th>
                        <th class="number">OpEx</th>
                        <th class="number">EBIT</th>
                        <th class="number">Margin %</th>
                    </tr>
                </thead>
                <tbody>${rows}</tbody>
                <tfoot>
                    <tr class="total-row">
                        <td colspan="2"><strong>Total North America</strong></td>
                        <td class="number"><strong>${totals.revenue.toLocaleString("en-US", { minimumFractionDigits: 2 })}</strong></td>
                        <td colspan="3"></td>
                        <td class="number"><strong>${totals.ebit.toLocaleString("en-US", { minimumFractionDigits: 2 })}</strong></td>
                        <td class="number"><strong>${totalMargin}%</strong></td>
                    </tr>
                </tfoot>
            </table>
            <div class="sap-message-bar info">[i] CO-PA data reflects cumulative actuals for period 001–006 / 2026. Planned values deviation analysis available in KE30 report variant COPA-02-PLAN.</div>
        </div>
    `;
}

/**
 * FBL1N Result – Vendor Open Line Items
 */
function renderFBL1NResultGrid(filters, state) {
    const vendorFilter = filters.vendorCode   || "V100002";
    const coCode       = filters.companyCode  || "1000";

    const items = FI_CO_MASTER_DATA.openVendorItems.filter(
        i => i.vendor === vendorFilter && i.companyCode === coCode
    );

    const vendor = FI_CO_MASTER_DATA.vendors.find(v => v.code === vendorFilter);
    const vendorName = vendor ? vendor.name : vendorFilter;

    const rows = items.length > 0 ? items.map(i => {
        const blockLabel = i.paymentBlock
            ? `<span class="status-blocked">[!] ${i.paymentBlock}</span>`
            : `<span class="status-ok">[OK]</span>`;
        return `<tr>
            <td>${i.docNumber}</td>
            <td>${i.docDate}</td>
            <td>${i.invoiceRef}</td>
            <td>${i.paymentTerms}</td>
            <td>${i.netDueDate}</td>
            <td class="number">${i.amount.toLocaleString("en-US", { minimumFractionDigits: 2 })} ${i.currency}</td>
            <td>${i.clearingStatus}</td>
            <td>${blockLabel}</td>
        </tr>`;
    }).join("") : `<tr><td colspan="8" class="sap-muted">No open items found for vendor ${vendorFilter} in company code ${coCode}.</td></tr>`;

    const totalOpen = items.reduce((s, i) => s + i.amount, 0);
    const blocked   = items.filter(i => i.paymentBlock);

    return `
        <div class="sap-result-grid">
            <div class="sap-result-header">
                <div class="sap-result-meta">
                    <span class="sap-kv"><strong>Vendor:</strong> ${vendorFilter} – ${vendorName}</span>
                    <span class="sap-kv"><strong>Company Code:</strong> ${coCode}</span>
                    <span class="sap-kv"><strong>Open Items:</strong> ${items.length}</span>
                    <span class="sap-kv"><strong>Total Open Balance:</strong> USD ${totalOpen.toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>
                </div>
                ${blocked.length > 0 ? `<div class="training-callout warning" style="margin:8px 0 0"><strong>[!] Payment block detected</strong> on ${blocked.length} document(s). Manual release with documented approval is required before F110 payment posting.</div>` : ""}
            </div>
            <table class="sap-grid-table">
                <thead>
                    <tr>
                        <th>Document</th>
                        <th>Doc Date</th>
                        <th>Invoice Ref.</th>
                        <th>Pymt Terms</th>
                        <th>Net Due Date</th>
                        <th class="number">Amount</th>
                        <th>Status</th>
                        <th>Payment Block</th>
                    </tr>
                </thead>
                <tbody>${rows}</tbody>
            </table>
            <div class="sap-message-bar ${blocked.length > 0 ? "warning" : "success"}">
                ${blocked.length > 0
                    ? `[!] ${blocked.length} document(s) with payment block R – review required. Message: ZP 047.`
                    : `[OK] ${items.length} open item(s) displayed. Total: ${totalOpen.toLocaleString("en-US", { minimumFractionDigits: 2 })} USD.`}
            </div>
        </div>
    `;
}

// Made with Bob - Enhanced with FI/CO module for Senior Manager preparation
