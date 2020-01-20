const mongoose = require('mongoose')
const Schema = mongoose.Schema


let AccountSchema = new Schema({
     username : {
         type : String , required : true
     },
     password:{
        type : String, required : true
     },
     key : {
         type : String , required : true
     },
     name : {
         type : String, required : true
     },
     accountNumber :{
        type : String, required : true
     },
     description :{
         type : String , required : true
     },
     holderName: {
         type: String, required: true
     },
     token :{
         type : String, default : ""
     },
     tokenExpire : {
         type : String, default : ""
     }
})

module.exports = mongoose.model('Account',AccountSchema)
