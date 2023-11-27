const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  user: { type: String, require: true },
  userProfile: { type: String, require: true },
  title: { type: String, required: true },
  content: { type: String, require: true },
  date: { type: Date, default: Date.now },
});

PostSchema.index(
  { title: 'text', content: 'text' },
  { default_language: 'pt', weights: { title: 2, content: 1 }}
  );

const PostModel = mongoose.model('Post', PostSchema);

class Post {
  constructor(body) {
    this.body = body;
    this.errors = [];
    this.post = null;

    this.create();
  }

  async create() {
    this.post = await PostModel.create(this.body);
  }

  static async readAll() {
    return await PostModel.find();
  }

  static async readByUser(user) {
    if (typeof user !== 'string') return;
    const posts = await PostModel.find({ user });
    return posts;
  }

  static async update(id, body) {
    if (typeof id !== 'string') return;

    const post = await PostModel.findById(id);

    let newUsername = body.username ? body.username : post.username;
    let newUserProfile = body.userProfile ? body.userProfile : post.userProfile;
    let newTitle = body.title ? body.title : post.title;
    let newContent = body.content ? body.content : post.content;

    const edit = {
      username: newUsername,
      userProfile: newUserProfile,
      title: newTitle,
      content: newContent
    };
    await PostModel.findByIdAndUpdate(id, edit, { new: true });
  }

  static async delete(id) {
    if (typeof id !== 'string') return;
    const post = await PostModel.findByIdAndDelete(id);
    return post;
  }

  static async readFilter(text) {
    return await PostModel.find({ $text: { $search: text } });
  }
}

module.exports = Post;