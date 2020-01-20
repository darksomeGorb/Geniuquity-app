let express = require('express')
let router = express.Router()
let user_router = express.Router()
let account_router = express.Router()

//set up router with controllers
let user_controller = require('../controllers/user.controller')

user_router.get('/',user_controller.all)
user_router.post('/',user_controller.create)
user_router.get('/:id',user_controller.user)
user_router.put('/:id',user_controller.update)
user_router.delete('/:id',user_controller.delete)


let account_controller = require('../controllers/account.controller')

account_router.get('/',account_controller.all)
account_router.post('/',account_controller.create)
account_router.get('/:id',account_controller.account)
account_router.put('/:id',account_controller.update)
account_router.delete('/:id',account_controller.delete)

let jenga_routes = require('./jengaroutes') 

router.use('/users',user_router)
router.use('/accounts',account_router)
router.use('/jenga',jenga_routes)

module.exports = router