const http = require('http');
const express = require('express');

const app = express();

app.use('/users', (req, res, next) => {
    console.log("This is the /users route.");
    res.send("<html><h1>This is the /users route.</h1></html>")
})

app.use("/", (req, res, next) => {
    console.log("This is the / route.");
    res.send("<html><h1>This is the / route.</h1></html>");
})


const server = http.createServer(app)

server.listen(3000)