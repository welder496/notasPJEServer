var express = require('express');
var routerStack = express.Router({mergeParams: true});
var mongoose = require('mongoose');
var stack = require('../model/stack');

routerStack.route('/push/:value')

         .post(function(req,res){
                 var value = req.params.value;
                 if (value != "") {
                          stack = mongoose.model('Stack');
                          stack.stack.push(value);
                          stack.save(function(err){
                                  if (err)
                                          res.send(err);
                                  res.json({message: "Valor foi empilhado com sucesso!!"});
                          });
                 } else {
                          res.json({message: "Não foi possível empilhar valor!!"});
                 }


         });

routerStack.route('/stack')

        .get(function(req,res){
                 stack = mongoose.model('Stack');
                 stack.find().exec(function(err, stack){
                          if (err)
                                   res.send(err);
                          res.json(stack.stack);
                 })
        });

routerStack.route('/pop')

         .get(function(req,res){
                 stack = mongoose.model('Stack');
                 stack.find().exec(function(err, stack){
                          if (err)
                                  res.send(err);
                          if (stack.stack != null){
                                  if (stack.stack.length != 0) {
                                           res.json(stack[0]);
                                           stack.stack.shift();
                                           stack.save(function(err){
                                                   if (err)
                                                            res.send(err);
                                           });
                                  } else {
                                           res.json({message: "Pilha está vazia!!"});
                                  }
                          }
                 });
         });

module.exports = routerStack;