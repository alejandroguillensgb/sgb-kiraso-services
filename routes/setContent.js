var fs = require('fs');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    var path = req.query.path;

    try {
        fs.accessSync(path, fs.F_OK);
    } catch (e) {
        fs.closeSync(fs.openSync(path, 'w+'));
    };
    console.log(req.query.cont);
    fs.writeFileSync(path, JSON.parse(req.query.cont).join('\n'));
    res.send("Success");
});

module.exports = router;
//
