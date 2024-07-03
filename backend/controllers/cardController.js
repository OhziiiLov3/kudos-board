const CardModel = require('../models/card');

// create a new space
const createCard = async (req, res) => {
    const { title, author, message, gifUrl} = req.body;
    const {spaceId} = req.params; 
    try {
      const card = await CardModel.createCard({ title, message, author, gifUrl, spaceId: parseInt(spaceId) });
      res.json(card);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  

//  GET all cards 
const getAllCards = async (req, res) =>{
    const {spaceId} = req.params; 
 try {
    const cards = await CardModel.getAllCards(spaceId);
    res.json(cards);
 } catch (error) {
    res.status(500).json({ error: error.message });
 }
}


// Patch a specific card by ID within a space (if needed)
const upvoteCard =  async(req, res) =>{
  const {cardId} = req.params;
  try {
    const card = await CardModel.upvoteCard(cardId);
    res.json(card);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteCard = async(req,res) =>{
 const {cardId} = req.params;
 try {
    await CardModel.deleteCard(cardId);
    res.json({message: 'Card deleted'})
 } catch (error) {
    res.status(500).json({ error: error.message });
 }
}

// DELETE -> delate a care 

  module.exports = {
    createCard,
    getAllCards,
    upvoteCard,
    deleteCard,
  }