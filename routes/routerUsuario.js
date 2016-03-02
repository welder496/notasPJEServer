var express = require('express');
var routerUsuario = express.Router({mergeParams: true});
var mongoose = require('mongoose');
var user = require('../model/usuarios');
var utils = require('./routerPassUtils');

var authenticate = function(req, res, next) {

      var nome = decodeURIComponent(req.body.username);
      var senha = decodeURIComponent(req.body.password);

      if ((nome === "" || nome === "undefined") &&
         (senha ===  "" || senha === "undefined")) {
               return res.json({message: "Nome e Senha inválidos!!"});
      }

      process.nextTick(function(){
            var user = mongoose.model('User');
            user.findOne({username: nome}, function(err, user){
                 if (err || !user) {
                       return res.json({message: "Nome e Senha inválidos!!"});
                 }
                 user.compareSenha(senha, function(err, isMatch){
                       if (isMatch && !err){
                           utils.create(user, req, res, next);
                       } else {
                           return res.json({message: "Nome e Senha inválidos!!"});
                       }
                 });
            });
      });

};

routerUsuario.get('/:nome', function(req,res){
      var nome = decodeURIComponent(req.params.nome);
      if (nome !== "" && nome !== "undefined") {
            var user = mongoose.model('User');
            user.findOne({username:nome}, function(err, user){
                 if (err)
                       res.send(err);
                 if (user != null){
                       res.json(user);
                 } else {
                       res.json({message: "Usuário não encontrado!!"});
                 }
            });
      } else {
            res.json({message: "Não foi possível encontrar o Usuário!!"});
      }
});

routerUsuario.post('/login', authenticate, function(req, res, next){
      return res.status(200).json(req.user);
});

routerUsuario.post('/logout', function(req, res, next){
     if (utils.expire(req.headers)){
           delete req.user;
           return res.json({message: "Usuário desconectado com sucesso!!"});
     } else {
           return res.json({message: "Não foi possível desconectar o usuário!!"});
     }
});

routerUsuario.post('/new', function(req, res){
      var nome = decodeURIComponent(req.body.username);
      var senha = decodeURIComponent(req.body.password);
      var email = decodeURIComponent(req.body.email);
      if ((nome !== "" && nome !== "undefined") &&
             (senha !== "" && senha !== "undefined") &&
             (email !== "" && email !== "undefined")) {
             var user = mongoose.model('User');
             user.findOne({username: nome}, function(err, user){
                 if (user == null) {
                      var user = mongoose.model('User');
                      var User = new user();
                      User.username = nome;
                      User.password = senha;
                      User.email = email;
                      User.save(function(err){
                           if (err)
                               res.send(err);
                      });
                      res.json({message: "Usuário cadastrado com sucesso!!"});
                 } else {
                      res.json({message: "Usuário já está cadastrado!!"});
                 }
             });
      } else {
             res.json({message: "Não foi possível cadastrar novo usuário!!"});
      }
});

routerUsuario.put('/:nome', function(req, res){
      var nome = decodeURIComponent(req.params.nome);
      var novoNome = decodeURIComponent(req.body.username);
      var novaSenha = decodeURIComponent(req.body.password);
      var novoEmail = decodeURIComponent(req.body.email);
      if ((nome !== "" && nome !== "undefined") &&
           (novoNome !== "" && novoNome !== "undefined") &&
           (novaSenha !== "" && novaSenha !== "undefined") &&
           (novoEmail !== "" && novoEmail !== "undefined")){
           var user = mongoose.model('User');
           user.findOne({username:nome},function(err,user){
                 if (err)
                       res.send(err);
                 if (user !== null) {
                       if (novoNome !== nome) {
                             var novoUsuario = mongoose.model('User');
                             novoUsuario.findOne({username: novoNome}, function(err,novoUsuario){
                                  if (novoUsuario === null) {
                                        user.username = novoNome;
                                        user.password = novaSenha;
                                        user.email = novoEmail;
                                        user.save(function(err){
                                              if (err)
                                                    res.send(err);
                                        });
                                        res.json({message: "Usuário alterado com sucesso!!"});
                                  } else {
                                        res.json({message: "Novo nome já está cadastrado!!"});
                                  }
                             });
                       } else {
                             user.password = novaSenha;
                             user.email = novoEmail;
                             user.save(function(err){
                                   if (err)
                                        res.send(err);
                             });
                             res.json({message: "Usuário alterado com sucesso!!"});
                       }
                 } else {
                       res.json({message: "Usuário não está cadastrado!!"});
                 }
           });
      } else {
           res.json({message: "Não foi possível alterar o usuário"});
      }
});

routerUsuario.delete('/:nome', function(req, res){
      var nome = decodeURIComponent(req.params.nome);
      if (nome !== "" && nome !== "undefined") {
           var usuario = mongoose.model('User');
           usuario.findOne({username:nome}, function(err, usuario){
                 if (err)
                       res.send(err);
                 if (usuario != null) {
                       usuario.remove(function(err, usuario){
                             if (err)
                                  res.send(err);
                             if (usuario == null);
                                  res.json({message: "Usuário excluído com sucesso!!"});
                       });
                 } else {
                       res.json({message: "Usuário não está cadastrado!!"});
                 }
           });
      } else {
           res.json({message: "Não foi possível excluir o usuário!!"})
      }
});

module.exports = routerUsuario;
