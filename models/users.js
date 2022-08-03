const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = mongoose.Schema({
    firstName:{
        type:String,
        required:[true,"Please provide a firstname"]
    },
    lastName:{
        type:String,
        required:[true,"Please provide a lastname"]
    },
    email:{
        type:String,
        unique:true,
        required:[true,"Please provide an Email"]
    },
    password:{
        type:String,
        unique:true,
        required:[true,"Please provide a password"]
    },
    active:{
        type:Boolean,
        default:false
    },
    role:{
        type:String,
        enum:["investor","founder"],
        default:"investor"
    }
})

userSchema.pre('save', async function(next) {
    if (this.isModified('password')){
      const hash = await bcrypt.hash(this.password, 10)
      this.password = hash 
    }
    next() 
})

const userModel = mongoose.model('user',userSchema)

module.exports = userModel