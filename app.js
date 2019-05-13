// This line imports the http protocol and stores it for use later.
const http = require('http');
// This imports the module responsible for working with the local file system.
const fs = require('fs');

// This creates the server and specifies what to do with the request and/or response.
const server = http.createServer((req, res) => {

    // We'll use this to see what information the request sends.
    // console.log(req.url, req.method, req.headers);

    // We can use conditional logic to determine whether we're on a certain route and render a certain type of response. We return at the end so that we don't go on to execute the rest of the createServer function.
    const url = req.url;
    if (url === '/') {
        res.write('<html>');
        res.write('<head><title>Ender Message</title></head>');
        res.write('<body><form action="/message" method="POST"><input type="text" name="message"></body>');
        res.write('</html>');
        return res.end()
    }

    // This lets us write a file and include that in the response. It also redirects the user after the file is sent, setting res.statusCode to 302 (for redirect) and invoking res.setHeader with 'Location' and the url we want to redirect to.
    if (url === '/message' && method === 'POST') {
        fs.writeFileSync('message.txt', 'DUMMY');
        res.statusCode = 302;
        res.setHeader('Location', '/');
        return res.end()
    }

    // This is a long (and suboptimal!) way of creating a response. res.setHeader() is used to create and set a response header, e.g. a cookie or a content type. res.write() is used to write information to be included in the request body, e.g. HTML. res.end() is used to mark the end of a response.
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>My Node App</title></head>');
    res.write('<body><h1>Hello from my Node.js server!</h1></body>');
    res.write('</html>');
    res.end()

})

server.listen(3000)