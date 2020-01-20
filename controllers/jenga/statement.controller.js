let axios = require('axios')
let signature = require('../../services/sign')

exports.ministatement = async (req,res) =>{
    console.log('ministatement')
    let account = req.account
    let sign = signature.sign(`KE${req.params.accountNumber}`)
    
    if(!sign){
       res.status(300).send({ error : "signing error"});
       return;
    }
    
    let config = {
        method: 'GET',
        url: `${process.env.JENGAURL}account/v2/accounts/ministatement/KE/${req.params.accountNumber}`,
        headers: {
            'Authorization': `Bearer ${account.token}`,
            'signature': sign
        }
    }   
    try{
       let data = await axios(config)
       console.log(data.data)
       if(data.data.transactions != undefined){
          res.send(data.data)
       }else{
           res.status(300).send({ error : "Could not fetch Mini statement "+JSON.stringify(data.data)});
       }
    }catch(err){
        if(err.response.data != undefined){
            res.status(300).send({ error : `Could not get ministatement \n ${JSON.stringify(err.response.data)}`});
            return
          }
       res.status(300).send({ error : `Could not fetch mini statement ! Try again later ${JSON.stringify(err)}`});
    }
}

exports.fullstatement = async (req,res) => {
    console.log("full statement")
    let account = req.account
    
    let st = `${req.params.accountNumber}KE${req.body.toDate}`
    let sign = signature.sign(st)
    
    if(!sign){
       res.status(300).send({ error : "signing error"});
       return;
    }
    
    let config = {
        method: 'POST',
        url: `${process.env.JENGAURL}account/v2/accounts/fullstatement`,
        headers: {
            'Authorization': `Bearer ${account.token}`,
            'signature': sign,
            'Content-Type': 'application/json'
        },
        data : req.body
    }   
  
    try{
       let response = await axios(config)
       if(response.data.transactions != undefined){
          res.send(response.data)
       }else{
           console.log(response.data)
           res.status(300).send({ error : "Could not full statement "+JSON.stringify(response.data)});
       }
    }catch(err){
        if(err.response.data != undefined){
            res.status(300).send({ error : `Could not get full statement \n ${JSON.stringify(err.response.data)}`});
            return
          }
       res.status(300).send({ error : `Could not fetch  statement ! Try again later ${JSON.stringify(err)}`});
    }
}

//get the balnce from account
exports.balance = async (req,res) =>{
    console.log("BALANCE")
    let account = req.account
    let sign = signature.sign(`KE${req.params.accountNumber}`)
    
    if(!sign){
       res.status(300).send({ error : "signing error"});
       return;
    }
    
    let config = {
        method: 'GET',
        url: `${process.env.JENGAURL}account/v2/accounts/balances/KE/${req.params.accountNumber}`,
        headers: {
            'Authorization': `Bearer ${account.token}`,
            'signature': sign
        }
    }   
   
    try{
       let data = await axios(config)
        
       if(data.data.currency != undefined){
          res.send(data.data)
       }else{
           res.status(300).send({ error : "Could not fetch balance"});
       }
    }catch(err){
        if(err.response.data != undefined){
            res.status(300).send({ error : `Could not get balance \n ${ JSON.stringify(err.response.data)}`});
            return
          }
       res.status(300).send({ error : `Could not fetch balance ! Try again later ${err}`});
    }
}



