const express = require('express');
const path = require('path');
const router = express.Router();
const commentController = require('../controllers/commentController');

const tokenMiddleware = require(path.resolve(
  __dirname, '..', 'middlewares', 'tokenMiddleware')
);

TM = tokenMiddleware.isAuthenticated;

router.post('/',TM, commentController.create);
router.get('/',TM, commentController.readAll);
router.get('/delete/:id',TM, commentController.destroy);
router.post('/edit/:id',TM, commentController.editPost);
router.get('/user/:id',TM, commentController.readByUser);
router.get('/post/:id',TM, commentController.findPostsComment);

module.exports = router;
