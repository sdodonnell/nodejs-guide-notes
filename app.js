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
        res.write('<head><title>Enter Message</title></head>');
        res.write('<body><form action="/message" method="POST"><input type="text" name="message"></body>');
        res.write('</html>');
        return res.end()
    }

    // This lets us write a file and include that in the response. It also redirects the user after the file is sent, setting res.statusCode to 302 (for redirect) and invoking res.setHeader with 'Location' and the url we want to redirect to.
    const method = req.method;
    if (url === '/message' && method === 'POST') {
        
        // In Node.js, a request is read in 'chunks', multiple parts that can be dealt with before the full request is read. To deal with these chunks, we use a construct called a 'buffer' that allows us to stop chunks and do something with them before they are fully parsed.
        // The .on() method will listen for certain events, e.g. 'data' (which is fired whenever a new 'chunk' is ready to be read). It receives as arguments the type of event and a listener function that executes some action.
        const body = [];
        req.on('data', (chunk) => {
            console.log(chunk)
            body.push(chunk)
        });

        // This is where we do something with the data we've extracted from the chunks. We create a 'Buffer' object, which is available globally, and add to it the body array we created earlier, then convert to a string using .toString()
        req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString()
            const message = parsedBody.split('=')[1];
            // As opposed to .writeFile(), .writeFileSync() will block other code until the file is written.
            // fs.writeFileSync('message.txt', message);
            // With .writeFile(), you also pass in a callback that will execute code once the file has been written -- a good example of the event-driven architecture of Node.js.
            fs.writeFile('message.txt', message, err => {
                res.statusCode = 302;
                res.setHeader('Location', '/');
                return res.end()
            })
        })

        // fs.writeFileSync('message.txt', 'DUMMY');
        // res.statusCode = 302;
        // res.setHeader('Location', '/');
        // return res.end()
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