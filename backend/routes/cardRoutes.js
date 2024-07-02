const express = require('express');
const router = express.Router();
const cardController =  require('../controllers/cardController');


// Routes -> /api/cards
router.post('/:spaceId/cards', cardController.createCard);
router.get('/:spaceId/cards', cardController.getAllCards);




module.exports = router;