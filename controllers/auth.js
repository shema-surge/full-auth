const {v4:uuid} = require('uuid')
const redis = require('redis')
const {BadRequest} = require('http-errors')
const userModel = require('../models/users')

const redisClient = redis.createClient()
const ttl = 60*60*5

async function redisConnect(){
    await redisClient.connect()
}

redisConnect()

async function createActivationToken(user){
    try{
        const token = uuid()
        let tokenData = {
            id:user._id,
            email:user.email,
            type:'activation'
        }
        await redisClient.setEx(token,ttl,JSON.stringify(tokenData))
        return token
    }catch(err){
        console.error(err)
    }
}

async function checkActivationToken(token){
    try{
        const tokenData = await redisClient.get(token)
        if(!tokenData || !tokenData.type==='activation') throw new Error('Invalid activation token')
        return tokenData
    }catch(err){
        console.error(err)
    }
}

async function createResetToken(user){
    try{
        const token = uuid()
        let tokenData = {
            id:user._id,
            email:user.email,
            type:'reset'
        }
        await redisClient.setEx(token,ttl,JSON.stringify(tokenData))
        return token
    }catch(err){
        console.error(err)
    }
}

async function checkResetToken(token){
    try{
        const tokenData = await redisClient.get(token)
        if(!tokenData || !tokenData.type==='reset') throw new Error('Invalid reset token')
        return tokenData
    }catch(err){
        console.error(err)
    }
}

module.exports= {createActivationToken,checkActivationToken,createResetToken,checkResetToken}