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


routerCodigo.route('/prefixo/:prefixo/casas/:valor')

            .put(function(req,res){
                 var prefixo = decodeURIComponent(req.params.prefixo);
                 var valor = parseInt(decodeURIComponent(req.params.valor));
                 if (prefixo !== "" && prefixo !== "undefined") {
                       contador = mongoose.model('Contador');
                       contador.findOne({prefixo: prefixo.toUpperCase()}, function(err, contador){
                            if (err)
                                  res.send(err);
                            if (isNaN(valor)) {
                                  res.json({message: "Não foi possível mudar o número de casas!!"});
                             } else {
                                  contador.casas = valor;
                                  contador.save(function(err){
                                        if (err)
                                             res.send(err);
                                  });
                                  res.json({message: "Número de casas alterado com sucesso!!"});
                             }
                       });
                 } else {
                       res.json({message: "Contador não foi encontrado!!"});
                 }
            });


routerCodigo.route('/descricao/:descricao')

            .get(function(req, res, next){
                   var descricao = decodeURIComponent(req.params.descricao);
                   contador = mongoose.model('Contador');
                   contador.findOne({descricao: descricao.toUpperCase()}, function(err,contador){
                             if (err)
                                       res.send(err);
                             if (contador != null) {
                                       res.json(contador);
                             } else {
                                       res.json({message: "Contador não foi encontrado!!"});
                             }
                   });
            })

            .delete(function(req, res, next){
                   var descricao = decodeURIComponent(req.params.descricao);
                   contador = mongoose.model('Contador');
                   if (descricao != "" && typeof(descricao) != "undefined") {
                             contador.remove({descricao: descricao}, function(err,contador){
                                      if (err)
                                                res.send(err);
                                      if (contador != null) {
                                                res.json({message: "Contador excluído com sucesso!!"});
                                      } else {
                                                res.json({message: "Não foi possível excluir o contador!!"});
                                      }
                             });
                   } else {
                             res.json({message: "Não foi possível excluir o contador!!"});
                   }
            })

            .put(function(req, res, next){
                 var descricao = decodeURIComponent(req.params.descricao);
                 var novadescricao =decodeURIComponent(req.body.descricao);
                 var prefixo = decodeURIComponent(req.body.prefixo);
                 var cont = decodeURIComponent(req.body.contador);
                 var casas = decodeURIComponent(req.body.casas);
                 contador = mongoose.model('Contador');
                 if ((descricao !== "" && descricao !== "undefined") &&
                     (novadescricao !== "" && novadescricao !=="undefined") &&
                     (prefixo !== "" && prefixo !== "undefined")) {
                       descricao = descricao.toUpperCase();
                       var testDescricao = descricao.replace(/[^a-z\u00C0-\u00ffA-Z0-9\-\(\)\[\]\.\s\>\:]+/g,'_');
                       prefixo = prefixo.toUpperCase();
                       var testPrefixo = prefixo.replace(/[^a-z\u00C0-\u00ffA-Z0-9\-]+/g,'_');
                       novadescricao = novadescricao.toUpperCase();
                       var testNovaDescricao = novadescricao.replace(/[^a-z\u00C0-\u00ffA-Z0-9\-\(\)\[\]\.\s\>\:]+/g,'_');
                       if (testDescricao.indexOf('_') === -1 &&
                            testPrefixo.indexOf('_') === -1 &&
                            testNovaDescricao.indexOf('_') === -1) {
                            contador.findOne({descricao: descricao}, function(err, contador){
                                  if (contador !== null) {
                                        contador.descricao = novadescricao.toUpperCase();
                                        contador.prefixo = prefixo.toUpperCase();
                                        if (isNaN(Number(cont))) {
                                              contador.contador = 0;
                                        } else {
                                              contador.contador = cont;
                                        }
                                        if (isNaN(Number(casas))) {
                                              contador.casas = 0;
                                        } else {
                                              contador.casas = casas;
                                        }
                                        contador.save(function(err){
                                              if (err)
                                                    res.send(err);
                                        });
                                        res.json({message: "Contador atualizado com sucesso!!"});
                                  } else {
                                        res.json({message: "Contador não foi encontrado!!"});
                                  }
                            });
                       } else {
                            res.json({message: "Formato inválido de contador!!"});
                       }
                 } else {
                       res.json({message: "Não foi possível atualizar o contador!!"});
                 }
            });


