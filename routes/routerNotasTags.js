var express = require('express');
var routerNotasTags = express.Router({mergeParams: true});
var mongoose = require('mongoose');
var notas = require('../model/notas');
var stack = require('localstack');

var specialChars = ['(',')','[',']'];

/*
 * Do not delete this function... MongoDB needs it to build explicitily an regular expression!!
 */
var substitution = function(str){
      for (var i=0; i < specialChars.length; i++){
            var pos = str.indexOf(specialChars[i]);
            if (pos !== -1){
                var strtemp="";
                for (var j=0; j<str.length; j++){
                    if (j == pos){
                      strtemp=strtemp+"\\"+str[j];
                    } else {
                      strtemp=strtemp+str[j];
                    }
                }
                str = strtemp;
           }
      }
      strtemp = str;
      return strtemp;
};

var innerParser = function(obj) {
      var opr = "";
      while (! stack.isEmpty()) {
           stack.pop(function(data){
                 opr = data;
                 if (opr.indexOf('$') != -1) {
                       var elements = [];
                       var temp = {};
                       temp[opr] = [];
                       temp[opr] = innerParser(elements);
                       return obj.push(temp);
                 } else {
                       var temp = {tags : {$regex : new RegExp(opr,'ig')}};
                       obj.push(temp);
                 }
           });
      }
      return obj;
}

var parseData = function(obj){
      var opr = ""
      if (! stack.isEmpty()){
            stack.pop(function(data){
                 opr = data;
                 obj[opr] = [];
            });
      }

      var elements = [];
      obj[opr] = innerParser(elements);
      return obj;
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
                       var regtext = decodeURIComponent(itags.tags[i].replace(/[^a-z\u00C0-\u00ffA-Z0-9\-\.\s\>\:\(\)\[\]]+/g,'_').trim());
                       var newregexp = substitution(regtext);
                       search.push(new RegExp(regtext,'ig'));
                 }
           } else {
                 var regtext = decodeURIComponent(itags.tags.replace(/[^a-z\u00C0-\u00ffA-Z0-9\-\.\s\>\:\(\)\[\]]+/g,'_').trim());
                 var newregexp = substitution(regtext);
                 search.push(new RegExp(regtext,'ig'));
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
                       var regtext = decodeURIComponent(itags.tags[i].replace(/[^a-z\u00C0-\u00ffA-Z0-9\-\.\s\>\:\(\)\[\]]+/g,'_').trim());
                       var newregexp = substitution(regtext);
                       search.push({ tags :{ $regex: new RegExp(newregexp,'ig')}});
                 }
           } else {
                 var regtext = decodeURIComponent(itags.tags.replace(/[^a-z\u00C0-\u00ffA-Z0-9\-\.\s\>\:\(\)\[\]]+/g,'_').trim());
                 var newregexp = substitution(regtext);
                 search.push({ tags: { $regex: new RegExp(newregexp,'ig')}});
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
                       var regtext = decodeURIComponent(itags.tags[i].replace(/[^a-z\u00C0-\u00ffA-Z0-9\-\.\s\>\:\(\)\[\]]+/g,'_').trim());
                       var newregexp = substitution(regtext);
                       search.push({ tags :{ $regex: new RegExp(newregexp,'ig')}});
                 }
           } else {
                 var regtext = decodeURIComponent(itags.tags.replace(/[^a-z\u00C0-\u00ffA-Z0-9\-\.\s\>\:\(\)\[\]]+/g,'_').trim());
                 var newregexp = substitution(regtext);
                 search.push({ tags: { $regex: new RegExp(newregexp,'ig')}});
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
                                  var regtext = decodeURIComponent(value);
                                  var newtext = substitution(regtext);
                                  stack.push(newtext, function(data){});
                             });
                       } else {
                             var regtext = decodeURIComponent(searchTags[key]);
                             var newtext = substitution(regtext);
                             stack.push(decodeURIComponent(newtext),function(data){});
                       }
                 });
                 stack.reverse();
            }

            //Mount commands for mongoDB search....
            var obj = {};
            obj = parseData(obj);

            notas = mongoose.model('Notas');
            notas.find(obj).sort({'criado_em': -1}).exec(function(err, notas) {
                 if (err)
                       res.send(err);
                 if (notas != null){
                       res.json(notas);
                 }
            });
      });

module.exports = routerNotasTags;