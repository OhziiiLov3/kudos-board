const CardModel = require('../models/card');

// create a new space
const createCard = async (req, res) => {
    const { title, author, message, gifUrl} = req.body;
    const {spaceId} = req.params; 
    console.log(req.body);
    try {
      const card = await CardModel.createCard({ title, message, author, gifUrl, spaceId: parseInt(spaceId) });
      console.log(card);
      res.json(card);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  

//   get all cards 
const getAllCards = async (req, res) =>{
    const {spaceId} = req.params; 
 try {
    const cards = await CardModel.getAllCards(spaceId);
    res.json(cards);
 } catch (error) {
    res.status(500).json({ error: error.message });
 }
}



  module.exports = {
    createCard,
    getAllCards
  }