// const { PrismaClient } = require("@prisma/client");
// const prisma = new PrismaClient();
const SpaceModel = require("../models/space");

// create a new space
const createSpace = async (req, res) => {
  const { title, category, author } = req.body;
  console.log(req.body);
  try {
    const space = await SpaceModel.createSpace({ title, category, author });
    res.json(space);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// get all spaces
const getSpaces = async (req, res) => {
  const { category, title, author} = req.query;
  try {
    const filters = {category, title, author}; 
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
