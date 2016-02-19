//NOT IN USE //

var fs = require('fs');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.put('/', function(req, res) {
    var data = req.body;
    var path = data.path;
    var cont = data.cont;

    try {
        fs.accessSync(path, fs.F_OK);
    } catch (e) {
        fs.closeSync(fs.openSync(path, 'w+'));
    };
    fs.writeFileSync(path, JSON.parse(cont).join('\n'));
    res.send("Data saved: " + cont);
});

module.exports = router;
