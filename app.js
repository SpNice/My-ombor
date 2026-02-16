class Employee {
    constructor(name, id, position) {
        this.name = name;
        this.id = id;
        this.position = position;
    }

    displayInfo() {
        console.log(`Employee ID: ${this.id}, Name: ${this.name}, Position: ${this.position}`);
    }
}

class Warehouse {
    constructor(location) {
        this.location = location;
        this.inventory = [];
    }

    addItem(item) {
        this.inventory.push(item);
        console.log(`${item} added to the warehouse.`);
    }

    removeItem(item) {
        const index = this.inventory.indexOf(item);
        if (index > -1) {
            this.inventory.splice(index, 1);
            console.log(`${item} removed from the warehouse.`);
        } else {
            console.log(`${item} not found in the inventory.`);
        }
    }

    listInventory() {
        console.log(`Inventory at ${this.location}: ${this.inventory.join(', ')}`);
    }
}

// Example usage:
const warehouse = new Warehouse('Main Warehouse');
warehouse.addItem('Item A');
warehouse.addItem('Item B');
warehouse.removeItem('Item A');
warehouse.listInventory();

const employee = new Employee('John Doe', 1, 'Manager');
employee.displayInfo();