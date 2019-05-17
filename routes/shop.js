const express = require('express');
const router = express.Router();

// Path is a core module in Node that lets us use relative paths instead of absolute paths when we create and send files.
const path = require('path');
const adminData = require('./admin')

// Instead of sending raw HTML with res.send(), we can send an HTML file instead with res.sendFile().
router.get('/', (req, res, next) => {
    console.log(adminData.products)
    // With path.join(), we pass in first __dirname, which is a globally available variable that finds the current folder in your file system (in this case, /routes), and then the specific folder and file name we want to write to.
    res.sendFile(path.join(__dirname, '..', 'views', 'shop.html'))
})

module.exports = router;