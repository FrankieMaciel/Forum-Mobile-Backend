const sessionUser = (req, res, next) => {
  res.locals.user = req.session.user;
  next();
};

const userRequired = (req, res, next) => {
  if (!req.session.user) {
    req.flash('errors', 'É necessario fazer login para executar esta ação!');
    req.session.save(() => res.redirect('/'));
    return;
  }
  next();
};

module.exports = {
  sessionUser,
  userRequired
};