const path = require('path');
const express = require('express');
const router = express.Router();

const userRoutes = require(path.resolve(__dirname, 'userRouter'));

router.use('/user', userRoutes);

module.exports = router;