const CommentModel = require("../models/comment");
const UserModel = require("../models/user");

// Add comment to card
const addComment = async (req, res) => {
  const { cardId } = req.params;
  const { content} = req.body;
  
  // if (!content || !authorId) {
  //   return res.status(400).json({ error: "Content and authorId are required" });
  // }
  const authorId = req.user.user_id
  console.log("Auhtor", authorId);
  try {
    const user = await UserModel.findUserById(authorId);
    console.log("user",user);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const comment = await CommentModel.addComment(
      cardId,
      content,
      authorId
    );
    console.log("Comment Created:", comment)
    res.json(comment);
  } catch (error) {
    res.status(500).json({ error: "Error fetching comments" });
  }
};

// get all comments
const getAllComments = async (req, res) => {
  const { cardId } = req.params;
  console.log(`Fetching comments for cardId: ${cardId}`);
  try {
    const comments = await CommentModel.getAllComments(cardId);
    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: "Error fetching comments" });
  }
};

// delete comment
const deleteComment = async (req, res) => {
  const { commentId } = req.params;
  try {
    const comment = await CommentModel.deleteComment(commentId);
    res.json(comment);
  } catch (error) {
    res.status(500).json({ error: "Error adding comment" });
  }
};

module.exports = {
  addComment,
  getAllComments,
  deleteComment,
};
