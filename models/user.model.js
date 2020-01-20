const mongoose = require('mongoose')
const Schema = mongoose.Schema


let UserSchema = new Schema({
     username : {
         type : String , required : true
     },
     password:{
           type : String, required : true
     },
     admin : {
         type : Boolean , default : false
     },
     accounts : [
         {
             type : String
         }
     ],
     name:{
         type:String , required: true
     },
     code : {
         type : String , default : ""
     },
     response : {
         type: String, default : ""
     },
     number : {
         type : String, required : true
     }
})

module.exports = mongoose.model('User',UserSchema)
