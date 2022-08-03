const {NotFound} = require('http-errors')
const mongoose = require('mongoose')

const { asyncHandler } = require('../middlewares/asyncHandler')
const user = require('../models/users')
const { createActivationToken } = require('./auth')

function createUser(){
    return asyncHandler( async (req,res)=>{
        console.log('hello')
        const record = await user(req.body).save()
        const token = await createActivationToken(record)
        res.json({data:record,token:token})
    })
}

//These routes are 
function getUsers(){
    return asyncHandler( async (req,res)=>{
        const record = await user.find()
        if(!record){
            throw new NotFound('No records available')
        }
        res.json({data:record})
    })
}
function getUser(){
    return asyncHandler( async (req,res)=>{
        const record = await user.findById(req.params.id)
        if(!record){
            throw new NotFound(`No record with id: ${req.params.id}`)
        }
        res.json({data:record})
    })
}
function deleteUser(){
    return asyncHandler( async (req,res)=>{
        const record = await user.findByIdAndDelete(req.params.id)
        res.json({data:record})
    })
}

module.exports = {getUsers,getUser,createUser,deleteUser}