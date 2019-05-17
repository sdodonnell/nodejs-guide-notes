const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

app.use(bodyParser.urlencoded());

// We can add middleware via express.static() that allows the app access to local files (e.g. stylesheets).
app.use(express.static(path.join(__dirname, 'public')));

// We can plug in other routes using app.use() and passing in an exported module from another file. Make sure to import the files and save them as variables.
const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');

// We can also use a "filter" that prefixes any route with something else by default. This means that to reach any of the admin routes in the browser, we must prefix them with '/admin'.
app.use('/admin', adminData.router);
app.use(shopRoutes);

// We can set up a handler for a 404 error by using res.send() with a "Page not found" element, and potentially chaining .status(404) in between. UPDATE: Use .sendFile() to send an HTML instead of raw HTML.
app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'))
})

const server = http.createServer(app);

server.listen(3000);