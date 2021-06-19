// dependencies
const express = require('express');
const router = express.Router();


const controller = require('../controllers/authController');



router.post('/signup',controller.postSignup);


module.exports = router;