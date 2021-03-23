const mongoose = require('mongoose')
const Schema = mongoose.Schema
const itemSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

module.exports = item = mongoose.model('users',itemSchema)