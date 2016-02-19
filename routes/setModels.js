var assert = require('assert');
var express = require('express');
var router = express.Router();

router.post('/', function(req, res) {

    var collection = req.query.collection;
    var body = req.body;
    var node_id = body.node_id; 

    console.log(collection);
    console.log(body);
    console.log(node_id);

    var insertModels = function(db, callback){
        db.collection(collection).insertOne(body, function(err, result){
            assert.equal(err,null);
            console.log("Inserted");
            callback();
        });
    };

    var updateModels = function(db, callback){
        db.collection(collection).replaceOne({"node_id": node_id},body, function(err, result){
            assert.equal(err,null);
            console.log('Updated');
            callback();
        });
    };

    var findModels = function(db, callback){
        var cursor = db.collection(collection).find({"node_id" : node_id});
        var length = 0;
        cursor.count(false, function(err,count){
            length = count;
        });
        if (length > 0){
            updateModels(db, callback);
        } else {
            insertModels(db, callback);
        };
    };

    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        findModels(db, function() {
            db.close();
        });
    });

    res.send();
});

module.exports = router;