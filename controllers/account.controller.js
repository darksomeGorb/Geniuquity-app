const Account = require('../models/account.model')

exports.all = (req,res) =>{
   Account.find({},(err,accounts)=>{
      if (err) {
         res.status(500).send({ error: `Error Getting accounts ! ${err}` });
       }else{
         res.send(accounts)
       }
   })
}

exports.create = (req,res) =>{
  let account = new Account({
    username : req.body.username,
    password : req.body.password,
    name : req.body.name,
    description : req.body.description,
    key : req.body.key,
    accountNumber : req.body.accountNumber,
    holderName: req.body.holderName
  })

  account.save(err=>{
   if (err) {
      res.status(500).send({ error: `Not Saved ! ${err}` });
    }else{
      res.send({ message : 'Account Created successfully'})
    }
    
  })
}


exports.account = (req,res) =>{
  Account.findById(req.params.id,(err,account)=>{
     if(err){
        res.status(500).send({ error: `Account Not Found ! ${err}` })
     }else{
        res.send(account);
     }
  })
}

exports.update = (req,res) =>{
  Account.findOneAndUpdate({_id : req.params.id},{$set : req.body},(err,account)=>{
     if(err){
        res.status(500).send({ error: `Account Not Updated ! ${err}` });
     }else{
        res.send({ message : 'Account updated !'})
     }
  })
}

exports.delete = (req,res) =>{
  Account.findOneAndDelete({_id : req.params.id},(err)=>{
     if(err){
        res.status(500).send({ error: `Account Not Deleted! ${err}` });
     }else{
        res.send({ message : 'Account deleted !'})
     }
  })
}

