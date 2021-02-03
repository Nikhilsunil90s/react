const express= require('express')
const router= express.Router()
const BlogController= require('../controllers/BlogController')
const upload= require('../middlewares/FileUploadMiddleware')
const AdminAuthMiddleware= require('../middlewares/AdminAuthMiddleware')

router.post('/posts', BlogController.index)
router.post('/archiveposts', BlogController.archive)
router.post('/recentposts', BlogController.recent)
router.get('/categories', BlogController.indexCategories)
router.get('/authors', BlogController.indexAuthors)
router.get('/posts/featured', BlogController.indexFeatured)
router.get('/:slug', BlogController.show)
router.post('/', [AdminAuthMiddleware, upload], BlogController.store)
router.patch('/:id', [AdminAuthMiddleware, upload], BlogController.update)
router.delete('/:id', AdminAuthMiddleware, BlogController.destroy)

module.exports= router    