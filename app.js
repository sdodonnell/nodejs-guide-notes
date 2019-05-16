const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded());

// We can plug in other routes using app.use() and passing in an exported module from another file. Make sure to import the files and save them as variables.
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(adminRoutes);
app.use(shopRoutes);

// We can set up a handler for a 404 error by using res.send() with a "Page not found" element, and potentially chaining .status(404) in between.
app.use((req, res, next) => {
    res.status(404).send('<h1>Page not found</h1>');
})

const server = http.createServer(app);

server.listen(3000);