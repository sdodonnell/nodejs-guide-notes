const http = require('http');

// Import Express here. Express is imported as a function.
const express = require('express');

// Running express as a function will create a request handler that can be passed into the http.createServer() function below.
const app = express();

// app.use() is used for including middleware that lies between request and response. .use() accepts a set of request handlers. Callback must include three parameters: request, response, and next; next stands for a function that will be passed in by Express.js. Next will be used to move from one middleware to the next. We must either call next to move on to the next middleware OR send some kind of a response.
app.use((req, res, next) => {
    console.log('In the middleware!');
    // We call next() from within .use() to pass on information to the next middleware. If we don't call it, the request will not continue to the next middleware.
    next();
});

app.use((req, res, next) => {
    console.log('In the second middleware!');
    // One thing we can do from middleware is send a response using res.send(). We can pass in html strings (as with res.write()) and the header will be set with text/html as content-type.
    res.send()
});

const server = http.createServer(app);

server.listen(3000);