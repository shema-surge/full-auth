const express = require('express')
const bcrypt = require('bcrypt')
const {NotFound,BadRequest,Unauthorized} = require('http-errors')

const { asyncHandler } = require('../middlewares/asyncHandler')
const userModel = require('../models/users')

const router = express.Router()

router.post('/',asyncHandler(async (req,res)=>{
    const record = await userModel.findOne({email:req.body.email})
    if(!record) throw new NotFound(`No account with email: ${req.body.email}`)
    const valid = await bcrypt.compare(req.body.password,record.password)
    if(!valid) throw new BadRequest('Wrong username or password')
    const session = {
        user_id:record._id,
        user_email:record.email,
        user_active:record.active,
        user_role:record.role
    }
    req.session.user=session
    res.json({message:'Logged in Successfully'})

}))

module.exports = router