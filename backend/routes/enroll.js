const express= require('express')
const router= express.Router()
const EnrollController= require('../controllers/EnrollController')

router.get('/:email', EnrollController.index)
router.post('/', EnrollController.store)
router.post('/item', EnrollController.show)

module.exports= router