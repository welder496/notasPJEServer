var express = require('express');
var routerFuncionalidade = express.Router({mergeParams: true});
var mongoose = require('mongoose');
var perfil = require('../model/funcionalidades');

routerFuncionalidade.route('/all')

      .get(function(req,res){
            var funcionalidade = mongoose.model('Funcionalidade');
            funcionalidade.find().sort({'descricao':1}).exec(function(err, funcionalidade) {
                    if (err)
                          res.send(err);
                    if (funcionalidade != null) {
                          res.json(funcionalidade);
                    } else {
                          res.json({message: "Funcionalidades não foram encontradas!!"});
                    }
            });
      });


routerFuncionalidade.route('/descricao/:descricao')

      .get(function(req,res){
             var descricao = decodeURIComponent(req.params.descricao);

             var funcionalidade = mongoose.model('Funcionalidade');
             funcionalidade.findOne({descricao: descricao}, function(err, funcionalidade){
                   if (err)
                        res.send(err);
                   if (funcionalidade != null) {
                        res.json(funcionalidade);
                   } else {
                        res.json({message: "Funcionalidade não foi encontrada!!"});
                   }
             });
      })

      .post(function(req, res){
             var descricao = decodeURIComponent(req.params.descricao);

             var funcionalidade = mongoose.model('Funcionalidade');
             funcionalidade.findOne({descricao: descricao}, function(err, funcionalidade){
                   if (err)
                          res.send(err);
                   if (funcionalidade == null) {
                          funcionalidade = mongoose.model('Funcionalidade');
                          var Funcionalidade = new funcionalidade();
                          Funcionalidade.descricao = descricao;
                          Funcionalidade.save(function(err){
                                if (err)
                                      res.send(err);
                          });
                          res.json({message: "Funcionalidade cadastrada com sucesso!!"});
                   } else {
                          res.json({message: "Funcionalidade já existe!!"});
                   }
             });
      })

      .put(function(req,res){
             var descricao = decodeURIComponent(req.params.descricao);
             var novaDescricao = decodeURIComponent(req.body.descricao);
             var subTipos = decodeURIComponent(req.body.subtipo);

             if (typeof(subTipos) != "undefined" && subTipos != "" &&
                 typeof(descricao) != "undefined" && descricao != "" &&
                 typeof(novaDescricao) != "undefined" && novaDescricao != "") {
                   var funcionalidade = mongoose.model('Funcionalidade');
                   funcionalidade.findOne({descricao: descricao}, function(err, funcionalidade){
                          if (funcionalidade != null) {
                                funcionalidade.descricao = novaDescricao;
                                subTipos.forEach(function(key){
                                      var subtipo = key;
                                      if (funcionalidade.subtipos.indexOf(subtipo) == -1)
                                             funcionalidade.subtipos.push(subtipo);
                                });
                                funcionalidade.save(function(err){
                                      if (err)
                                             res.send(err);
                                });
                                res.json({message: "Funcionalidade atualizada com sucesso!!"});
                          } else {
                                res.json({message: "Não foi possível encontrar a Funcionalidade!!"});
                          }
                   });
             } else {
                   res.json({message: "Não foi possível atualizar a Funcionalidade!!"});
             }
      })

      .delete(function(req,res){
             var descricao = decodeURIComponent(req.params.descricao);

             var funcionalidade = mongoose.model('Funcionalidade');
             if (descricao != "" && typeof(descricao) != "undefined") {
                  funcionalidade.remove({descricao: descricao}, function(err, funcionalidade){
                          if (err)
                                res.send(err);
                          if (funcionalidade != null) {
                                res.json({message: "Funcionalidade excluída com sucesso!!"});
                          } else {
                                res.json({message: "Funcionalidade não encontrada!!"});
                          }
                  });
             } else {
                  res.json({message: "Não foi possível excluir a Funcionalidade!!"});
             }
      });

routerFuncionalidade.route('/descricao/:descricao/to/:novaDescricao')

      .put(function(req,res){
             var descricao = decodeURIComponent(req.params.descricao);
             var novaDescricao = decodeURIComponent(req.params.novaDescricao);

             if (typeof(descricao) != "undefined" && descricao != "" &&
                 typeof(novaDescricao) != "undefined" && novaDescricao != "") {
                   var funcionalidade = mongoose.model('Funcionalidade');
                   funcionalidade.findOne({descricao: descricao}, function(err, funcionalidade){
                          if (funcionalidade != null) {
                                funcionalidade.descricao = novaDescricao;
                                funcionalidade.save(function(err){
                                      if (err)
                                             res.send(err);
                                });
                                res.json({message: "Descrição da funcionalidade atualizada com sucesso!!"});
                          } else {
                                res.json({message: "Não foi possível encontrar a Funcionalidade!!"});
                          }
                   });
             } else {
                  res.json({message: "Não foi possível atualizar a descrição da Funcionalidade!!"});
             }

      });

routerFuncionalidade.route('/descricao/:descricao/subtipo/:subtipo/to/:newsubtipo')

      .put(function(req,res){
            var descricao = decodeURIComponent(req.params.descricao);
            var subtipo = decodeURIComponent(req.params.subtipo);
            var newsubtipo = decodeURIComponent(req.params.newsubtipo);

            if (typeof(descricao) != "undefined" && descricao != "" &&
                typeof(subtipo) != "undefined" && subtipo != "" &&
                typeof(newsubtipo) != "undefined" && newsubtipo != "") {
                  var funcionalidade = mongoose.model('Funcionalidade');
                  funcionalidade.findOne({descricao: descricao}, function(err, funcionalidade){
                          if (funcionalidade != null) {
                                if (funcionalidade.subtipos.indexOf(subtipo) != -1) {
                                      funcionalidade.subtipos.splice(funcionalidade.subtipos.indexOf(subtipo),1,newsubtipo);
                                      funcionalidade.save(function(err){
                                            if (err)
                                                   res.send(err);
                                      });
                                      res.json({message: "Subtipo da Funcionalidade atualizado com sucesso!!"});
                                } else {
                                      res.json({message: "Subtipo não encontrado!!"});
                                }
                          } else {
                                res.json({message: "Não foi possível encontrar a Funcionalidade!!"});
                          }
                  });
            } else {
                  res.json({message: "Não foi possível atualizar o subtipo da Funcionalidade!!"});
            }
      });

