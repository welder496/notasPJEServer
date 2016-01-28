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
                       test.equal(response.statusCode,200,"Status de resposta!!");
                       test.equal(typeof(data[0]),"object","Notas não foram encontradas");
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
                       test.equal(response.statusCode,200,"Status de resposta!!");
                       test.equal(data[0],2,"Versão da nota == 2!!");
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
                       test.ok(data !== null, "Notas não foram encontradas");
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
                       test.ok(data !== null, "Notas não foram encontradas!!");
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

      insertNewNotaWhithAccentsAndSpaceInTags: function(test){
            /*
             *  Preparação de uma nota inserida para teste!!
             *  Somente com o propósito de testes....
             */
            var notadata = {codigo: 'nodeUnit-1001', nota: 'nodeUnit-0000 nota feita somente para teste',
                              tags: ['Cod-00001','Regra de Negócio','água em falta','avó','excessão'], versao: 0};

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

      insertNewNotaWhitInvalidTagFiels: function(test){
            /*
             *  Preparação de uma nota inserida para teste!!
             *  Somente com o propósito de testes....
             */
            var notadata = {codigo: 'nodeUnit-9999', nota: 'nodeUnit-0000 nota feita somente para teste',
                              tags: ['k&@()*&¨@!','','£££12&*///????','????///url'], versao: 0};

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

      insertNewNotaWhithScriptTags: function(test){
            /*
             *  Preparação de uma nota inserida para teste!!
             *  Somente com o propósito de testes....
             */
            var notadata = {codigo: 'nodeUnit-7777', nota: 'nodeUnit-0000 nota feita somente para teste',
                              tags: ['<script>location.href="www.google.com.br"</script>','passou','£££12&*///????','????///url'], versao: 0};

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
                       test.ok(data !== null,"Busca de notas não encontrou as notas....");
                       test.done();
                 })
                 .on('error', function(err, response){
                       test.ok(false,"Erro ao pesquisar uma Nota!!");
                       test.done();
                 });
           test.throws(command);
           test.expect(3);
      },

      getNotasByTagsLikeWithValidParameter: function(test){
            var tags = "Admin, Perfil: Estagiário";
            var vector = tags.split(",");

            //Coleta todos os campos da busca por tag.
            var parameters = "";
            if (vector instanceof Array){
                 if (vector[0] != "") {
                       parameters=parameters+"tags="+encodeURIComponent(vector[0]);
                       for (var i=1;i<vector.length;i++) {
                            parameters=parameters+"&tags="+encodeURIComponent(vector[i]);
                       }
                 }
           }

           parameters="?"+parameters;

           var command = rest.get("http://"+host+":"+port+"/notas/notas/tags/like/"+parameters)
                 .on('success', function(data,response){
                       test.equal(response.statusCode,200,"Status de resposta!!");
                       test.equal(typeof(data[0]),"object","Busca de notas ...");
                       test.done();
                 })
                 .on('error', function(err, response){
                       test.ok(false,"Erro ao pesquisar uma Nota!!");
                       test.done();
                 });
           test.throws(command);
           test.expect(3);
      },


      getNotasByTagsLikeWithOneInvalidParameter: function(test){
            var tags = "bxa";
            var vector = tags.split(",");

            //Coleta todos os campos da busca por tag.
            var parameters = "";
            if (vector instanceof Array){
                 if (vector[0] != "") {
                       parameters=parameters+"tags="+encodeURIComponent(vector[0]);
                       for (var i=1;i<vector.length;i++) {
                            parameters=parameters+"&tags="+encodeURIComponent(vector[i]);
                       }
                 }
           }

           parameters="?"+parameters;

           var command = rest.get("http://"+host+":"+port+"/notas/notas/tags/like/"+parameters)
                 .on('success', function(data,response){
                       test.equal(response.statusCode,200,"Status de resposta!!");
                       test.equal(typeof(data[0]),"undefined","Busca de notas ...");
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
            var tags = "nodeunit,node";
            var vector = tags.split(",");

            //Coleta todos os campos da busca por tag.
            var parameters = "";
            if (vector instanceof Array){
                 if (vector[0] != "") {
                       parameters=parameters+"tags="+encodeURIComponent(vector[0]);
                       for (var i=1;i<vector.length;i++) {
                            parameters=parameters+"&tags="+encodeURIComponent(vector[i]);
                       }
                 }
           }

           parameters="?"+parameters;
           var command = rest.get("http://"+host+":"+port+"/notas/notas/tags/like/"+parameters)
                 .on('success', function(data,response){
                       test.equal(response.statusCode,200,"Status de resposta!!");
                       test.ok(typeof(data[0]),"object","Busca de notas não encontrou notas!!");
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
            var tags = "nodeunit,tes";
            var vector = tags.split(",");

            //Coleta todos os campos da busca por tag.
            var parameters = "";
            if (vector instanceof Array){
                 if (vector[0] != "") {
                       parameters=parameters+"tags="+encodeURIComponent(vector[0]);
                       for (var i=1;i<vector.length;i++) {
                            parameters=parameters+"&tags="+encodeURIComponent(vector[i]);
                       }
                 }
            }

            parameters="?"+parameters;
            var command = rest.get("http://"+host+":"+port+"/notas/notas/tags/like/"+parameters)
                 .on('success', function(data,response){
                       test.equal(response.statusCode,200,"Status de resposta!!");
                       test.equal(typeof(data[0]),"object","Busca de notas encontrou as notas");
                       test.done();
                 })
                 .on('error', function(err, response){
                       test.ok(false,"Erro ao pesquisar uma Nota!!");
                       test.done();
                 });
            test.throws(command);
            test.expect(3);
      },

      getNotasByTagsLikeWithSpaceAndAccents: function(test){
            var tags = "é uma,é";
            var vector = tags.split(",");

            //Coleta todos os campos da busca por tag.
            var parameters = "";
            if (vector instanceof Array){
                 if (vector[0] != "") {
                       parameters=parameters+"tags="+encodeURIComponent(vector[0]);
                       for (var i=1; i<vector.length; i++) {
                            parameters=parameters+"&tags="+encodeURIComponent(vector[i]);
                       }
                 }
            }

            parameters="?"+parameters;
            var command = rest.get("http://"+host+":"+port+"/notas/notas/tags/like/"+parameters)
                 .on('success', function(data,response){
                       test.equal(response.statusCode,200,"Status de resposta!!");
                       test.equal(typeof(data[0]),"object","Busca de notas não encontrou as notas");
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
      },

      updateNotaById: function(test){
            var insertData = {codigo: 'nodeUnit-3333',
                                       nota: 'nodeUnit-3333 nota feita somente para teste',
                                       tags: ['node','grunt','nodeunit'],
                                       versao: 5};

            insertData.nota = encodeURIComponent(insertData.nota);
            insertData.tags = encodeURIComponent(insertData.tags);

            var command = rest.post("http://"+host+":"+port+"/notas/notas/new", {
                 multipart: true,
                 data: insertData
            })
            .on('success', function(data, response){
                 rest.get("http://"+host+":"+port+"/notas/notas/codigo/nodeUnit-3333")
                 .on('success', function(data, response){
                       var id = data._id;
                       var notadata = {codigo: 'nodeUnit-3333',
                              nota: 'nodeUnit-3333 foi alterada por ID',
                              tags: ['node','grunt'],
                              versao: 5};

                       notadata.nota = encodeURIComponent(notadata.nota);
                       notadata.tags = encodeURIComponent(notadata.tags);

                       rest.put("http://"+host+":"+port+"/notas/notas/id/"+id,{
                             multipart: true,
                             data: notadata
                       })
                       .on('success', function(data,response){
                             test.equal(response.statusCode,200,'200 ok!!');
                             test.equal(data.message,"Nota alterada com sucesso!!","Alteração de nota existente!!");
                             test.done();
                       })
                       .on('error', function(err, response){
                             test.ok(false,"Erro ao alterar nota por ID!!");
                             test.done();
                       });
                 })
                 .on('error', function(err, response){
                       test.ok(false,"Erro ao buscar nota por ID!!");
                       test.done();
                 });
            })
            .on('error', function(err, response){
                 test.ok(false,"Erro ao buscar nota por ID!!");
                 test.done();
            });
            test.throws(command);
            test.expect(3);
      },

      updateNotaByIdWithWrongVersionNumber: function(test){
            var insertData = {codigo: 'nodeUnit-3333',
                                       nota: 'nodeUnit-3333 nota feita somente para teste',
                                       tags: ['node','grunt','nodeunit'],
                                       versao: 0};

            insertData.nota = encodeURIComponent(insertData.nota);
            insertData.tags = encodeURIComponent(insertData.tags);

            var command = rest.post("http://"+host+":"+port+"/notas/notas/new", {
                 multipart: true,
                 data: insertData
            })
            .on('success', function(data, response){
                 rest.get("http://"+host+":"+port+"/notas/notas/codigo/nodeUnit-3333")
                 .on('success', function(data, response){
                       var id = data._id;
                       var notadata = {codigo: 'nodeUnit-3333',
                              nota: 'nodeUnit-3333 foi alterada por ID',
                              tags: ['node','grunt'],
                              versao: -2};

                       notadata.nota = encodeURIComponent(notadata.nota);
                       notadata.tags = encodeURIComponent(notadata.tags);

                       rest.put("http://"+host+":"+port+"/notas/notas/id/"+id,{
                             multipart: true,
                             data: notadata
                       })
                       .on('success', function(data,response){
                             test.equal(response.statusCode,200,'200 ok!!');
                             test.equal(data.message,"A nota está sendo alterada por outro usuário. Tente novamente mais tarde...!!","Alteração de nota existente!!");
                             test.done();
                       })
                       .on('error', function(err, response){
                             test.ok(false,"Erro ao alterar nota por ID!!");
                             test.done();
                       });
                 })
                 .on('error', function(err, response){
                       test.ok(false,"Erro ao buscar nota por ID!!");
                       test.done();
                 });
            })
            .on('error', function(err, response){
                 test.ok(false,"Erro ao buscar nota por ID!!");
                 test.done();
            });
            test.throws(command);
            test.expect(3);
      },

      updateNotaByIdWithoutNotaField: function(test){
            var insertData = {codigo: 'nodeUnit-3333',
                                       nota: 'nodeUnit-3333 nota feita somente para teste',
                                       tags: ['node','grunt','nodeunit'],
                                       versao: 0};

            insertData.nota = encodeURIComponent(insertData.nota);
            insertData.tags = encodeURIComponent(insertData.tags);

            var command = rest.post("http://"+host+":"+port+"/notas/notas/new", {
                 multipart: true,
                 data: insertData
            })
            .on('success', function(data, response){
                 rest.get("http://"+host+":"+port+"/notas/notas/codigo/nodeUnit-3333")
                 .on('success', function(data, response){
                       var id = data._id;
                       var notadata = {codigo: 'nodeUnit-3333',
                              tags: ['node','grunt'],
                              versao: 0};

                       notadata.nota = encodeURIComponent(notadata.nota);
                       notadata.tags = encodeURIComponent(notadata.tags);

                       rest.put("http://"+host+":"+port+"/notas/notas/id/"+id,{
                             multipart: true,
                             data: notadata
                       })
                       .on('success', function(data,response){
                             test.equal(response.statusCode,200,'200 ok!!');
                             test.equal(data.message,"Todos os campos devem ser preenchidos!!","Alteração de nota existente!!");
                             test.done();
                       })
                       .on('error', function(err, response){
                             test.ok(false,"Erro ao alterar nota por ID!!");
                             test.done();
                       });
                 })
                 .on('error', function(err, response){
                       test.ok(false,"Erro ao buscar nota por ID!!");
                       test.done();
                 });
            })
            .on('error', function(err, response){
                 test.ok(false,"Erro ao buscar nota por ID!!");
                 test.done();
            });
            test.throws(command);
            test.expect(3);
      },

      updateNotaByIdWithoutTagsField: function(test){
            var insertData = {codigo: 'nodeUnit-3333',
                                       nota: 'nodeUnit-3333 nota feita somente para teste',
                                       tags: ['node','grunt','nodeunit'],
                                       versao: 0};

            insertData.nota = encodeURIComponent(insertData.nota);
            insertData.tags = encodeURIComponent(insertData.tags);

            var command = rest.post("http://"+host+":"+port+"/notas/notas/new", {
                 multipart: true,
                 data: insertData
            })
            .on('success', function(data, response){
                 rest.get("http://"+host+":"+port+"/notas/notas/codigo/nodeUnit-3333")
                 .on('success', function(data, response){
                       var id = data._id;
                       var notadata = {codigo: 'nodeUnit-3333',
                              nota: 'Essa nota é uma repetição',
                              versao: 0};

                       notadata.nota = encodeURIComponent(notadata.nota);
                       notadata.tags = encodeURIComponent(notadata.tags);

                       rest.put("http://"+host+":"+port+"/notas/notas/id/"+id,{
                             multipart: true,
                             data: notadata
                       })
                       .on('success', function(data,response){
                             test.equal(response.statusCode,200,'200 ok!!');
                             test.equal(data.message,"Todos os campos devem ser preenchidos!!","Alteração de nota existente!!");
                             test.done();
                       })
                       .on('error', function(err, response){
                             test.ok(false,"Erro ao alterar nota por ID!!");
                             test.done();
                       });
                 })
                 .on('error', function(err, response){
                       test.ok(false,"Erro ao buscar nota por ID!!");
                       test.done();
                 });
            })
            .on('error', function(err, response){
                 test.ok(false,"Erro ao buscar nota por ID!!");
                 test.done();
            });
            test.throws(command);
            test.expect(3);
      },

      updateNotaByIdWithIncompleteTagsField: function(test){
            var insertData = {codigo: 'nodeUnit-3333',
                                       nota: 'nodeUnit-3333 nota feita somente para teste',
                                       tags: ['node','grunt','nodeunit'],
                                       versao: 0};

            insertData.nota = encodeURIComponent(insertData.nota);
            insertData.tags = encodeURIComponent(insertData.tags);

            var command = rest.post("http://"+host+":"+port+"/notas/notas/new", {
                 multipart: true,
                 data: insertData
            })
            .on('success', function(data, response){
                 rest.get("http://"+host+":"+port+"/notas/notas/codigo/nodeUnit-3333")
                 .on('success', function(data, response){
                       var id = data._id;
                       var notadata = {codigo: 'nodeUnit-3333',
                              nota: 'Essa nota é uma repetição',
                              tags: [,'grunt','','nodeunit'],
                              versao: 0};

                       notadata.nota = encodeURIComponent(notadata.nota);
                       notadata.tags = encodeURIComponent(notadata.tags);

                       rest.put("http://"+host+":"+port+"/notas/notas/id/"+id,{
                             multipart: true,
                             data: notadata
                       })
                       .on('success', function(data,response){
                             test.equal(response.statusCode,200,'200 ok!!');
                             test.equal(data.message,"Todos os campos devem ser preenchidos!!","Alteração de nota existente!!");
                             test.done();
                       })
                       .on('error', function(err, response){
                             test.ok(false,"Erro ao alterar nota por ID!!");
                             test.done();
                       });
                 })
                 .on('error', function(err, response){
                       test.ok(false,"Erro ao buscar nota por ID!!");
                       test.done();
                 });
            })
            .on('error', function(err, response){
                 test.ok(false,"Erro ao buscar nota por ID!!");
                 test.done();
            });
            test.throws(command);
            test.expect(3);
      },

      updateNotaByIdWithAccentsAndSpacesInTags: function(test){
            var insertData = {codigo: 'nodeUnit-3333',
                                       nota: 'nodeUnit-3333 nota feita somente para teste',
                                       tags: ['node','grunt','nodeunit'],
                                       versao: 0};

            insertData.nota = encodeURIComponent(insertData.nota);
            insertData.tags = encodeURIComponent(insertData.tags);

            var command = rest.post("http://"+host+":"+port+"/notas/notas/new", {
                 multipart: true,
                 data: insertData
            })
            .on('success', function(data, response){
                 rest.get("http://"+host+":"+port+"/notas/notas/codigo/nodeUnit-3333")
                 .on('success', function(data, response){
                       var id = data._id;
                       var notadata = {codigo: 'nodeUnit-3333',
                              nota: 'Essa nota é uma repetição',
                              tags: ['função:>>testes','Teste: regressão','não funcional','Regra de negócio','avó','faltará água','sessões'],
                              versao: 10};

                       notadata.nota = encodeURIComponent(notadata.nota);
                       notadata.tags = encodeURIComponent(notadata.tags);

                       rest.put("http://"+host+":"+port+"/notas/notas/id/"+id,{
                             multipart: true,
                             data: notadata
                       })
                       .on('success', function(data,response){
                             test.equal(response.statusCode,200,'200 ok!!');
                             test.equal(data.message,"Nota alterada com sucesso!!","Alteração de nota existente!!");
                             test.done();
                       })
                       .on('error', function(err, response){
                             test.ok(false,"Erro ao alterar nota por ID!!");
                             test.done();
                       });
                 })
                 .on('error', function(err, response){
                       test.ok(false,"Erro ao buscar nota por ID!!");
                       test.done();
                 });
            })
            .on('error', function(err, response){
                 test.ok(false,"Erro ao buscar nota por ID!!");
                 test.done();
            });
            test.throws(command);
            test.expect(3);
      },


      updateNotaByIdWithInvalidTagsFields: function(test){
            var insertData = {codigo: 'nodeUnit-3333',
                                       nota: 'nodeUnit-3333 nota feita somente para teste',
                                       tags: ['node','grunt','nodeunit'],
                                       versao: 0};

            insertData.nota = encodeURIComponent(insertData.nota);
            insertData.tags = encodeURIComponent(insertData.tags);

            var command = rest.post("http://"+host+":"+port+"/notas/notas/new", {
                 multipart: true,
                 data: insertData
            })
            .on('success', function(data, response){
                 rest.get("http://"+host+":"+port+"/notas/notas/codigo/nodeUnit-3333")
                 .on('success', function(data, response){
                       var id = data._id;
                       var notadata = {codigo: 'nodeUnit-3333',
                              nota: 'Essa nota é uma repetição',
                              tags: [,'grunt','','nodeunit','<script>location.href="www.google.com.br"</script>'],
                              versao: 0};

                       notadata.nota = encodeURIComponent(notadata.nota);
                       notadata.tags = encodeURIComponent(notadata.tags);

                       rest.put("http://"+host+":"+port+"/notas/notas/id/"+id,{
                             multipart: true,
                             data: notadata
                       })
                       .on('success', function(data,response){
                             test.equal(response.statusCode,200,'200 ok!!');
                             test.equal(data.message,"Todos os campos devem ser preenchidos!!","Alteração de nota existente!!");
                             test.done();
                       })
                       .on('error', function(err, response){
                             test.ok(false,"Erro ao alterar nota por ID!!");
                             test.done();
                       });
                 })
                 .on('error', function(err, response){
                       test.ok(false,"Erro ao buscar nota por ID!!");
                       test.done();
                 });
            })
            .on('error', function(err, response){
                 test.ok(false,"Erro ao buscar nota por ID!!");
                 test.done();
            });
            test.throws(command);
            test.expect(3);
      },


      getNotaByCodigoLike: function(test){
            var codigo = 'ATX-0000';
            var command = rest.get("http://"+host+":"+port+"/notas/notas/codigo/like/"+codigo)
                 .on('success', function(data,response){
                       test.equal(response.statusCode,200,'200 ok!!');
                       test.ok(data !== null,"Notas foram encontradas!!");
                       test.done();
                 })
                 .on('error', function(err, response){
                       test.ok(false,"Erro ao buscar Nota no banco de dados!!");
                       test.done();
                 });
            test.throws(command);
            test.expect(3);
      },

      getNotasByTagsOr: function(test){
            var tags = "nodeunit,tes";
            var vector = tags.split(",");

            //Coleta todos os campos da busca por tag.
            var parameters = "";
            if (vector instanceof Array){
                 if (vector[0] != "") {
                       parameters=parameters+"tags="+encodeURIComponent(vector[0]);
                       for (var i=1;i<vector.length;i++) {
                            parameters=parameters+"&tags="+encodeURIComponent(vector[i]);
                       }
                 }
           }

           parameters="?"+parameters;
           var command = rest.get("http://"+host+":"+port+"/notas/notas/tags/or"+parameters)
                .on('success', function(data,response){
                       test.equal(response.statusCode,200,'200 ok!!');
                       test.ok(data !== null,"Notas foram encontradas!!");
                       test.done();
                })
                .on('error', function(err, response){
                       test.ok(false,"Erro ao buscar Nota no banco de dados!!");
                       test.done();
                });
            test.throws(command);
            test.expect(3);
      },

      getNotasByTagsOrWithParenthesis: function(test){
            var tags = "Funcionalidade: Tarefa>>Acordão (inteiro teor)";
            var vector = tags.split(",");

            //Coleta todos os campos da busca por tag.
            var parameters = "";
            if (vector instanceof Array){
                 if (vector[0] != "") {
                       parameters=parameters+"tags="+encodeURIComponent(vector[0]);
                       for (var i=1;i<vector.length;i++) {
                            parameters=parameters+"&tags="+encodeURIComponent(vector[i]);
                       }
                 }
           }

           parameters="?"+parameters;
           var command = rest.get("http://"+host+":"+port+"/notas/notas/tags/or"+parameters)
                .on('success', function(data,response){
                       test.equal(response.statusCode,200,'200 ok!!');
                       test.equal(typeof(data[0]),"object","Notas foram encontradas!!");
                       test.done();
                })
                .on('error', function(err, response){
                       test.ok(false,"Erro ao buscar Nota no banco de dados!!");
                       test.done();
                });
            test.throws(command);
            test.expect(3);
      },

      getNotasByTagsOrWithBrackets: function(test){
            var tags = "funcionalidade com [colchete]";
            var vector = tags.split(",");

            //Coleta todos os campos da busca por tag.
            var parameters = "";
            if (vector instanceof Array){
                 if (vector[0] != "") {
                       parameters=parameters+"tags="+encodeURIComponent(vector[0]);
                       for (var i=1;i<vector.length;i++) {
                            parameters=parameters+"&tags="+encodeURIComponent(vector[i]);
                       }
                 }
           }

           parameters="?"+parameters;
           var command = rest.get("http://"+host+":"+port+"/notas/notas/tags/or"+parameters)
                .on('success', function(data,response){
                       test.equal(response.statusCode,200,'200 ok!!');
                       test.equal(typeof(data[0]),"object","Notas foram encontradas!!");
                       test.done();
                })
                .on('error', function(err, response){
                       test.ok(false,"Erro ao buscar Nota no banco de dados!!");
                       test.done();
                });
            test.throws(command);
            test.expect(3);
      },


      getNotasByTagsOrIncomplete: function(test){
            var tags = "nodeunit,,tes";
            var vector = tags.split(",");

            //Coleta todos os campos da busca por tag.
            var parameters = "";
            if (vector instanceof Array){
                 if (vector[0] != "") {
                       parameters=parameters+"tags="+encodeURIComponent(vector[0]);
                       for (var i=1;i<vector.length;i++) {
                            parameters=parameters+"&tags="+encodeURIComponent(vector[i]);
                       }
                 }
           }

           parameters="?"+parameters;
           var command = rest.get("http://"+host+":"+port+"/notas/notas/tags/or"+parameters)
                .on('success', function(data,response){
                       test.equal(response.statusCode,200,'200 ok!!');
                       test.ok(data[0] !== null,"Notas foram encontradas!!");
                       test.done();
                })
                .on('error', function(err, response){
                       test.ok(false,"Erro ao buscar Nota no banco de dados!!");
                       test.done();
                });
            test.throws(command);
            test.expect(3);
      },

      getNotasByTagsOrWithSpecialChars: function(test){
            var tags = "nod///eu****nit,,&?&//,&&tes¨¨¨";
            var vector = tags.split(",");

            //Coleta todos os campos da busca por tag.
            var parameters = "";
            if (vector instanceof Array){
                 if (vector[0] != "") {
                       parameters=parameters+"tags="+encodeURIComponent(vector[0]);
                       for (var i=1;i<vector.length;i++) {
                            parameters=parameters+"&tags="+encodeURIComponent(vector[i]);
                       }
                 }
           }

           parameters="?"+parameters;
           var command = rest.get("http://"+host+":"+port+"/notas/notas/tags/or"+parameters)
                .on('success', function(data,response){
                       test.equal(response.statusCode,200,'200 ok!!');
                       test.ok(data[0] !== null,"Notas foram encontradas!!");
                       test.done();
                })
                .on('error', function(err, response){
                       test.ok(false,"Erro ao buscar Nota no banco de dados!!");
                       test.done();
                });
            test.throws(command);
            test.expect(3);
      },

      getNotasByTagsOrWithScriptTag: function(test){
            var tags = "<script>location.href=www.google.com.br</script>,&tags//==";
            var vector = tags.split(",");

            //Coleta todos os campos da busca por tag.
            var parameters = "";
            if (vector instanceof Array){
                 if (vector[0] != "") {
                       parameters=parameters+"tags="+encodeURIComponent(vector[0]);
                       for (var i=1;i<vector.length;i++) {
                            parameters=parameters+"&tags="+encodeURIComponent(vector[i]);
                       }
                 }
           }

           parameters="?"+parameters;
           var command = rest.get("http://"+host+":"+port+"/notas/notas/tags/or"+parameters)
                .on('success', function(data,response){
                       test.equal(response.statusCode,200,'200 ok!!');
                       test.ok(data[0] !== null,"Notas foram encontradas!!");
                       test.done();
                })
                .on('error', function(err, response){
                       test.ok(false,"Erro ao buscar Nota no banco de dados!!");
                       test.done();
                });
            test.throws(command);
            test.expect(3);
      },

      getNotasByTagsOrWithAccentsAndSpaces: function(test){
            var tags = "função:>>testes,avó,faltará água";
            var vector = tags.split(",");

            //Coleta todos os campos da busca por tag.
            var parameters = "";
            if (vector instanceof Array){
                 if (vector[0] != "") {
                       parameters=parameters+"tags="+encodeURIComponent(vector[0]);
                       for (var i=1;i<vector.length;i++) {
                            parameters=parameters+"&tags="+encodeURIComponent(vector[i]);
                       }
                 }
           }

           parameters="?"+parameters;
           var command = rest.get("http://"+host+":"+port+"/notas/notas/tags/or"+parameters)
                .on('success', function(data,response){
                       test.equal(response.statusCode,200,'200 ok!!');
                       test.ok(data[0] !== null,"Notas foram encontradas!!");
                       test.done();
                })
                .on('error', function(err, response){
                       test.ok(false,"Erro ao buscar Nota no banco de dados!!");
                       test.done();
                });
            test.throws(command);
            test.expect(3);
      },

      getNotasByTagsAnd: function(test){
            var tags = "nodeunit";
            var vector = tags.split(",");

            //Coleta todos os campos da busca por tag.
            var parameters = "";
            if (vector instanceof Array){
                 if (vector[0] != "") {
                       parameters=parameters+"tags="+encodeURIComponent(vector[0]);
                       for (var i=1;i<vector.length;i++) {
                            parameters=parameters+"&tags="+encodeURIComponent(vector[i]);
                       }
                 }
           }

           parameters="?"+parameters;
           var command = rest.get("http://"+host+":"+port+"/notas/notas/tags/and"+parameters)
                .on('success', function(data,response){
                       test.equal(response.statusCode,200,'200 ok!!');
                       test.ok(data[0] !== null,"Notas foram encontradas!!");
                       test.done();
                })
                .on('error', function(err, response){
                       test.ok(false,"Erro ao buscar Nota no banco de dados!!");
                       test.done();
                });
            test.throws(command);
            test.expect(3);
      },

      getNotasByTagsAndWithParenthesis: function(test){
            var tags = "Funcionalidade: Tarefa>>Acordão (inteiro teor)";
            var vector = tags.split(",");

            //Coleta todos os campos da busca por tag.
            var parameters = "";
            if (vector instanceof Array){
                 if (vector[0] != "") {
                       parameters=parameters+"tags="+encodeURIComponent(vector[0]);
                       for (var i=1;i<vector.length;i++) {
                            parameters=parameters+"&tags="+encodeURIComponent(vector[i]);
                       }
                 }
           }

           parameters="?"+parameters;
           var command = rest.get("http://"+host+":"+port+"/notas/notas/tags/and"+parameters)
                .on('success', function(data,response){
                       test.equal(response.statusCode,200,'200 ok!!');
                       test.equal(typeof(data[0]),"object","Notas foram encontradas!!");
                       test.done();
                })
                .on('error', function(err, response){
                       test.ok(false,"Erro ao buscar Nota no banco de dados!!");
                       test.done();
                });
            test.throws(command);
            test.expect(3);
      },

      getNotasByTagsAndWithBrackets: function(test){
            var tags = "funcionalidade com [colchete]";
            var vector = tags.split(",");

            //Coleta todos os campos da busca por tag.
            var parameters = "";
            if (vector instanceof Array){
                 if (vector[0] != "") {
                       parameters=parameters+"tags="+encodeURIComponent(vector[0]);
                       for (var i=1;i<vector.length;i++) {
                            parameters=parameters+"&tags="+encodeURIComponent(vector[i]);
                       }
                 }
           }

           parameters="?"+parameters;
           var command = rest.get("http://"+host+":"+port+"/notas/notas/tags/and"+parameters)
                .on('success', function(data,response){
                       test.equal(response.statusCode,200,'200 ok!!');
                       test.equal(typeof(data[0]),"object","Notas foram encontradas!!");
                       test.done();
                })
                .on('error', function(err, response){
                       test.ok(false,"Erro ao buscar Nota no banco de dados!!");
                       test.done();
                });
            test.throws(command);
            test.expect(3);
      },

      getNotasByTagsAndWithTwoTags: function(test){
            var tags = "nodeunit,tex";
            var vector = tags.split(',');

            var parameters = "";
            if (vector instanceof Array){
                  if (vector[0] != "") {
                         parameters=parameters+"tags="+encodeURIComponent(vector[0]);
                         for (var i=1;i<vector.length;i++) {
                            parameters=parameters+"&tags="+encodeURIComponent(vector[i]);
                         }
                  }
            }

           parameters="?"+parameters;
           var command = rest.get("http://"+host+":"+port+"/notas/notas/tags/and"+parameters)
                .on('success', function(data,response){
                       test.equal(response.statusCode,200,'200 ok!!');
                       test.equal(typeof(data[0]),"undefined","Notas não foram encontradas!!");
                       test.done();
                })
                .on('error', function(err, response){
                       test.ok(false,"Erro ao buscar Nota no banco de dados!!");
                       test.done();
                });
            test.throws(command);
            test.expect(3);
      },

      getNotasByTagsAndIncomplete: function(test){
            var tags = "nodeunit,,tex";
            var vector = tags.split(',');

            var parameters = "";
            if (vector instanceof Array){
                  if (vector[0] != "") {
                         parameters=parameters+"tags="+encodeURIComponent(vector[0]);
                         for (var i=1;i<vector.length;i++) {
                            parameters=parameters+"&tags="+encodeURIComponent(vector[i]);
                         }
                  }
            }

           parameters="?"+parameters;
           var command = rest.get("http://"+host+":"+port+"/notas/notas/tags/and"+parameters)
                .on('success', function(data,response){
                       test.equal(response.statusCode,200,'200 ok!!');
                       test.equal(typeof(data[0]),"undefined","Notas não foram encontradas!!");
                       test.done();
                })
                .on('error', function(err, response){
                       test.ok(false,"Erro ao buscar Nota no banco de dados!!");
                       test.done();
                });
            test.throws(command);
            test.expect(3);
      },

      getNotasByTagsAndWithSpecialChars: function(test){
            var tags = "nod&u&nit,,?//?,te&&x";
            var vector = tags.split(',');

            var parameters = "";
            if (vector instanceof Array){
                  if (vector[0] != "") {
                         parameters=parameters+"tags="+encodeURIComponent(vector[0]);
                         for (var i=1;i<vector.length;i++) {
                            parameters=parameters+"&tags="+encodeURIComponent(vector[i]);
                         }
                  }
            }

           parameters="?"+parameters;
           var command = rest.get("http://"+host+":"+port+"/notas/notas/tags/and"+parameters)
                .on('success', function(data,response){
                       test.equal(response.statusCode,200,'200 ok!!');
                       test.equal(typeof(data[0]),"undefined","Notas não foram encontradas!!");
                       test.done();
                })
                .on('error', function(err, response){
                       test.ok(false,"Erro ao buscar Nota no banco de dados!!");
                       test.done();
                });
            test.throws(command);
            test.expect(3);
      },

      getNotasByTagsAndWithScriptTags: function(test){
            var tags = "<script>location.href=www.google.com.br</script>,&-??%#@#!@";
            var vector = tags.split(',');

            var parameters = "";
            if (vector instanceof Array){
                  if (vector[0] != "") {
                         parameters=parameters+"tags="+encodeURIComponent(vector[0]);
                         for (var i=1;i<vector.length;i++) {
                            parameters=parameters+"&tags="+encodeURIComponent(vector[i]);
                         }
                  }
            }

           parameters="?"+parameters;
           var command = rest.get("http://"+host+":"+port+"/notas/notas/tags/and"+parameters)
                .on('success', function(data,response){
                       test.equal(response.statusCode,200,'200 ok!!');
                       test.equal(typeof(data[0]),"undefined","Notas não foram encontradas!!");
                       test.done();
                })
                .on('error', function(err, response){
                       test.ok(false,"Erro ao buscar Nota no banco de dados!!");
                       test.done();
                });
            test.throws(command);
            test.expect(3);
      },

      getNotasByTagsAndWithSpaceAndAccents: function(test){
            var tags = "função:>>testes, avó";
            var vector = tags.split(',');

            var parameters = "";
            if (vector instanceof Array){
                  if (vector[0] != "") {
                         parameters=parameters+"tags="+encodeURIComponent(vector[0]);
                         for (var i=1;i<vector.length;i++) {
                            parameters=parameters+"&tags="+encodeURIComponent(vector[i]);
                         }
                  }
            }

           parameters="?"+parameters;
           var command = rest.get("http://"+host+":"+port+"/notas/notas/tags/and"+parameters)
                .on('success', function(data,response){
                       test.equal(response.statusCode,200,'200 ok!!');
                       test.equal(typeof(data[0]),"object","Notas não foram encontradas!!");
                       test.done();
                })
                .on('error', function(err, response){
                       test.ok(false,"Erro ao buscar Nota no banco de dados!!");
                       test.done();
                });
            test.throws(command);
            test.expect(3);
      },

      getTagsMapReducre: function(test){
            var command =  rest.get("http://"+host+":"+port+"/notas/mapReduce/Tags")
                  .on("success", function(data, response){
                       test.equal(response.statusCode,200,'200 ok!!');
                       test.equal(typeof(data[0]),"object","Notas não foram encontradas!!");
                       test.done();
                  })
                  .on('error', function(err, response){
                       test.ok(false,"Erro ao formar mapa de Tags!!");
                       test.done();
                  })
            test.throws(command);
            test.expect(3);
      },

      deleteNotaByCodigoNOTA3333: function(test){
           var codigo='nodeUnit-3333';

           var command = rest.del("http://"+host+":"+port+"/notas/notas/codigo/"+codigo)
                 .on('success', function(data,response){
                       test.equal(response.statusCode,200,'200 ok!!');
                       test.equal(data.message,"Nota excluída com sucesso!!","Exclusão de Nota por código!!");
                       test.done();
                 })
                 .on('error', function(err, response){
                       test.ok(false,"Erro ao apagar uma nota!!");
                       test.done();
                 });
            test.throws(command);
            test.expect(3);
      },

      deleteNotaByCodigoNOTA1111: function(test){
           var codigo='nodeUnit-1111';

           var command = rest.del("http://"+host+":"+port+"/notas/notas/codigo/"+codigo)
                 .on('success', function(data,response){
                       test.equal(response.statusCode,200,'200 ok!!');
                       test.equal(data.message,"Nota excluída com sucesso!!","Exclusão de Nota por código!!");
                       test.done();
                 })
                 .on('error', function(err, response){
                       test.ok(false,"Erro ao apagar uma nota!!");
                       test.done();
                 });
            test.throws(command);
            test.expect(3);
      },

      deleteNotaByCodigoNOTA5555: function(test){
           var codigo='nodeUnit-5555';

           var command = rest.del("http://"+host+":"+port+"/notas/notas/codigo/"+codigo)
                 .on('success', function(data,response){
                       test.equal(response.statusCode,200,'200 ok!!');
                       test.equal(data.message,"Nota excluída com sucesso!!","Exclusão de Nota por código!!");
                       test.done();
                 })
                 .on('error', function(err, response){
                       test.ok(false,"Erro ao apagar uma nota!!");
                       test.done();
                 });
            test.throws(command);
            test.expect(3);
      },

      deleteNotaByCodigoNOTA7777: function(test){
           var codigo='nodeUnit-7777';

           var command = rest.del("http://"+host+":"+port+"/notas/notas/codigo/"+codigo)
                 .on('success', function(data,response){
                       test.equal(response.statusCode,200,'200 ok!!');
                       test.equal(data.message,"Nota excluída com sucesso!!","Exclusão de Nota por código!!");
                       test.done();
                 })
                 .on('error', function(err, response){
                       test.ok(false,"Erro ao apagar uma nota!!");
                       test.done();
                 });
            test.throws(command);
            test.expect(3);
      },

      deleteNotaByCodigoNOTA1001: function(test){
           var codigo='nodeUnit-1001';

           var command = rest.del("http://"+host+":"+port+"/notas/notas/codigo/"+codigo)
                 .on('success', function(data,response){
                       test.equal(response.statusCode,200,'200 ok!!');
                       test.equal(data.message,"Nota excluída com sucesso!!","Exclusão de Nota por código!!");
                       test.done();
                 })
                 .on('error', function(err, response){
                       test.ok(false,"Erro ao apagar uma nota!!");
                       test.done();
                 });
            test.throws(command);
            test.expect(3);
      }

};
