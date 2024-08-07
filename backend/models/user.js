const {PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient();


const createUser = async (data) => {
 return prisma.user.create({data});
};

const findUserByEmail = async (email)=>{
    return prisma.user.findUnique({
        where: {email}
    })
}

const findUserById = async (userId)=>{
    return prisma.user.findUnique({
        where: {user_id: userId},
    });
}






module.exports = {
    createUser,
    findUserByEmail,
    findUserById
}