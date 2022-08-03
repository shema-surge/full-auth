const { asyncHandler } = require('./asyncHandler')
const userModel = require('../models/users')
const { createResetToken } = require('../controllers/auth')

function requestReset(){
    return asyncHandler( async(req,res,next)=>{
    const user = await userModel.findById(req.session.user.user_id)
    const token = await createResetToken(user)
    next()
})}

module.exports = {requestReset}