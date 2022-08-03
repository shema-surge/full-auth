const { Router } = require('express')
const {NotFound} = require('http-errors')
const bcrypt = require('bcrypt')


const { asyncHandler } = require('../middlewares/asyncHandler')
const { requestReset } = require('../middlewares/requestReset')
const userModel = require('../models/users')
const {checkResetToken } = require('../controllers/auth')
const { authenticated } = require('../middlewares/auth')

const router = Router()

router.route('/:token').post(authenticated(),requestReset(),asyncHandler( async(req,res)=>{
    const userInfo = JSON.parse(await checkResetToken(req.params.token))
    if(!userInfo) throw NotFound('This account does not exist')
    const newPassword = await bcrypt.hash(req.body.password,10)
    await userModel.findByIdAndUpdate(userInfo.id,{password: newPassword})
}))

module.exports = router