routerFuncionalidade.route('/descricao/:descricao/subtipo/:subtipo')

      .post(function(req,res){
             var descricao = decodeURIComponent(req.params.descricao);
             var subtipo = decodeURIComponent(req.params.subtipo);
             if (typeof(descricao) != "undefined" && descricao != "" &&
                 typeof(subtipo) != "undefined" && subtipo != "") {
                   var funcionalidade = mongoose.model('Funcionalidade');
                   funcionalidade.findOne({descricao: descricao}, function(err, funcionalidade){
                          if (funcionalidade != null) {
                                if (funcionalidade.subtipos.indexOf(subtipo) == -1) {
                                      funcionalidade.subtipos.push(subtipo);
                                      funcionalidade.save(function(err){
                                             if (err)
                                                   res.send(err);
                                      });
                                      res.json({message: "Subtipo adicionado com sucesso!!"});
                                } else {
                                       res.json({message:"Subtipo já existe!!"});
                                }
                          } else {
                                res.json({message: "Não foi possível encontrar a Funcionalidade!!"});
                          }
                   });
             } else {
                    res.json({message: "Não foi possível adicionar subtipo à Funcionalidade!!"});
             }
      })

      .delete(function(req,res){
             var descricao = decodeURIComponent(req.params.descricao);
             var subtipo = decodeURIComponent(req.params.subtipo);
             if (typeof(descricao) != "undefined" && descricao != "" &&
                 typeof(subtipo) != "undefined" && subtipo !="") {
                   var funcionalidade = mongoose.model('Funcionalidade');
                   funcionalidade.findOne({descricao: descricao}, function(err, funcionalidade){
                          if (funcionalidade != null) {
                               if (funcionalidade.subtipos.indexOf(subtipo) != -1) {
                                      funcionalidade.subtipos.splice(funcionalidade.subtipos.indexOf(subtipo),1);
                                      funcionalidade.save(function(err){
                                            if (err)
                                                   res.send(err);
                                      });
                                      res.json({message: "Subtipo excluído com sucesso!!"});
                                } else {
                                      res.json({message:"Subtipo não existe!!"});
                                }
                          } else {
                                res.json({message: "Não foi possível encontrar a Funcionalidade!!"});
                          }
                   });
             } else {
                    res.json({message: "Não foi possível excluir subtipo da Funcionalidade!!"});
             }
      });

routerFuncionalidade.route('/new')

      .post(function(req,res){
            var funcionalidade = mongoose.model('Funcionalidade');
            if (req.body.hasOwnProperty('descricao')) {
                   var Funcionalidade = new funcionalidade();
                   Funcionalidade.descricao = decodeURIComponent(req.body.descricao);
                   var subTipos = decodeURIComponent(req.body.subtipo);
                   if (typeof(subTipos) == "string") {
                          subTipos.forEach(function(key){
                                var subtipo = key;
                                if (Funcionalidade.subtipos.indexOf(subtipo) == -1)
                                       Funcionalidade.subtipos.push(subtipo);
                          });
                   } else
                   if (typeof(subTipos)!="undefined")  {
                          if (Funcionalidade.subtipos.indexOf(subTipos) == -1)
                                Funcionalidade.subtipos.push(subTipos);
                   }
                   funcionalidade.findOne({descricao: Funcionalidade.descricao}, function(err, funcionalidade){
                          if (funcionalidade != null) {
                                res.json({message: "Funcionalidade já está cadastrada!!"});
                          } else {
                                Funcionalidade.save(function(err){
                                      if (err)
                                             res.send(err);
                                });
                                res.json({message: "Funcionalidade cadastrada com sucesso!!"});
                          }
                  });
            } else {
                   res.json({message: "Não foi possível cadastrar a descrição de Funcionalidade!!"})
            }
      });

routerFuncionalidade.route('/new/:descricao/subtipo')

      .post(function(req,res){
            var funcionalidade = mongoose.model('Funcionalidade');
            if (req.body.hasOwnProperty('subtipo')){
                  var descricao = decodeURIComponent(req.params.descricao);
                  var subTipos = decodeURIComponent(req.body.subtipo);
                  funcionalidade.findOne({descricao: descricao}).exec(function(err, funcionalidade){
                         if (err)
                             res.json(err);
                         if (funcionalidade != null) {
                                if (typeof(subTipos) == "string") {
                                       subTipos.forEach(function(key){
                                             var subtipo = key;
                                             if (funcionalidade.subtipos.indexOf(subtipo) == -1)
                                                   funcionalidade.subtipos.push(subtipo);
                                       });
                                } else
                                if (typeof(subTipos) != "undefined") {
                                      if (funcionalidade.subtipos.indexOf(subTipos) == -1)
                                             funcionalidade.subtipos.push(subTipos);
                                }
                                funcionalidade.save(function(err){
                                      if (err)
                                             res.json(err);
                                });
                                res.json({message: "Subtipo de Funcionalidade adicionado com sucesso!!"});
                         }
                  });
            } else {
                  res.json({message: "Não foi possível adicionar subtipo para esta Funcionalidade!!"});
            }
      });


module.exports = routerFuncionalidade;