const {PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient();



// Create a space 
const createSpace = async(data) =>{
return prisma.space.create({data});
}


// get all Spaces
const getAllSpaces = async (filters)=>{
let where = {};

 if(filters.category){
    where.category = {contains : filters.category}
}
 if(filters.title){
    where.title = {contains : filters.title}
}
 if(filters.author){
    where.author = {contains : filters.author}
}

return prisma.space.findMany({
    where: Object.keys(where).length  ? where : undefined,
})
};

// get space by Id
const getSpaceById = async(id) =>{
 return prisma.space.findUnique({
    where: {space_id:parseInt(id)}
 });
}

// delete space (by Id)
const deleteSpace = async (id) =>{
    return prisma.space.delete({where:{space_id:parseInt(id)}});
}




module.exports = {
    getAllSpaces,
    createSpace,
    getSpaceById,
    deleteSpace
}