const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded())

app.set('view engine', 'ejs');

const users = [];

app.post('/add-user', (req, res, next) => {
    console.log(req.body)
    users.push(req.body);
    res.redirect('/')
})

app.get('/users', (req, res, next) => {
    res.render('users', { pageTitle: 'Users', users })
})

app.get('/', (req, res, next) => {
    res.render('main', { pageTitle: 'Main' })
})


const server = http.createServer(app);

server.listen(3000)