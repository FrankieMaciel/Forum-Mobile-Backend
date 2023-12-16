const path = require('path');
const express = require('express');
const router = express.Router();

const userRoutes = require(path.resolve(__dirname, 'userRouter'));
const postRouter = require(path.resolve(__dirname, 'postRouter'));
const commentRouter = require(path.resolve(__dirname, 'commentRouter'));
const filterPostsRouter = require(path.resolve(__dirname,'filterPostRouter'));
const filterUserRouter = require(path.resolve(__dirname,'filterUserRouter'));
const LocalizationRouter = require(path.resolve(__dirname,'localizationRouter'));

router.use('/users', userRoutes);
router.use('/posts', postRouter);
router.use('/comments', commentRouter);
router.use('/filterPosts',filterPostsRouter);
router.use('/filterUsers',filterUserRouter);
router.use('/localizations', LocalizationRouter);

module.exports = router;