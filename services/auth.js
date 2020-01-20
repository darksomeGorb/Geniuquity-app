const fs = require('fs')
const User = require('../models/user.model')
const Account = require('../models/account.model')
const accountsService = require('../services/accounts')
const auth_key = fs.readFileSync('services/auth.key', 'utf-8')
const sms = require('./sms')

exports.middleware = (req,res,next) =>{
    if(req.headers.auth == undefined){
       res.status(300).send({ error : "Not authorized" })
       return
    }
    let key = req.headers.auth
    
    if(auth_key.trim() != key.trim()){
        res.status(300).send({ error : "Not authorized" })
        return
    }
    next()
}

exports.login = (req,res)=>{
     
     if(req.body.username === undefined || req.body.password == undefined
        || req.body.username === '' || req.body.password === ''){
            res.status(300).send({"error": "Invalid Credentials"})
     }else{
         
     User.findOne({ username : req.body.username},(err,user)=>{
        if(err || user === null){
            res.status(300).send({"error": "Invalid Credentials"})
            return
        }
        if(req.body.password === user.password){
          try{
            getAccounts(user,res)
          }catch(err){
            res.status(500).send({"error": "Internal server error"})
          }
        }else{
           res.status(300).send({"error": "Invalid Credentials"})
        }
       })  
     }

}


async function getAccounts(user,res){
   let response = {}
   response.auth = auth_key
   response.name = user.name
   response.admin = user.admin
   response.accounts = []

   for(var i = 0;i < user.accounts.length;i++){
      let account = await getAccount(user.accounts[i])   
      if(account != null){
          response.accounts.push(account)
      }
   }
   
   var val = Math.floor(1000 + Math.random() * 9000);
   
   
   user.code = val
   user.response = JSON.stringify(response)
   user.save(async err=>{
       if(err){
           console.log(err)
       }else{
           let bool = await sms.send(user.number,`Your Login code is ${val}`)
          if(bool){
              res.send({ message : "Code sent to your phone " });
           }else{
              res.status(300).send({ error : "error sending code"}) 
           }
       }
   })
   accountsService.getKeys(response.accounts)
}


async function getAccount(accountNumber){
   return new Promise((resolve)=>{
      Account.findOne({ accountNumber : accountNumber},(err,account)=>{
          if(err || account == null){
              resolve(null) 
          }else{
              resolve(account)
          }
      })
   });
}


exports.codeLogin = (req,res) => {
    User.findOne({ username : req.body.username},(err,user)=>{
        if(err || user === null){
            res.status(300).send({"error": "Invalid Credentials"})
            return
        }
        if(req.body.code === user.code){
            res.send(JSON.parse(user.response))
        }else{
           res.status(300).send({"error": "Invalid Credentials"})
        }
       })  
 }
