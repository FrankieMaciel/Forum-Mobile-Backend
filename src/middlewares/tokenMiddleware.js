const jwt = require('jsonwebtoken');

const isAuthenticated = async (req, res, next) => {
  const token = req.body.token;

  if (token) {
    try {
      jwt.verify(token, process.env.SECRET_KEY);

      return next();
    } catch (e) {
      return res.status(401).json({ error: 'Token invalido!.' });
    }
  } else {
    res.status(401).json({ error: 'É preciso de um token de autorização!' });
  }
}

module.exports = {
  isAuthenticated
};