let axios = require('axios')
let signature = require('../../services/sign')



exports.account = async (req,res) => {
    console.log('Query Account')
    let body = req.body
    let sign = signature.sign(`KE${req.params.accountNumber}`)
    
    if(!sign){
       res.status(300).send({ error : "signing error"});
       return;
    }
    
    let account = req.account
   
    let config = {
        method: 'GET',
        url: `${process.env.JENGAURL}account/v2/search/KE/${body.accountNumber}`,
        headers: {
            'Authorization': `Bearer ${account.token}`,
            'signature': sign,
            'Content-Type': 'application/json'
        },
     } 

     try{
        let data = await axios(config)
        if(data.data.account != undefined){
            res.send(data.data)
        }else if(data.data.response_msg != undefined){
            res.status(300).send({ error : `Could not query account \n ${data.data.response_msg}` });
        }else{
            res.status(300).send({ error : `Could not query account ${JSON.stringify(data.data)}`});
        } 
     }catch(err){
        if(err.response.data != undefined){
            res.status(300).send({ error : `Could not query account \n ${JSON.stringify(err.response.data)}`});
            return
          }
        res.status(300).send({ error : `Could not query account ! Try again later ${JSON.stringify(err)}`});
     }
    
}


exports.openclose = async (req,res) => {
    let account = req.account
    let sign = signature.sign(`${account.accountNumber}KE${req.body.date}`)

    if(!sign){
        res.status(300).send({ error : "signing error"});
        return
    }
   
    let config = {
        method: 'POST',
        url: `${process.env.JENGAURL}account/v2/accounts/accountbalance/query`,
        headers: {
            'Authorization': `Bearer ${account.token}`,
            'signature': sign,
            'Content-Type': 'application/json'
        },
        data : req.body
     } 

     try{
        let data = await axios(config)
        if(data.data.balances != undefined){
            res.send(data.data)
        }else if(data.data.response_msg != undefined){
            res.status(300).send({ error : `Could not fetch balances \n ${data.data.response_msg}` });
        }else{
            res.status(300).send({ error : `Could not fetch balances ${JSON.stringify(data.data)}`});
        } 
     }catch(err){
        if(err.response.data != undefined){
            res.status(300).send({ error : `Could not fetch balances \n ${JSON.stringify(err.response.data)}`});
            return
          }
        res.status(300).send({ error : `Could not fetch balances ${JSON.stringify(err)}`});
     }
    
}

exports.kyc = async (req,res) =>{
    console.log("KYC")
    let account = req.account
    let sign = signature.sign(`${account.username}${req.body.identity.documentNumber}KE`)

    if(!sign){
        res.status(300).send({ error : "signing error"});
        return
    }
   
    let config = {
        method: 'POST',
        url: `${process.env.JENGAURL}/customer/v2/identity/verify`,
        headers: {
            'Authorization': `Bearer ${account.token}`,
            'signature': sign,
            'Content-Type': 'application/json'
        },
        data : req.body
     } 

     try{
        let data = await axios(config)
        if(data.data.identity != undefined){
            res.send(data.data)
        }else if(data.data.response_msg != undefined){
            res.status(300).send({ error : `Could not fetch Identity \n ${data.data.response_msg}` });
        }else{
            res.status(300).send({ error : `Could not fetch identity ${JSON.stringify(data.data)}`});
        } 
     }catch(err){
        if(err.response.data != undefined){
            res.status(300).send({ error : `Could not fetch Identity \n ${JSON.stringify(err.response.data)}`});
            return
          }
        res.status(300).send({ error : `Could not fetch Identity ${JSON.stringify(err)}`});
     }
}

exports.credit = async (req,res) =>{
    console.log("credit")
    let account = req.account
    let sign = signature.sign(`${req.body.customer[0].dateOfBirth}${account.username}${req.body.customer[0].identityDocument.documentNumber}`)

    if(!sign){
        res.status(300).send({ error : "signing error"});
        return
    }
   
    let config = {
        method: 'POST',
        url: `${process.env.JENGAURL}customer/v2/creditinfo`,
        headers: {
            'Authorization': `Bearer ${account.token}`,
            'signature': sign,
            'Content-Type': 'application/json'
        },
        data : req.body
     } 

     try{
        let data = await axios(config)
        if(data.data.Person != undefined || data.data.person != undefined){
            res.send(data.data)
        }else if(data.data.response_msg != undefined){
            res.status(300).send({ error : `Could not fetch credit score \n ${data.data.response_msg}` });
        }else{
            res.status(300).send({ error : `Could not fetch credit score${JSON.stringify(data.data)}`});
        } 
     }catch(err){
        if(err.response.data != undefined){
            res.status(300).send({ error : `Could not fetch credit score\n ${JSON.stringify(err.response.data)}`});
            return
          }
        res.status(300).send({ error : `Could not fetch credit score ${JSON.stringify(err)}`});
     }
}