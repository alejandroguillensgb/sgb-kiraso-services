var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var projectSchema = new Schema({
    _id: String,
    graph: String
});

var Project = mongoose.model('Project', projectSchema);

module.exports = Project;
    