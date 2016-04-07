var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    _id: String, //Username
    password: String,
    intern: { type: Boolean, default: true },
    projects: [String]
});

var User = mongoose.model('User', userSchema);

module.exports = User;
    