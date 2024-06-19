const express = require('express');
const router = express.Router();
const spaceController = require('../controllers/spaceController');



// Routes -> /api/spaces

router.post('/spaces', spaceController.createSpace);
router.get('/spaces', spaceController.getSpaces);


module.exports = router;