routerCodigo.route('/prefixo/:prefixo')

            .get(function(req, res){
                 var prefixo = decodeURIComponent(req.params.prefixo);
                 prefixo = prefixo.toUpperCase();
                 prefixo = prefixo.replace(/[^a-z\u00C0-\u00ffA-Z0-9\-]+/g,'_');
                 contador = mongoose.model('Contador');
                 if (prefixo.indexOf('_') === -1) {
                       contador.findOne({prefixo: prefixo}, function(err,contador){
                             if (err)
                                  res.send(err);
                             if (contador != null) {
                                  res.json(contador);
                             } else {
                                  res.json({message: "Contador não foi encontrado!!"});
                             }
                       });
                 } else {
                       res.json({message: "Formato de prefixo inválido!!"});
                 }
            })

            .delete(function(req, res){
                   var prefixo = decodeURIComponent(req.params.prefixo);
                   contador = mongoose.model('Contador');
                   if (prefixo !== "" && prefixo !== "undefined") {
                             contador.remove({prefixo: prefixo.toUpperCase()}, function(err,contador){
                                      if (err)
                                                res.send(err);
                                      if (contador != null) {
                                                res.json({message: "Contador excluído com sucesso!!"});
                                      } else {
                                                res.json({message: "Não foi possível excluir o contador!!"});
                                      }
                             });
                   } else {
                             res.json({message: "Não foi possível excluir o contador!!"});
                   }

            });

routerCodigo.route('/new')

            .post(function(req,res){
                 var prefixo = decodeURIComponent(req.body.prefixo);
                 var descricao = decodeURIComponent(req.body.descricao);

                 if ((prefixo !== "" && prefixo !== "undefined") && (descricao !== "undefined" && descricao !== "")) {
                       contador = mongoose.model('Contador');
                       descricao = descricao.toUpperCase();
                       var testDescricao = descricao.replace(/[^a-z\u00C0-\u00ffA-Z0-9\-\(\)\[\]\.\s\>\:]+/g,'_');
                       prefixo = prefixo.toUpperCase();
                       var testPrefixo = prefixo.replace(/[^a-z\u00C0-\u00ffA-Z0-9\-]+/g,'_');
                       if (testDescricao.indexOf('_') === -1 && testPrefixo.indexOf('_') === -1) {
                             var Contador = new contador();
                             Contador.prefixo = prefixo;
                             Contador.descricao = descricao;
                             Contador.contador = 0;
                             Contador.casas = 0;
                             contador.findOne({$or: [{descricao: Contador.descricao},{prefixo: Contador.prefixo}]}, function(err,contador){
                                  if (err)
                                        res.send(err);
                                  if (contador !== null) {
                                        res.json({message: "Contador já existe!! A descrição e o prefixo devem ser únicos..."});
                                  }  else {
                                        Contador.save(function(err){
                                             if (err)
                                                   res.send(err);
                                        });
                                        res.json({message: "Contador salvo com sucesso!!"});
                                  }
                            });
                       } else {
                             res.json({message: "Formato inválido de contador!!"});
                       }
                 } else {
                       res.json({message: "Não foi possível criar contador!!"});
                 }
            });

