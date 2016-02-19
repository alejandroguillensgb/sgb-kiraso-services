///NOT IN USE

var express = require('express');
var fs = require('fs');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
 //  var file = fs.createReadStream('/public');
 console.log('HOLA');
	// file.pipe(res);
  res.send('respond with a resource');
  
});

module.exports = router;
