const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();


const addComment = async (cardId, content, author) =>{
 try {
    const comment = await prisma.comment.create({
        data: {
            content,
            author,
            card:{
              connect: {card_id: parseInt(cardId)}  , // cardId is the ID of an existing card
            }
        }
    });
    return comment;
 } catch (error) {
    throw new Error('Error adding comment');
 }
};


const getAllComments = async (cardId) =>{
    
    try {
    console.log(`Fetching comments from database for cardId: ${cardId}`);
    const comments = await prisma.comment.findMany({
        where: {card_id: parseInt(cardId)},
        orderBy : { createdAt: 'asc'}
    });
    return comments;
} catch (error) {
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