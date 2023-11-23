require('dotenv').config();

const secretKey = process.env.SECRET_KEY;

const path = require('path');
const jwt = require('jsonwebtoken');

const User = require(path.resolve(__dirname, '..', 'models', 'userModel'));

const create = async (req, res) => {
  try
  {
    const user = new User(req.body);

    await user.register();
    if (user.errors.length > 0) {
      console.log(
        'Não foi possível registrar um usuário!'
      );
      console.log(user.errors);
      return res.status(500).send('Ocorreu um erro no servidor.');
    }

    return res.status(200).send('Usuário registrado com sucesso!');
  } catch (e) {
    console.log(e);
    return res.status(500).send('Ocorreu um erro no servidor.');
  }
};

const login = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.login();

    if (user.errors.length > 0) return 

    const token = jwt.sign({
      id: user._id, nome: user.username
    }, secretKey);

    let obj = {
      token: token
    };
    
    return  res.status(200).send(JSON.stringify(obj));
  } catch (e) {
    console.log(e);
    return res.status(500).send('Ocorreu um erro no servidor.');
  }
};

module.exports = {
  create,
  login
}