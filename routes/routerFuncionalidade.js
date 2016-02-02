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
            var testDescricao = descricao.replace(/[^a-z\u00C0-\u00ffA-Z0-9\-\(\)\[\]\.\s\>\:]+/g,'_');
            if (descricao !== "" && descricao !== "undefined" && testDescricao.indexOf('_') === -1) {
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
           } else {
                 res.json({message: "Formato inválido de funcionalidade!!"});
           }
      })

      .put(function(req,res){
             var descricao = decodeURIComponent(req.params.descricao);
             var testDescricao = descricao.replace(/[^a-z\u00C0-\u00ffA-Z0-9\-\(\)\[\]\.\s\>\:]+/g,'_');
             var novaDescricao = decodeURIComponent(req.body.descricao);
             var testNovaDescricao = novadescricao.replace(/[^a-z\u00C0-\u00ffA-Z0-9\-\(\)\[\]\.\s\>\:]+/g,'_');
             var subTipos = decodeURIComponent(req.body.subtipo);
             var testSubTipos = subTipos.replace(/[^a-z\u00C0-\u00ffA-Z0-9\-\(\)\[\]\.\s\>\:]+/g,'_');

             if ((testSubTipos !== "undefined" && testSubTipos !== "" && testSubTipos.indexOf('_') === -1) &&
                 (testDescricao !== "undefined" && testDescricao !== "" && testDescricao.indexOf('_') === -1) &&
                 (testNovaDescricao !== "undefined" && testNovaDescricao !== "" && testNovaDescricao.indexOf('_') === -1)) {
                   var funcionalidade = mongoose.model('Funcionalidade');
                   funcionalidade.findOne({descricao: descricao}, function(err, funcionalidade){
                          if (funcionalidade !== null) {
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
             if (descricao !== "" && descricao !== "undefined") {
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
             var testDescricao = descricao.replace(/[^a-z\u00C0-\u00ffA-Z0-9\-\(\)\[\]\.\s\>\:]+/g,'_');
             var novaDescricao = decodeURIComponent(req.params.novaDescricao);
             var testNovaDescricao = novaDescricao.replace(/[^a-z\u00C0-\u00ffA-Z0-9\-\(\)\[\]\.\s\>\:]+/g,'_');

             if ((testDescricao !== "undefined" && testDescricao !== "" && testDescricao.indexOf('_') === -1) &&
                 (testNovaDescricao !== "undefined" && testNovaDescricao !== "" && testNovaDescricao.indexOf('_') === -1)) {
                   var funcionalidade = mongoose.model('Funcionalidade');
                   funcionalidade.findOne({descricao: descricao}, function(err, funcionalidade){
                       if (funcionalidade !== null) {
                             var func = mongoose.model('Funcionalidade');
                             func.findOne({descricao: novaDescricao}, function(err, func){
                                  if (func === null) {
                                        funcionalidade.descricao = novaDescricao;
                                        funcionalidade.save(function(err){
                                             if (err)
                                                   res.send(err);
                                        });
                                        res.json({message: "Descrição da funcionalidade atualizada com sucesso!!"});
                                  } else {
                                        res.json({message: "Novo nome usado na alteração já existe!!"});
                                  }
                             });
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
            var testDescricao = descricao.replace(/[^a-z\u00C0-\u00ffA-Z0-9\-\(\)\[\]\.\s\>\:]+/g,'_');
            var subtipo = decodeURIComponent(req.params.subtipo);
            var testSubTipo = subtipo.replace(/[^a-z\u00C0-\u00ffA-Z0-9\-\(\)\[\]\.\s\>\:]+/g,'_');
            var newsubtipo = decodeURIComponent(req.params.newsubtipo);
            var testNewSubTipo = newsubtipo.replace(/[^a-z\u00C0-\u00ffA-Z0-9\-\(\)\[\]\.\s\>\:]+/g,'_');

            if ((testDescricao !== "undefined" && testDescricao !== "" && testDescricao.indexOf('_') === -1) &&
                (testSubTipo !== "undefined" && testSubTipo !== "" && testSubTipo.indexOf('_') === -1) &&
                (testNewSubTipo !== "undefined" && testNewSubTipo !== "" && testNewSubTipo.indexOf('_') === -1)) {
                 var funcionalidade = mongoose.model('Funcionalidade');
                 funcionalidade.findOne({descricao: descricao}, function(err, funcionalidade){
                       if (funcionalidade !== null) {
                             var found = false;
                             if (funcionalidade.subtipos instanceof Array){
                                  var subtipos = funcionalidade.subtipos;
                                  subtipos.forEach(function(val){
                                        var temp = decodeURIComponent(val);
                                        if (temp === newsubtipo) {
                                              found = true;
                                        }
                                  });
                             }
                             if (! found) {
                                  funcionalidade.subtipos.splice(funcionalidade.subtipos.indexOf(subtipo),1,newsubtipo);
                                  funcionalidade.save(function(err){
                                        if (err)
                                             res.send(err);
                                  });
                                  res.json({message: "Subtipo da Funcionalidade atualizado com sucesso!!"});
                             } else {
                                  res.json({message: "Subtipo já existe!!"});
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
             var testDescricao = descricao.replace(/[^a-z\u00C0-\u00ffA-Z0-9\-\(\)\[\]\.\s\>\:]+/g,'_');
             var subtipo = decodeURIComponent(req.params.subtipo);
             var testSubTipo = subtipo.replace(/[^a-z\u00C0-\u00ffA-Z0-9\-\(\)\[\]\.\s\>\:]+/g,'_');
             if ((testDescricao !== "undefined" && testDescricao !== "" && testDescricao.indexOf('_') === -1) &&
                 (testSubTipo !== "undefined" && testSubTipo !== "" && testSubTipo.indexOf('_') === -1)) {
                   var funcionalidade = mongoose.model('Funcionalidade');
                   funcionalidade.findOne({descricao: descricao}, function(err, funcionalidade){
                          if (funcionalidade !== null) {
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
            if (descricao !== "undefined" && descricao !== "" &&
                 subtipo !== "undefined" && subtipo !== "") {
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
                 var descricao = decodeURIComponent(req.body.descricao);
                 var testDescricao = descricao.replace(/[^a-z\u00C0-\u00ffA-Z0-9\-\(\)\[\]\.\s\>\:]+/g,'_');

                 var subTipos = req.body.subtipo;
                 var subTiposOk = true;
                 if (subTipos instanceof Array) {
                       subTipos.forEach(function(key){
                             var subtipo = decodeURIComponent(key);
                             var testSubTipos = subtipo.replace(/[^a-z\u00C0-\u00ffA-Z0-9\-\(\)\[\]\.\s\>\:]+/g,'_');
                             subTiposOk = subTiposOk && (testSubTipos.indexOf('_') === -1);
                       });
                 } else
                 if (typeof(subTipos) === "string")  {
                       var testSubTipos = subTipos.replace(/[^a-z\u00C0-\u00ffA-Z0-9\-\(\)\[\]\.\s\>\:]+/g,'_');
                       subTiposOk = subTiposOk && (testSubTipos.indexOf('_') === -1);
                 }

                 if ((testDescricao !=="") && (testDescricao !== "undefined") &&
                    (testDescricao.indexOf('_') === -1) && (subTiposOk !== false)) {
                       var Funcionalidade = new funcionalidade();
                       Funcionalidade.descricao = descricao;
                       var subTipos = req.body.subtipo;
                       if (subTipos instanceof Array){
                            subTipos.forEach(function(key){
                                  var subtipo = decodeURIComponent(key);
                                  if (Funcionalidade.subtipos.indexOf(subtipo) === -1) {
                                        Funcionalidade.subtipos.push(subtipo);
                                  }
                            });
                       } else
                       if (typeof(subTipos) === "string") {
                            if (Funcionalidade.subtipos.indexOf(subTipos) === -1)
                                  Funcionalidade.subtipos.push(subTipos);
                       }
                       funcionalidade.findOne({descricao: descricao}, function(err, funcionalidade){
                            if (funcionalidade !== null) {
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
                       res.json({message: "Formato inválido para Funcionalidade!!"});
                 }
           } else {
                 res.json({message: "Não foi possível cadastrar a descrição de Funcionalidade!!"})
           }
      });

routerFuncionalidade.route('/new/:descricao/subtipo')

      .post(function(req,res){
            var funcionalidade = mongoose.model('Funcionalidade');
            if (req.body.hasOwnProperty('subtipo')){
                 var descricao = decodeURIComponent(req.params.descricao);
                 var testDescricao = descricao.replace(/[^a-z\u00C0-\u00ffA-Z0-9\-\(\)\[\]\.\s\>\:]+/g,'_');

                 var subTipos = req.body.subtipo;
                 var subTiposOk = true;
                 if (subTipos instanceof Array) {
                       subTipos.forEach(function(key){
                             var subtipo = decodeURIComponent(key);
                             var testSubTipos = subtipo.replace(/[^a-z\u00C0-\u00ffA-Z0-9\-\(\)\[\]\.\s\>\:]+/g,'_');
                             subTiposOk = subTiposOk && (testSubTipos.indexOf('_') === -1);
                       });
                 } else
                 if (typeof(subTipos) === "string")  {
                       var testSubTipos = subTipos.replace(/[^a-z\u00C0-\u00ffA-Z0-9\-\(\)\[\]\.\s\>\:]+/g,'_');
                       subTiposOk = subTiposOk && (testSubTipos.indexOf('_') === -1);
                 }

                 if ((testDescricao !== "") && (testDescricao !== "undefined") && (testDescricao.indexOf('_') === -1) &&
                     (subTiposOk !== false)) {
                       funcionalidade.findOne({descricao: descricao}).exec(function(err, funcionalidade){
                            if (err)
                                  res.json(err);
                            if (funcionalidade !== null) {
                                  var subTipos = req.body.subtipo;
                                  if (subTipos instanceof Array) {
                                        subTipos.forEach(function(key){
                                              var subtipo = key;
                                              if (funcionalidade.subtipos.indexOf(subtipo) === -1)
                                                    funcionalidade.subtipos.push(subtipo);
                                        });
                                  } else
                                  if (typeof(subTipos) === "string") {
                                        if (funcionalidade.subtipos.indexOf(subTipos) === -1)
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
                       res.json({message: "Formato inválido para a descrição da Funcionalidade!!"})
                 }
            } else {
                  res.json({message: "Não foi possível adicionar subtipo para esta Funcionalidade!!"});
            }
      });


module.exports = routerFuncionalidade;