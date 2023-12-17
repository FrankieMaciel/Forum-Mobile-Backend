const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');
const validator = require('validator');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  profileURL: { type: String, default: '/default_2.png' },
  score: { type: Number, default: 0 }
});

const UserModel = mongoose.model('User', UserSchema);

const sys = {
  maxPasswordLen: 20,
  minPasswordLen: 8,
};

class User {
  constructor(body) {
    this.body = body;
    this.errors = [];
    this.user = null;
  }

  async validate(validateMode) {
    this.cleanUp();

    if (!this.body.password) {
      this.errors.push(
        'Ah senha provavelmente é undefined'
      );
      return;
    }

    const isPasswordValid = this.body.password.length <= sys.maxPasswordLen &&
      this.body.password.length >= sys.minPasswordLen;

    const user = await UserModel.findOne({ email: this.body.email });

    if (!isPasswordValid) this.errors.push(
      `A senha deve possuir entre ${sys.minPasswordLen} e ${sys.maxPasswordLen} caracteres!`
    );
    if (validateMode === 'login') return user;

    const hasName = await UserModel.findOne({ username: this.body.username });
    const isEmailValid = validator.isEmail(this.body.email);

    if (!isEmailValid) this.errors.push(
      'Email inválido!'
    );
    if (hasName) this.errors.push(
      'Nome de usuário indisponível!'
    );
    if (user) this.errors.push(
      'Usuário já cadastrado!'
    );
  }

  async register() {
    this.validate('register');
    if (this.errors.length > 0) return;

    const salt = bcryptjs.genSaltSync();
    this.body.password = bcryptjs.hashSync(this.body.password, salt);

    let number = Math.ceil(Math.random() * 3);
    this.body.profileURL = `/default_${number}.png`;

    this.user = await UserModel.create(this.body);
  }

  async login() {
    let user = await this.validate('login');
    if (this.errors.length > 0) return;

    if (!user) {
      this.errors.push('Usuário não cadastrado!');
      return;
    }
    this.user = user;

    if (!bcryptjs.compareSync(this.body.password, this.user.password)) {
      this.errors.push('Senha inválida!');
      this.user = null;
      return;
    }
  }

  static async readAll() {
    return await UserModel.find().sort({ score: -1, name: 1 });
  }

  static async readById(id) {
    if (typeof id !== 'string') return;
    const user = await UserModel.findById(id);
    return user;
  }

  static async update(id, body) {
    if (typeof id !== 'string') return;

    let user = await UserModel.findById(id);
    console.log(body);

    let newUsername = body.username ? body.username : user.username;
    let newUserProfile = body.ProfileUrl ? body.ProfileUrl : user.ProfileUrl;
    let newEmail = body.email ? body.email : user.email;
    let newPassword = body.password ? body.password : user.password;
    let newScore = body.score ? body.score : user.score;

    const edit = {
      username: newUsername,
      ProfileUrl: newUserProfile,
      email: newEmail,
      password: newPassword,
      score: newScore
    };
    user = await UserModel.findByIdAndUpdate(id, edit, { new: true });
    return user;
  }

  static async filter(username) {
    return await UserModel.find({ username: new RegExp(username, 'i') });
  }

  static async delete(id) {
    if (typeof id !== 'string') return;
    const user = await UserModel.findByIdAndDelete(id);
    return user;
  }

  cleanUp() {
    for (const key in this.body)
      if (typeof this.body[key] !== 'string') this.body[key] = '';

    this.body = {
      username: this.body.username,
      email: this.body.email,
      password: this.body.password
    };
  }
}

module.exports = User;