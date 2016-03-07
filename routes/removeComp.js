var fs = require('fs');
var express = require('express');
var _ = require('lodash');
var exec = require('child_process').exec;
var router = express.Router();

router.put('/', function(req, res) {
    var cont = JSON.parse(req.body.cont);
    var path = req.body.path;
    var app_name = req.body.app_name;
    var filename = req.body.filename;

    console.log(cont)
    console.log(path)
    console.log(filename)

    data = JSON.parse(fs.readFileSync(path+"/"+filename));    

    _.remove(data, function(item){
        return item.type == cont.type;
    });

    fs.writeFileSync(path+"/"+filename, JSON.stringify(data));

    exec("rm -rf " + path + "/"+ app_name +"_tmp/screens/" + _.tail(cont.type).join(""), function(){
        res.send("Comp removed");
    })
    
});

module.exports = router;
