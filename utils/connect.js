const { connect } = require('mongoose')
require('dotenv').config()

function connectToMongo(){
    connect(process.env.MONGO_URI).then(()=>{console.log('Connected to MongoDB')}).catch((err)=>{console.log(err)})
}

module.exports = { connectToMongo }