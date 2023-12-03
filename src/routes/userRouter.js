const path = require('path');
const express = require('express');
const router = express.Router();

const userController = require(path.resolve(
  __dirname, '..', 'controllers', 'userController')
);

const tokenMiddleware = require(path.resolve(
  __dirname, '..', 'middlewares', 'tokenMiddleware')
);

TM = tokenMiddleware.isAuthenticated;

router.post('/', userController.create);
router.get('/',TM, userController.readAll);
router.get('/:id',TM, userController.readById);
router.post('/login', userController.login);
router.post('/edit/:id',TM, userController.update);

module.exports = router;