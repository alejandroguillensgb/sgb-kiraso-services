var express = require('express');
var fs = require('fs');
var mkdirp = require('mkdirp');
var exec = require('child_process').exec;
var spawn = require('child_process').spawn;
var router = express.Router();
var child;

router.get('/', function(req, res) {

    var path = req.query.path;
    console.log(path);
    console.log("despues de path")
    fs.readdir(path, function(err){
        if(err){
            mkdirp.sync(path);
            //Gen app   
        } else {
            console.log("entre aca");
            fs.readdir(path + "_tmp", function(err){
                if(err){
                    console.log("hya error")
                    mkdirp.sync(path + "_tmp");
                } else {
                    var files = fs.readdirSync(path + "_tmp");
                    console.log(files);
                    for(var i = 0; i < files.length; i++){
                        exec("mv " + path + "_tmp/" + files[i] + " " + path, function(){
                            console.log("files moved");
                        });
                    };
                };
            })
            
        };
    });


    

    res.send();
    
 
    // ver si el directorio existe
        // si no crearlo y generar aplicacion
    // mover los archivos de carpeta auxiliar a la carpeta de origen
    // borrar carpeta auxiliar
    
    

});

module.exports = router;