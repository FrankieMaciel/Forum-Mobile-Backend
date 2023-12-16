const path = require('path');
const express = require('express');
const router = express.Router();

const postController = require(path.resolve(
  __dirname, '..', 'controllers', 'postController')
);

const tokenMiddleware = require(path.resolve(
  __dirname, '..', 'middlewares', 'tokenMiddleware')
);

TM = tokenMiddleware.isAuthenticated;

router.post('/',TM, postController.create);
router.get('/',TM, postController.readAll);
router.get('/delete/:id',TM, postController.destroy);
router.post('/edit/:id',TM, postController.editPost);
router.get('/user/:username',TM, postController.readByUser);

module.exports = router;