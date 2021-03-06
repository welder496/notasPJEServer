var express = require('express');
var routerPerfil = express.Router({mergeParams: true});
var mongoose = require('mongoose');
var perfil = require('../model/perfis');

routerPerfil.route('/all')

      .get(function(req,res){

            perfil = mongoose.model('Perfil');
            perfil.find().sort({'descricao': 1}).exec(function(err, perfil) {
                 if (err)
                       res.send(err);
                 if (perfil != null) {
                       res.json(perfil);
                 } else {
                       res.json({message:"Perfis não foram encontrados!!"});
                 }
            });
      });

routerPerfil.route('/new')

      .post(function(req,res){

             perfil = mongoose.model('Perfil');
             if (req.body.hasOwnProperty('descricao')) {

                   var descricao = decodeURIComponent(req.body.descricao);
                   var testDescricao = descricao.replace(/[^a-z\u00C0-\u00ffA-Z0-9\-\(\)\[\]\.\s\>\:]+/g,'_');

                   if (descricao !== "undefined" && descricao !== "" && testDescricao.indexOf('_') === -1) {
                          var Perfil = new perfil();
                          Perfil.descricao = descricao;

                          perfil.findOne({descricao: Perfil.descricao}, function(err, perfil){
                                if (perfil !== null) {
                                      res.json({message: "Perfil foi encontrado!!"});
                                } else {
                                       Perfil.save(function(err){
                                              if (err)
                                                     res.send(err);
                                       });
                                       res.json({message: "Perfil cadastrado com sucesso!!"});
                                 }
                          });
                   } else {
                          res.json({message: "Descrição do Perfil não foi informada!!"});
                   }
             } else {
                res.json({message:"Não foi possível cadastrar a descrição de Perfil!!"});
             }
      });

routerPerfil.route('/:descricao')

      .delete(function(req,res){
             perfil = mongoose.model('Perfil');
             var descricao = decodeURIComponent(req.params.descricao);
             if (descricao != "" && typeof(descricao) != "undefined") {
                    perfil.remove({descricao: descricao}, function(err,perfil){
                        if (err)
                              res.send(err);
                        if (perfil != null) {
                            res.json({message: "Perfil excluído com sucesso!!"});
                        } else {
                            res.json({message: "Perfil não encontrado!!"});
                        }
                    });
             } else {
                   res.json({message: "Não foi possível apagar a descrição de Perfil!!"});
            }
      });

routerPerfil.route('/:id')

      .delete(function(req,res){
             perfil = mongoose.model('Perfil');
             var id = req.params.id;
             if (id != "" && typeof(id) != "undefined") {
                    perfil.remove({_id: id}, function(err,perfil){
                        if (err)
                              res.send(err);
                        if (perfil != null) {
                            res.json({message: "Perfil excluído com sucesso!!"});
                        } else {
                            res.json({message: "Perfil não foi encontrado!!"});
                        }
                    });
             } else {
                   res.json({message: "Não foi possível apagar a descrição de Perfil!!"});
            }
      });


routerPerfil.route('/:id/:descricao')

      .put(function(req,res){
            perfil = mongoose.model('Perfil');
            var id = req.params.id;
            var descricao = decodeURIComponent(req.params.descricao);
            var testDescricao = descricao.replace(/[^a-z\u00C0-\u00ffA-Z0-9\-\(\)\[\]\.\s\>\:]+/g,'_');
            if ((id !== "" && id !== "undefined") && (descricao !== "undefined" && descricao !== "") &&
                 (testDescricao.indexOf('_') === -1)) {
                       perfil.findOne({_id: id}, function(err,perfil){
                             if (err)
                                  res.send(err);
                             if (perfil != null) {
                                  perfil.descricao = descricao;
                                  perfil.save(function(err){
                                        if (err)
                                              res.send(err);
                                        res.json({message: "Perfil alterado com sucesso!!"});
                                  });
                             } else {
                                  res.json({message: "Perfil não foi encontrado!!"});
                             }
                 });
            } else {
                 res.json({message: "Não foi possível alterar o Perfil!!"});
            }
      });


module.exports = routerPerfil;