const express = require('express');
const router = express.Router();
const filterUserController = require('../controllers/filterUserController');

router.get('/:username', filterUserController.filterUsers);

module.exports = router;
