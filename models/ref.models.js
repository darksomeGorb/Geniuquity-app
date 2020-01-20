const mongoose = require('mongoose')
const Schema = mongoose.Schema


let RefSchema = new Schema({
     number : {
         type : Number, required : true
     }
})

module.exports = mongoose.model('Ref',RefSchema)
