const express = require('express');

const authController = require('../controllers/auth');

const router = express.Router();

const { check } = require('express-validator');

router.get('/login', authController.getLogin);

router.get('/signup', check('email').isEmail().withMessage('Please enter a valid email.'), authController.getSignup);

router.post('/login', check('email').isEmail().withMessage('Please enter a valid email.'), authController.postLogin);

router.post('/signup', authController.postSignup);

router.post('/logout', authController.postLogout);

router.get('/reset', authController.getReset);

router.post('/reset', authController.postReset);

router.get('/reset/:token', authController.getNewPassword);

router.post('/new-password', authController.postNewPassword);


module.exports = router;