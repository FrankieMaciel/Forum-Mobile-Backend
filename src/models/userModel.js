const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');
const validator = require('validator');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  ProfileUrl: { type: String, default: '/img/emojii1.png' },
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

    const isEmailValid = validator.isEmail(this.body.email);
    const isPasswordValid = this.body.password.length < sys.maxPasswordLen || 
                            this.body.password.length > sys.minPasswordLen;

    const user = await UserModel.findOne({ email: this.body.email });
    const hasName = await UserModel.findOne({ username: this.body.username });

    if (!isEmailValid) this.errors.push(
      'Email inválido!'
    );
    if (isPasswordValid) this.errors.push(
      'A senha deve possuir entre 8 e 20 caracteres!'
    );

    if (validateMode === 'login') return user;

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

    let number = Math.ceil(Math.random() * 4);
    this.body.ProfileUrl = `/img/emojii${number}.png`;

    this.user = await UserModel.create(this.body);
  }

  async login() {
    user = this.validate('login');
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