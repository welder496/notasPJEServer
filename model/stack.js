var mongoose   = require('mongoose');
var Schema  = mongoose.Schema;

var stack = new Schema({
    descricao: String,
    pilha: [String]
});

module.exports = mongoose.model('Stack',stack);