var express = require('express');
var router = express.Router();
var ncp = require('ncp').ncp;

router.get('/', function(req, res, next){
    ncp(req.query.path_src, req.query.path_dst, function(err){
        if (err) return 
        console.error(err);    
	});    
	res.send();
});

module.exports = router;