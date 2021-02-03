const express= require('express')
const router= express.Router()
const CategoryController= require('../controllers/CategoryController')
const AdminAuthMiddleware= require('../middlewares/AdminAuthMiddleware')

router.get('/' ,CategoryController.index)
router.get('/:slug', CategoryController.show)
router.post('/', CategoryController.store)
router.patch('/:id',CategoryController.update)
router.delete('/:id', AdminAuthMiddleware, CategoryController.destroy)

module.exports= router