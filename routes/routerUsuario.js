var express = require('express');
var routerUsuario = express.Router({mergeParams: true});
var mongoose = require('mongoose');
var usuario = require('../model/usuarios');

var authenticate = function(req, res, next){

      var nome = decodeURIComponent(req.body.nome);
      var senha = decodeURIComponent(req.body.senha);

      if ((nome === "" || nome === "undefined") &&
         (senha ===  "" || senha === "undefined")) {
               return res.json({message: "Nome e Senha inválidos!!"});
      }

      process.nextTick(function(){
            var usuario = mongoose.model('Usuario');
            usuario.findOne({nome: nome}, function(err, usuario){
                 if (err || !usuario) {
                       return res.json({message: "Nome e Senha inválidos!!"});
                 }
                 usuario.compareSenha(senha, function(err, isMatch){
                       if (isMatch && !err){
                           return res.json({message: "Usuário autenticado com sucesso!!"});
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
               var usuario = mongoose.model('Usuario');
               usuario.findOne({nome:nome}, function(err, usuario){
                     if (err)
                          res.send(err);
                     if (usuario != null){
                          res.json(usuario);
                     } else {
                          res.json({message: "Usuário não encontrado!!"});
                     }
               });
         } else {
               res.json({message: "Não foi possível encontrar o Usuário!!"});
         }
});

routerUsuario.post('/login', authenticate, function(req, res, next){
});

routerUsuario.post('/logout', function(req, res){

});

routerUsuario.post('/new', function(req, res){
      var nome = decodeURIComponent(req.body.nome);
      var senha = decodeURIComponent(req.body.senha);
      var email = decodeURIComponent(req.body.email);
      if ((nome !== "" && nome !== "undefined") &&
             (senha !== "" && senha !== "undefined") &&
             (email !== "" && email !== "undefined")) {
             var usuario = mongoose.model('Usuario');
             usuario.findOne({nome: nome}, function(err, usuario){
                 if (usuario == null) {
                      var usuario = mongoose.model('Usuario');
                      var Usuario = new usuario();
                      Usuario.nome = nome;
                      Usuario.senha = senha;
                      Usuario.email = email;
                      Usuario.save(function(err){
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
         var novoNome = decodeURIComponent(req.body.nome);
         var novaSenha = decodeURIComponent(req.body.senha);
         var novoEmail = decodeURIComponent(req.body.email);
         if ((nome !== "" && nome !== "undefined") &&
             (novoNome !== "" && novoNome !== "undefined") &&
             (novaSenha !== "" && novaSenha !== "undefined") &&
             (novoEmail !== "" && novoEmail !== "undefined")){
             var usuario = mongoose.model('Usuario');
             usuario.findOne({nome:nome},function(err,usuario){
                   if (err)
                          res.send(err);
                   if (usuario != null) {
                          var novoUsuario = mongoose.model('Usuario');
                          novoUsuario.findOne({nome: novoNome}, function(err,novoUsuario){
                                 if (novoUsuario == null) {
                                       usuario.nome = novoNome;
                                       usuario.senha = novaSenha;
                                       usuario.email = novoEmail;
                                       usuario.save(function(err){
                                             if (err)
                                                res.send(err);
                                       });
                                       res.json({message: "Usuário alterado com sucesso!!"});
                                 } else {
                                       res.json({message: "Novo nome já está cadastrado!!"});
                                 }
                          });
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
               var usuario = mongoose.model('Usuario');
               usuario.findOne({nome:nome}, function(err, usuario){
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
