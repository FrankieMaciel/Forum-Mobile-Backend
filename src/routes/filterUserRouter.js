const express = require('express');
const path = require('path');
const router = express.Router();
const filterUserController = require('../controllers/filterUserController');

const tokenMiddleware = require(path.resolve(
  __dirname, '..', 'middlewares', 'tokenMiddleware')
);

TM = tokenMiddleware.isAuthenticated;

router.get('/:username', TM, filterUserController.filterUsers);
router.get('/', TM, filterUserController.filterAllUsers);

module.exports = router;
