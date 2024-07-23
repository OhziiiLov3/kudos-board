const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authenticate = require('../middleware/authenticate');

// User registeration 
router.post('/register',  userController.register);
// User Login/logut
router.post('/login', userController.login);
router.post('/logout', userController.logout);

 // get user details
router.get('/current-user', authenticate, userController.getCurrentUser);
// New route for fetching user details by ID
router.get('/users/:id', authenticate, userController.getUserById);
module.exports = router;