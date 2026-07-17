/**
 * SAP Master Data Repository
 * Realistic S/4HANA master data for Order-to-Cash simulation
 * All data follows SAP naming conventions and business logic
 */

export const MASTER_DATA = {
    // Sales Organizations
    salesOrganizations: [
        { code: "1000", name: "Global Sales US", currency: "USD", country: "US" },
        { code: "2000", name: "Global Sales Europe", currency: "EUR", country: "DE" },
        { code: "3000", name: "Global Sales LATAM", currency: "BRL", country: "BR" }
    ],

    // Distribution Channels
    distributionChannels: [
        { code: "10", name: "Wholesale" },
        { code: "12", name: "Retail" },
        { code: "14", name: "Direct Sales" },
        { code: "20", name: "E-Commerce" }
    ],

    // Divisions
    divisions: [
        { code: "00", name: "Cross-Division" },
        { code: "01", name: "Electronics" },
        { code: "02", name: "Industrial Equipment" },
        { code: "03", name: "Consumer Goods" }
    ],

    // Plants
    plants: [
        { code: "1010", name: "New York Distribution Center", country: "US", city: "New York" },
        { code: "1020", name: "Los Angeles Manufacturing", country: "US", city: "Los Angeles" },
        { code: "2010", name: "Hamburg Logistics Hub", country: "DE", city: "Hamburg" },
        { code: "2020", name: "Munich Production Plant", country: "DE", city: "Munich" },
        { code: "3010", name: "São Paulo Distribution", country: "BR", city: "São Paulo" }
    ],

    // Storage Locations
    storageLocations: [
        { plant: "1010", code: "0001", name: "Main Warehouse" },
        { plant: "1010", code: "0002", name: "Quality Inspection" },
        { plant: "1010", code: "0003", name: "Returns Area" },
        { plant: "1020", code: "0001", name: "Production Storage" },
        { plant: "1020", code: "0010", name: "Finished Goods" },
        { plant: "2010", code: "0001", name: "Central Warehouse" },
        { plant: "2010", code: "0005", name: "Hazmat Storage" },
        { plant: "3010", code: "0001", name: "Main Storage" }
    ],

    // Customers (Sold-to Party)
    customers: [
        {
            code: "100001",
            name: "TechMart Electronics Inc.",
            city: "New York",
            country: "US",
            salesOrg: "1000",
            distChannel: "10",
            division: "01",
            creditLimit: 500000,
            creditUsed: 425000,
            paymentTerms: "0001",
            incoterms: "FOB",
            currency: "USD",
            blocked: false,
            creditBlocked: true
        },
        {
            code: "100002",
            name: "Global Retail Solutions",
            city: "Chicago",
            country: "US",
            salesOrg: "1000",
            distChannel: "12",
            division: "03",
            creditLimit: 750000,
            creditUsed: 320000,
            paymentTerms: "0001",
            incoterms: "CIF",
            currency: "USD",
            blocked: false,
            creditBlocked: false
        },
        {
            code: "100003",
            name: "Industrial Supply Corp",
            city: "Houston",
            country: "US",
            salesOrg: "1000",
            distChannel: "14",
            division: "02",
            creditLimit: 1000000,
            creditUsed: 850000,
            paymentTerms: "0002",
            incoterms: "EXW",
            currency: "USD",
            blocked: false,
            creditBlocked: false
        },
        {
            code: "200001",
            name: "EuroTech Distribution GmbH",
            city: "Hamburg",
            country: "DE",
            salesOrg: "2000",
            distChannel: "10",
            division: "01",
            creditLimit: 600000,
            creditUsed: 280000,
            paymentTerms: "0001",
            incoterms: "DAP",
            currency: "EUR",
            blocked: false,
            creditBlocked: false
        },
        {
            code: "200002",
            name: "Deutsche Einzelhandel AG",
            city: "Munich",
            country: "DE",
            salesOrg: "2000",
            distChannel: "12",
            division: "03",
            creditLimit: 400000,
            creditUsed: 395000,
            paymentTerms: "0001",
            incoterms: "FCA",
            currency: "EUR",
            blocked: false,
            creditBlocked: true
        },
        {
            code: "300001",
            name: "Brasil Comércio Ltda",
            city: "São Paulo",
            country: "BR",
            salesOrg: "3000",
            distChannel: "10",
            division: "01",
            creditLimit: 2000000,
            creditUsed: 1200000,
            paymentTerms: "0003",
            incoterms: "CIF",
            currency: "BRL",
            blocked: false,
            creditBlocked: false
        }
    ],

    // Materials (Products)
    materials: [
        {
            code: "MAT-10001",
            description: "Laptop Computer Pro 15-inch",
            materialGroup: "ELEC-COMP",
            division: "01",
            baseUOM: "EA",
            weight: 2.1,
            weightUnit: "KG",
            volume: 0.015,
            volumeUnit: "M3",
            price: 1299.00,
            currency: "USD",
            availableQty: 450,
            plant: "1010"
        },
        {
            code: "MAT-10002",
            description: "Wireless Mouse Ergonomic",
            materialGroup: "ELEC-ACC",
            division: "01",
            baseUOM: "EA",
            weight: 0.15,
            weightUnit: "KG",
            volume: 0.001,
            volumeUnit: "M3",
            price: 49.99,
            currency: "USD",
            availableQty: 2500,
            plant: "1010"
        },
        {
            code: "MAT-10003",
            description: "4K Monitor 27-inch Professional",
            materialGroup: "ELEC-DISP",
            division: "01",
            baseUOM: "EA",
            weight: 6.5,
            weightUnit: "KG",
            volume: 0.045,
            volumeUnit: "M3",
            price: 599.00,
            currency: "USD",
            availableQty: 180,
            plant: "1010"
        },
        {
            code: "MAT-20001",
            description: "Industrial Pump Model X500",
            materialGroup: "IND-PUMP",
            division: "02",
            baseUOM: "EA",
            weight: 125.0,
            weightUnit: "KG",
            volume: 0.8,
            volumeUnit: "M3",
            price: 8500.00,
            currency: "USD",
            availableQty: 25,
            plant: "1020"
        },
        {
            code: "MAT-20002",
            description: "Hydraulic Valve Assembly",
            materialGroup: "IND-VALVE",
            division: "02",
            baseUOM: "EA",
            weight: 15.5,
            weightUnit: "KG",
            volume: 0.05,
            volumeUnit: "M3",
            price: 1250.00,
            currency: "USD",
            availableQty: 150,
            plant: "1020"
        },
        {
            code: "MAT-30001",
            description: "Premium Coffee Maker Deluxe",
            materialGroup: "CONS-APPL",
            division: "03",
            baseUOM: "EA",
            weight: 3.2,
            weightUnit: "KG",
            volume: 0.025,
            volumeUnit: "M3",
            price: 199.99,
            currency: "USD",
            availableQty: 850,
            plant: "1010"
        },
        {
            code: "MAT-30002",
            description: "Stainless Steel Cookware Set 12-piece",
            materialGroup: "CONS-COOK",
            division: "03",
            baseUOM: "SET",
            weight: 8.5,
            weightUnit: "KG",
            volume: 0.06,
            volumeUnit: "M3",
            price: 349.99,
            currency: "USD",
            availableQty: 320,
            plant: "1010"
        }
    ],

    // Sales Orders
    salesOrders: [
        {
            orderNumber: "4500012345",
            orderType: "OR",
            orderDate: "2026-06-15",
            customer: "100001",
            customerName: "TechMart Electronics Inc.",
            salesOrg: "1000",
            distChannel: "10",
            division: "01",
            netValue: 129900.00,
            currency: "USD",
            status: "Open",
            creditStatus: "B",
            deliveryStatus: "Not Delivered",
            billingStatus: "Not Billed",
            items: [
                {
                    item: "000010",
                    material: "MAT-10001",
                    description: "Laptop Computer Pro 15-inch",
                    quantity: 100,
                    uom: "EA",
                    netPrice: 1299.00,
                    netValue: 129900.00,
                    plant: "1010",
                    storageLocation: "0001",
                    deliveryDate: "2026-06-25",
                    deliveryStatus: "Not Delivered",
                    billingStatus: "Not Billed"
                }
            ]
        },
        {
            orderNumber: "4500012346",
            orderType: "OR",
            orderDate: "2026-06-18",
            customer: "100002",
            customerName: "Global Retail Solutions",
            salesOrg: "1000",
            distChannel: "12",
            division: "03",
            netValue: 169991.50,
            currency: "USD",
            status: "Open",
            creditStatus: "A",
            deliveryStatus: "Partially Delivered",
            billingStatus: "Not Billed",
            items: [
                {
                    item: "000010",
                    material: "MAT-30001",
                    description: "Premium Coffee Maker Deluxe",
                    quantity: 500,
                    uom: "EA",
                    netPrice: 199.99,
                    netValue: 99995.00,
                    plant: "1010",
                    storageLocation: "0001",
                    deliveryDate: "2026-06-28",
                    deliveryStatus: "Delivered",
                    billingStatus: "Not Billed"
                },
                {
                    item: "000020",
                    material: "MAT-30002",
                    description: "Stainless Steel Cookware Set 12-piece",
                    quantity: 200,
                    uom: "SET",
                    netPrice: 349.99,
                    netValue: 69998.00,
                    plant: "1010",
                    storageLocation: "0001",
                    deliveryDate: "2026-06-28",
                    deliveryStatus: "Not Delivered",
                    billingStatus: "Not Billed"
                }
            ]
        },
        {
            orderNumber: "4500012347",
            orderType: "OR",
            orderDate: "2026-06-20",
            customer: "100003",
            customerName: "Industrial Supply Corp",
            salesOrg: "1000",
            distChannel: "14",
            division: "02",
            netValue: 212500.00,
            currency: "USD",
            status: "Open",
            creditStatus: "A",
            deliveryStatus: "Delivered",
            billingStatus: "Not Billed",
            items: [
                {
                    item: "000010",
                    material: "MAT-20001",
                    description: "Industrial Pump Model X500",
                    quantity: 25,
                    uom: "EA",
                    netPrice: 8500.00,
                    netValue: 212500.00,
                    plant: "1020",
                    storageLocation: "0010",
                    deliveryDate: "2026-06-30",
                    deliveryStatus: "Delivered",
                    billingStatus: "Not Billed"
                }
            ]
        },
        {
            orderNumber: "4500012348",
            orderType: "OR",
            orderDate: "2026-06-22",
            customer: "200002",
            customerName: "Deutsche Einzelhandel AG",
            salesOrg: "2000",
            distChannel: "12",
            division: "03",
            netValue: 69996.50,
            currency: "EUR",
            status: "Open",
            creditStatus: "B",
            deliveryStatus: "Not Delivered",
            billingStatus: "Not Billed",
            items: [
                {
                    item: "000010",
                    material: "MAT-30001",
                    description: "Premium Coffee Maker Deluxe",
                    quantity: 350,
                    uom: "EA",
                    netPrice: 199.99,
                    netValue: 69996.50,
                    plant: "2010",
                    storageLocation: "0001",
                    deliveryDate: "2026-07-02",
                    deliveryStatus: "Not Delivered",
                    billingStatus: "Not Billed"
                }
            ]
        }
    ],

    // Deliveries
    deliveries: [
        {
            deliveryNumber: "8000012345",
            deliveryDate: "2026-06-28",
            salesOrder: "4500012346",
            customer: "100002",
            customerName: "Global Retail Solutions",
            shippingPoint: "1010",
            plant: "1010",
            status: "Picked",
            goodsIssueStatus: "Not Posted",
            items: [
                {
                    item: "000010",
                    material: "MAT-30001",
                    description: "Premium Coffee Maker Deluxe",
                    quantity: 500,
                    uom: "EA",
                    pickedQuantity: 500,
                    storageLocation: "0001"
                }
            ]
        },
        {
            deliveryNumber: "8000012346",
            deliveryDate: "2026-06-30",
            salesOrder: "4500012347",
            customer: "100003",
            customerName: "Industrial Supply Corp",
            shippingPoint: "1020",
            plant: "1020",
            status: "Goods Issue Posted",
            goodsIssueStatus: "Posted",
            goodsIssueDate: "2026-06-30",
            items: [
                {
                    item: "000010",
                    material: "MAT-20001",
                    description: "Industrial Pump Model X500",
                    quantity: 25,
                    uom: "EA",
                    pickedQuantity: 25,
                    storageLocation: "0010"
                }
            ]
        }
    ],

    // Billing Documents
    billingDocuments: [
        {
            billingNumber: "9000012345",
            billingDate: "2026-06-30",
            billingType: "F2",
            salesOrder: "4500012347",
            delivery: "8000012346",
            customer: "100003",
            customerName: "Industrial Supply Corp",
            salesOrg: "1000",
            netValue: 212500.00,
            taxAmount: 17000.00,
            grossValue: 229500.00,
            currency: "USD",
            status: "Posted",
            accountingDocument: "1900012345",
            items: [
                {
                    item: "000010",
                    material: "MAT-20001",
                    description: "Industrial Pump Model X500",
                    quantity: 25,
                    uom: "EA",
                    netPrice: 8500.00,
                    netValue: 212500.00
                }
            ]
        }
    ],

    // Payment Terms
    paymentTerms: [
        { code: "0001", description: "Net 30 days", days: 30 },
        { code: "0002", description: "Net 60 days", days: 60 },
        { code: "0003", description: "Net 45 days", days: 45 },
        { code: "Z001", description: "2% 10 days, Net 30", days: 30, discountPercent: 2, discountDays: 10 }
    ],

    // Shipping Points
    shippingPoints: [
        { code: "1010", name: "New York Shipping", plant: "1010" },
        { code: "1020", name: "Los Angeles Shipping", plant: "1020" },
        { code: "2010", name: "Hamburg Shipping", plant: "2010" },
        { code: "3010", name: "São Paulo Shipping", plant: "3010" }
    ],

    // Sales Offices
    salesOffices: [
        { code: "1000", name: "US East Coast Sales", salesOrg: "1000" },
        { code: "1010", name: "US West Coast Sales", salesOrg: "1000" },
        { code: "2000", name: "Central Europe Sales", salesOrg: "2000" },
        { code: "3000", name: "LATAM Sales", salesOrg: "3000" }
    ],

    // Sales Groups
    salesGroups: [
        { code: "100", name: "Electronics Sales Team" },
        { code: "200", name: "Industrial Sales Team" },
        { code: "300", name: "Consumer Goods Team" }
    ],

    // Order Types
    orderTypes: [
        { code: "OR", description: "Standard Order" },
        { code: "RE", description: "Returns" },
        { code: "RO", description: "Rush Order" },
        { code: "CS", description: "Consignment" }
    ],

    // Billing Types
    billingTypes: [
        { code: "F2", description: "Invoice" },
        { code: "G2", description: "Credit Memo" },
        { code: "L2", description: "Debit Memo" },
        { code: "S1", description: "Cancellation Invoice" }
    ],

    // Document Status
    documentStatus: {
        credit: {
            "A": "Released",
            "B": "Blocked",
            "C": "Partially Released"
        },
        delivery: {
            "A": "Not Relevant",
            "B": "Not Delivered",
            "C": "Partially Delivered",
            "D": "Fully Delivered"
        },
        billing: {
            "A": "Not Relevant",
            "B": "Not Billed",
            "C": "Partially Billed",
            "D": "Fully Billed"
        }
    }
};

