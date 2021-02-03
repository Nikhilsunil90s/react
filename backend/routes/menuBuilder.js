const express= require('express')
const router= express.Router()
const upload= require('../middlewares/FileUploadMiddleware')
const MenuBuilderController= require('../controllers/MenuBuilderController')
const AdminAuthMiddleware= require('../middlewares/AdminAuthMiddleware')


router.get('/',  MenuBuilderController.index)
router.get('/:id', MenuBuilderController.show)
router.post('/', [AdminAuthMiddleware, upload], MenuBuilderController.store)
router.patch('/:id', [AdminAuthMiddleware, upload], MenuBuilderController.update)
router.delete('/:id', AdminAuthMiddleware, MenuBuilderController.destroy)

module.exports= router