routerCodigo.route('/prefixo/:prefixo/reset')

            .put(function(req, res){
                    var prefixo = decodeURIComponent(req.params.prefixo);
                    if (prefixo != "") {
                             contador = mongoose.model('Contador');
                             contador.findOne({prefixo: prefixo.toUpperCase()}, function(err, contador){
                                  if (err)
                                        res.send(err);
                                  if (contador != null) {
                                        contador.contador = 0;
                                        contador.casas = 0;
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


routerCodigo.route('/prefixo/:prefixo/next')

            .get(function(req, res){
                   var prefixo = decodeURIComponent(req.params.prefixo);
                   if (prefixo !== "" && prefixo !== "undefined") {
                             contador = mongoose.model('Contador');
                             contador.findOne({prefixo: prefixo.toUpperCase()}, function(err, contador){
                                       if (err)
                                                res.send(err);
                                       if (contador != null) {
                                                contador.contador = parseInt(contador.contador + 1);
                                                contador.save(function(err){
                                                          if (err)
                                                                   res.send(err);
                                                });
                                                var num = contador.contador.toString();
                                                for (var i = num.length; i < contador.casas; i++)
                                                         num = "0"+num;
                                                res.json(contador.prefixo+'-'+num);
                                       } else {
                                                res.json({message: "Contador não foi encontrado!!"});
                                       }
                             });
                   } else {
                             res.json({message: "Não foi possível encontrar o contador"});
                   }
            });

routerCodigo.route('/prefixo/:prefixo/searchnext')

            .get(function(req, res){
                   var prefixo = decodeURIComponent(req.params.prefixo);
                   if (prefixo !== "" && prefixo !== "undefined") {
                             contador = mongoose.model('Contador');
                             contador.findOne({prefixo: prefixo.toUpperCase()}, function(err, contador){
                                       if (err)
                                                res.send(err);
                                       if (contador != null) {
                                                contador.contador = parseInt(contador.contador + 1);
                                                var num = contador.contador.toString();
                                                for (var i = num.length; i < contador.casas; i++)
                                                         num = "0"+num;
                                                res.json(contador.prefixo+'-'+num);
                                       } else {
                                                res.json({message: "Contador não foi encontrado!!"});
                                       }
                             });
                   } else {
                             res.json({message: "Não foi possível encontrar o contador"});
                   }
            });

routerCodigo.route('/prefixo/:prefixo/prior')

            .get(function(req, res){
                   var prefixo = decodeURIComponent(req.params.prefixo);
                   if (prefixo !== "" && prefixo !== "undefined") {
                             contador = mongoose.model('Contador');
                             contador.findOne({prefixo: prefixo.toUpperCase()}, function(err, contador){
                                       if (err)
                                                res.send(err);
                                       if (contador != null) {
                                                contador.contador = contador.contador - 1;
                                                if (contador.contador < 0)
                                                          contador.contador = 0;
                                                contador.save(function(err){
                                                          if (err)
                                                                   res.send(err);
                                                });
                                                var num = contador.contador.toString();
                                                for (var i = num.length; i < contador.casas; i++)
                                                         num = "0"+num;
                                                res.json(contador.prefixo+'-'+num);
                                       } else {
                                                res.json({message: "Contador não foi encontrado!!"});
                                       }
                             });
                   } else {
                             res.json({message: "Não foi possível encontrar o contador"});
                   }
            });


routerCodigo.route('/prefixo/:prefixo/inc')

            .put(function(req, res){
                   var prefixo = decodeURIComponent(req.params.prefixo);
                   if (prefixo !== "" && prefixo !== "undefined") {
                             contador = mongoose.model('Contador');
                             contador.findOne({prefixo: prefixo.toUpperCase()}, function(err, contador){
                                       if (err)
                                                res.send(err);
                                       if (contador != null) {
                                                contador.contador = contador.contador + 1;
                                                contador.save(function(err){
                                                          if (err)
                                                                   res.send(err);
                                                });
                                                res.json(contador);
                                       } else {
                                                res.json({message: "Contador não foi encontrado!!"});
                                       }
                             });
                   } else {
                             res.json({message: "Não foi possível encontrar o contador"});
                   }
           });

routerCodigo.route('/prefixo/:prefixo/dec')

            .put(function(req, res){
                   var prefixo = decodeURIComponent(req.params.prefixo);
                   if (prefixo !== "" && prefixo !== "undefined") {
                             contador = mongoose.model('Contador');
                             contador.findOne({prefixo: prefixo.toUpperCase()}, function(err, contador){
                                       if (err)
                                                res.send(err);
                                       if (contador != null) {
                                                contador.contador = contador.contador - 1;
                                                if (contador.contador < 0)
                                                          contador.contador = 0;
                                                contador.save(function(err){
                                                          if (err)
                                                                   res.send(err);
                                                });
                                                res.json(contador);
                                       } else {
                                                res.json({message: "Contador não foi encontrado!!"});
                                       }
                             });
                   } else {
                             res.json({message: "Não foi possível encontrar o contador"});
                   }
            });

module.exports = routerCodigo;