const products = []

module.exports = class Product {
    constructor(title) {
        this.title = title;
    }

    save() {
        products.push(this);
    }

    // "Static" lets us call this method on the Product class itself, since retrieving all products should not depend on an individual instance of a product.
    static fetchAll() {
        return products
    }
}
