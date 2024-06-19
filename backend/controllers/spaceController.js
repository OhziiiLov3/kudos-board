const {PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient();


// create a new space
const createSpace = async (req,res) => {
    const {title, category, author} = req.body;
    console.log(req.body);
 try {
    const space = await prisma.space.create({
        data: {title, category, author}
    });
    res.json(space);
 } catch (error) {
    res.status(500).json({error: error.message});
 }
}

// get all spaces 

const getSpaces = async (req, res)=>{
    try {
        const spaces = await prisma.space.findMany()
        res.json(spaces);
        console.log(spaces);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}


module.exports = {
    createSpace,
    getSpaces
}