const express = require('express')
const session = require('express-session')
require('dotenv').config()

const {connectToMongo} = require('./utils/connect.js')

const app = express()

connectToMongo()

app.use(express.json())
app.use(session({
    secret: 'hello',
    resave: false,
    saveUninitialized: false,
    cookies:{
        maxAge:10*100*1000,
        httpOnly:true
    }
}))

app.use('/signup',require('./routes/signup'))
app.use('/activate',require('./routes/activate'))
app.use('/login',require('./routes/login'))
app.use('/passwordReset',require('./routes/passwordReset'))
app.use('/users',require('./routes/user'))

app.listen(process.env.PORT,()=>{
    console.log(`Server listening on port ${process.env.PORT}`)
})