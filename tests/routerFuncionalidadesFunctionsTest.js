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

      newFuncionalidade: function(test){
            var funcionalidade = {
                  descricao: "Nova funcionalidade inserida",
                  subtipo: ["SubtipoOne", "SubtipoTwo"]
            };
            var command = rest.post('http://'+host+":"+port+'/notas/funcionalidade/new',{
                 data: funcionalidade
            })
           .on('success', function(data,response){
                 test.equal(response.statusCode,200,"Status de resposta!!");
                 test.equal(data.message,"Funcionalidade cadastrada com sucesso!!","Funcionalidade incluída!!");
                 test.done();
           })
           .on('error', function(err,response){
                 test.ok(false,"Erro ao incluir Funcionalidades!!");
                 test.done();
            });
            test.throws(command);
            test.expect(3);
      },

      newRepeatedFuncionalidade: function(test){
            var funcionalidade = {
                  descricao: "Nova funcionalidade inserida",
                  subtipo: ["SubtipoOne","SubtipoTwo"]
            };
            var command = rest.post('http://'+host+":"+port+'/notas/funcionalidade/new',{
                 data: funcionalidade
            })
           .on('success', function(data,response){
                 test.equal(response.statusCode,200,"Status de resposta!!");
                 test.equal(data.message,"Funcionalidade já está cadastrada!!","Funcionalidade já incluída!!");
                 test.done();
           })
           .on('error', function(err,response){
                 test.ok(false,"Erro ao incluir Funcionalidades!!");
                 test.done();
            });
            test.throws(command);
            test.expect(3);
      },

      newFuncionalidadeWithInvalidChars: function(test){
            var funcionalidade = {
                  descricao: encodeURIComponent("Funcionalidade com problema nos subtipos"),
                  subtipo: [encodeURIComponent("Sub@@$%tipoOne"),
                                encodeURIComponent("Sub!!!!§§§§§ tipoTwo")]
            };
            var command = rest.post('http://'+host+":"+port+'/notas/funcionalidade/new',{
                 data: funcionalidade
            })
           .on('success', function(data,response){
                 test.equal(response.statusCode,200,"Status de resposta!!");
                 test.equal(data.message,"Formato inválido para Funcionalidade!!","Funcionalidade inválida!!");
                 test.done();
           })
           .on('error', function(err,response){
                 test.ok(false,"Erro ao incluir Funcionalidades!!");
                 test.done();
            });
            test.throws(command);
            test.expect(3);
      },

      newFuncionalidadeWithoutSubTypes: function(test){
            var funcionalidade = {
                  descricao: encodeURIComponent("Funcionalidade sem subtipos")
            };
            var command = rest.post('http://'+host+":"+port+'/notas/funcionalidade/new',{
                 data: funcionalidade
            })
           .on('success', function(data,response){
                 test.equal(response.statusCode,200,"Status de resposta!!");
                 test.equal(data.message,"Funcionalidade cadastrada com sucesso!!","Funcionalidade inválida!!");
                 test.done();
           })
           .on('error', function(err,response){
                 test.ok(false,"Erro ao incluir Funcionalidades!!");
                 test.done();
            });
            test.throws(command);
            test.expect(3);
      },

      newFuncionalidadeWithValidSubTypes: function(test){
            var funcionalidade = {
                  descricao: encodeURIComponent("Funcionalidade com teste exaustivo"),
                  subtipo : [encodeURIComponent('Subtipos-->Subtipo'), encodeURIComponent('Subtipos-->Pedido de cadastro')]
            };
            var command = rest.post('http://'+host+":"+port+'/notas/funcionalidade/new',{
                 data: funcionalidade
            })
           .on('success', function(data,response){
                 test.equal(response.statusCode,200,"Status de resposta!!");
                 test.equal(data.message,"Funcionalidade cadastrada com sucesso!!","Funcionalidade inválida!!");
                 test.done();
           })
           .on('error', function(err,response){
                 test.ok(false,"Erro ao incluir Funcionalidades!!");
                 test.done();
            });
            test.throws(command);
            test.expect(3);
      },

      newSubTypesForFuncionalidadeThatAlreadyExists: function(test){
            var descricao = encodeURIComponent("Funcionalidade com teste exaustivo");
            var subtipo = {subtipo:[encodeURIComponent('Subtipos-->TTTTT'), encodeURIComponent('Subtipos-->AAAAA')]};
            var command = rest.post('http://'+host+":"+port+'/notas/funcionalidade/new/'+descricao+'/subtipo',{
                 data: subtipo
            })
            .on('success', function(data,response){
                 test.equal(response.statusCode,200,"Status de resposta!!");
                 test.equal(data.message,"Subtipo de Funcionalidade adicionado com sucesso!!","Subtipos adicionados!!");
                 test.done();
            })
            .on('error', function(err,response){
                 test.ok(false,"Erro ao incluir Funcionalidades!!");
                 test.done();
            });
            test.throws(command);
            test.expect(3);
      },

      updateSubTypesForSubTypesThatNotExists: function(test){
            var descricao = encodeURIComponent("Funcionalidade com teste exaustivo");
            var subtipo = encodeURIComponent('Subtipos-->TTTTT');
            var newsubtipo = encodeURIComponent('Subtipos-->KKKKK');
            var command = rest.put('http://'+host+":"+port+'/notas/funcionalidade/descricao/'+descricao+'/subtipo/'+subtipo+'/to/'+newsubtipo)
            .on('success', function(data,response){
                 test.equal(response.statusCode,200,"Status de resposta!!");
                 test.equal(data.message,"Subtipo da Funcionalidade atualizado com sucesso!!","Subtipos adicionados!!");
                 test.done();
            })
            .on('error', function(err,response){
                 test.ok(false,"Erro ao incluir Funcionalidades!!");
                 test.done();
            });
            test.throws(command);
            test.expect(3);
      },

      updateSubTypesForSubTypesThatAlreadyExists: function(test){
            var descricao = encodeURIComponent("Funcionalidade com teste exaustivo");
            var subtipo = encodeURIComponent('Subtipos-->TTTTT');
            var newsubtipo = encodeURIComponent('Subtipos-->TTTTT');
            var command = rest.put('http://'+host+":"+port+'/notas/funcionalidade/descricao/'+descricao+'/subtipo/'+subtipo+'/to/'+newsubtipo)
            .on('success', function(data,response){
                 test.equal(response.statusCode,200,"Status de resposta!!");
                 test.equal(data.message,"Subtipo já existe!!","Subtipos já existe!!");
                 test.done();
            })
            .on('error', function(err,response){
                 test.ok(false,"Erro ao incluir Funcionalidades!!");
                 test.done();
            });
            test.throws(command);
            test.expect(3);
      },

      updateSubTypesWithInvalidFuncionalidade: function(test){
            var descricao = encodeURIComponent("Funcionalidad&¨263==___e com teste exaustivo");
            var subtipo = encodeURIComponent('Subtipos-->TTTTT');
            var newsubtipo = encodeURIComponent('Subtipos-->JJJJJ');
            var command = rest.put('http://'+host+":"+port+'/notas/funcionalidade/descricao/'+descricao+'/subtipo/'+subtipo+'/to/'+newsubtipo)
            .on('success', function(data,response){
                 test.equal(response.statusCode,200,"Status de resposta!!");
                 test.equal(data.message,"Não foi possível atualizar o subtipo da Funcionalidade!!","Subtipos já existe!!");
                 test.done();
            })
            .on('error', function(err,response){
                 test.ok(false,"Erro ao incluir Funcionalidades!!");
                 test.done();
            });
            test.throws(command);
            test.expect(3);
      },

      updateSubTypesWithScriptInFuncionalidade: function(test){
            var descricao = encodeURIComponent("Funcionalidade<script>http://localhost:8080/teste</script> com teste exaustivo");
            var subtipo = encodeURIComponent('Subtipos-->TTTTT');
            var newsubtipo = encodeURIComponent('Subtipos-->JJJJJ');
            var command = rest.put('http://'+host+":"+port+'/notas/funcionalidade/descricao/'+descricao+'/subtipo/'+subtipo+'/to/'+newsubtipo)
            .on('success', function(data,response){
                 test.equal(response.statusCode,200,"Status de resposta!!");
                 test.equal(data.message,"Não foi possível atualizar o subtipo da Funcionalidade!!","Subtipos já existe!!");
                 test.done();
            })
            .on('error', function(err,response){
                 test.ok(false,"Erro ao incluir Funcionalidades!!");
                 test.done();
            });
            test.throws(command);
            test.expect(3);
      },

      newSubTypesForInvalidFuncionalidade: function(test){
            var descricao = encodeURIComponent("Funcionalida***de com teste ex<string>austivo");
            var subtipo = {subtipo:[encodeURIComponent('Subtipos-->TTTTT'), encodeURIComponent('Subtipos-->AAAAA')]};
            var command = rest.post('http://'+host+":"+port+'/notas/funcionalidade/new/'+descricao+'/subtipo',{
                 data: subtipo
            })
            .on('success', function(data,response){
                 test.equal(response.statusCode,200,"Status de resposta!!");
                 test.equal(data.message,"Formato inválido para a descrição da Funcionalidade!!","Subtipos adicionados!!");
                 test.done();
            })
            .on('error', function(err,response){
                 test.ok(false,"Erro ao incluir Funcionalidades!!");
                 test.done();
            });
            test.throws(command);
            test.expect(3);
      },

      newInvalidSubTypesForFuncionalidade: function(test){
            var descricao = encodeURIComponent("Funcionalidade com teste exaustivo");
            var subtipo = {subtipo:[encodeURIComponent('Subti¨¨pos-->TTTTT'), encodeURIComponent('Sub###tipos-->AAAAA')]};
            var command = rest.post('http://'+host+":"+port+'/notas/funcionalidade/new/'+descricao+'/subtipo',{
                 data: subtipo
            })
            .on('success', function(data,response){
                 test.equal(response.statusCode,200,"Status de resposta!!");
                 test.equal(data.message,"Formato inválido para a descrição da Funcionalidade!!","Subtipos adicionados!!");
                 test.done();
            })
            .on('error', function(err,response){
                 test.ok(false,"Erro ao incluir Funcionalidades!!");
                 test.done();
            });
            test.throws(command);
            test.expect(3);
      },

      newSubTypesWithScriptForFuncionalidade: function(test){
            var descricao = encodeURIComponent("Funcionalidade com teste exaustivo");
            var subtipo = {subtipo:[encodeURIComponent('Subti<script>location.href="www.google.com"</script>pos-->TTTTT'), encodeURIComponent('Subtipos-->AAAAA')]};
            var command = rest.post('http://'+host+":"+port+'/notas/funcionalidade/new/'+descricao+'/subtipo',{
                 data: subtipo
            })
            .on('success', function(data,response){
                 test.equal(response.statusCode,200,"Status de resposta!!");
                 test.equal(data.message,"Formato inválido para a descrição da Funcionalidade!!","Subtipos adicionados!!");
                 test.done();
            })
            .on('error', function(err,response){
                 test.ok(false,"Erro ao incluir Funcionalidades!!");
                 test.done();
            });
            test.throws(command);
            test.expect(3);
      },

      deleteFuncionalidadeByDescricaoOne: function(test){
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

      deleteFuncionalidadeByDescricaoTwo: function(test){
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

      deleteFuncionalidadeByDescricaoThree: function(test){
            var descricao = encodeURIComponent("Funcionalidade com teste exaustivo");
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

      deleteFuncionalidadeByDescricaoFour: function(test){
            var descricao = encodeURIComponent("Funcionalidade sem subtipos");
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

      deleteFuncionalidadeByDescricaoFive: function(test){
            var descricao = encodeURIComponent("Nova funcionalidade inserida");
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