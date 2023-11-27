const path = require('path');
const express = require('express');
const router = express.Router();

const userController = require(path.resolve(
  __dirname, '..', 'controllers', 'userController')
);

router.post('/', userController.create);
router.get('/', userController.readAll);
router.get('/:id', userController.readById);
router.post('/login', userController.login);
router.post('/edit/:id', userController.update);

module.exports = router;