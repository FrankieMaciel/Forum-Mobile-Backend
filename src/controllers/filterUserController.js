const User = require('../models/userModel');

exports.filterUsers = async (req, res) => {
  const { username } = req.params;

  try {
    const users = await User.filter(username);
    console.log('Consulta bem-sucedida. Users encontrados:', users);
    
    return res.status(200).send(users);
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar usuários.' });
  }
};

exports.filterAllUsers = async (req, res) => {
  const { username } = req.params;

  try {
    const users = await User.readAll();
    console.log('Consulta bem-sucedida. Users encontrados:', users);
    
    return res.status(200).send(users);
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar usuários.' });
  }
};
