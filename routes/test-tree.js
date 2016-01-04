var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');
var dir = require('directory-tree');

router.get('/', function(req, res, next) {
    var tree = dir.directoryTree('/home/alejandro/kiraso-wizard/sgb-kiraso-services');
    res.json([tree])
});

module.exports = router;