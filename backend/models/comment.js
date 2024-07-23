const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();


const addComment = async (cardId, content, authorId) =>{
 try {
    const comment = await prisma.comment.create({
        data: {
            content,
            author: {connect:{user_id:  authorId}},
            card:{
              connect: {card_id: parseInt(cardId)}  , // cardId is the ID of an existing card
            }
        }
    });
    console.log("Added Comment ->", comment);
    return comment;
 } catch (error) {
    console.error("Error adding comment:", error);
    throw new Error('Error adding comment');
 }
};


const getAllComments = async (cardId) =>{
    
    try {
    console.log(`Fetching comments from database for cardId: ${cardId}`);
    const comments = await prisma.comment.findMany({
        where: {card_id: parseInt(cardId)},
        include: {author: true},
        orderBy : { createdAt: 'asc'}
    });
    console.log("Get Comments", comments);
    return comments;
} catch (error) {
    console.error("Error fetching comments:", error);
    throw new Error('Error fetching comments');
}
};


const deleteComment = async (commentId) => {
    try {
        const deletedComments = await prisma.comment.delete({
            where: {comment_id: parseInt(commentId)}
        });
        return deletedComments;
    } catch (error) {
     throw new Error('Error deleting comment');
    }
}


module.exports = {
    addComment,
    getAllComments,
    deleteComment
}