// Helper functions to query master data
export function getCustomerByCode(customerCode) {
    return MASTER_DATA.customers.find(c => c.code === customerCode);
}

export function getMaterialByCode(materialCode) {
    return MASTER_DATA.materials.find(m => m.code === materialCode);
}

export function getSalesOrderByNumber(orderNumber) {
    return MASTER_DATA.salesOrders.find(o => o.orderNumber === orderNumber);
}

export function getDeliveryByNumber(deliveryNumber) {
    return MASTER_DATA.deliveries.find(d => d.deliveryNumber === deliveryNumber);
}

export function getBillingDocumentByNumber(billingNumber) {
    return MASTER_DATA.billingDocuments.find(b => b.billingNumber === billingNumber);
}

export function getPlantByCode(plantCode) {
    return MASTER_DATA.plants.find(p => p.code === plantCode);
}

export function getSalesOrgByCode(salesOrgCode) {
    return MASTER_DATA.salesOrganizations.find(s => s.code === salesOrgCode);
}

export function filterSalesOrders(filters) {
    let results = [...MASTER_DATA.salesOrders];

    if (filters.orderNumber) {
        results = results.filter(o => o.orderNumber.includes(filters.orderNumber));
    }
    if (filters.customer) {
        results = results.filter(o => o.customer === filters.customer);
    }
    if (filters.salesOrg) {
        results = results.filter(o => o.salesOrg === filters.salesOrg);
    }
    if (filters.dateFrom) {
        results = results.filter(o => o.orderDate >= filters.dateFrom);
    }
    if (filters.dateTo) {
        results = results.filter(o => o.orderDate <= filters.dateTo);
    }
    if (filters.creditBlocked) {
        results = results.filter(o => o.creditStatus === "B");
    }

    return results;
}

export function filterDeliveries(filters) {
    let results = [...MASTER_DATA.deliveries];

    if (filters.deliveryNumber) {
        results = results.filter(d => d.deliveryNumber.includes(filters.deliveryNumber));
    }
    if (filters.salesOrder) {
        results = results.filter(d => d.salesOrder === filters.salesOrder);
    }
    if (filters.dateFrom) {
        results = results.filter(d => d.deliveryDate >= filters.dateFrom);
    }
    if (filters.dateTo) {
        results = results.filter(d => d.deliveryDate <= filters.dateTo);
    }

    return results;
}

export function filterBillingDocuments(filters) {
    let results = [...MASTER_DATA.billingDocuments];

    if (filters.billingNumber) {
        results = results.filter(b => b.billingNumber.includes(filters.billingNumber));
    }
    if (filters.salesOrder) {
        results = results.filter(b => b.salesOrder === filters.salesOrder);
    }
    if (filters.customer) {
        results = results.filter(b => b.customer === filters.customer);
    }
    if (filters.dateFrom) {
        results = results.filter(b => b.billingDate >= filters.dateFrom);
    }
    if (filters.dateTo) {
        results = results.filter(b => b.billingDate <= filters.dateTo);
    }

    return results;
}

// Made with Bob
