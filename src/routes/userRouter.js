const path = require('path');
const express = require('express');
const router = express.Router();

const userController = require(path.resolve(
  __dirname, '..', 'controllers', 'userController')
);

const tokenMiddleware = require(path.resolve(
  __dirname, '..', 'middlewares', 'tokenMiddleware')
);

const multer = require(path.resolve(__dirname, '..', 'lib', 'multer'));

TM = tokenMiddleware.isAuthenticated;

router.post('/', userController.create);
router.get('/',TM, userController.readAll);
router.get('/:id',TM, userController.readById);
router.post('/login', userController.login);
router.post('/edit/:id',TM, userController.update);
router.post('/profilePicture/:id',TM, multer.parser.single('pf-picture'), userController.ChangeProfile);
router.get('/profilePicture/:id',TM, userController.SendProfile);
router.get('/delete/:id',TM, userController.destroy);

module.exports = router;