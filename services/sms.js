let axios = require('axios')
let qs = require('qs')
const config = {
    apiKey: 'e3931ded9d3549f13ed93062f71a15ab46b9f7ac42dea7c07c646815fc500053',         // use your sandbox app API key for development in the test environment
    username: 'gen',      // use 'sandbox' for development in the test environment
};



exports.send = async (number,message) =>{
    let data = {
        username : config.username,
        to : number,
        message : message
    }   

    let request = {
        url : "https://api.africastalking.com/version1/messaging",
        method : "post",
        data: qs.stringify(data),
        headers:{
           'apiKey' : config.apiKey,
           'Content-Type':'application/x-www-form-urlencoded',
           'Accept':'application/json'
        } 
    }

    try{
        let data = await axios(request)
        if(data.data.SMSMessageData != undefined){
          return true
        }
        return false
    }catch(err){
        console.log(err)
        return false
    }
    // Send message and capture the response or error
  
}    