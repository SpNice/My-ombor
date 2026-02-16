// Warehouse and Employee Management System

class Product {
    constructor(name, quantity, price) {
        this.name = name;
        this.quantity = quantity;
        this.price = price;
    }
}

class Employee {
    constructor(name, id) {
        this.name = name;
        this.id = id;
        this.attendance = [];
    }

    markAttendance(date) {
        this.attendance.push(date);
    }
}

class Warehouse {
    constructor() {
        this.products = [];
        this.employees = [];
    }

    addProduct(product) {
        this.products.push(product);
    }

    addEmployee(employee) {
        this.employees.push(employee);
    }

    generateReport() {
        return this.products.map(p => `${p.name}: ${p.quantity} (${p.price}$)`).join('\n');
    }
}

class Auth {
    constructor() {
        this.users = {};
    }

    register(username, password) {
        this.users[username] = password;
    }

    login(username, password) {
        return this.users[username] === password;
    }
}

class GoogleSheetsSync {
    static syncData(data) {
        // Placeholder for syncing data with Google Sheets
        console.log('Syncing data to Google Sheets...');
    }
}

class CSVExporter {
    static export(data) {
        const csvContent = Object.keys(data[0]).join(',') + '\n' + 
            data.map(e => Object.values(e).join(',')).join('\n');
        console.log('CSV Exported:', csvContent);
    }
}

// Sample Usage
const warehouse = new Warehouse();
const auth = new Auth();
auth.register('user1', 'password1');

const product1 = new Product('Product A', 100, 10);
warehouse.addProduct(product1);
const employee1 = new Employee('Employee 1', 1);
warehouse.addEmployee(employee1);

employee1.markAttendance('2026-02-01');
console.log(warehouse.generateReport());

// Sync data to Google Sheets
GoogleSheetsSync.syncData(warehouse.products);

// Export data as CSV
CSVExporter.export(warehouse.products);