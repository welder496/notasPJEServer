var express = require('express');
var routerNotasTags = express.Router({mergeParams: true});
var mongoose = require('mongoose');
var notas = require('../model/notas');
var stack = require('localstack');

var parseData = function(str){
      var firstopr = "";
      var substr = {};
      var opr = "";
      while (! stack.isEmpty()) {
            stack.pop(function(data){
                 if (data.indexOf('$') != -1) {
                       if (firstopr == "") {
                            firstopr = data;
                            str[firstopr] = [];
                       } else {
                            opr = data;
                            substr[opr] = [];
                            str[firstopr].push(substr);
                       }
                       opr=data;
                 } else {
                       stack.push(data,function(data){});
                       stack.pop(function(data){
                             var value = data;
                             if (value.indexOf('$') == -1) {
                                  if (opr == firstopr)
                                       str[firstopr].push({tags: {$regex: new RegExp(value,'ig')}});
                                  else
                                       substr[opr].push({tags: {$regex: new RegExp(value,'ig')}});
                             } else {
                                  stack.push(value,function(data){});
                                  return;
                             }
                       });
                 }
           });
      }
      return str;
}

/*
 * Search with the Like operator, with OR behavior
 * This search operates over tags field. Values do not need to be exact.
 */
routerNotasTags.route('/like*')

      .get(function(req, res) {
           var itags = req.query;

           var search = [];

           if (itags.tags instanceof Array) {
                 var size = Object.keys(itags.tags).length;
                 for (var i=0; i < size; i++){
                       search.push(new RegExp(decodeURIComponent(itags.tags[i]),'ig'));
                 }
           } else {
                 search.push(new RegExp(decodeURIComponent(itags.tags),'ig'));
           }

             notas = mongoose.model('Notas');
             notas.find({tags: {$in: search}}).sort({'criado_em': -1}).exec(function(err, notas) {
                 if (err)
                       res.send(err);
                 if (notas != null){
                       res.json(notas);
                 } else {
                       res.json({message:"Notas não foram encontradas!!"});
                 }
           });
      });

/*
 * Search with the OR operator
 * Operates over tags with exact values.
 */
routerNotasTags.route('/or*')

      .get(function(req, res) {
            var itags = req.query;

            var search = [];

           if (itags.tags instanceof Array) {
                 var size = Object.keys(itags.tags).length;
                 for (var i=0; i < size; i++){
                       search.push({ tags :{ $regex: new RegExp(decodeURIComponent(itags.tags[i]),'ig')}});
                 }
           } else {
                 search.push({ tags: { $regex: new RegExp(decodeURIComponent(itags.tags),'ig')}});
           }

            notas = mongoose.model('Notas');
            notas.find({$or: search}).sort({'criado_em': -1}).exec(function(err, notas) {
                 if (err)
                       res.send(err);
                 if (notas != null){
                       res.json(notas);
                 } else {
                       res.json({message:"Notas não foram encontradas!!"});
                 }
            });
      });

/*
 * Search with AND operator with exact value behavior
 * The fields inputed into search most be complete
 */
routerNotasTags.route('/and*')

      .get(function(req, res) {
            var itags = req.query;

            var search = [];

           if (itags.tags instanceof Array) {
                 var size = Object.keys(itags.tags).length;
                 for (var i=0; i < size; i++){
                       search.push({ tags :{ $regex: new RegExp(decodeURIComponent(itags.tags[i]),'ig')}});
                 }
           } else {
                 search.push({ tags: { $regex: new RegExp(decodeURIComponent(itags.tags),'ig')}});
           }

            notas = mongoose.model('Notas');
            notas.find({$and: search}).sort({'criado_em': -1}).exec(function(err, notas) {
                 if (err)
                       res.send(err);
                 if (notas != null){
                       res.json(notas);
                 } else {
                       res.json({message:"Notas não foram encontradas!!"});
                 }
            });
      });

routerNotasTags.route('/search*')

      .get(function(req, res) {
            var searchTags = req.query;

            if (searchTags == "" || typeof(searchTags) == "undefined") {
                 searchTags = "";
            } else {
                 Object.keys(searchTags).forEach(function(key){
                       if (searchTags[key] instanceof Array) {
                             searchTags[key].forEach(function(value){
                                  stack.push(decodeURIComponent(value), function(data){});
                             });
                       } else {
                             stack.push(decodeURIComponent(searchTags[key]),function(data){});
                       }
                 });
                 stack.reverse();
            }

            stack.stack(function(data){
                  console.log(data);
            });

            //Mount commands for mongoDB search....
            var str = {};
            str = parseData(str);

            notas = mongoose.model('Notas');
            notas.find(str).sort({'criado_em': -1}).exec(function(err, notas) {
                 if (err)
                       res.send(err);
                 if (notas != null){
                       res.json(notas);
                 } else {
                       res.json({message:"Notas não foram encontradas!!"});
                 }
            });
      });

module.exports = routerNotasTags;