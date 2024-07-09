const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');


// User registeration 
router.post('/register',  userController.register);
// User Login/logut
router.post('/login', userController.login);
router.post('/logout', userController.logout);




module.exports = router;