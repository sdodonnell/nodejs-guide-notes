const User = require('../models/user');

exports.getLogin = (req, res, next) => {
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    isAuthenticated: req.session.isLoggedIn
  });
}

exports.postLogin = (req, res, next) => {
  User.findById('5ce461bf22bf3305bea107e9')
    .then(user => {
      req.session.isLoggedIn = true;
      req.session.user = user;
      console.log(req);
      // Use this method to prevent redirecting before the session has been updated.
      req.session.save(err => {
        console.log(err)
        res.redirect('/');
      })
    })
    .catch(err => console.log(err))
}

exports.postLogout = (req, res, next) => {
  console.log(req.session)
  req.session.destroy(err => {
    console.log(err);
    res.redirect('/');
  })
}

exports.getSignup = (req, res, next) => {
  res.render('auth/signup', {
    path: '/signup',
    pageTitle: 'Signup',
    isAuthenticated: false
  });
};

exports.postSignup = (req, res, next) => {};