const express = require('express')
const { asyncHandler } = require('../middlewares/asyncHandler')
const userModel = require('../models/users')
const { createActivationToken } = require('../controllers/auth')

const router = express.Router()

router.post('/',asyncHandler( async (req,res)=>{
    console.log('hello')
    const record = await userModel(req.body).save()
    const token = await createActivationToken(record)
    res.json({data:record,token:token})
}))

module.exports = router