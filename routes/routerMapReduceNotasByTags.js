var express = require('express');
var routerMapReduceNotasByTags = express.Router({mergeParams: true});
var mongoose = require('mongoose');
var notas = require('../model/notas');

var Tags={};

Tags.map = function(){
    if (this.tags != null) {
         var vetor = this.tags;
         vetor.forEach(function(valor){
              var iVetor = valor.split(',');
              iVetor.forEach(function(iValor){
                        emit(iValor.trim(), 1);
             })
         });
    }
}

Tags.reduce = function(key, value){
         return value.length;
}

Tags.out = {replace: 'tags'}

routerMapReduceNotasByTags.route('/Tags')

         .get(function(req, res){
                   var Notas = mongoose.model('Notas');
                   Notas.mapReduce(Tags, function(err, model, stats){
                             model.find().where('value').gt(3).sort({value: -1}).exec(function(err, notas){
                                      if (err)
                                                res.send(err);
                                      res.json(notas);
                             });
                   });
         });


module.exports = routerMapReduceNotasByTags;