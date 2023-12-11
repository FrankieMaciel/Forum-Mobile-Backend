const path = require('path');

const Comment = require(path.resolve(__dirname, '..', 'models', 'commentModel'));

const create = async (req, res) => {
  console.log(req.body);
  let p = await new Comment(req.body);
  return res.status(200).send("Comment Criado com sucesso!");
};

const readAll = async (req, res) => {
  let comments = await Comment.readAll();
  return res.status(200).send(comments);
};

const readByUser = async (req, res) => {
  let user = req.params.id;
  let comments = await Comment.readByUser(user);
  return res.status(200).send(comments);
};

const editPost = async (req, res) => {
  Comment.update(req.params.id, req.body);
  return res.status(200).send("Comment atualizado com sucesso!");
};

const destroy = async (req, res) => {
  let postID = req.params.id;
  await Comment.delete(postID);
  return res.status(200).send("Comment deletado com sucesso!");
};

const readFilter = async (req, res) => {
  let textFilter = req.params.text;
  const comments = await Comment.readFilter(textFilter);
  return res.send(comments);
};

const findPostsComment = async (req, res) => {
  let postId = req.params.id;
  const comments = await Comment.findPostsComment(postId);
  return res.status(200).send(comments);
}

module.exports = {
  create,
  readAll,
  readByUser,
  editPost,
  destroy,
  readFilter,
  findPostsComment
};