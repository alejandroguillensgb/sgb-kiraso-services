var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var projectSchema = new Schema({
    _id: String,
    backgroundImage: {type: String, default: ""},
    appLogo: {type: String, default: ""},
    graph: String
});

var Project = mongoose.model('Project', projectSchema);

module.exports = Project;
    