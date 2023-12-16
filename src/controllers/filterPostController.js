const { response } = require('express');
const Post = require('../models/postModel');

exports.filterPosts = async (req, res) => {
    const { text } = req.params;

    try {
        const posts = await Post.filter(text);
        console.log('Consulta bem-sucedida. Posts encontrados:', posts);
        return res.status(200).send(posts);

    } catch (error) {
        console.error('Erro ao buscar os posts:', error);
        res.status(500).json({ error: 'Erro ao buscar os posts!' });
    }
};

exports.filterAllPosts = async (req, res) => {
    const { text } = req.params;

    try {
        const posts = await Post.readAll();
        console.log('Consulta bem-sucedida. Posts encontrados:', posts);
        return res.status(200).send(posts);

    } catch (error) {
        console.error('Erro ao buscar os posts:', error);
        res.status(500).json({ error: 'Erro ao buscar os posts!' });
    }
};
