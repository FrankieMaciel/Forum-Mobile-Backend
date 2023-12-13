require('dotenv').config();

const secretKey = process.env.SECRET_KEY;

const path = require('path');
const fs = require('fs');
const jwt = require('jsonwebtoken');

const User = require(path.resolve(__dirname, '..', 'models', 'userModel'));

const create = async (req, res) => {
  try {
    const user = new User(req.body);

    await user.register();
    if (user.errors.length > 0) {
      console.log(
        'Não foi possível registrar um usuário!'
      );
      console.log(user.errors);
      return res.status(500).send('Ocorreu um erro no servidor.');
    }

    const token = jwt.sign({
      id: user._id, nome: user.username
    }, secretKey);

    let obj = {
      token: token,
    };

    return res.status(200).send(JSON.stringify(obj));
  } catch (e) {
    console.log(e);
    return res.status(500).send('Ocorreu um erro no servidor.');
  }
};

const login = async (req, res) => {
  try {
    console.log(req.body);
    const user = new User(req.body);
    await user.login();

    if (user.errors.length > 0) {
      const erro = new Error(JSON.stringify(user.errors));
      return res.send({ error: erro.message });
    }

    const token = jwt.sign({
      id: user._id, nome: userObj.username
    }, secretKey);

    let obj = {
      token: token,
      id: user.user._id,
      username: user.user.username,
      email: user.user.email,
      profileURL: user.user.profileURL,
      score: user.user.score
    };
    console.log(obj);

    return res.status(200).send(JSON.stringify(obj));
  } catch (e) {
    console.log(e);
    return res.status(500).send('Ocorreu um erro no servidor.');
  }
};

const readAll = async (req, res) => {
  let users = await User.readAll();
  return res.status(200).send(users);
};

const readById = async (req, res) => {
  let user = await User.readById(req.params.id);
  return res.status(200).send(user);
};

const update = async (req, res) => {
  await User.update(req.params.id, req.body);
  return res.status(200).send('Usuário foi atualizado com sucesso!');
};

const ChangeProfile = async (req, res) => {
  return res.status(200).send("Alguma coisa chegou!");
}

const SendProfile = async (req, res) => {

  const id = req.params.id;

  const imagePath = path.join('public', 'custom-pfp', `${id}.jpg`);
  const imageContent = fs.readFileSync(imagePath);
  console.log(imageContent);
  res.set('Content-Type', 'image/jpeg');

  return res.status(200).send(imageContent);
}

module.exports = {
  create,
  login,
  readAll,
  readById,
  update,
  ChangeProfile,
  SendProfile
};