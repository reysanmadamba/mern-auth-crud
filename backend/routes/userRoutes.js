const express = require('express')
const router = express.Router()
const User = require('../models/User.js')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        


        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Someone own this email already!' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        })

        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' })

    }

    catch (err) {
        res.status(500).json({ error: err.message })
    }
})

router.post('/login', async (req, res) => {

    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User not found' })
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid password' })
        }


        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' })

        res.json({
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        })
    }

    catch (err) {
        res.status(400).json({ error: err.message })

    }

})



//for test
// router.get('/test', (req, res) => {
//     res.status(200).json({ message: 'Test route working!' });
// });




const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer')) {
        return res.status(401).json({ message: 'No token provided'})
    }
    
    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded;
        next();
    }
    catch (er) {
        return res.status(401).json({ message: 'Invalid Token'})
    }
}


router.get('/profile', verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        res.json(user)
    }
    catch (err) {
        res.status(400).json({ message: 'Error retrieving profile' })
    }
})





module.exports = router;