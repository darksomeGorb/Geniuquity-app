let axios = require('axios')
let signature = require('../../services/sign')
let Ref = require('../../models/ref.models')

exports.ift = async(req,res) =>{
    console.log("ift")
    let body = req.body
    let ref = await getRef()
    body.transfer.reference = ref
    body.transfer.description = `${body.transfer.description}/${ref}`
  
    let sign = signature.sign(`${body.source.accountNumber}${body.transfer.amount}KES${body.transfer.reference}`)
    sendTransaction(req,sign,body,res)
}

exports.mobile = async(req,res) =>{
    console.log('mobile')
    let body = req.body
    let sign
    let ref = await getRef()
    body.transfer.reference = ref
    body.transfer.description = `${body.transfer.description}/${ref}`
    if(body.destination.walletName == 'Equitel'){
        sign = signature.sign(`${req.params.accountNumber}${body.transfer.amount}KES${body.transfer.reference}`)
    }else{
       let key = `${body.transfer.amount}KES${body.transfer.reference}${req.params.accountNumber}` 
       sign = signature.sign(key)
    }
    sendTransaction(req,sign,body,res)
}

exports.eft = async(req,res) => {
    console.log("eft")
    let body = req.body  
    let ref = await getRef()
    body.transfer.reference = ref
    body.transfer.description = `${body.transfer.description}/${ref}`
    let sign = signature.sign(`${body.transfer.reference}${body.source.accountNumber}${body.destination.accountNumber}${body.transfer.amount}${body.destination.bankCode}`)    
    sendTransaction(req,sign,body,res)
}

exports.pesalink = async(req,res) => {
    console.log("pesalink")
    let body = req.body  
    let ref = await getRef()
    body.transfer.reference = ref
    body.transfer.description = `${body.transfer.description}/${ref}`
    let sign = signature.sign(`${body.transfer.amount}${body.transfer.currencyCode}${body.transfer.reference}${body.destination.name}${body.source.accountNumber}`)
    sendTransaction(req,sign,body,res)
}
exports.b2b = async(req,res) => {
    console.log("b2b")
    let body = req.body  
    let ref = await getRef()
    body.transfer.reference = ref
    body.transfer.description = `${body.transfer.description}/${ref}`
    let sign = signature.sign(`${body.transfer.amount}${body.transfer.currencyCode}${body.transfer.reference}${body.destination.name}${body.source.accountNumber}`)
    sendTransaction(req,sign,body,res)
}

exports.rtgs = async(req,res) => {
    console.log('rtgs')
    let body = req.body
    let ref = await getRef()
    body.transfer.reference = ref
    body.transfer.description = `${body.transfer.description}/${ref}`
    let sign = signature.sign(`${body.transfer.reference}${body.transfer.date}${body.source.accountNumber}${body.destination.accountNumber}${body.transfer.amount}`)
    sendTransaction(req,sign,body,res)
}

exports.swift = async(req,res) =>{
    console.log("swift")
    let body = req.body
    let ref = await getRef()
    body.transfer.reference = ref
    body.transfer.description = `${body.transfer.description}/${ref}`
    let sign = signature.sign(`${body.transfer.reference}${body.transfer.date}${body.source.accountNumber}${body.destination.accountNumber}${body.transfer.amount}`)
    sendTransaction(req,sign,body,res)
}

async function sendTransaction(req,sign,body,res){     
    if(!sign){
        res.status(300).send({ error : "signing error"});
        return;
     }
     
     let account = req.account
 
     let config = {
         method: 'POST',
         url: `${process.env.JENGAURL}transaction/v2/remittance`,
         headers: {
             'Authorization': `Bearer ${account.token}`,
             'signature': sign,
             'Content-Type': 'application/json'
         },
         data : body
     } 
     
     try{
         let data = await axios(config)
         if(data.data.status != undefined){
            if(data.data.status == 'SUCCESS'){
                res.send({ message : "Transaction successful"})
                return
            }else if(data.data.response_msg != undefined){
               if(data.data.response_code === 400101|| data.data.response_code === "400101"){
                  sendTransaction(req,sign,body,res)
                  return
               } 
               res.status(300).send({ error : data.data.response_msg });
            }else{
                res.status(300).send({ error : `Transaction failed ${JSON.stringify(data.data)}`});
                return
            }
         }else{
             res.status(300).send({ error : `Could not do transaction ! Try again later ${JSON.stringify(data.data)}`})
             return
         }
      }catch(err){
        if(err.response.data != undefined){
            res.status(300).send({ error : `${JSON.stringify(err.response.data)}`});
            return
          }
         res.status(300).send({ error : `Could not do transaction ! Try again later ${JSON.stringify(err)}`});
      }
}


function getRef(){
  return new Promise((resolve)=>{
       Ref.find({},(err,refs)=>{
           console.log(refs)
           if(err) return null
           let num 
           if(refs.length > 0){
             let ref = refs[0]
             console.log(`num b4 = ${ref.number}`)
             num = Number(ref.number) + 1
             console.log(`new num = ${num}`)
             refs[0].number = Number(num)
             refs[0].save()
           } else{
             num = Number(100000000000)
             let ref = new Ref()
             ref.number = Number(num)+1
             ref.save()
           }
           
           resolve(`${num}`) 
       })
  })
}