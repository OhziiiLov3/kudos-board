const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();


const addComment = async (cardId, content, author) =>{
 try {
    const comment = await prisma.comment.create({
        data: {
            content,
            author,
            card_id: parseInt(cardId)
        }
    });
    return comment;
 } catch (error) {
    throw new Error('Error adding comment');
 }
};


const getAllComments = async (cardId) =>{
try {
    const comments = await prisma.comment.findMany({
        where: {card_id: parseInt(cardId)},
        orderBy : { createdAt: 'asc'}
    });
    return comments;
} catch (error) {
    throw new Error('Error fetching comments');
}
};


module.exports = {
    addComment,
    getAllComments
}