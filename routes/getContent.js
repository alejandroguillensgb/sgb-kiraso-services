var fs = require('fs');
var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    if(req.query.path != ""){
        var data = fs.readFileSync(req.query.path);
        if (req.query.type === 'json'){
            res.json(JSON.parse(data))
        }else{res.send(data.toString())}
    } else{
        res.status(400).send("empty path");
    };
});

module.exports = router;
