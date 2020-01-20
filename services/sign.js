const crypto = require('crypto')
const fs = require('fs')
const private_key = fs.readFileSync('services/key.pem', 'utf-8')

//File to be signed
exports.sign = (package)=>{
   try{
    if(package == undefined){
        res.status(300).send({error : "Field package is missing !"})
        return
    }
    //Signing
    const signer = crypto.createSign('sha256');
    signer.update(package);
    signer.end();
    const signature = signer.sign(private_key)
    const buff = new Buffer(signature);
    const base64data = buff.toString('base64');

    return base64data
   }catch(err){
       console.log(err)
       return false
   }
}

