const express= require('express')
const router= express.Router()
const BookController= require('../controllers/BookController')
const upload= require('../middlewares/FileUploadMiddleware')
const AdminAuthMiddleware= require('../middlewares/AdminAuthMiddleware')

router.get('/', BookController.index)
router.get('/:slug', BookController.show)
router.get('/detail/:id', BookController.detail)  
router.post('/', [AdminAuthMiddleware, upload], BookController.store)
router.patch('/:id', [AdminAuthMiddleware, upload], BookController.update)
router.delete('/:id', AdminAuthMiddleware, BookController.destroy)

module.exports= router