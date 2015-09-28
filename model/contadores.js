var mongoose   = require('mongoose');
var Schema  = mongoose.Schema;

var contador = new Schema({
    prefixo: String,
    descricao: String,
    contador: Number
});

module.exports = mongoose.model('Contador',contador);