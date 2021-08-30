const express = require('express')
const User = require('../models/User')
var bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { jwtSecret } = require('../secretdata/secret')
const { check, validationResult } = require('express-validator')
const router = express.Router()
// @path /user
// @desc to register user to database
// @access public
router.post('/', [
    check('name', 'Please enter your name').trim().bail().not().bail().isEmpty(),
    check('email', 'Please enter valid email').trim().bail().not().bail().isEmpty().bail().isEmail(),
    check('password', 'Please enter minimum 6 characters').trim().bail().not().bail().isEmpty().bail().isLength({ min: 6 }),
    check('phone', 'Please enter your phone no').trim().bail().not().bail().isEmpty(),
    check('country', 'Please enter a valid country name').trim().bail().not().bail().isEmpty()


], async (req, res) => {

    const errors = validationResult(req)
    if (errors.array().length > 0) {
        return res.status(406).json({ errors: errors.array() })
    } else {
        try {
            const { name, email, password, phone, country } = req.body
            const user = await User.findOne({ email: email }).exec();
            if (!user) {
                const user = new User({
                    name,
                    email,
                    phone,
                    country
                })
                const salt = bcrypt.genSaltSync(10);
                const hashPassword = bcrypt.hashSync(password, salt);
                user.password = hashPassword
                await user.save()

                const payload = {
                    user: {
                        id: user.id
                    }
                }
                const token = jwt.sign(payload, jwtSecret, { expiresIn: 3600000 })
                return res.json({ token })

            } else {
                return res.status(406).json({ error: "User already exists" })
            }
        } catch (error) {
            return res.status(406).json({ error: "User already exists" })
        }

    }



})

module.exports = router