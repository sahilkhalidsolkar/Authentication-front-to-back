const express = require('express')
const cors = require('cors')
const userRegistration = require('./routes/UserRegistration')
const auth = require('./routes/auth')
const connection = require('./connection')
const app = express()
const port = 5000
// connect to db
connection()

// middlewares
app.use(express.json())
app.use(cors())
//-------------

// endpoint routes 
app.use('/user', userRegistration)
app.use('/auth', auth)


// port for running the app
app.listen(port, (req, res) => {
    console.log(`your server is running on port ${port}`)
})