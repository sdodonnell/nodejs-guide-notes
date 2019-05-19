/*
const express = require('express');
const router = express.Router();

// Path is a core module in Node that lets us use relative paths instead of absolute paths when we create and send files.
const path = require('path');
const adminData = require('./admin')

// Instead of sending raw HTML with res.send(), we can send an HTML file instead with res.sendFile().
router.get('/', (req, res, next) => {
    // With path.join(), we pass in first __dirname, which is a globally available variable that finds the current folder in your file system (in this case, /routes), and then the specific folder and file name we want to write to.
    // res.sendFile(path.join(__dirname, '..', 'views', 'shop.html'))

    // Instead of using res.sendFile, we'll use res.render so we can pass in dynamic data to our .ejs file.
    res.render('shop', { 
        pageTitle: 'Shop',
        prods: adminData.products
    })
})

module.exports = router;
*/

const express = require('express');
const router = express.Router();
const path = require('path');

const productsController = require('../controllers/products');

router.get('/', productsController.getProducts);

module.exports = router