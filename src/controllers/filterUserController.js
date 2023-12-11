const User = require('../models/userModel');

exports.filterUsers = async (req, res) => {
  const { username } = req.params;

  try {
    const users = await User.find({ username: new RegExp(username, 'i') });
    console.log('Consulta bem-sucedida. Users encontrados:', users);
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar usuários.' });
  }
};
