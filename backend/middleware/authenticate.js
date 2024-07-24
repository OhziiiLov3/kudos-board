const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
require('dotenv').config();


const authenticate = async (req,res, next)=>{
const token = req.headers.authorization?.split(" ")[1];
if (!token) {
    return res.status(401).json({ error: 'Access denied' });
}

try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const user = await prisma.user.findUnique({
        where: {user_id: decoded.userId}
    });
    if (!user) {
        return res.status(401).json({ error: 'User not found' });
    }
    req.user = user; // Attach user to request object for further use
    next();
} catch (error) {
    if (error.name === 'TokenExpiredError') {
        return res.status(401).json({ error: 'Token expired' });
    }
    console.error('Authentication error:', error);
    res.status(401).json({ error: 'Invalid token' });   
}
};


module.exports = authenticate;