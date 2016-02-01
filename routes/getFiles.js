var fs = require('fs');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.send(fs.readdirSync(req.query.path));
});

module.exports = router;