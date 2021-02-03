const express= require('express')
const router= express.Router()
const HomeController= require('../controllers/HomeController')
const upload= require('../middlewares/FileUploadMiddleware')

router.get('/', HomeController.index)
router.get('/count', HomeController.count)
router.get('/', HomeController.index)
router.post('/', upload, HomeController.store)

module.exports= router