const path = require('path');
const express = require('express');
const router = express.Router();

const userRoutes = require(path.resolve(__dirname, 'userRouter'));
const postRouter = require(path.resolve(__dirname, 'postRouter'));

router.use('/user', userRoutes);
router.use('/posts', postRouter);

module.exports = router;