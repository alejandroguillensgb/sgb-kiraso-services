var fs = require('fs');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    fs.writeFileSync(req.query.path, JSON.parse(req.query.cont).join('\n'));
    res.send("Success");
});

module.exports = router;
