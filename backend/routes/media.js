const express= require('express')
const router= express.Router()
const MediaController= require('../controllers/MediaController')

router.get('/:id', MediaController.show)

module.exports= router