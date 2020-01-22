let express = require('express')
let accounts = require('../services/accounts')
let router = express.Router()


let basic_transactions_controller = require('../controllers/jenga/basictransactions.controller')
let statement_controller = require('../controllers/jenga/statement.controller')
let query_controller = require('../controllers/jenga/queries.controller.js')

router.post('/balance/:accountNumber',accounts.checkToken,statement_controller.balance)
router.post('/ministatement/:accountNumber',accounts.checkToken,statement_controller.ministatement)
router.post('/fullstatement/:accountNumber',accounts.checkToken,statement_controller.fullstatement)

router.post('/ift/:accountNumber',accounts.checkToken,basic_transactions_controller.ift)
router.post('/mobiletransfer/:accountNumber',accounts.checkToken,basic_transactions_controller.mobile)
router.post('/eft/:accountNumber',accounts.checkToken,basic_transactions_controller.eft)
router.post('src/pesalink/:accountNumber',accounts.checkToken,basic_transactions_controller.pesalink)
//b2b
router.post('/b2b/:accountNumber',accounts.checkToken,basic_transactions_controller.b2b)
router.post('/swift/:accountNumber',accounts.checkToken,basic_transactions_controller.swift)
router.post('/rtgs/:accountNumber',accounts.checkToken,basic_transactions_controller.rtgs)

router.post('/query/account/:accountNumber',accounts.checkToken,query_controller.account)
router.post('/query/openclose/:accountNumber',accounts.checkToken,query_controller.openclose)
router.post('/query/kyc/:accountNumber',accounts.checkToken,query_controller.kyc)
router.post('/query/credit/:accountNumber',accounts.checkToken,query_controller.credit)
module.exports = router