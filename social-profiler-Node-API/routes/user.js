const express = require('express');

const userController = require('../controllers/user');

const router = express.Router();

//create New User
router.post('/signup', userController.postAddUser);

//Login with existing user
router.post('/login', userController.loginUser);

module.exports = router;
