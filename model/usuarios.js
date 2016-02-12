var mongoose   = require('mongoose');
var bcrypt = require('bcryptjs');
var Schema  = mongoose.Schema;

var usuario = new Schema({
     nome: {
         type: String,
         unique: true,
         required: true
     },
     senha: {
         type: String,
         required: true
     },
     email: {
         type: String,
         required: true
     }
});

usuario.pre('save', function(next){
      var usuario = this;
      if (this.isModified('senha') || this.isNew) {
            bcrypt.genSalt(15, function(err, salt) {
                 if (err)
                     return next(err);
                 bcrypt.hash(usuario.senha, salt, function(err, hash){
                     if (err)
                           return next(err);
                     usuario.senha = hash;
                     next();
                 });
            });
      } else {
            return next();
      }
});

usuario.methods.compareSenha = function(senha, callback){
      bcrypt.compare(senha, this.senha, function(err, isMatch){
            if (err)
                  return callback(err);
            callback(null, isMatch);
      });
};

module.exports = mongoose.model('Usuario', usuario);
