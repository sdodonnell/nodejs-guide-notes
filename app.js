const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');

const app = express();

const User = require('./models/user');

// To use an HTML templating engine, use app.set() and pass in 'view engine' and a string of the appropriate package. Pug, EJS, and Handlebars are good options. You may also have to import the engine and set a directory for the views to be stored in.
app.set('view engine', 'ejs');
app.set('views', 'views');


app.use(bodyParser.urlencoded({
    extended: true
}));

// We can add middleware via express.static() that allows the app access to local files (e.g. stylesheets).
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    User.findById('5ce460c255c024024ee48355')
      .then(user => {
         req.user = user;
         next();
      })
      .catch(err => console.log(err))
});

// We can plug in other routes using app.use() and passing in an exported module from another file. Make sure to import the files and save them as variables.
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use((req, res, next) => {
    User.findById('5bab316ce0a7c75f783cb8a8')
      .then(user => {
        req.user = user;
        next();
      })
      .catch(err => console.log(err));
  });

// We can also use a "filter" that prefixes any route with something else by default. This means that to reach any of the admin routes in the browser, we must prefix them with '/admin'.
app.use('/admin', adminRoutes);
app.use(shopRoutes);

// We can set up a handler for a 404 error by using res.send() with a "Page not found" element, and potentially chaining .status(404) in between. UPDATE: Use .sendFile() to send an HTML instead of raw HTML.
/*
app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'))
})
*/

// Instead of rendering an html file, we can render a template that allows us to pass in dynamic data. For this we use the res.render() method and pass in the name of the file and an object that contains any dynamic information we want to pass in.
/*
app.use((req, res, next) => {
    res.status(404).render('404', { pageTitle: 'Page Not Found' })
}
*/

// Here we place the logic for rendering the 404 page in a controller located at 404.js.
const errorController = require('./controllers/error');

app.use(errorController.get404);

mongoose.connect('mongodb+srv://sam:zJLzyObtqzGvBGsK@cluster0-vjiz9.mongodb.net/test?retryWrites=true')
  .then(result => {
      User.findOne().then(user => {
          if (!user) {
              const user = new User({
                  name: 'Sam',
                  email: 'sam@sam.com',
                  cart: {
                      items: []
                  }
              });
              user.save();
          }
      })
      .catch(err => console.log(err))
      app.listen(3000);
  })
  .catch(err => console.log(err))