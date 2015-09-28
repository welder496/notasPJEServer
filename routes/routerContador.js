var express = require('express');
var routerCodigo = express.Router({mergeParams: true});
var mongoose = require('mongoose');
var contador = require('../model/contadores');

routerCodigo.route('/all')

          .get(function(req, res){
                   contador = mongoose.model('Contador');
                   contador.find().sort({'prefixo':1}).exec(function(err, contador) {
                             if (err)
                                       res.send(err);
                             if (contador != null) {
                                       res.json(contador);
                             } else {
                                       res.json({message: "Contadores não foram encontrados!!"});
                             }
                   });
      });

routerCodigo.route('/:prefixo')

         .get(function(req, res){
                   var prefixo = req.params.prefixo;
                   contador = mongoose.model('Contador');
                   contador.findOne({prefixo: prefixo}, function(err,contador){
                             if (err)
                                       res.send(err);
                             if (contador != null) {
                                       res.json(codigo);
                             } else {
                                       res.json({message: "Contador não foi encontrado!!"});
                             }
                   });
         });

routerCodigo.route('/new')

         .post(function(req,res){
                  var prefixo = req.body.prefixo;
                  var descricao = req.body.descricao;

                  if (prefixo != "" && descricao != "") {
                             contador = mongoose.model('Contador');
                             Contador = new contador();
                             Contador.prefixo = prefixo;
                             Contador.descricao = descricao;
                             Contador.contador = 0;
                             contador.findOne({prefixo: prefixo}, function(err,contador){
                                       if (err)
                                                res.send(err);
                                       if (contador != null) {
                                                res.json({message: "Contador já existe!!"});
                                       }  else {
                                                Contador.save(function(err){
                                                          if (err)
                                                                   res.send(err);
                                                });
                                                res.json({message: "Contador salvo com sucesso!!"});
                                       }

                             });
                  } else {
                            res.json({message: "Não foi possível criar contador!!"});
                  }

          });

routerCodigo.route('/:prefixo/reset')

          .put(function(req, res){
                    var prefixo = req.params.prefixo;
                    if (prefixo != "") {
                             contador = mongoose.model('Contador');
                             contador.findOne({prefixo: prefixo}, function(err, contador){
                                       if (err)
                                                res.send(err);
                                       if (contador != null) {
                                                contador.contador = 0;
                                                contador.save(function(err){
                                                          if (err)
                                                                  res.send(err);
                                                });
                                                res.json({message: "Contador foi reiniciado com sucesso!!"});
                                       } else {
                                                res.json({message: "Contador não foi encontrado!!"});
                                       }
                             });
                    } else {
                             res.json({message: "Não foi possível encontrar o contador"});
                    }
          });

routerCodigo.route('/:prefixo/inc')

          .put(function(req, res){
                   var prefixo = req.params.prefixo;
                   if (prefixo != "") {
                             contador = mongoose.model('Contador');
                             contador.findOne({prefixo: prefixo}, function(err, contador){
                                       if (err)
                                                res.send(err);
                                       if (contador != null) {
                                                contador.contador = parseInt(contador.contador + 1);
                                                contador.save(function(err){
                                                          if (err)
                                                                   res.send(err);
                                                });
                                       } else {
                                                res.json({message: "Contador não foi encontrado!!"});
                                       }
                             });
                   } else {
                             res.json({message: "Não foi possível encontrar o contador"});
                   }
          });

routerCodigo.route('/:prefixo/dec')

          .put(function(req, res){
                   var prefixo = req.params.prefixo;
                   if (prefixo != "") {
                             contador = mongoose.model('Contador');
                             contador.findOne({prefixo: prefixo}, function(err, contador){
                                       if (err)
                                                res.send(err);
                                       if (contador != null) {
                                                contador.contador = parseInt(contador.contador - 1);
                                                contador.save(function(err){
                                                          if (err)
                                                                   res.send(err);
                                                });
                                       } else {
                                                res.json({message: "Contador não foi encontrado!!"});
                                       }
                             });
                   } else {
                             res.json({message: "Não foi possível encontrar o contador"});
                   }
          });

module.exports = routerCodigo;