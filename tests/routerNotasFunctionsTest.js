      var app = require("../notas");
      var server = require("../bin/www");
      var http = require("http");
      var rest = require('restler');
      var host = 'localhost';
      var port = '12345';


module.exports = {

      setUp: function(callback){
            server = http.createServer(app);
            callback();
      },

      tearDown: function(callback){
            callback();
      },

      getNotas: function(test){
            var command = rest.get('http://'+host+':'+port+'/notas/notas/all')
                 .on('success', function(data, response){
                       test.equals(response.statusCode,200,"Status de resposta!!");
                       test.ok(true);
                       test.done();
                 })
                 .on('error', function(err, response){
                       test.ok(false,"Erro ao buscar todas as Notas!!");
                       test.done();
                 });
            test.throws(command);
            test.expect(3);
      },

      getNotaVersaoNOTA0001: function(test){
            var command = rest.get('http://'+host+':'+port+'/notas/notas/'+'NOTA-0001'+'/versao')
                 .on('success', function(data, response){
                       test.equals(response.statusCode,200,"Status de resposta!!");
                       test.equals(data[0],2,"Versão da nota == 2!!");
                       test.done();
                 })
                 .on('error', function(err, response){
                       test.ok(false,"Erro ao buscar todas as Notas");
                       test.done();
                 });
            test.throws(command);
            test.expect(3);
      },

      getNotaVersaoATX0001: function(test){
            var command = rest.get('http://'+host+':'+port+'/notas/notas/'+'ATX-0001'+'/versao')
                 .on('success', function(data, response){
                       test.equal(response.statusCode,200,"Status de resposta!!");
                       test.equal(data.message,"Não foi possível encontrar a nota!!","Nota não encontrada!!");
                       test.done();
                 })
                 .on('error', function(err, response){
                        test.ok(false,"Erro ao buscar todas as Notas");
                        test.done();
                  });
            test.throws(command);
            test.expect(3);
      },

      getFirstNota: function(test){
            var command = rest.get("http://"+host+":"+port+"/notas/notas/first/1")
                 .on('success', function(data, response){
                       test.equal(response.statusCode,200,"Status de resposta!!");
                       test.ok(true);
                       test.done();
                  })
                  .on('error', function(err, response){
                       test.ok(false,"Erro ao buscar todas as Notas");
                       test.done();
                  });
            test.throws(command);
            test.expect(3);
      },

      getFirstTwentyNota: function(test){
            var command = rest.get("http://"+host+":"+port+"/notas/notas/first/20")
                 .on('success', function(data, response){
                       test.equal(response.statusCode,200,"Status de resposta!!");
                       test.ok(true);
                       test.done();
                  })
                  .on('error', function(err, response){
                       test.ok(false,"Erro ao buscar todas as Notas");
                       test.done();
                  });
            test.throws(command);
            test.expect(3);
      },

      insertNewNotaWhitoutArchives: function(test){
            /*
             *  Preparação de uma nota inserida para teste!!
             *  Somente com o propósito de testes....
             */
            var notadata = {codigo: 'nodeUnit-1000', nota: 'nodeUnit-0000 nota feita somente para teste',
                              tags: ['node','grunt','nodeunit'], versao: 0};

            notadata.nota = encodeURIComponent(notadata.nota);
            notadata.tags = encodeURIComponent(notadata.tags);

            var command = rest.post("http://"+host+":"+port+"/notas/notas/new", {
                  multipart: true,
                  data: notadata
            })
            .on('success', function(data, response){
                 test.equal(response.statusCode,200,"Status de resposta!!");
                 test.equal(data.message,"Nota criada com sucesso!!","Criação de notas...");
                 test.done();
            })
            .on('error', function(err, response){
                 test.ok(false,"Erro ao buscar todas as Notas");
                 test.done();
            });
            test.throws(command);
            test.expect(3);
      },

      insertNewNotaWhitoutNotaField: function(test){
            /*
             *  Preparação de uma nota inserida para teste!!
             *  Somente com o propósito de testes....
             */
            var notadata = {codigo: 'nodeUnit-2000',tags: ['node','grunt','nodeunit'],versao: 0};

            notadata.nota = encodeURIComponent(notadata.nota);
            notadata.tags = encodeURIComponent(notadata.tags);

            var command = rest.post("http://"+host+":"+port+"/notas/notas/new", {
                  multipart: true,
                  data: notadata
            })
            .on('success', function(data, response){
                 test.equal(response.statusCode,200,"Status de resposta!!");
                 test.equal(data.message,"Todos os campos devem ser preenchidos!!","Criação de notas...");
                 test.done();
            })
            .on('error', function(err, response){
                 test.ok(false,"Erro ao buscar todas as Notas");
                 test.done();
            });
            test.throws(command);
            test.expect(3);
      },

      insertRepeatedNewNota: function(test){
            /*
             *  Preparação de uma nota inserida para teste!!
             *  Somente com o propósito de testes....
             */
            var notadata = {codigo: 'nodeUnit-1000', nota: 'Esta nota já existe',
                                      tags: ['node','grunt','nodeunit'],versao: 0};

            notadata.nota = encodeURIComponent(notadata.nota);
            notadata.tags = encodeURIComponent(notadata.tags);

            var command = rest.post("http://"+host+":"+port+"/notas/notas/new", {
                  multipart: true,
                  data: notadata
            })
            .on('success', function(data, response){
                 test.equal(response.statusCode,200,"Status de resposta!!");
                 test.equal(data.message,"A nota já está cadastrada!!","Criação de notas...");
                 test.done();
            })
            .on('error', function(err, response){
                 test.ok(false,"Erro ao buscar todas as Notas");
                 test.done();
            });
            test.throws(command);
            test.expect(3);
      },

      deleteNotaByValidId: function(test){
            var id = "";
            var command = rest.get("http://"+host+":"+port+"/notas/notas/codigo/nodeUnit-1000")
            .on('success', function(data, response){
                 test.equal(response.statusCode,200,"Status de resposta!!");
                 id = data._id;
                 rest.del("http://"+host+":"+port+"/notas/notas/id/"+id)
                    .on('success', function(data,response){
                       test.equal(response.statusCode,200,"Status de resposta!!");
                       test.equal(data.message,"Nota excluída com sucesso!!","Exclusão por ID");
                       test.done();
                 })
                 .on('error', function(err, response){
                       test.ok(false,"Erro ao apagar uma nota!!");
                       test.done();
                 });
            })
            .on('error', function(err, response){
                 test.ok(false,"Erro ao buscar a Nota nodeUnit-1000!!");
                 test.done();
            });
           test.throws(command);
           test.expect(4);
      },

      insertEmptyNewNota: function(test){
            /*
             *  Preparação de uma nota inserida para teste!!
             *  Somente com o propósito de testes....
             */
            var notadata = {};

            notadata.nota = encodeURIComponent(notadata.nota);
            notadata.tags = encodeURIComponent(notadata.tags);

            var command = rest.post("http://"+host+":"+port+"/notas/notas/new", {
                  multipart: true,
                  data: notadata
            })
            .on('success', function(data, response){
                 test.equal(response.statusCode,200,"Status de resposta!!");
                 test.equal(data.message,"Digite um código para a nova Nota!!","Criação de notas...");
                 test.done();
            })
            .on('error', function(err, response){
                 test.ok(false,"Erro ao buscar todas as Notas");
                 test.done();
            });
            test.throws(command);
            test.expect(3);
      },

      insertNewNotaWithoutCodigo: function(test){
            /*
             *  Preparação de uma nota inserida para teste!!
             *  Somente com o propósito de testes....
             */
            var notadata = {nota:"Essa nota não é para ser inserida",tags:['teste','não deve funcionar']};

            notadata.nota = encodeURIComponent(notadata.nota);
            notadata.tags = encodeURIComponent(notadata.tags);

            var command = rest.post("http://"+host+":"+port+"/notas/notas/new", {
                  multipart: true,
                  data: notadata
            })
            .on('success', function(data, response){
                 test.equal(response.statusCode,200,"Status de resposta!!");
                 test.equal(data.message,"Digite um código para a nova Nota!!","Criação de notas...");
                 test.done();
            })
            .on('error', function(err, response){
                 test.ok(false,"Erro ao buscar todas as Notas");
                 test.done();
            });
            test.throws(command);
            test.expect(3);
      },

      insertNewNotaWithoutTags: function(test){
            /*
             *  Preparação de uma nota inserida para teste!!
             *  Somente com o propósito de testes....
             */
            var notadata = {codigo: 'ATX-1001', nota:"Essa nota não é para ser inserida"};

            notadata.nota = encodeURIComponent(notadata.nota);
            notadata.tags = encodeURIComponent(notadata.tags);

            var command = rest.post("http://"+host+":"+port+"/notas/notas/new", {
                  multipart: true,
                  data: notadata
            })
            .on('success', function(data, response){
                 test.equal(response.statusCode,200,"Status de resposta!!");
                 test.equal(data.message,"Todos os campos devem ser preenchidos!!","Criação de notas...");
                 test.done();
            })
            .on('error', function(err, response){
                 test.ok(false,"Erro ao buscar todas as Notas");
                 test.done();
            });
            test.throws(command);
            test.expect(3);
      },

      insertNewNotaWithIncompleteTags: function(test){
            /*
             *  Preparação de uma nota inserida para teste!!
             *  Somente com o propósito de testes....
             */
            var notadata = {codigo: 'ATX-1001', nota:"Essa nota não é para ser inserida", tags:['teste',,'passou!!']};

            notadata.nota = encodeURIComponent(notadata.nota);
            notadata.tags = encodeURIComponent(notadata.tags);

            var command = rest.post("http://"+host+":"+port+"/notas/notas/new", {
                  multipart: true,
                  data: notadata
            })
            .on('success', function(data, response){
                 test.equal(response.statusCode,200,"Status de resposta!!");
                 test.equal(data.message,"Todos os campos devem ser preenchidos!!","Criação de notas...");
                 test.done();
            })
            .on('error', function(err, response){
                 test.ok(false,"Erro ao buscar todas as Notas");
                 test.done();
            });
            test.throws(command);
            test.expect(3);
      },

      insertNewNotaWithEmptyTags: function(test){
            /*
             *  Preparação de uma nota inserida para teste!!
             *  Somente com o propósito de testes....
             */
            var notadata = {codigo: 'ATX-1001', nota:"Essa nota não é para ser inserida", tags:[]};

            notadata.nota = encodeURIComponent(notadata.nota);
            notadata.tags = encodeURIComponent(notadata.tags);

            var command = rest.post("http://"+host+":"+port+"/notas/notas/new", {
                  multipart: true,
                  data: notadata
            })
            .on('success', function(data, response){
                 test.equal(response.statusCode,200,"Status de resposta!!");
                 test.equal(data.message,"Todos os campos devem ser preenchidos!!","Criação de notas...");
                 test.done();
            })
            .on('error', function(err, response){
                 test.ok(false,"Erro ao buscar todas as Notas");
                 test.done();
            });
            test.throws(command);
            test.expect(3);
      },

      getNotasLike: function(test){
            var parameters = encodeURIComponent("nodeUnit-0000");
            var command = rest.get("http://"+host+":"+port+"/notas/notas/like/"+parameters)
                 .on('success', function(data,response){
                       test.equal(response.statusCode,200,"Status de resposta!!");
                       test.ok(true,"Busca de notas ...");
                       test.done();
                 })
                 .on('error', function(err, response){
                       test.ok(false,"Erro ao pesquisar uma Nota!!");
                       test.done();
                 });
           test.throws(command);
           test.expect(3);
      },

      getNotasByTagsLikeWithParameterOne: function(test){
           var parameters = "?"+"tags=bxa";
           var command = rest.get("http://"+host+":"+port+"/notas/notas/tags/like/"+parameters)
                 .on('success', function(data,response){
                       test.equal(response.statusCode,200,"Status de resposta!!");
                       test.equal(data[0],undefined,"Busca de notas ...");
                       test.done();
                 })
                 .on('error', function(err, response){
                       test.ok(false,"Erro ao pesquisar uma Nota!!");
                       test.done();
                 });
           test.throws(command);
           test.expect(3);
      },

      getNotasByTagsLikeWithTwoParameters: function(test){
           var parameters = "?"+"tags=nodeunit&tags=node";
           var command = rest.get("http://"+host+":"+port+"/notas/notas/tags/like/"+parameters)
                 .on('success', function(data,response){
                       test.equal(response.statusCode,200,"Status de resposta!!");
                       test.ok(true,"Busca de notas ...");
                       test.done();
                 })
                 .on('error', function(err, response){
                       test.ok(false,"Erro ao pesquisar uma Nota!!");
                       test.done();
                 });
           test.throws(command);
           test.expect(3);
      },

      getNotasByTagsLikeWithIncompleteParameters: function(test){
            var parameters = "?"+"=nodeunit&tags=node";
            var command = rest.get("http://"+host+":"+port+"/notas/notas/tags/like/"+parameters)
                 .on('success', function(data,response){
                       test.equal(response.statusCode,200,"Status de resposta!!");
                       test.ok(true,"Busca de notas ...");
                       test.done();
                 })
                 .on('error', function(err, response){
                       test.ok(false,"Erro ao pesquisar uma Nota!!");
                       test.done();
                 });
            test.throws(command);
            test.expect(3);
      },

      deleteNotaByInvalidId: function(test){
            var id = '56a130edd63688f02c000001';
            var command =  rest.del("http://"+host+":"+port+"/notas/notas/id/"+id)
            .on('success', function(data,response){
                 test.equal(response.statusCode,200,"Status de resposta!!");
                 test.equal(data.message,"Não existe a Nota a ser excluída!!","Exclusão por ID");
                 test.done();
            })
            .on('error', function(err, response){
                 test.ok(false,"Erro ao apagar uma nota!!");
                 test.done();
            });
            test.throws(command);
            test.expect(3);
      },

      deleteNotaByCodigo: function(test){

            var notadata = {codigo: 'nodeUnit-5555', nota: 'nodeUnit-5555 nota feita somente para teste',
                              tags: ['node','grunt','nodeunit'], versao: 0};

            notadata.nota = encodeURIComponent(notadata.nota);
            notadata.tags = encodeURIComponent(notadata.tags);

            var command = rest.post("http://"+host+":"+port+"/notas/notas/new", {
                  multipart: true,
                  data: notadata
                 })
                 .on('success', function(data, response){
                       rest.del("http://"+host+":"+port+"/notas/notas/codigo/"+data.codigo)
                       .on('success', function(data,response){
                             test.equal(response.statusCode,200,'200 ok!!');
                             test.equal(data.message,"Nota excluída com sucesso!!","Exclusão de Nota por código!!");
                             test.done();
                       })
                       .on('error', function(err, response){
                             test.ok(false,"Erro ao apagar uma nota!!");
                             test.done();
                       });
                 })
                 .on('error', function(err, response){
                       test.ok(false,"Erro ao buscar todas as Notas");
                       test.done();
                 });
            test.throws(command);
            test.expect(3);
      },

      updateNotaByCodigo: function(test){

            var notadata = {codigo: 'nodeUnit-5555', nota: 'nodeUnit-5555 nota feita somente para teste',
                              tags: ['node','grunt','nodeunit'], versao: 0};

            notadata.nota = encodeURIComponent(notadata.nota);
            notadata.tags = encodeURIComponent(notadata.tags);

            rest.post("http://"+host+":"+port+"/notas/notas/new", {
                 multipart: true,
                 data: notadata
            });

            var command = rest.get("http://"+host+":"+port+"/notas/notas/codigo/nodeUnit-5555")
                 .on('success', function(data, response){
                       var notadata = data;
                       notadata.nota = "conteúdo da nota nodeUnit-5555 alterado!!";
                       notadata.nota = encodeURIComponent(notadata.nota);
                       notadata.tags = encodeURIComponent(notadata.tags);
                       rest.put("http://"+host+":"+port+"/notas/notas/codigo/"+notadata.codigo,{
                             multipart: true,
                             data: notadata
                       })
                       .on('success', function(data,response){
                             test.equal(response.statusCode,200,'200 ok!!');
                             test.equal(data.message,"Nota alterada com sucesso!!","Alteração de nota existente!!");
                             test.done();
                       })
                       .on('error', function(err, response){
                             test.ok(false,"Erro ao apagar uma nota!!");
                             test.done();
                       });
                 })
                 .on('error', function(err, response){
                       test.ok(false,"Erro ao buscar todas as Notas");
                       test.done();
                 });
            test.throws(command);
            test.expect(3);

      },

      updateNotaThatNotExist: function(test){

            //Esta nota não existe!!

            var notadata = {codigo: 'XXAAXX-014272', nota: 'nodeUnit-5555 nota feita somente para teste',
                              tags: ['node','grunt','nodeunit'], versao: 0};

            notadata.nota = encodeURIComponent(notadata.nota);
            notadata.tags = encodeURIComponent(notadata.tags);

            var command = rest.put("http://"+host+":"+port+"/notas/notas/codigo/"+notadata.codigo,{
                 multipart: true,
                 data: notadata
            })
            .on('success', function(data,response){
                 test.equal(response.statusCode,200,'200 ok!!');
                 test.equal(data.message,"A nota não foi encontrada!!","Alteração de nota não existente!!");
                 test.done();
            })
            .on('error', function(err, response){
                 test.ok(false,"Erro ao apagar uma nota!!");
                 test.done();
            });
            test.throws(command);
            test.expect(3);
      },

      updateNotaWithoutNotaField: function(test){

            //Nota inserida para teste!!
            var insertData = {codigo: 'nodeUnit-1111', nota: 'nodeUnit-1111 nota feita somente para teste',
                              tags: ['node','grunt','nodeunit'], versao: 0};

            insertData.nota = encodeURIComponent(insertData.nota);
            insertData.tags = encodeURIComponent(insertData.tags);

            var command = rest.post("http://"+host+":"+port+"/notas/notas/new", {
                 multipart: true,
                 data: insertData
            })
            .on('success', function(data, response){
                  var notadata = {codigo: 'nodeUnit-1111', tags:['node','grunt','nodeunit'], versao: 0};
                  notadata.tags = encodeURIComponent(notadata.tags);
                  rest.put("http://"+host+":"+port+"/notas/notas/codigo/"+notadata.codigo,{
                       multipart: true,
                       data: notadata
                  })
                  .on('success', function(data,response){
                       test.equal(response.statusCode,200,'200 ok!!');
                       test.equal(data.message,"Todos os campos devem ser preenchidos!!","Alteração de nota!!");
                       test.done();
                  })
                  .on('error', function(err, response){
                       test.ok(false,"Erro ao apagar uma nota!!");
                       test.done();
                  });
            })
            .on('error', function(err, response){
                 test.ok(false,"Erro ao apagar uma nota!!");
                 test.done();
            });
            test.throws(command);
            test.expect(3);
      },

      updateNotaWithoutCodigoField: function(test){
            //Nota inserida para teste!!
            var insertData = {codigo: 'nodeUnit-1111', nota: 'nodeUnit-1111 nota feita somente para teste',
                              tags: ['node','grunt','nodeunit'], versao: 0};

            insertData.nota = encodeURIComponent(insertData.nota);
            insertData.tags = encodeURIComponent(insertData.tags);

            var command = rest.post("http://"+host+":"+port+"/notas/notas/new", {
                 multipart: true,
                 data: insertData
            })
            .on('success', function(data, response){
                  var notadata = {nota:'Essa nota não deve ser atualizada!!',tags:['node','grunt','nodeunit'], versao: 0};
                  notadata.tags = encodeURIComponent(notadata.tags);
                  rest.put("http://"+host+":"+port+"/notas/notas/codigo/"+notadata.codigo,{
                       multipart: true,
                       data: notadata
                  })
                  .on('success', function(data,response){
                       test.equal(response.statusCode,200,'200 ok!!');
                       test.equal(data.message,"A nota não foi encontrada!!","Alteração de nota!!");
                       test.done();
                  })
                  .on('error', function(err, response){
                       test.ok(false,"Erro ao apagar uma nota!!");
                       test.done();
                  });
            })
            .on('error', function(err, response){
                 test.ok(false,"Erro ao apagar uma nota!!");
                 test.done();
            });
            test.throws(command);
            test.expect(3);
      },

      updateNotaWithoutTagsField: function(test){
            //Nota inserida para teste!!
            var insertData = {codigo: 'nodeUnit-1111', nota: 'nodeUnit-1111 nota feita somente para teste',
                              tags: ['node','grunt','nodeunit'], versao: 0};

            insertData.nota = encodeURIComponent(insertData.nota);
            insertData.tags = encodeURIComponent(insertData.tags);

            var command = rest.post("http://"+host+":"+port+"/notas/notas/new", {
                 multipart: true,
                 data: insertData
            })
            .on('success', function(data, response){
                  var notadata = {codigo: 'nodeUnit-1111', nota:'Essa nota não deve ser atualizada!!',versao: 0};
                  notadata.tags = encodeURIComponent(notadata.tags);
                  rest.put("http://"+host+":"+port+"/notas/notas/codigo/"+notadata.codigo,{
                       multipart: true,
                       data: notadata
                  })
                  .on('success', function(data,response){
                       test.equal(response.statusCode,200,'200 ok!!');
                       test.equal(data.message,"Todos os campos devem ser preenchidos!!","Alteração de nota!!");
                       test.done();
                  })
                  .on('error', function(err, response){
                       test.ok(false,"Erro ao apagar uma nota!!");
                       test.done();
                  });
            })
            .on('error', function(err, response){
                 test.ok(false,"Erro ao apagar uma nota!!");
                 test.done();
            });
            test.throws(command);
            test.expect(3);
      },

      updateNotaWithImcompleteTagsField: function(test){
            //Nota inserida para teste!!
            var insertData = {codigo: 'nodeUnit-1111', nota: 'nodeUnit-1111 nota feita somente para teste',
                              tags: ['node','grunt','nodeunit'], versao: 0};

            insertData.nota = encodeURIComponent(insertData.nota);
            insertData.tags = encodeURIComponent(insertData.tags);

            var command = rest.post("http://"+host+":"+port+"/notas/notas/new", {
                 multipart: true,
                 data: insertData
            })
            .on('success', function(data, response){
                  var notadata = {codigo: 'nodeUnit-1111',
                                           nota:'Essa nota não deve ser atualizada!!',
                                           tags:['notasunit',,'não existe nota'],versao: 0};
                  notadata.tags = encodeURIComponent(notadata.tags);
                  rest.put("http://"+host+":"+port+"/notas/notas/codigo/"+notadata.codigo,{
                       multipart: true,
                       data: notadata
                  })
                  .on('success', function(data,response){
                       test.equal(response.statusCode,200,'200 ok!!');
                       test.equal(data.message,"Todos os campos devem ser preenchidos!!","Alteração de nota!!");
                       test.done();
                  })
                  .on('error', function(err, response){
                       test.ok(false,"Erro ao apagar uma nota!!");
                       test.done();
                  });
            })
            .on('error', function(err, response){
                 test.ok(false,"Erro ao apagar uma nota!!");
                 test.done();
            });
            test.throws(command);
            test.expect(3);
      },

      updateNotaWithIncorrectVersion: function(test){
            //Nota inserida para teste!!
            var insertData = {codigo: 'nodeUnit-1111', nota: 'nodeUnit-1111 nota feita somente para teste',
                              tags: ['node','grunt','nodeunit'], versao: 0};

            insertData.nota = encodeURIComponent(insertData.nota);
            insertData.tags = encodeURIComponent(insertData.tags);

            var command = rest.post("http://"+host+":"+port+"/notas/notas/new", {
                 multipart: true,
                 data: insertData
            })
            .on('success', function(data, response){
                  var notadata = {codigo: 'nodeUnit-1111',
                                           nota:'Essa nota não deve ser atualizada!!',
                                           tags:['notasunit','funciona!!','não existe nota'],
                                           versao: -1};
                  notadata.tags = encodeURIComponent(notadata.tags);
                  rest.put("http://"+host+":"+port+"/notas/notas/codigo/"+notadata.codigo,{
                       multipart: true,
                       data: notadata
                  })
                  .on('success', function(data,response){
                       test.equal(response.statusCode,200,'200 ok!!');
                       test.equal(data.message,"A nota está sendo alterada por outro usuário. Tente novamente mais tarde...!!","Alteração de nota!!");
                       test.done();
                  })
                  .on('error', function(err, response){
                       test.ok(false,"Erro ao apagar uma nota!!");
                       test.done();
                  });
            })
            .on('error', function(err, response){
                 test.ok(false,"Erro ao apagar uma nota!!");
                 test.done();
            });
            test.throws(command);
            test.expect(3);
      }


};
