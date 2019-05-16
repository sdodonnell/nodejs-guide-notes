const express = require('express');

// Here we set up a sort of "mini Express app" that we can plug into our main one.
const router = express.Router();

router.get('/add-product', (req, res, next) => {
    res.send('<form action="/product" method="POST"><input type="text" name="title"><button type="submit"></form>')
})

router.post('/product', (req, res, next) => {
    console.log(req.body)
    res.redirect('/');
})

module.exports = router;