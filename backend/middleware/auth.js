const jwt = require('jsonwebtoken')
const { jwtSecret } = require('../secretdata/secret')
module.exports = function (req, res, next) {
    const token = req.headers['x-auth-token']
    if (!token) {
        return res.json({ error: 'No token ,authorization denied' })
    }

    const decode = jwt.verify(token, jwtSecret);
    req.user = decode.user


    next()
}