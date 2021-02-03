const express= require('express')
const router= express.Router()
const CourseController= require('../controllers/CourseController')
const upload= require('../middlewares/FileUploadMiddleware')
const AdminAuthMiddleware= require('../middlewares/AdminAuthMiddleware')

router.get('/' ,CourseController.index)
router.get('/:slug', CourseController.show)
router.post('/', [AdminAuthMiddleware, upload], CourseController.store)
router.patch('/:id', [AdminAuthMiddleware, upload], CourseController.update)
router.delete('/:id', AdminAuthMiddleware, CourseController.destroy)

module.exports= router