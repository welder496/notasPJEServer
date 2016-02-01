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

      getFuncionalidades: function(test){
            var command = rest.get('http://'+host+":"+port+'/notas/funcionalidade/all')
                 .on('success', function(data,response){
                       test.equal(response.statusCode,200,"Status de resposta!!");
                       test.equal(typeof(data[0]),"object","Funcionalidades carregadas com sucesso!!");
                       test.done();
                 })
                  .on('error', function(err,response){
                       test.ok(false,"Erro ao buscar Funcionalidades!!");
                       test.done();
                 });
            test.throws(command);
            test.expect(3);
      },

      getFuncionalidadeByDescricao: function(test){
            var descricao = encodeURIComponent("Acesso ao Push");
            var command = rest.get('http://'+host+":"+port+'/notas/funcionalidade/descricao/'+descricao)
               .on('success', function(data,response){
                      test.equal(response.statusCode,200,"Status de resposta!!");
                      test.equal(typeof(data),"object","Funcionalidades carregadas com sucesso!!");
                      test.done();
               })
               .on('error', function(err,response){
                      test.ok(false,"Erro ao buscar Funcionalidades!!");
                      test.done();
               });
            test.throws(command);
            test.expect(3);
      },

      getFuncionalidadeThatNotExistByDescricao: function(test){
            var descricao = encodeURIComponent("Tesde de funcionalidade");
            var command = rest.get('http://'+host+":"+port+'/notas/funcionalidade/descricao/'+descricao)
               .on('success', function(data,response){
                      test.equal(response.statusCode,200,"Status de resposta!!");
                      test.equal(data.message,"Funcionalidade não foi encontrada!!","Funcionalidades carregadas com sucesso!!");
                      test.done();
               })
               .on('error', function(err,response){
                      test.ok(false,"Erro ao buscar Funcionalidades!!");
                      test.done();
               });
            test.throws(command);
            test.expect(3);
      },

      newFuncionalidadeByDescricao: function(test){
            var descricao = encodeURIComponent("Teste de funcionalidade");
            var command = rest.post('http://'+host+":"+port+'/notas/funcionalidade/descricao/'+descricao)
                 .on('success', function(data,response){
                      test.equal(response.statusCode,200,"Status de resposta!!");
                      test.equal(data.message,"Funcionalidade cadastrada com sucesso!!","Funcionalidades cadastrada!!");
                      test.done();
                 })
                 .on('error', function(err,response){
                      test.ok(false,"Erro ao inserir Funcionalidades!!");
                      test.done();
                 });
            test.throws(command);
            test.expect(3);
      },

      newFuncionalidadeByInvalidDescricao: function(test){
            var descricao = encodeURIComponent("T&@$$$este de f?ªªªuncionalidade");
            var command = rest.post('http://'+host+":"+port+'/notas/funcionalidade/descricao/'+descricao)
                 .on('success', function(data,response){
                      test.equal(response.statusCode,200,"Status de resposta!!");
                      test.equal(data.message,"Formato inválido de funcionalidade!!","Funcionalidades não cadastrada!!");
                      test.done();
                 })
                 .on('error', function(err,response){
                      test.ok(false,"Erro ao inserir Funcionalidades!!");
                      test.done();
                 });
            test.throws(command);
            test.expect(3);
      },

      newFuncionalidadeByDescricaoWithScriptOne: function(test){
            var descricao = encodeURIComponent("Teste de <script>location.href='www.google.com' funcionalidade");
            var command = rest.post('http://'+host+":"+port+'/notas/funcionalidade/descricao/'+descricao)
                 .on('success', function(data,response){
                      test.equal(response.statusCode,200,"Status de resposta!!");
                      test.equal(data.message,"Formato inválido de funcionalidade!!","Funcionalidades não cadastrada!!");
                      test.done();
                 })
                 .on('error', function(err,response){
                      test.ok(false,"Erro ao inserir Funcionalidades!!");
                      test.done();
                 });
            test.throws(command);
            test.expect(3);
      },

      newFuncionalidadeByDescricaoWithScriptTwo: function(test){
            var descricao = encodeURIComponent("Teste de <script>location.href='www.google.com'</script>funcionalidade");
            var command = rest.post('http://'+host+":"+port+'/notas/funcionalidade/descricao/'+descricao)
                 .on('success', function(data,response){
                      test.equal(response.statusCode,200,"Status de resposta!!");
                      test.equal(data.message,"Formato inválido de funcionalidade!!","Funcionalidades não cadastrada!!");
                      test.done();
                 })
                 .on('error', function(err,response){
                      test.ok(false,"Erro ao inserir Funcionalidades!!");
                      test.done();
                 });
            test.throws(command);
            test.expect(3);
      },

      newFuncionalidadeByDescricaoTwo: function(test){
            var descricao = encodeURIComponent("Teste de alteração");
            var command = rest.post('http://'+host+":"+port+'/notas/funcionalidade/descricao/'+descricao)
                 .on('success', function(data,response){
                      test.equal(response.statusCode,200,"Status de resposta!!");
                      test.equal(data.message,"Funcionalidade cadastrada com sucesso!!","Funcionalidades cadastrada!!");
                      test.done();
                 })
                 .on('error', function(err,response){
                      test.ok(false,"Erro ao inserir Funcionalidades!!");
                      test.done();
                 });
            test.throws(command);
            test.expect(3);
      },

      updateFuncionalidadeOnlyDescricaoOne: function(test){
            var descricao = encodeURIComponent('Teste de alteração');
            var novaDescricao = encodeURIComponent('Teste de alteração de descrição');
            var command = rest.put('http://'+host+":"+port+'/notas/funcionalidade/descricao/'+descricao+'/to/'+novaDescricao)
                 .on('success', function(data,response){
                      test.equal(response.statusCode,200,"Status de resposta!!");
                      test.equal(data.message,"Descrição da funcionalidade atualizada com sucesso!!","Funcionalidades cadastrada!!");
                      test.done();
                 })
                 .on('error', function(err,response){
                      test.ok(false,"Erro ao atualizar Funcionalidade!!");
                      test.done();
                 });
            test.throws(command);
            test.expect(3);
      },


      updateFuncionalidadeOnlyDescricaoTwo: function(test){
            var descricao = encodeURIComponent('Teste de alteração de descrição');
            var novaDescricao = encodeURIComponent('Teste de alteração');
            var command = rest.put('http://'+host+":"+port+'/notas/funcionalidade/descricao/'+descricao+'/to/'+novaDescricao)
                 .on('success', function(data,response){
                      test.equal(response.statusCode,200,"Status de resposta!!");
                      test.equal(data.message,"Descrição da funcionalidade atualizada com sucesso!!","Funcionalidades cadastrada!!");
                      test.done();
                 })
                 .on('error', function(err,response){
                      test.ok(false,"Erro ao atualizar Funcionalidade!!");
                      test.done();
                 });
            test.throws(command);
            test.expect(3);
      },

      updateFuncionalidadeOnlyDescricaoThree: function(test){
            var descricao = encodeURIComponent('Teste de alteração');
            var novaDescricao = encodeURIComponent('Teste de alteração de descrição');
            var command = rest.put('http://'+host+":"+port+'/notas/funcionalidade/descricao/'+descricao+'/to/'+novaDescricao)
                 .on('success', function(data,response){
                      test.equal(response.statusCode,200,"Status de resposta!!");
                      test.equal(data.message,"Descrição da funcionalidade atualizada com sucesso!!","Funcionalidades cadastrada!!");
                      test.done();
                 })
                 .on('error', function(err,response){
                      test.ok(false,"Erro ao atualizar Funcionalidade!!");
                      test.done();
                 });
            test.throws(command);
            test.expect(3);
      },

      updateFuncionalidadeOnlyDescricaoAlreadyExists: function(test){
            var descricao = encodeURIComponent('Teste de alteração de descrição');
            var novaDescricao = encodeURIComponent('Acesso ao Push');
            var command = rest.put('http://'+host+":"+port+'/notas/funcionalidade/descricao/'+descricao+'/to/'+novaDescricao)
                 .on('success', function(data,response){
                      test.equal(response.statusCode,200,"Status de resposta!!");
                      test.equal(data.message,"Novo nome usado na alteração já existe!!","Funcionalidades cadastrada!!");
                      test.done();
                 })
                 .on('error', function(err,response){
                      test.ok(false,"Erro ao atualizar Funcionalidade!!");
                      test.done();
                 });
            test.throws(command);
            test.expect(3);
      },

      updateFuncionalidadeOnlyDescricaoWithInvalidChars: function(test){
            var descricao = encodeURIComponent('Teste de alteração de descrição');
            var novaDescricao = encodeURIComponent('§§§§Teste de ,,,,#@!$#alteração de__descrição');
            var command = rest.put('http://'+host+":"+port+'/notas/funcionalidade/descricao/'+descricao+'/to/'+novaDescricao)
                 .on('success', function(data,response){
                      test.equal(response.statusCode,200,"Status de resposta!!");
                      test.equal(data.message,"Não foi possível atualizar a descrição da Funcionalidade!!","Funcionalidades cadastrada!!");
                      test.done();
                 })
                 .on('error', function(err,response){
                      test.ok(false,"Erro ao atualizar Funcionalidade!!");
                      test.done();
                 });
            test.throws(command);
            test.expect(3);
      },

      updateFuncionalidadeOnlyDescricaoWithScript: function(test){
            var descricao = encodeURIComponent('Teste de alteração de descrição');
            var novaDescricao = encodeURIComponent('Teste de <script>location.href="www.google.com.br"</script>alteração de descrição');
            var command = rest.put('http://'+host+":"+port+'/notas/funcionalidade/descricao/'+descricao+'/to/'+novaDescricao)
                 .on('success', function(data,response){
                      test.equal(response.statusCode,200,"Status de resposta!!");
                      test.equal(data.message,"Não foi possível atualizar a descrição da Funcionalidade!!","Funcionalidades cadastrada!!");
                      test.done();
                 })
                 .on('error', function(err,response){
                      test.ok(false,"Erro ao atualizar Funcionalidade!!");
                      test.done();
                 });
            test.throws(command);
            test.expect(3);
      },

      updateFuncionalidadeOnlyDescricaoWithDescricaoAlreadyExists: function(test){
            var descricao = encodeURIComponent('Teste de alteração de descrição');
            var novaDescricao = encodeURIComponent('Acesso ao Push');
            var command = rest.put('http://'+host+":"+port+'/notas/funcionalidade/descricao/'+descricao+'/to/'+novaDescricao)
                 .on('success', function(data,response){
                      test.equal(response.statusCode,200,"Status de resposta!!");
                      test.equal(data.message,"Novo nome usado na alteração já existe!!","Funcionalidades cadastrada!!");
                      test.done();
                 })
                 .on('error', function(err,response){
                      test.ok(false,"Erro ao atualizar Funcionalidade!!");
                      test.done();
                 });
            test.throws(command);
            test.expect(3);
      },

      newFuncionalidadeSubTipo: function(test){
            var descricao = encodeURIComponent("Teste de alteração de descrição");
            var subTipo = encodeURIComponent("Inclusão de sub-tipo");
            var command = rest.post('http://'+host+":"+port+'/notas/funcionalidade/descricao/'+descricao+'/subtipo/'+subTipo)
               .on('success', function(data,response){
                      test.equal(response.statusCode,200,"Status de resposta!!");
                      test.equal(data.message,"Subtipo adicionado com sucesso!!","Subtipo cadastrado!!");
                      test.done();
               })
               .on('error', function(err,response){
                     test.ok(false,"Erro ao incluir subtipo de Funcionalidade");
                     test.done();
               });
            test.throws(command);
            test.expect(3);
      },

      newFuncionalidadeSubTipoWithInvalidChars: function(test){
            var descricao = encodeURIComponent("Teste de alteração de descrição");
            var subTipo = encodeURIComponent("$$$$In##@@@@clusão de sub-tipo");
            var command = rest.post('http://'+host+":"+port+'/notas/funcionalidade/descricao/'+descricao+'/subtipo/'+subTipo)
               .on('success', function(data,response){
                      test.equal(response.statusCode,200,"Status de resposta!!");
                      test.equal(data.message,"Não foi possível adicionar subtipo à Funcionalidade!!","Subtipo cadastrado!!");
                      test.done();
               })
               .on('error', function(err,response){
                     test.ok(false,"Erro ao incluir subtipo de Funcionalidade");
                     test.done();
               });
            test.throws(command);
            test.expect(3);
      },

      newFuncionalidadeSubTipoWithScript: function(test){
            var descricao = encodeURIComponent("Teste de alteração de descrição");
            var subTipo = encodeURIComponent("<script>location.href='www.google.com.br'</script>");
            var command = rest.post('http://'+host+":"+port+'/notas/funcionalidade/descricao/'+descricao+'/subtipo/'+subTipo)
               .on('success', function(data,response){
                      test.equal(response.statusCode,200,"Status de resposta!!");
                      test.equal(data.message,"Não foi possível adicionar subtipo à Funcionalidade!!","Subtipo cadastrado!!");
                      test.done();
               })
               .on('error', function(err,response){
                     test.ok(false,"Erro ao incluir subtipo de Funcionalidade");
                     test.done();
               });
            test.throws(command);
            test.expect(3);
      },

      newFuncionalidadeSubTipoWithInvalidChars: function(test){
            var descricao = encodeURIComponent("Teste de alteração de descrição");
            var subTipo = encodeURIComponent("$$$$In##@@@@clusão de sub-tipo");
            var command = rest.post('http://'+host+":"+port+'/notas/funcionalidade/descricao/'+descricao+'/subtipo/'+subTipo)
               .on('success', function(data,response){
                      test.equal(response.statusCode,200,"Status de resposta!!");
                      test.equal(data.message,"Não foi possível adicionar subtipo à Funcionalidade!!","Subtipo cadastrado!!");
                      test.done();
               })
               .on('error', function(err,response){
                     test.ok(false,"Erro ao incluir subtipo de Funcionalidade");
                     test.done();
               });
            test.throws(command);
            test.expect(3);
      },

      deleteFuncionalidadeSubTipo: function(test){
            var descricao = encodeURIComponent("Teste de alteração de descrição");
            var subTipo = encodeURIComponent("Inclusão de sub-tipo");
            var command = rest.del('http://'+host+":"+port+'/notas/funcionalidade/descricao/'+descricao+'/subtipo/'+subTipo)
               .on('success', function(data,response){
                      test.equal(response.statusCode,200,"Status de resposta!!");
                      test.equal(data.message,"Subtipo excluído com sucesso!!","Subtipo cadastrado!!");
                      test.done();
               })
               .on('error', function(err,response){
                     test.ok(false,"Erro ao excluir subtipo de Funcionalidade");
                     test.done();
               });
            test.throws(command);
            test.expect(3);
      },

      deleteFuncionalidadeByDescricao: function(test){
            var descricao = encodeURIComponent("Teste de alteração de descrição");
            var command = rest.del('http://'+host+":"+port+'/notas/funcionalidade/descricao/'+descricao)
                 .on('success', function(data,response){
                      test.equal(response.statusCode,200,"Status de resposta!!");
                      test.equal(data.message,"Funcionalidade excluída com sucesso!!","Funcionalidade excluída!!");
                      test.done();
                 })
                 .on('error', function(err,response){
                     test.ok(false,"Erro ao excluir Funcionalidades!!");
                     test.done();
                 });
            test.throws(command);
            test.expect(3);
      },

      deleteFuncionalidadeByDescricao: function(test){
            var descricao = encodeURIComponent("Teste de funcionalidade");
            var command = rest.del('http://'+host+":"+port+'/notas/funcionalidade/descricao/'+descricao)
                 .on('success', function(data,response){
                      test.equal(response.statusCode,200,"Status de resposta!!");
                      test.equal(data.message,"Funcionalidade excluída com sucesso!!","Funcionalidade excluída!!");
                      test.done();
                 })
                 .on('error', function(err,response){
                     test.ok(false,"Erro ao excluir Funcionalidades!!");
                     test.done();
                 });
            test.throws(command);
            test.expect(3);
      },

};