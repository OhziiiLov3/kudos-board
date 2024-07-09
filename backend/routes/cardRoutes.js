const express = require('express');
const router = express.Router();
const cardController =  require('../controllers/cardController');
const commentController =  require('../controllers/commentController');


// Routes -> /api/cards
router.post('/:spaceId/cards', cardController.createCard); // POST-> create a new card for space
router.get('/:spaceId/cards', cardController.getAllCards); // GET -> get all cards from board
router.patch('/:spaceId/cards/:cardId/votes', cardController.upvoteCard); // GET a specific card by ID within a space
router.delete('/:spaceId/cards/:cardId',  cardController.deleteCard); // Delete Card

// comments -> /api/cards/
router.post('/:spaceId/cards/:cardId/comments', commentController.addComment); // POST -> create new comment 
router.get('/:spaceId/cards/:cardId/comments', commentController.getAllComments); // GET -> Get all comments 
router.delete('/:spaceId/cards/:cardId/comments/:commentId', commentController.deleteComment) // DELETE -> delete comment



module.exports = router;