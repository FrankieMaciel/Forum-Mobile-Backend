const path = require('path');
const { post } = require('../routes/router');

const Post = require(path.resolve(__dirname, '..', 'models', 'postModel'));

const create = async (req, res) => {
  let p = await new Post(req.body);
  return res.status(200).send("Post Criado com sucesso!");
};

const readAll = async (req, res) => {
  let posts = await Post.readAll();
  return res.status(200).send(posts);
};

const readByUser = async (req, res) => {
  let user = req.params.id;
  let posts = await Post.readByUser(user);
  return res.status(200).send(posts);
};

const editPost = async (req, res) => {
  Post.update(req.params.id, req.body);
  return res.status(200).send("Post atualizado com sucesso!");
};

const destroy = async (req, res) => {
  let postID = req.params.id;
  await Post.delete(postID);
  return res.status(200).send("Post deletado com sucesso!");
};

const readFilter = async (req, res) => {
  let textFilter = req.params.text;
  const posts = await Post.readFilter(textFilter);
  return res.send(posts);
};

module.exports = {
  create,
  readAll,
  readByUser,
  editPost,
  destroy,
  readFilter
};