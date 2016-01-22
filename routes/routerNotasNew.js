/* global __base */
var express = require('express');
var routerNotasNew = express.Router({mergeParams: true});
var mongoose = require('mongoose');
var notas = require('../model/notas');
var fs = require('extfs');
var docs = __base + '/documentos';

routerNotasNew.route('/')

     .post(function(req, res) {
           notas = mongoose.model('Notas');
           if (req.body.hasOwnProperty('codigo')){
                 var Notas = new notas();

                 Notas.codigo = req.body.codigo.toUpperCase().trim();
                 Notas.nota = decodeURIComponent(req.body.nota);

                 var files = req.files;
                 var fileKeys = Object.keys(req.files);
                 fileKeys.forEach(function(key){
                       var arquivo = files[key].originalname.replace(/[^a-z\u00C0-\u00ffA-Z0-9\-()\[\]\.]+/g,'_');
                       if (arquivo.substring(arquivo.lastIndexOf(".")).toLowerCase() != '.js')
                            if (Notas.arquivos.indexOf(arquivo) == -1)
                                  Notas.arquivos.push(arquivo);
                 });

                 Notas.tags = decodeURIComponent(req.body.tags);
                 var tagsOk = false;
                 if (Notas.tags[0] !== "undefined") {
                       var tags = Notas.tags[0].split(',');
                       if (tags !== "undefined") {
                             tagsOk = true;
                             tags.forEach(function(value){
                                  tagsOk = tagsOk && (value !== "");
                             });
                       }
                 }

                 if (Notas.codigo !== "" && Notas.nota !== "undefined" && tagsOk !== false) {
                       notas.findOne({codigo:Notas.codigo}, function(err, notas){
                            if (notas != null){
                                  res.json({message: "A nota já está cadastrada!!"});
                            } else {
                                  Notas.save(function(err) {
                                        if (err)
                                             res.send(err);
                                        if (Notas.arquivos.length > 0) {
                                             fs.mkdir(docs,function(err){
                                                   fs.mkdir(docs+'/'+Notas._id,function(err){
                                                         fileKeys.forEach(function(key){
                                                                var arquivo = docs+'/'+Notas._id+'/'+files[key].originalname.replace(/[^a-z\u00C0-\u00ffA-Z0-9\-()\[\]\.]+/g,'_');
                                                                if (arquivo.substring(arquivo.lastIndexOf(".")).toLowerCase() != '.js') {
                                                                      var writeStream = fs.createWriteStream(arquivo);
                                                                      writeStream.write(files[key].buffer);
                                                                      writeStream.end();
                                                                }
                                                         });
                                                   });
                                             });
                                        }
                                  });
                                  res.json({message: 'Nota criada com sucesso!!'});
                            }
                       });
                 } else {
                       res.json({message: "Todos os campos devem ser preenchidos!!"});
                 }
           } else {
                 res.json({message: "Digite um código para a nova Nota!!"});
           }
      });

module.exports = routerNotasNew;