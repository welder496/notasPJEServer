var mongoose   = require('mongoose');
var bcrypt = require('bcryptjs');
var Schema  = mongoose.Schema;

var user = new Schema({
     username: {
         type: String,
         unique: true,
         required: true
     },
     password: {
         type: String,
         required: true
     },
     email: {
         type: String,
         required: true
     }},
     {
        toObject: {
          virtuals: true
        }, toJSON: {
          virtuals: true
        }
});

user.pre('save', function(next){
      var user = this;
      if (this.isModified('password') || this.isNew) {
            bcrypt.genSalt(10, function(err, salt) {
                 if (err)
                     return next(err);
                 bcrypt.hash(user.password, salt, function(err, hash){
                     if (err)
                           return next(err);
                     user.password = hash;
                     next();
                 });
            });
      } else {
            return next();
      }
});

user.methods.compareSenha = function(senha, callback){
      bcrypt.compare(senha, this.password, function(err, isMatch){
            if (err)
                  return callback(err);
            callback(null, isMatch);
      });
};

module.exports = mongoose.model('User', user);
