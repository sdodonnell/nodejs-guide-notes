const http = require('http');

// Import Express here. Express is imported as a function.
const express = require('express');

// Import the external body-parser package.
const bodyParser = require('body-parser');

// Running express as a function will create a request handler that can be passed into the http.createServer() function below.
const app = express();

// Run app.use() with the bodyParser to avoid having to parse request bodies manually. Now calling req.body will return something immediately usable. This particular parser will parse data from forms, but not necessarily other files/datasets.
app.use(bodyParser.urlencoded());

// app.use() is used for including middleware that lies between request and response. .use() accepts a set of request handlers. Callback must include three parameters: request, response, and next; next stands for a function that will be passed in by Express.js. Next will be used to move from one middleware to the next. We must either call next to move on to the next middleware OR send some kind of a response.
app.use((req, res, next) => {
    console.log('In the middleware!');
    // We call next() from within .use() to pass on information to the next middleware. If we don't call it, the request will not continue to the next middleware.
    next();
});

/*
app.use((req, res, next) => {
    console.log('In the second middleware!');
    // One thing we can do from middleware is send a response using res.send(). We can pass in html strings (as with res.write()) and the header will be set with text/html as content-type.
    res.send("<html><h1>Hello from Express.js!</h1></html>")
});
*/

// app.use() takes an optional "path" argument before the callback that will determine if the callback gets executed (based on whether the path matches). If you include next() in all middleware, the request will hit every middleware that matches the path (e.g. a request to "/" would match both "/users" and "/"). If next() is neglected, it will hit only the first matching middleware.
app.use('/add-product', (req, res, next) => {
    res.send('<form action="/product" method="POST"><input type="text" name="title"><button type="submit"></form>')
})

// We can also use app.post() for POST requests and app.get() for GET requests, and the function will only run if the type of request matches. .get() and .post() have to match EXACT paths.
app.post('/product', (req, res, next) => {

    // We can use the req.body convenience method to see what the request is sending, but the body must be parsed first. For this we install middleware, such as the body parser above.
    console.log(req.body)

    // res.redirect() is a convenience method for redirecting to a path.
    res.redirect('/');
})

app.use("/", (req, res, next) => {
    console.log('This always runs!');
    next();
})



const server = http.createServer(app);

server.listen(3000);