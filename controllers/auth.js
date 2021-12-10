exports.getLogin = (req, res, next) => {
  let isLoggedIn;
  if (req.get('Cookie').split(';')[2]) {
    isLoggedIn = req.get('Cookie').split(';')[2].trim().split(':')[1].trim() === 'true';
  }
  res.render('auth/login', {
    path: '/login',
    docTitle: 'Login',
    isAuthenticated: isLoggedIn
  });
};

exports.postLogin = (req, res, next) => {
  res.setHeader('Set-Cookie', 'isLoggedIn: true');
  res.redirect('/');
};
