const express = require('express');
const path = require('path');
const router = express.Router();
const filterPostController = require('../controllers/filterPostController');

const tokenMiddleware = require(path.resolve(
  __dirname, '..', 'middlewares', 'tokenMiddleware')
);

TM = tokenMiddleware.isAuthenticated;

router.get('/:text', TM, filterPostController.filterPosts);
router.get('/', TM, filterPostController.filterAllPosts);


module.exports = router;