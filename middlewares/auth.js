const {asyncHandler} = require('../middlewares/asyncHandler')
const {Unauthorized,NotFound} = require('http-errors')
const userModel = require('../models/users')

function authenticated(){
    return asyncHandler(async (req,res,next)=>{
        if(!req.session || !req.session.user) throw new Unauthorized('Please log in')
        const record = await userModel.findOne({_id:req.session.user.user_id})
        if(!record) throw new Unauthorized('This account no longer exists')
        if(!req.session.user.user_active){ throw new Unauthorized('This account is not activated')}
        next()
    })
}

module.exports = {authenticated}