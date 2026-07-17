/**
 * SAP Message Repository
 * Realistic S/4HANA system messages with message IDs, classes, and types
 * Follows SAP message convention: Message Class + Message Number
 */

export const SAP_MESSAGES = {
    // V1 - Sales (SD) Messages
    V1: {
        "012": {
            type: "E",
            text: "Sales order {0} is blocked for delivery due to credit limit",
            longText: "The sales order cannot be delivered because the customer has exceeded their credit limit. Check credit management in transaction VKM3 or contact the credit department."
        },
        "032": {
            type: "W",
            text: "Delivery date {0} is in the past",
            longText: "The requested delivery date has already passed. Please update the delivery schedule or confirm with the customer."
        },
        "101": {
            type: "S",
            text: "Sales order {0} has been saved",
            longText: "The sales order was successfully created and saved in the system."
        },
        "201": {
            type: "E",
            text: "Material {0} is not available in plant {1}",
            longText: "The requested material cannot be found in the specified plant. Check material master data or select a different plant."
        },
        "305": {
            type: "W",
            text: "Incomplete data for customer {0}",
            longText: "Customer master data is incomplete. Some required fields are missing. Contact master data team."
        },
        "401": {
            type: "E",
            text: "Credit limit exceeded for customer {0}",
            longText: "Customer credit exposure exceeds the approved credit limit. Credit block has been set. Use VKM1 to release or VKM3 to review credit details."
        },
        "512": {
            type: "I",
            text: "Pricing conditions updated for sales order {0}",
            longText: "The pricing conditions have been recalculated based on current master data."
        }
    },

    // VL - Shipping/Delivery Messages
    VL: {
        "311": {
            type: "E",
            text: "Delivery {0} cannot be created: No stock available",
            longText: "Insufficient stock quantity in the specified storage location. Check inventory with MMBE or MB51."
        },
        "421": {
            type: "S",
            text: "Delivery {0} has been saved",
            longText: "The outbound delivery document was successfully created."
        },
        "502": {
            type: "W",
            text: "Picking incomplete for delivery {0}",
            longText: "Not all items have been picked. Complete picking before posting goods issue."
        },
        "611": {
            type: "S",
            text: "Goods issue posted for delivery {0}",
            longText: "Material document created. Inventory has been reduced."
        },
        "701": {
            type: "E",
            text: "Delivery {0} is blocked for goods issue",
            longText: "The delivery cannot be processed due to a delivery block. Check document flow and release blocks."
        }
    },

    // VF - Billing Messages
    VF: {
        "001": {
            type: "E",
            text: "Billing document cannot be created: Delivery {0} not goods issued",
            longText: "Goods issue must be posted before billing. Use VL02N to post goods issue for the delivery."
        },
        "002": {
            type: "E",
            text: "Sales order {0} is blocked for billing",
            longText: "A billing block exists on the sales order. Check the order in VA03 and remove the billing block if appropriate."
        },
        "003": {
            type: "E",
            text: "Credit block active for customer {0} - billing not allowed",
            longText: "Customer has a credit block. Review credit status in VKM3 and release in VKM1 if approved."
        },
        "101": {
            type: "S",
            text: "Billing document {0} has been created",
            longText: "Invoice successfully generated and posted to Financial Accounting."
        },
        "201": {
            type: "W",
            text: "Incomplete pricing for billing document {0}",
            longText: "Some pricing conditions are missing or incomplete. Review pricing configuration."
        },
        "301": {
            type: "E",
            text: "No billing-relevant items found for sales order {0}",
            longText: "All items have already been billed or are not relevant for billing."
        },
        "401": {
            type: "I",
            text: "Billing document {0} posted to accounting document {1}",
            longText: "The billing document has been successfully posted to FI with the referenced accounting document number."
        }
    },

    // M7 - Materials Management Messages
    M7: {
        "021": {
            type: "E",
            text: "Material {0} does not exist in plant {1}",
            longText: "The material is not extended to this plant. Use MM01 to extend material to plant or select a different plant."
        },
        "104": {
            type: "W",
            text: "Stock level below safety stock for material {0}",
            longText: "Current stock quantity is below the defined safety stock level. Consider creating a purchase requisition."
        },
        "201": {
            type: "S",
            text: "Material document {0} posted successfully",
            longText: "Goods movement has been recorded in inventory management."
        },
        "305": {
            type: "E",
            text: "Negative stock not allowed for material {0} in plant {1}",
            longText: "The system is configured to prevent negative stock. Insufficient quantity available for this transaction."
        },
        "412": {
            type: "I",
            text: "Stock transfer completed for material {0}",
            longText: "Material has been transferred between storage locations."
        }
    },

    // F5 - Financial Accounting Messages
    F5: {
        "201": {
            type: "S",
            text: "Document {0} posted in company code {1}",
            longText: "The accounting document has been successfully posted to the general ledger."
        },
        "301": {
            type: "E",
            text: "Account {0} is blocked for posting",
            longText: "The GL account cannot accept postings. Check account master data or contact accounting."
        },
        "401": {
            type: "W",
            text: "Payment terms {0} not found for customer {1}",
            longText: "Default payment terms will be used. Update customer master data if needed."
        },
        "501": {
            type: "E",
            text: "Credit limit check failed for customer {0}",
            longText: "Customer credit exposure exceeds approved limit. Transaction blocked pending credit approval."
        }
    },

    // BRAIN - Credit Management Messages
    BRAIN: {
        "601": {
            type: "E",
            text: "Credit limit of {0} {1} exceeded for customer {2}",
            longText: "Current credit exposure plus this order value exceeds the approved credit limit. Order is blocked for delivery and billing."
        },
        "602": {
            type: "W",
            text: "Customer {0} is approaching credit limit",
            longText: "Credit utilization is above 90%. Monitor closely or consider credit limit increase."
        },
        "603": {
            type: "S",
            text: "Credit block released for sales order {0}",
            longText: "The credit block has been manually released. Order can now proceed to delivery and billing."
        },
        "604": {
            type: "I",
            text: "Credit check performed for customer {0}: Status {1}",
            longText: "Automatic credit check completed. Review credit management cockpit for details."
        },
        "605": {
            type: "E",
            text: "No credit master record found for customer {0}",
            longText: "Customer does not have a credit control area assignment. Contact credit management team."
        }
    },

    // General System Messages
    "00": {
        "001": {
            type: "S",
            text: "Data saved successfully",
            longText: "Your changes have been saved to the database."
        },
        "002": {
            type: "E",
            text: "No authorization for transaction {0}",
            longText: "You do not have the required authorization to execute this transaction. Contact your system administrator."
        },
        "003": {
            type: "W",
            text: "Unsaved data will be lost",
            longText: "You have unsaved changes. Press Save to keep your changes or Cancel to discard them."
        },
        "004": {
            type: "I",
            text: "Processing completed",
            longText: "The requested operation has finished successfully."
        }
    }
};

