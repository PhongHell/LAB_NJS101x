const User = require('../models/user')

exports.getLogin = (req, res, next) => {
  console.log(req.session.isLoggedIn);
  res.render('auth/login', {
    path: '/login',
    docTitle: 'Login',
    isAuthenticated: false
  });
};

exports.postLogin = (req, res, next) => {
  User.findById('61a04f133f2eb5c7fe7312ce')
  .then(user => {
    req.session.isLoggedIn = true;
    req.session.user = user;
    req.session.save(err => { // make sure session is saved before redirect to avoid conflict in rendering
      console.log(err);
      res.redirect('/')
    })
  })
};

exports.postLogout = (req, res, next) => {
  req.session.destroy(err => {
    console.log(err);
    res.redirect('/')
  })
};

