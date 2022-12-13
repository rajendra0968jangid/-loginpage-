const mongoose = require('mongoose');
const loginData = mongoose.Schema({
    username:String,
    password:String
})

module.exports=mongoose.model('loginData',loginData);