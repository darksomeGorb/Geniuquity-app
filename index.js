const express = require('express')
let app = express()
let cors = require('cors')
let bodyparser = require('body-parser')
let mongoose = require('mongoose')
let api_router = require('./routes/routes')
let path = require('path')

require('dotenv').config()

let port = process.env.PORT || 3000

//connect to db
mongoose.connect(process.env.MONGODB_URI,{useNewUrlParser : true})
mongoose.Promise = global.Promise
let db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.use(cors())
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended: false}))



let auth = require('./services/auth')

app.post('/api/auth/login',auth.login)
app.post('/api/auth/code',auth.codeLogin)
app.use('/apii',auth.middleware,api_router)

app.use(express.static(__dirname + '/frontend/dist'));

app.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname, 'static','index.html'))
})
app.listen(port, () => {
    console.log(`Server started on port ${port}`)
})

