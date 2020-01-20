const User = require('../models/user.model')
const Account = require('../models/account.model')
exports.all = (req,res) =>{
   User.find({},(err,users)=>{
      if (err) {
         res.status(500).send({ error: `Error Getting users ! ${err}` });
       }else{
         setAccounts(users,res)
       }
   })
}

exports.create = (req,res) =>{
  let user = new User({
    username : req.body.username,
    password : getPassword(req.body.password),
    admin : req.body.admin || false,
    accounts: req.body.accounts,
    name: req.body.name,
    number : req.body.number
  })

  user.save(err=>{
   if (err) {
      res.status(500).send({ error: `Not Saved ! ${err}` });
    }else{
      res.send({ message : 'User Created successfully'})
    }
    
  })
}

exports.user = (req,res) =>{
   User.findById(req.params.id,(err,user)=>{
      if(err){
         res.status(500).send({ error: `User Not Found ! ${err}` })
      }else{
         res.send(user);
      }
   })
}

exports.update = (req,res) =>{
   User.findOneAndUpdate({_id : req.params.id},{$set : req.body},(err,user)=>{
      if(err){
         res.status(500).send({ error: `User Not Updated ! ${err}` });
      }else{
         res.send({ message : 'User updated !'})
      }
   })
}

exports.delete = (req,res) =>{
   User.findOneAndDelete({_id : req.params.id},(err)=>{
      if(err){
         res.status(500).send({ error: `User Not Deleted! ${err}` });
      }else{
         res.send({ message : 'User deleted !'})
      }
   })
}


//encrypt password
function getPassword(password){
   return password;
}

async function setAccounts(users,res){
   
   for(var k = 0;k<users.length;k++){
      for(var i = 0;i < users[k].accounts.length;i++){
         let account = await getAccount(users[k].accounts[i])   
         if(account != null){
            users[k].accounts[i]= { name : account.name , accountNumber : account.accountNumber }
         }
      }
   }

   res.send(users);
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