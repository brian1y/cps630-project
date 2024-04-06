const express = require('express')

const router = express.Router()

const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

const createToken = (_id) => {
    return jwt.sign({_id}, 'sdfslkdfjlwkejlnqvnenqppeoe', { expiresIn: '3d' })
}


// login route
router.post('/login', async (req, res) => {
    const {username,password} = req.body

    try {
        const user = await User.login(username, password)

        // create token
        const token = createToken(user._id)

        res.status(200).json({username, token})
    } catch (error) {
        res.status(400).json({ error: error.message })
    }

})

// sign up route
router.post('/signup', async (req, res) => {

    const { username, password } = req.body
    try {
        const user = await User.signup(username, password)

        // create token
        const token = createToken(user._id)

        res.status(200).json({username, token})
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

module.exports = router