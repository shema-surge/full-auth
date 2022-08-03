const { Router } = require('express')
const { asyncHandler } = require('../middlewares/asyncHandler')
const userModel = require('../models/users')
const { checkActivationToken } = require('../controllers/auth')

const router = Router()

router.post('/:token',asyncHandler( async(req,res)=>{
    console.log({token:req.params.token})
    const userInfo = JSON.parse(await checkActivationToken(req.params.token))
    console.log(userInfo)
    const updatedRecord = await userModel.findByIdAndUpdate(userInfo.id,{active:true},{new:true})
    console.log(updatedRecord)
    res.json({message:'Account Activated sussefully'})
}))

module.exports = router