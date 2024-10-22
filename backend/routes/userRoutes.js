const express = require('express');
const bcrypt = require('bcryptjs');
const User = require("../models/User");
const router = express.Router();
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

// SIGN UP ROUTE
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

// LOGIN ROUTE
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

// FORGOT PASSWORD ROUTE
router.post('/forgotPassword', async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.json({ message: "User not registered" });
        }
    
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '15m' });
        
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_PASS
            }
        });
    
        var mailOptions = {
            from: 'oshadaov@gmail.com',
            to: email,
            subject: 'Reset Password',
            text: `http://localhost:3000/auth/resetPassword/${token}`
        };
    
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                return res.json({ message: "Error sending email" });
            } else {
                return res.json({ status: true, message: "Email sent" });
            }
        });
    } catch (error) {
        console.error(error);
        return res.json({ message: "Internal server error" });
    }
});

// RESET PASSWORD (Update password after validation)
router.post('/resetPassword/:token', async (req, res) => {
    try {
        const { token } = req.params;
        const { newPassword } = req.body;

        if (!newPassword) {
            return res.status(400).json({ message: 'New password is required' });
        }

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Find the user by the decoded token's id
        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();

        // Success message
        res.status(200).json({ message: "Password updated successfully" });
    } catch (error) {
        console.error("Password reset error:", error);
        return res.status(400).json({ message: "Error updating password" });
    }
});

// TOKEN VALIDATION ROUTE (for Reset Password)
router.get('/resetPassword/:token', async (req, res) => {
    try {
        const { token } = req.params;
        const decoded = jwt.verify(token, process.env.JWT_SECRET);  // Verify token

        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(400).json({ message: "Invalid or expired token" });
        }

        // Token is valid
        res.status(200).json({ message: "Token is valid. Proceed to reset password", userId: user._id });
    } catch (error) {
        return res.status(400).json({ message: "Invalid or expired token" });
    }
});




const verifyUser =async (req,res,next)=>{
    try {  
        const token = req.cookies.token;
        if(!token){
            return res.jsom({status:false,message:"no token"})
        
    }  
    const decoded = await jwt.verify(token, process.env.JWT_SECRET)
    next()
   } 
catch (error) {
        return res.json(error)
    }
  
    
}


router.get('/verify',verifyUser, (req,res)=>{
return res.json({status:true, message:"authorized"})
})


router.get("/logout",(req,res)=>{
    res.clearCookie('token')
    return res.json({status:true})
})


module.exports = router;
