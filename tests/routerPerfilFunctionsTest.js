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

      newPerfil: function(test){
       var descricao = encodeURIComponent("Perfil de Teste");
       var command = rest.post('http://'+host+":"+port+'/notas/perfil/new',
            {
              data: {descricao: descricao}
            })
            .on('success', function(data,response){
                 test.equal(response.statusCode,200,"Status de resposta!!");
                 test.equal(data.message,"Perfil cadastrado com sucesso!!","Perfil cadastrado com sucesso!!");
                 test.done();
            })
            .on('error', function(err, response){
                 test.ok(false,"Erro ao inserir perfil!!");
                 test.done();
            });
            test.throws(command);
            test.expect(3);
      },

      newRepeteadPerfil: function(test){
       var descricao = encodeURIComponent("Perfil de Teste");
       var command = rest.post('http://'+host+":"+port+'/notas/perfil/new',
            {
              data: {descricao: descricao}
            })
            .on('success', function(data,response){
                 test.equal(response.statusCode,200,"Status de resposta!!");
                 test.equal(data.message,"Perfil foi encontrado!!","Perfil repetido!!");
                 test.done();
            })
            .on('error', function(err, response){
                 test.ok(false,"Erro ao inserir perfil!!");
                 test.done();
            });
            test.throws(command);
            test.expect(3);
      },

      newEmptyPerfil: function(test){
       var descricao = encodeURIComponent("");
       var command = rest.post('http://'+host+":"+port+'/notas/perfil/new',
            {
              data: {descricao: descricao}
            })
            .on('success', function(data,response){
                 test.equal(response.statusCode,200,"Status de resposta!!");
                 test.equal(data.message,"Descrição do Perfil não foi informada!!","Perfil repetido!!");
                 test.done();
            })
            .on('error', function(err, response){
                 test.ok(false,"Erro ao inserir perfil!!");
                 test.done();
            });
            test.throws(command);
            test.expect(3);
      },

      newUndefinedPerfil: function(test){
       var descricao = null;
       var command = rest.post('http://'+host+":"+port+'/notas/perfil/new',
            {
              data: {descricao: descricao}
            })
            .on('success', function(data,response){
                 test.equal(response.statusCode,200,"Status de resposta!!");
                 test.equal(data.message,"Descrição do Perfil não foi informada!!","Perfil repetido!!");
                 test.done();
            })
            .on('error', function(err, response){
                 test.ok(false,"Erro ao inserir perfil!!");
                 test.done();
            });
            test.throws(command);
            test.expect(3);
      },

      newPerfilWithScript: function(test){
       var descricao = encodeURIComponent("<script>location.href='www.google.com'</script>");;
       var command = rest.post('http://'+host+":"+port+'/notas/perfil/new',
            {
              data: {descricao: descricao}
            })
            .on('success', function(data,response){
                 test.equal(response.statusCode,200,"Status de resposta!!");
                 test.equal(data.message,"Descrição do Perfil não foi informada!!","Perfil repetido!!");
                 test.done();
            })
            .on('error', function(err, response){
                 test.ok(false,"Erro ao inserir perfil!!");
                 test.done();
            });
            test.throws(command);
            test.expect(3);
      },

      newPerfilWithInvalidChars: function(test){
       var descricao = encodeURIComponent("/teste/***@@@77&&¨¨¨ ");;
       var command = rest.post('http://'+host+":"+port+'/notas/perfil/new',
            {
              data: {descricao: descricao}
            })
            .on('success', function(data,response){
                 test.equal(response.statusCode,200,"Status de resposta!!");
                 test.equal(data.message,"Descrição do Perfil não foi informada!!","Perfil repetido!!");
                 test.done();
            })
            .on('error', function(err, response){
                 test.ok(false,"Erro ao inserir perfil!!");
                 test.done();
            });
            test.throws(command);
            test.expect(3);
      },

      deletePerfilByDescricao: function(test){
          var descricao = encodeURIComponent('Perfil de Teste');
          var command = rest.del('http://'+host+":"+port+'/notas/perfil/'+descricao)
          .on('success', function(data,response){
                test.equal(response.statusCode,200,"Status de resposta!!");
                test.equal(data.message,"Perfil excluído com sucesso!!","Perfil não foi excluído!!");
                test.done();
          })
          .on('error', function(err, response){
                test.ok(false,"Erro ao excluir perfil!!");
                test.done();
          });
          test.throws(command);
          test.expect(3);
      },

      updatePerfilById: function(test){
           var descricao = encodeURIComponent('Procuraror MP-Gestor (estagiário)');
           var id ="5602960edddaac740e000028";
           var command = rest.put('http://'+host+':'+port+'/notas/perfil/'+id+'/'+descricao)
           .on('success', function(data,response){
                test.equal(response.statusCode,200,"Status de resposta!!");
                test.equal(data.message,"Perfil alterado com sucesso!!","Perfil alterado com sucesso!!");
                test.done();
           })
           .on('error', function(err, response){
                test.ok(false,"Erro ao atualizar perfil!!");
                test.done();
           });
           test.throws(command);
           test.expect(3);
      },

      updatePerfilByIdWithScript: function(test){
           var descricao = encodeURIComponent('Procuraror MP<script>location.href="www.google.com.br"</script>Gestor (estagiário)');
           var id ="5602960edddaac740e000028";
           var command = rest.put('http://'+host+':'+port+'/notas/perfil/'+id+'/'+descricao)
           .on('success', function(data,response){
                test.equal(response.statusCode,200,"Status de resposta!!");
                test.equal(data.message,"Não foi possível alterar o Perfil!!","Perfil com script!!");
                test.done();
           })
           .on('error', function(err, response){
                test.ok(false,"Erro ao atualizar perfil!!");
                test.done();
           });
           test.throws(command);
           test.expect(3);
      },

      updatePerfilByIdWithInvalidChars: function(test){
           var descricao = encodeURIComponent('Proc___uraror MP/Gestor ¬ >>@@@§§§§');
           var id ="5602960edddaac740e000028";
           var command = rest.put('http://'+host+':'+port+'/notas/perfil/'+id+'/'+descricao)
           .on('success', function(data,response){
                test.equal(response.statusCode,200,"Status de resposta!!");
                test.equal(data.message,"Não foi possível alterar o Perfil!!","Perfil com caracteres inválidos!!");
                test.done();
           })
           .on('error', function(err, response){
                test.ok(false,"Erro ao atualizar perfil!!");
                test.done();
           });
           test.throws(command);
           test.expect(3);
      },

      updatePerfilByIdThatNotExist: function(test){
           var descricao = encodeURIComponent('Procuraror MP-Gestor');
           var id ="C6B2A60edddaac740e0000BB";
           var command = rest.put('http://'+host+':'+port+'/notas/perfil/'+id+'/'+descricao)
           .on('success', function(data,response){
                test.equal(response.statusCode,200,"Status de resposta!!");
                test.equal(data.message,"Perfil não foi encontrado!!","Perfil a ser alterado não existe!!");
                test.done();
           })
           .on('error', function(err, response){
                test.ok(false,"Erro ao atualizar perfil!!");
                test.done();
           });
           test.throws(command);
           test.expect(3);
      },

      getPerfils: function(test){
           var command = rest.get('http://'+host+":"+port+'/notas/perfil/all')
           .on('success', function(data,response){
                test.equal(response.statusCode,200,"Status de resposta!!");
                test.equal(typeof(data[0]),"object","Perfil não foi excluído!!");
                test.done();
           })
           .on('error', function(err,response){
                callback({message: "Erro ao buscar Perfil"});
           });
          test.throws(command);
          test.expect(3);
      }

};