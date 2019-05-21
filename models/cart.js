/*
const path = require('path');
const fs = require('fs');

const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'cart.json'
)

module.exports = class Cart {
// Don't add a constructor, because there will always be a cart in the app and thus there's no need to construct it mor than once. Instead there should be a static addProduct method that will fetch the previous cart, analyze the card and find an existing product, and add new product(s)/ increase quantities of existing products.
static addProduct(id, productPrice) {
    fs.readFile(p, (err, fileContent) => {
        let cart = { products: [], totalPrice: 0 }
        if (!err) {
            cart = JSON.parse(fileContent);
            if (cart.products[0] === null) {
                cart.products.splice(0, 1)
            }
        }
    // Analyze the cart, find existing product
    const existingProductIndex = cart.products.findIndex(
        prod => prod.id === id
    );
    const existingProduct = cart.products[existingProductIndex];
    let updatedProduct;
    // Add new product / increase quantity
    if (existingProduct) {
        updatedProduct = { ...existingProduct };
        updatedProduct.qty = updatedProduct.qty + 1;
        cart.products = [...cart.products];
        cart.products[existingProductIndex] = updatedProduct;
    } else {
        updatedProduct = { id: id, qty: 1};
        cart.products = [...cart.products, updatedProduct];
    }
    cart.totalPrice = cart.totalPrice + +productPrice;
    fs.writeFile(p, JSON.stringify(cart), err => {
        console.log(err)
    })
    });
}

static deleteProduct(id, productPrice) {
    fs.readFile(p, (err, fileContent) => {
      if (err) {
        return
      }
      const updatedCart = { ...JSON.parse(fileContent) };
      const product = updatedCart.products.find(prod => prod.id === id);
      if (!product) return;
      const productQty = product.qty;
      updatedCart.products = updatedCart.products.filter(prod => prod.id !== id);
      updatedCart.totalPrice = updatedCart.totalPrice - productPrice * productQty;
      fs.writeFile(p, JSON.stringify(updatedCart), err => {
        console.log(err);
      });
    })
  }

  static getCart(cb) {
      fs.readFile(p, (err, fileContent) => {
          const cart = JSON.parse(fileContent);
          if (err) {
              cb(null);
          } else {
              cb(cart);
          }
      })
  }
}
*/

