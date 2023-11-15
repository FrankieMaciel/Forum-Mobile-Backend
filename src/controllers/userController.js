const path = require('path');

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

    return res.status(200).send('Requisição bem-sucedida.');
  } catch (e) {
    console.log(e);
    return res.status(500).send('Ocorreu um erro no servidor.');
  }
};

module.exports = {
  create
}