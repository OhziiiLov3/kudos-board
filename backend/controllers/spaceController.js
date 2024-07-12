// const { PrismaClient } = require("@prisma/client");
// const prisma = new PrismaClient();
const SpaceModel = require("../models/space");
const UserModel = require("../models/user");
// create a new space
const createSpace = async (req, res) => {
  const { title, category, stickerUrl, authorId } = req.body;
  console.log("Request body:", req.body);
  console.log("Author ID:", authorId);
  try {
    const user = await UserModel.findUserById(authorId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const space = await SpaceModel.createSpace({
      title,
      category,
      authorId,
      stickerUrl,
      author: user.username,
    });
    res.json(space);
  } catch (error) {
    console.error("Error creating space:", error);
    res.status(500).json({ error: error.message });
  }
};

// get all spaces
const getSpaces = async (req, res) => {
  const { category, title, author } = req.query;
  try {
    const filters = { category, title, author };
    spaces = await SpaceModel.getAllSpaces(filters);
    console.log(spaces);
    res.json(spaces);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get space by Id
const getSpaceById = async (req, res) => {
  const { id } = req.params;
  try {
    const space = await SpaceModel.getSpaceById(id);
    if (!space) {
      return res
        .status(404)
        .json({ error: `Space with ID ${space_id} not found` });
    }
    res.json(space);
  } catch (error) {
    console.error("Error fetching space:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// delete Space
const deleteSpace = async (req, res) => {
  const { id } = req.params;
  try {
    const space = await SpaceModel.deleteSpace(id);
    res.json(space);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  createSpace,
  getSpaces,
  getSpaceById,
  deleteSpace,
};
