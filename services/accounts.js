var moment = require('moment');
require('dotenv').config()
const qs = require('qs')
let axios = require('axios')
let Account = require('../models/account.model')
exports.getKeys = (accs) =>{
    accs.forEach(acc =>{
        getKey(acc)           
    })
}

async function getKey(account){
     let expireString = account.tokenExpire

     if(expireString != undefined && expireString != ""){
         let now = moment()
         let expire = moment(expireString)
        
         if(now.minutes(5).isAfter(expire)){
             console.log("fetch new")
         }else{
           console.log("token fine")
           return
        }
     }

   try{
     let data = {
        username : account.username,
        password : account.password
      }
    
      //generating bearer token
      let config = {
        method: 'post',
        url: `${process.env.JENGAURL}identity/v2/token`,
        data: qs.stringify(data),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Basic ${account.key}`
        }
      }
      
      let response = await axios(config)
      account.token = response.data.access_token
      account.tokenExpire = moment().minutes(45).format()
      return  new Promise(resolve => {
        account.save( err => {
          if (err) {
             console.log(`Error saving token account ${account}`)
             resolve(false)
          }else{
            console.log("saved token")
            console.log(account)
            resolve(account.token)
          }
        })
      })
       
  }catch(err){
    console.log(err)
    return false
  }
}

exports.checkToken = async (req,res,next) =>{
   let account = await getAccount(req.params.accountNumber)

   if(account == false || account == undefined){
     res.status(300).send({ error : 'Error fetching account try login out'})
     return
   }
  
   let expireString = account.tokenExpire 

   if(expireString != undefined && expireString != ""){
    let now = moment()
    let expire = moment(expireString)
 
    if(now.minutes(5).isAfter(expire)){
        console.log("fetch new")
        let token = await getKey(account)
        account.token = token
        req.account = account
        next()
    }else{
      req.account = account
      console.log("original key")
      next()
     }
   }else{
      console.log("fetch new")
      let token = await getKey(account)
      account.token = token
      req.account = account
      next()
   }
   
}

  let getAccount = (accountNumber)=>{
      return new Promise(resolve =>{
          Account.findOne({ accountNumber : accountNumber },(err,acc)=>{
            if(err){
               resolve(false)
            }else{
               resolve(acc)
            }
          })   
      })
  }

  exports.getAccount = getAccount

