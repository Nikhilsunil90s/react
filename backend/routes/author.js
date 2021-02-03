const express= require('express')
const router= express.Router()
const AuthorController= require('../controllers/AuthorController')
const AdminAuthMiddleware= require('../middlewares/AdminAuthMiddleware')

router.get('/' ,AuthorController.index)
router.get('/:slug', AuthorController.show)
router.post('/', AuthorController.store)
router.patch('/:id',AuthorController.update)
router.delete('/:id', AdminAuthMiddleware, AuthorController.destroy)

module.exports= router