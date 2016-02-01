var http = require('http'),
    terminal = require('web-terminal'),
    express = require('express'),
    router = express.Router();

router.get('/', function(req, res, next) {
    res.writeHead(200, {"Content-Type": "text/plain"});
    res.end('hello');
});


module.exports = router;
