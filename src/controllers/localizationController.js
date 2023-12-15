const path = require('path');

const Localization = require(path.resolve(__dirname, '..', 'models', 'userLocalization'));

const create = async (req, res) => {
  console.log(req.body);
  let p = await new Localization(req.body);
  return res.status(200).send("Localização Criada com sucesso!");
};

const readByUser = async (req, res) => {
  let user = req.params.id;
  let localization = await Localization.readByUser(user);
  return res.status(200).send(localization);
};

const edit = async (req, res) => {
  Localization.update(req.params.id, req.body);
  return res.status(200).send("Localização atualizada com sucesso!");
};

const destroy = async (req, res) => {
  let postID = req.params.id;
  await CommLocalizationent.delete(postID);
  return res.status(200).send("Localização deletada com sucesso!");
};

module.exports = {
  create,
  readByUser,
  edit,
  destroy,
};