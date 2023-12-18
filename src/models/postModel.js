const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  profileURL: { type: String, required: true },
  userID: {type: String, required: true}
});

const PostSchema = new mongoose.Schema({
  user: { type: UserSchema, required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

PostSchema.index(
  { title: 'text', content: 'text' },
  { default_language: 'pt', weights: { title: 2, content: 1 } }
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
    try {
      this.post = new PostModel(this.body);
      await this.post.save();
      console.log('Post salvo com sucesso:', this.post);
    } catch (error) {
      console.error('Erro ao criar ou salvar o post:', error);
      this.errors.push(error.message);
    }
  }

  static async readAll() {
    return await PostModel.find().sort({ date: -1 });
  }

  static async readByUser(userName) {
    if (typeof userName !== 'string') return;
    const posts = await PostModel.find({ 'user.name': userName }).sort({ date: -1 });
    return posts;
  }

  static async update(id, body) {
    if (typeof id !== 'string') return;

    const post = await PostModel.findById(id);

    let newTitle = body.title ? body.title : post.title;
    let newContent = body.content ? body.content : post.content;

    const edit = {
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

  static async filter(text) {
    return await PostModel.find({ $text: { $search: text } }).sort({ date: -1 });
  }

  static async readFilter(text) {
    return await PostModel.find({ $text: { $search: text } }.sort({ date: -1 }));
  }
}

module.exports = Post;
