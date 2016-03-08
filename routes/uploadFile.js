var fs = require('fs');
var express = require('express');
var exec = require('child_process').execSync;
var mkdirp = require('mkdirp');
var multer = require('multer');
var router = express.Router();

var returnFnc = function(upload){

    router.post('/', function(req, res) {
        upload(req,res,function(err){
            var path = req.query.path;
            if(err){
                res.json({error_code:1,err_desc:err});
                return;
            };
            mkdirp(path + "/theme/resources", function(){
                var zip_path = "/home/alejandro/kiraso-wizard/service_data/tmp"
                fs.readdir(zip_path, function(err, files){
                    exec("mv " + zip_path + "/" + files[0] + " " + path + "/theme/resources");
                    exec("unzip " + files[0], { cwd: path + "/theme/resources"});
                    exec("rm *.zip", { cwd: path + "/theme/resources" });
                    res.json({error_code:0,err_desc:null});
                });
            })
        })

    });
    return router;
};

module.exports = returnFnc;