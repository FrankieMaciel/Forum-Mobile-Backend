const express = require('express');
const router = express.Router();
const filterPostController = require('../controllers/filterPostController');

router.get('/:text', filterPostController.filterPosts);


module.exports = router;