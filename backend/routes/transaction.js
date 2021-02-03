const express= require('express')
const router= express.Router()
const TransactionController= require('../controllers/TransactionController')
const AdminAuthMiddleware= require('../middlewares/AdminAuthMiddleware')

router.get('/', AdminAuthMiddleware, TransactionController.index)
router.post('/', TransactionController.store)

module.exports= router