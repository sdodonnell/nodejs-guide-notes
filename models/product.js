// Rather than storing new products in a local array, we will create a file in the local file system that can store products.
const path = require('path');
const fs = require('fs');

const p = path.join(path.dirname(process.mainModule.filename), 'data', 'products.json');
module.exports = class Product {
    constructor(title) {
        this.title = title;
    }

    save() {
        // This operation will take the products.json file, convert it into usable data, then add any new products to it, and finally convert that data back to JSON and rewrite the file in the same location that it was read from.
        // fs.readFile takes a path ("p") and a callback that says what to do if there is an error or, if there is none, what to do with the file's data.
        fs.readFile(p, (err, fileContent) => {
            // Create array to store products.
            let products = [];
            // If there is no error, we should set the products array to the parsed output of the JSON file.
            if (!err) {
                products = JSON.parse(fileContent)
            };
            // Here we add to the products array this particular instance of the Product class.
            products.push(this);
            // Finally we write a new file to the same path "p" with the new products array, using JSON.stringify to create a JSON object out of an array.
            fs.writeFile(p, JSON.stringify(products), err => {
                console.log(err);
            });
        });
    }

    // "Static" lets us call this method on the Product class itself, since retrieving all products should not depend on an individual instance of a product.
    // Since the readFile() method executes asynchronously, we have to use a callback in fetchAll() to handle the return values, or else we will never have access to the products that the method is reading from the file.
    static fetchAll(cb) {
        fs.readFile(p, (err, fileContent) => {
            if (err) {
                cb([])
            } else {
                cb(JSON.parse(fileContent))
            }
        })
    }
}
