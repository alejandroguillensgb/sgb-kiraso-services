var fs = require('fs');
var express = require('express');
var router = express.Router();

/* GET home page. */
// router.get('/', function(req, res, next) {
//     fs.readFile(req.query.path, 'utf8', function(err, data){
// 		if (err) console.error(err)
//         if (req.query.type === 'json'){ 
//             res.json(JSON.parse(data))
//         }else{res.send(data)}
// 	});
// });

router.get('/', function(req, res, next) {
    var data = fs.readFileSync(req.query.path, 'utf8');
    if (req.query.type === 'json'){ 
        res.json(JSON.parse(data))
    }else{res.send(data.toString())}
});


module.exports = router;
