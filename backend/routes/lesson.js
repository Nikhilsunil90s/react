const express= require('express')
const router= express.Router()
const LessonController= require('../controllers/LessonController')
const upload= require('../middlewares/FileUploadMiddleware')
const AdminAuthMiddleware= require('../middlewares/AdminAuthMiddleware')


router.get('/:id', LessonController.index)
router.post('/all', LessonController.indexAll)
router.post('/', [AdminAuthMiddleware, upload], LessonController.store)
router.patch('/:id', [AdminAuthMiddleware, upload], LessonController.update)
router.delete('/:id', AdminAuthMiddleware, LessonController.destroy)

module.exports= router