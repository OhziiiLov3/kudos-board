require('dotenv').config();


const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require("../models/user");

const SECRET_KEY = process.env.SECRET_KEY;


const register = async (req,res) =>{
 const {email, password} = req.body;

 try {
    const hashPassword = await bcrypt.hash(password,10);
    const user = await UserModel.createUser({
        email,
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

    const token = jwt.sign({userId: user.user_id}, SECRET_KEY, {expiresIn: '1h'});
    res.json(token);

} catch (error) {
    res.status(500).json({ error: 'Internal server error' }); 
}
};


const logout = async (req, res) => {
    res.clearCookie('token'); 
    res.json({ message: 'Logout successful' });
  };
  
  






module.exports = {
    register,
    login,
    logout
}


