// This line imports the http protocol and stores it for use later.
const http = require('http');

// This creates the server and specifies what to do with the request and/or response.
const server = http.createServer((req, res) => {

    // We'll use this to see what information the request sends.
    console.log(req.url, req.method, req.headers);

    // This is a long (and suboptimal!) way of creating a response. res.setHeader() is used to create and set a response header, e.g. a cookie or a content type. res.write() is used to write information to be included in the request body, e.g. HTML. res.end() is used to mark the end of a response.
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>My Node App</title></head>');
    res.write('<body><h1>Hello from my Node.js server!</h1></body>');
    res.write('</html>');
    res.end()

})

server.listen(3000)