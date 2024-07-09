const CommentModel = require('../models/comment');

// Add comment to card 
const addComment = async (req,res) =>{
 const {cardId} = req.params;
 const {content, auhtor} = req.body;
 try {
    const comment = await CommentModel.addComment(cardId, content, auhtor);
    res.json(comment);
 } catch (error) {
    res.status(500).json({ error: 'Error fetching comments' });
 }
};

// get all comments 
const getAllComments = async (req, res) =>{
const {cardId} = req.params;
try {
    const comments = await getAllComments(cardId);
    res.json(comments);
} catch (error) {
    res.status(500).json({ error: 'Error fetching comments' });
}
};

module.exports ={
    addComment,
    getAllComments
}