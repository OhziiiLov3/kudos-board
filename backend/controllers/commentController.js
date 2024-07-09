const CommentModel = require('../models/comment');

// Add comment to card 
const addComment = async (req,res) =>{
 const {cardId} = req.params;
 const {content, author} = req.body;
 try {
    const comment = await CommentModel.addComment(cardId, content, author);
    res.json(comment);
 } catch (error) {
    res.status(500).json({ error: 'Error fetching comments' });
 }
};

// get all comments 
const getAllComments = async (req, res) =>{
const {cardId} = req.params;
console.log(`Fetching comments for cardId: ${cardId}`);
try {
    const comments = await CommentModel.getAllComments(cardId);
    res.json(comments);
} catch (error) {
    res.status(500).json({ error: 'Error fetching comments' });
}
};

// delete comment 
const deleteComment = async (req,res) =>{
    const {commentId} = req.params;
    try {
        const comment = await CommentModel.deleteComment(commentId);
        res.json(comment);
    } catch (error) {
        res.status(500).json({ error: 'Error adding comment' });
    }
}

module.exports ={
    addComment,
    getAllComments,
    deleteComment
}