/**
 * Message Types:
 * E = Error (Red) - Transaction cannot proceed
 * W = Warning (Yellow) - Transaction can proceed but attention needed
 * S = Success (Green) - Operation completed successfully
 * I = Information (Blue) - Informational message
 * A = Abort (Red) - Critical error, transaction terminated
 */

export const MESSAGE_TYPES = {
    E: { label: "Error", color: "#d32f2f", icon: "❌", canProceed: false },
    W: { label: "Warning", color: "#f57c00", icon: "⚠️", canProceed: true },
    S: { label: "Success", color: "#388e3c", icon: "✓", canProceed: true },
    I: { label: "Information", color: "#1976d2", icon: "ℹ️", canProceed: true },
    A: { label: "Abort", color: "#c62828", icon: "⛔", canProceed: false }
};

/**
 * Get formatted SAP message
 * @param {string} messageClass - Message class (e.g., "V1", "VF", "M7")
 * @param {string} messageNumber - Message number (e.g., "012", "401")
 * @param {Array} parameters - Parameters to replace placeholders {0}, {1}, etc.
 * @returns {Object} Formatted message object
 */
export function getSAPMessage(messageClass, messageNumber, parameters = []) {
    const messageGroup = SAP_MESSAGES[messageClass];
    if (!messageGroup) {
        return {
            id: `${messageClass} ${messageNumber}`,
            type: "E",
            text: `Unknown message class: ${messageClass}`,
            longText: "This message class is not defined in the system.",
            canProceed: false
        };
    }

    const message = messageGroup[messageNumber];
    if (!message) {
        return {
            id: `${messageClass} ${messageNumber}`,
            type: "E",
            text: `Unknown message number: ${messageNumber}`,
            longText: "This message number is not defined in the system.",
            canProceed: false
        };
    }

    let text = message.text;
    let longText = message.longText;

    // Replace parameters
    parameters.forEach((param, index) => {
        const placeholder = `{${index}}`;
        text = text.replace(placeholder, param);
        longText = longText.replace(placeholder, param);
    });

    const messageType = MESSAGE_TYPES[message.type];

    return {
        id: `${messageClass} ${messageNumber}`,
        type: message.type,
        text: text,
        longText: longText,
        color: messageType.color,
        icon: messageType.icon,
        label: messageType.label,
        canProceed: messageType.canProceed
    };
}

/**
 * Format message for console display
 */
export function formatMessageForConsole(messageClass, messageNumber, parameters = []) {
    const msg = getSAPMessage(messageClass, messageNumber, parameters);
    return `${msg.icon} ${msg.id}: ${msg.text}`;
}

/**
 * Create message bar HTML (for status bar display)
 */
export function createMessageBar(messageClass, messageNumber, parameters = []) {
    const msg = getSAPMessage(messageClass, messageNumber, parameters);
    return `
        <div class="sap-message-bar" style="background-color: ${msg.color}; color: white; padding: 8px 12px; border-radius: 4px; margin: 8px 0;">
            <strong>${msg.icon} ${msg.id}</strong>: ${msg.text}
        </div>
    `;
}

/**
 * Common message scenarios for quick access
 */
export const COMMON_MESSAGES = {
    creditBlockOrder: () => getSAPMessage("V1", "401", ["100001"]),
    creditBlockBilling: (customer) => getSAPMessage("VF", "003", [customer]),
    orderSaved: (orderNumber) => getSAPMessage("V1", "101", [orderNumber]),
    deliverySaved: (deliveryNumber) => getSAPMessage("VL", "421", [deliveryNumber]),
    billingSaved: (billingNumber) => getSAPMessage("VF", "101", [billingNumber]),
    noStock: (material, plant) => getSAPMessage("M7", "021", [material, plant]),
    goodsIssuePosted: (deliveryNumber) => getSAPMessage("VL", "611", [deliveryNumber]),
    creditLimitExceeded: (limit, currency, customer) => getSAPMessage("BRAIN", "601", [limit, currency, customer]),
    creditReleased: (orderNumber) => getSAPMessage("BRAIN", "603", [orderNumber])
};

// Made with Bob
