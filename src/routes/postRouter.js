const path = require('path');
const express = require('express');
const router = express.Router();

const postController = require(path.resolve(
  __dirname, '..', 'controllers', 'postController')
);

router.post('/', postController.create);
router.get('/', postController.readAll);
router.get('/delete/:id', postController.destroy);
router.post('/edit/:id', postController.editPost);
router.get('/user/:id', postController.readByUser);

module.exports = router;