const express = require('express')
const User = require('../models/User')
var bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const auth = require('../middleware/auth')
const { jwtSecret } = require('../secretdata/secret')
const { check, validationResult } = require('express-validator')
const router = express.Router()
// login user 
// @path /auth
// @type post
// @access public
router.post('/', [
    check('email', 'Please enter valid email').trim().not().isEmpty().isEmail(),
    check('password', 'Please enter minimum 6 characters').trim().not().isEmpty().isLength({ min: 6 }),
], async (req, res) => {
    const errors = validationResult(req)
    if (errors.array().length > 0) {
        return res.status(400).json({ errors: errors.array() })
    } else {
        try {
            const { email, password } = req.body
            const user = await User.findOne({ email })
            if (!user) {
                return res.json({ error: "Invalid credentials" })
            }
            const passwordCheck = bcrypt.compareSync(password, user.password);
            if (!passwordCheck) {
                return res.json({ error: "Invalid credentials" })
            }
            const payload = {
                user: {
                    id: user.id
                }
            }
            const token = await jwt.sign(payload, jwtSecret, { expiresIn: 3600000 })
            return res.json({ token })

        } catch (error) {
            return res.status(500).json({ error: "Server error" })
        }
    }
})
// get user for loading
// @path /auth
// @type get
// @access private
router.get('/', auth, async (req, res) => {
    const user = await User.findOne({ _id: req.user.id }).select('-password -__v')
    res.send(user)
})
module.exports = router