const input = require('sync-input');
class Gift {
    id;
    name;
    price;
    constructor(id, name, price) {
        this.id = id;
        this.name = name;
        this.price = price;
    }
    getGift() {
        return `${this.id}- ${this.name}, Cost: ${this.price} tickets`;
    }
}

class Shop {
    #gifts = [
        new Gift(1, 'Teddy Bear', 10),
        new Gift(2, 'Big Red Ball', 5),
        new Gift(3, 'Huge Bear', 50),
        new Gift(4, 'Candy', 8),
        new Gift(5, 'Stuffed Tiger', 15),
        new Gift(6, 'Stuffed Dragon', 30),
        new Gift(7, 'Skateboard', 100),
        new Gift(8, 'Toy Car', 25),
        new Gift(9, 'Basketball', 20),
        new Gift(10, 'Scary Mask', 75),
    ]
    showGifts() {
        console.log(`Here's the list of gifts:\n`);
        for (let gift of this.#gifts) {
            console.log(gift.getGift());
        }
        if (this.#gifts.length > 0) {
            console.log("Wow! There are no gifts to buy.");
        }
    }
    greet() {
        console.log(`WELCOME TO THE CARNIVAL GIFT SHOP!`);
        console.log(`Hello friend! Thank you for visiting the carnival!`);
    }
    getTask() {
        console.log(`What do you want to do?`);
        console.log(`1-Buy a gift 2-Add tickets 3-Check tickets ` +
            `4-Show gifts 5-Exit the shop`);
        return input();
    }
    buyGift(visitor) {
        if (this.#gifts.length > 0) {
            console.log(`Enter the number of the gift you want to get:`);
            let selection = Number(input());
            if (isNaN(selection)) {
                console.log("Please enter a valid number!");
                return;
            }
            let gift = this.#gifts.find(element => element.id === selection);
            if (gift === undefined) {
                console.log("There is no gift with that number!");
                return;
            }
            this.#gifts = this.#gifts.filter(element => element !== gift);
            if (visitor.tickets < gift.price) {
                console.log("You don't have enough tickets to buy this gift.");
                return;
            }
            console.log(`Here you go, one ${gift.name}!`);
            visitor.removeTickets(gift.price);
            visitor.showTickets();
        } else {
            console.log("Wow! There are no gifts to buy.");
        }
    }
}

class Visitor {
    tickets;
    constructor() {
        this.tickets = 0;
    }
    showTickets() {
        console.log(`Total tickets: ${this.tickets}`);
    }
    addTickets() {
        console.log(`Enter the ticket amount:`);
        let ticketsToAdd = Number(input());
        if (isNaN(ticketsToAdd) || ticketsToAdd < 0 || ticketsToAdd > 1000) {
            console.log("Please enter a valid number between 0 and 1000.");
            return;
        }
        this.tickets += ticketsToAdd;
        this.showTickets();
    }
    removeTickets(tickets) {
        this.tickets -= tickets;
    }
}

let visitor = new Visitor();
let shop = new Shop()
shop.greet();
shop.showGifts();
let exit = false;
do {
    switch (shop.getTask()) {
        case "1":
            shop.buyGift(visitor);
            break;
        case "2":
            visitor.addTickets();
            break;
        case "3":
            visitor.showTickets();
            break;
        case "4":
            shop.showGifts();
            break;
        case "5":
            exit = true;
            break;
        default: console.log("Please enter a valid number!")
    }
} while (!exit);
console.log("Have a nice day!");