var mongoose   = require('mongoose');
var Schema  = mongoose.Schema;

var stack = new Schema({
    stack: [String]
});

module.exports = mongoose.model('Stack',stack);