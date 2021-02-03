const express= require('express')
const router= express.Router()
const ProfileController= require('../controllers/ProfileController')
const upload= require('../middlewares/FileUploadMiddleware')

router.get('/:email', ProfileController.show)
router.post('/', upload, ProfileController.store)

module.exports= router