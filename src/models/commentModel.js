const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  profileURL: { type: String, required: true },
  userID: {type: String, required: true}
});

const CommentSchema = new mongoose.Schema({
  user: { type: UserSchema, required: true },
  postId: {type: String, required: true},
  content: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

CommentSchema.index(
  { content: 'text' },
  { default_language: 'pt', weights: { title: 2, content: 1 } }
);

const CommentModel = mongoose.model('Comment', CommentSchema);

class Comment {
  constructor(body) {
    this.body = body;
    this.errors = [];
    this.comment = null;

    this.create();
  }

  async create() {
    try {
      this.comment = new CommentModel(this.body);
      await this.comment.save();
      console.log('Post salvo com sucesso:', this.comment);
    } catch (error) {
      console.error('Erro ao criar ou salvar o post:', error);
      this.errors.push(error.message);
    }
  }

  static async readAll() {
    return await CommentModel.find().sort({ date: -1 });
  }

  static async readByUser(userName) {
    if (typeof userName !== 'string') return;
    const comments = await CommentModel.find({ 'user.name': userName }).sort({ date: -1 });
    return comments;
  }

  static async update(id, body) {
    if (typeof id !== 'string') return;

    const comment = await CommentModel.findById(id);

    let newContent = body.content ? body.content : comment.content;

    const edit = {
      content: newContent
    };
    await CommentModel.findByIdAndUpdate(id, edit, { new: true });
  }

  static async delete(id) {
    if (typeof id !== 'string') return;
    const comment = await CommentModel.findByIdAndDelete(id);
    return comment;
  }

  static async findPostsComment(postID) {
    if (typeof postID !== 'string') return;
    const comments = await CommentModel.find({ postId: postID }).sort({ date: -1 });
    return comments;
  }
}

module.exports = Comment;
