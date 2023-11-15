const path = require('path');
const express = require('express');
const router = express.Router();

const userController = require(path.resolve(
  __dirname, '..', 'controllers', 'userController')
);

router.post('/', userController.create);

module.exports = router;