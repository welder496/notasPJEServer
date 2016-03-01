var redis = require('redis');
var client = redis.createClient();
var jsonwebtoken = require('jsonwebtoken');
var _ = require('lodash');
var TOKEN_EXPIRATION=60;
var TOKEN_EXPIRATION_SEC = TOKEN_EXPIRATION * 60;

module.exports.fetch = function(headers) {
   if (headers && headers.authorization) {
      var authorization = headers.authorization;
      var part = authorization.split(" ");
      if (part.length === 2) {
         var token = part[1];
         return part[1];
      } else {
         return null;
      }
   } else {
      return null;
   }
};

module.exports.create = function(user, req, res, next) {
   if (_.isEmpty(user)) {
         return res.json({"message": "Dados do usuário estão vazios!!"});
   }

   var data = {
      _id: user._id,
      username: user.username,
      email: user.email,
      token: jsonwebtoken.sign({_id: user._id}, 'teste', {
            expiresIn: TOKEN_EXPIRATION_SEC
      })
   }

   var decoded = jsonwebtoken.decode(data.token);

   data.token_exp = decoded.exp; //Tempo de expiração do token!!
   data.token_iat = decoded.iat; //Quando o token foi criado!!

   client.set(data.token, JSON.stringify(data), function(err, reply){
         if (err) {
               return next(new Error(err));
         }

         if (reply) {
            client.expire(data.token, TOKEN_EXPIRATION_SEC, function(err, reply){
                 if (err) {
                      return next(new Error("Não é possível setar o valor de expiração para o Token!!"));
                 }
                 if (reply) {
                      req.user = data;
                      next();
                 } else {
                      return next(new Error("Expiração não foi configurado no redis!!"));
                 }
            });
         } else {
               return next(new Error("Token não foi configurado no redis!!"));
         }
   });

   return data;

};

module.exports.retrieve = function (id, done){

      if (_.isNull(id)) {
         return done(0,{message: "Token inválido!!"});
      }

      client.get(id, function(err, reply){
         if (err) {
            return done(1,{message: "Erro ao buscar o token!!"});
         }

         if (_.isNull(reply)) {
            return done(2, {message: "Token não existe!!"});
         } else {
            var data = JSON.parse(reply);
            if (_.isEqual(data.token, id)) {
               return done(null, data);
            } else {
               return done(3,{message: "Token não existe!!"});
            }
         }

      });

};

module.exports.verify = function(req, res, next){

   var token = exports.fetch(req.headers);

   jsonwebtoken.verify(token, 'teste', function(err, decode) {
         if (err) {
            req.user = undefined;
            return false;
         }

         exports.retrieve(token, function(err, data){
            if (err) {
               req.user = undefined;
               return false;
            }
            req.user = data;
         });
   });
   return true;
};

module.exports.expire = function(headers){
   var token = exports.fetch(headers);
   if (token !== null) {
      client.expire(token,0);
   }

   return token !== null;
};

module.exports.middleware = function() {

   var func = function(req, res, next) {
       var token = exports.fetch(req.headers);

       exports.retrieve(token, function(err, data){
            if (err) {
               req.user = undefined;
               return res.json({message: "Token inválido!!"});
            } else {
               req.user = _.merge(req.user, data);
               next();
            }
       });
   }

   func.unless = require("express-unless");

   return func;
};

module.exports.TOKEN_EXPIRATION = TOKEN_EXPIRATION;
module.exports.TOKEN_EXPIRATION_SEC = TOKEN_EXPIRATION_SEC;