const multer  = require('multer')
const path = require("path");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./public/uploads/")
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now()+ path.extname(file.originalname))
    }
  })

const upload = multer({ storage: storage, limits: { fieldSize: 25 * 1024 * 1024 } }).fields([{
	name: 'thumbnail', maxCount: 1
  }, {
    name: 'video', maxCount: 1
  },{
	name: 'trailer', maxCount: 1
  }, {
    name: 'cover_photo', maxCount: 1
  }, {
    name: 'mainImg', maxCount: 1
  }, {
    name: 'proPic', maxCount: 1
  }, {
    name: 'headerImage', maxCount: 1
  }]);

module.exports= upload