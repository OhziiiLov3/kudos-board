const { PrismaClient } = require("@prisma/client");
const { connect } = require("../routes/cardRoutes");
const prisma = new PrismaClient();

// POST -> Create a card
const createCard = async ({
  title,
  authorId,
  message,
  author,
  gifUrl,
  spaceId,
}) => {
  try {
    const card = await prisma.card.create({
      data: {
        title,
        message,
        gifUrl,
        author: {connect:{user_id:  authorId}},
        space: {
          connect: { space_id: parseInt(spaceId) }, // spaceId is the ID of an existing space
        },
      },
    });
    return card;
  } catch (error) {
    throw new Error(`Error creating card: ${error.message}`);
  }
};

// GET -> all cards from Space
const getAllCards = async (spaceId) => {
  return prisma.card.findMany({
    where: {
      space_id: parseInt(spaceId),
    },
    orderBy: {
      createdAt: "desc", // or 'desc' for descending order
    },
  });
};

// GET -> votes for card
const upvoteCard = async (id) => {
  return await prisma.card.update({
    where: { card_id: parseInt(id) },
    data: { upvotes: { increment: 1 } },
  });
};

// DELETE Card
const deleteCard = async (id) => {
  return await prisma.card.delete({
    where: { card_id: parseInt(id) },
  });
};

module.exports = {
  createCard,
  getAllCards,
  upvoteCard,
  deleteCard,
};
