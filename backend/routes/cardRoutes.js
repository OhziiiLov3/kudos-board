const express = require('express');
const router = express.Router();
const cardController =  require('../controllers/cardController');


// Routes -> /api/cards
router.post('/:spaceId/cards', cardController.createCard); // POST-> create a new card for space
router.get('/:spaceId/cards', cardController.getAllCards); // GET -> get all cards from board
router.patch('/:spaceId/cards/:cardId/votes', cardController.upvoteCard); // GET a specific card by ID within a space
router.delete('/:spaceId/cards/:cardId',  cardController.deleteCard); // Delete Card



module.exports = router;