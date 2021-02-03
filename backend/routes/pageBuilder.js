const express= require('express')
const router= express.Router()
const upload= require('../middlewares/FileUploadMiddleware')
const PageBuilderController= require('../controllers/PageBuilderController')
const AdminAuthMiddleware= require('../middlewares/AdminAuthMiddleware')


router.get('/', AdminAuthMiddleware, PageBuilderController.index)
router.get('/:id', PageBuilderController.show)
router.post('/', [AdminAuthMiddleware, upload], PageBuilderController.store)
router.patch('/:id', [AdminAuthMiddleware, upload], PageBuilderController.update)
router.delete('/:id', AdminAuthMiddleware, PageBuilderController.destroy)

module.exports= router

