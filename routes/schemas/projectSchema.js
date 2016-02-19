var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var projectSchema = new Schema({
    _id: String,
    backgroundImage: {type: String, default: ""},
    appLogo: {type: String, default: ""},
    models: {
        data: [Schema.Types.Mixed],
        params: [Schema.Types.Mixed],
        screen: [Schema.Types.Mixed],
        event: [Schema.Types.Mixed],
    },
    graph: String
});

var Project = mongoose.model('Project', projectSchema);

module.exports = Project;
    