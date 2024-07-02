const {PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient();



// Create a card 
const createCard =  async({title, author, message, gifUrl, spaceId}) =>{
    try {
        const card = await prisma.card.create({
            data:{
              title,
              message,
              author,
              gifUrl,
              space:{
                  connect :{space_id: spaceId} // spaceId is the ID of an existing space
              }
            }
           });
           return card
    } catch (error) {
        throw new Error(`Error creating card: ${error.message}`);
    }
 
};
// GET => all cards from Space 
const getAllCards = async (spaceId) =>{
    return prisma.card.findMany({
        where: {
            space_id: parseInt(spaceId),
        }
    });
}









module.exports = {
    createCard,
    getAllCards,
}