const express = require('express')
const router = express.Router()
const User = require('../models/User.js')
const bcrypt = require('bcryptjs')
const jwt = require('jwtwebtoken')

router.post('/register', async (req, res) => {
    try {
        const {username, email, password} = req.body;

       

        const existingUser = await User, findOne({ email });
        if (existingUser) {
            return res.status(400).json({message: 'Email already in user'});
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        })

        await newUser.save();

        res.status(201).json({ message: 'User registered successfully'})
        
    }

    catch (err) {
        res.status(500).json({error: err.message})
    }
})

router.post('./login', async (req, res) => {

    try {
        const {email, password} = req.body;

        const user = await User, findOne({email});
        if (!user) {
            return res.status(400).json({message: 'User not found'})
        }

        const isMatch = await bcrypt.compare(passwordm user.password);
        if (!isMatch) {
            return res.status(400).json()
        }
    }



})