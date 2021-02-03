
const fs= require('fs')
const path = require('path');
var __dirname = path.resolve();

exports.show= (req, res) => {

    let filepath =  './public/uploads/' + req.params.id

	try {
		if (fs.existsSync(filepath)) {
			//file exists
			let file = fs.readFileSync(filepath);
			res.send(file);
		} else {
			res.send("Unable to find file at" + filepath);
		}
	} catch(err) {
		res.send(err);
	}
}