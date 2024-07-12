require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require("../models/user");
require('dotenv').config();

const SECRET_KEY = process.env.SECRET_KEY;




// Get user detials 

const getCurrentUser = async (req,res) =>{
 try {
    const userId = req.user.user_id;
    const user = await UserModel.findUserById(userId);
    if(!user){
        console.log('User not found:', req.user.user_id);
     return res.status(404).json({ error: 'User not found' })
    }
    res.json({
        user_id: user.user_id,
        email: user.email,
        username: user.username,
    });
 } catch (error) {
    console.error('Error fetching current user:', error);
    res.status(500).json({ error: 'Internal server error' });
 }
};


const register = async (req,res) =>{
 const {email, username,password} = req.body;

 try {
    const hashPassword = await bcrypt.hash(password,10);
    const user = await UserModel.createUser({
        email,
        username,
        password: hashPassword
    });
    res.status(201).json(user);
 } catch (error) {
    res.status(400).json({ error: 'Email already in use' });
 }
};


const login = async (req,res) =>{
const {email, password} = req.body;
try {
    const user = await UserModel.findUserByEmail(email);
    if(!user){
        return res.status(401).json({error: 'Invalid credentials'})
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

    const token = jwt.sign({ userId: user.user_id, email: user.email }, SECRET_KEY, { expiresIn: '1h' })
    console.log("Generate Token:", token);
    res.json({user_id: user.user_id,token});

} catch (error) {
    res.status(500).json({ error: 'Internal server error' }); 
}
};


const logout = async (req, res) => {
    res.clearCookie('token'); 
    res.json({ message: 'Logout successful' });
  };
  
  






module.exports = {
    getCurrentUser,
    register,
    login,
    logout
}


