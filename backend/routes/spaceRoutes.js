const express = require('express');
const router = express.Router();
const spaceController = require('../controllers/spaceController');
const authenticate = require('../middleware/authenticate');



// Routes -> /api/spaces
router.post('/spaces', authenticate, spaceController.createSpace);
router.get('/spaces', spaceController.getSpaces);
router.get('/spaces/:id',authenticate, spaceController.getSpaceById);
router.delete('/spaces/:id', authenticate,spaceController.deleteSpace);


module.exports = router;