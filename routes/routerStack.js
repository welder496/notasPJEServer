var express = require('express');
var routerStack = express.Router({mergeParams: true});
var mongoose = require('mongoose');
var stack = require('../model/stack');

routerStack.route('/new')

            .post(function(req,res){
                 stack = mongoose.model('Stack');
                 var Stack = new stack();
                 Stack.descricao = "Owner";
                 Stack.pilha = [];
                 stack.findOne({descricao: "Owner"}, function(err, stack){
                         if (stack == null) {
                              Stack.save(function(err){
                                       if (err)
                                             res.send(err);
                                       res.json({message: "Pilha criada com sucesso!!"});
                              });
                         } else {
                                 res.json({message: "Pilha já existe!!"});
                         } ;
                 });
            });

routerStack.route('/stack')

            .get(function(req,res){
                 stack = mongoose.model('Stack');
                 stack.find().exec(function(err, stack){
                          if (err)
                                  res.send(err);
                          if (stack.length != 0) {
                                  res.json(stack[0]);
                          } else {
                                  res.json({message: "Não existe(m) pilha(s)!!"});
                          }
                 });
            });

routerStack.route('/clear')

            .put(function(req,res){
                 stack = mongoose.model('Stack');
                 if (stack.length != 0) {
                          stack.find().exec(function(err,stack){
                                  stack[0].pilha = [];
                                  stack[0].save(function(err){
                                          if (err)
                                                   res.send(err);
                                  });
                                  res.json({message: "Pilha limpa com sucesso!!"});
                          });
                 } else {
                          res.json({message: "Não existe pilha!!"});
                 }
           });

routerStack.route('/push/:valor')

            .put(function(req,res){
                 var value = decodeURIComponent(req.params.valor);
                 stack = mongoose.model('Stack');
                 stack.findOne({descricao: "Owner"}, function(err, stack){
                          if (stack != null) {
                                  if (value != "") {
                                           stack.pilha.unshift(value);
                                           stack.save(function(err){
                                                   if (err)
                                                            res.send(err);
                                           });
                                           res.json({message: "Valor empilhado com sucesso!!"});
                                  } else {
                                           res.json({message: "Valor não foi empilhado!!"});
                                  }
                          } else {
                                  res.json({message: "Não existe pilha!!"});
                          }
                 });
           });

routerStack.route('/resetAll')

            .delete(function(req,res){
                 stack = mongoose.model('Stack');
                 stack.remove(function(err){
                          if (err)
                                  res.send(err);
                          res.json({message: "Pilhas removidas com sucesso!!"});
                 });
           });

routerStack.route('/pop')

           .get(function(req,res){
                 stack = mongoose.model('Stack');
                 stack.findOne({descricao: "Owner"}).exec(function(err, stack){
                       if (err)
                            res.send(err);
                       if (stack != null){
                            if (stack.pilha.length != 0) {
                                  res.json(stack.pilha.shift());
                                  stack.save(function(err){
                                        if (err)
                                             res.send(err);
                                  });
                            } else {
                                  res.json({message: "Pilha está vazia!!"});
                            }
                       } else {
                            res.json({message: "Não existe pilha!!"});
                       }
                 });
           });

module.exports = routerStack;