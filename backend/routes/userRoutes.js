const express = require('express');
const bcrypt = require('bcryptjs');
const User = require("../models/User")
const router = express.Router();
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')



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



router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    
    if (!user) {
        return res.status(400).json({ message: "User is not registered" });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    
    if (!validPassword) {
        return res.status(401).json({ message: "Password is incorrect" });
    }
    
    const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.cookie('token', token, { httpOnly: true, maxAge: 36000 });

   
    return res.status(200).json({ status: true, message: "Login successfully" });
});

router.post('/forgot-password',async(req,res) =>{
    const {email} = req.body;
    try {
        const user = await User.findOne({email})
        if(!user){
            return res.json({message : "user not registered"})
        }


        const token = jwt.sign({id: user._id},process.env.JWT_SECRET,{expiresIn :'5m'})
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'oshadaov@gmail.com',
              pass: 'nqrqtwclwzeesio'
            }
          });
          
          var mailOptions = {
            from: 'oshadaov@gmail.com',
            to: email,
            subject: 'Reset Pasword',
            text: `http://localhost:3000/forgetpassword/${token}`
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
             return res.json({ message : "error sending email "})
            } else {
                return res.json({status : true , message : "email sent"})

            }
          });
    } catch (error) {
    console.log(error);
          
    }
})


module.exports = router