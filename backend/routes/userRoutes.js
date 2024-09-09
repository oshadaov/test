const express = require('express');
const bcrypt = require('bcryptjs');
const User = require("../models/User")
const router = express.Router();
const jwt = require('jsonwebtoken')

router.post('/signUp', async (req, res) => {
    try {
        const { username, email, password } = req.body;
    
       
        if (!username || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            username,
            email,
            password: hashedPassword,
        });

        if (user) {
            res.status(201).json({
                _id: user._id,
                username: user.username,
                email: user.email,
            });
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});



router.post('/login', async(req,res) => {
    const {email,password} = req.body;
    const user = await User.findOne({email})
    if(!user) {
        return res.json({message : "user is not registered"})
    }


    const validPassword = await bcrypt.compare(password,user.password)
        if(!validPassword){
            return res.json({message : "password is incorrect"})
    }
    
    const token = jwt.sign({username : user.username},process.env.JWT_SECRET,{expiresIn:'1h'})
    res.cookie('token',token,{httpOnly :true,maxAge :36000});
    return res.json({status:true,message : "login successfully"})

})

module.exports = router