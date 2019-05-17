const express = require('express');
const path = require('path');

// Here we set up a sort of "mini Express app" that we can plug into our main one.
const router = express.Router();

// We use a 'products' array to store the elements of our request when we make a POST request.
const products = [];

router.get('/add-product', (req, res, next) => {
    res.render('add-product', { pageTitle: 'Add Product' })
})

router.post('/product', (req, res, next) => {
    products.push({ title: req.body.title })
    res.redirect('/');
})

module.exports = {
    router,
    products
};