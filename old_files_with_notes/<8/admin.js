const express = require('express');
const path = require('path');

// Here we set up a sort of "mini Express app" that we can plug into our main one.
const router = express.Router();

const productsController = require('../controllers/products');

// We use a 'products' array to store the elements of our request when we make a POST request.
const products = [];

// We've amended our router get and post functions to include references the the controllers, which hold logic that connects models and views. Previously we rendered .ejs files here directly using res.render().
router.get('/add-product', productsController.getAddProduct)

router.post('/product', productsController.postAddProduct)

module.exports = router