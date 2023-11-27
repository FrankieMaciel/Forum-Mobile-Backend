const path = require('path');
const { post } = require('../routes/router');

const Post = require(path.resolve(__dirname, '..', 'models', 'postModel'));
const User = require(path.resolve(__dirname, '..', 'models', 'userModel'));

const create = async (req, res) => {
  let p = await new Post(req.body);
  return res.status(200).send("Post Criado com sucesso!");
};

const readAll = async (req, res) => {
  let posts = await Post.readAll();

  let postsWithUsers = [];
  for (let post of posts) {
    let UserInfo = await User.readById(post.user);
    let filteredUserInfo = null;

    if (UserInfo) {
      filteredUserInfo = {
        username: UserInfo.username,
        Profile: UserInfo.ProfileUrl
      }
    }

    postsWithUsers.push(
      {
        post: post,
        userInfo: filteredUserInfo
      }
    )
  }

  return res.status(200).send(postsWithUsers);
};

const readByUser = async (req, res) => {
  let user = req.params.id;
  let posts = await Post.readByUser(user);
  return res.status(200).send(posts);
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
  destroy,
  readFilter
};