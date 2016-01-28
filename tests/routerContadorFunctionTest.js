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

      newContador: function(test){
            var contador = {prefixo: 'UNIT', descricao: 'Contador de teste de unidade'};
            contador.prefixo = encodeURIComponent(contador.prefixo);
            contador.descricao = encodeURIComponent(contador.descricao);

            var command = rest.post('http://'+host+":"+port+'/notas/contador/new',
                 {
                           data: contador
                 })
                 .on('success', function(data,response){
                       test.equal(response.statusCode,200,"Status de resposta!!");
                       test.equal(data.message,"Contador salvo com sucesso!!","Contador criado com sucesso!!");
                       test.done();
                 })
                 .on('error', function(err, response){
                       test.ok(false,"Erro ao criar Contador!!");
                       test.done();
                 });
            test.throws(command);
            test.expect(3);
      },

      newContadorWithoutPrefix: function(test){
            var contador = {descricao: 'Contador sem prefixo!!'};
            contador.prefixo = encodeURIComponent(contador.prefixo);
            contador.descricao = encodeURIComponent(contador.descricao);

            var command = rest.post('http://'+host+":"+port+'/notas/contador/new',
                 {
                           data: contador
                 })
                 .on('success', function(data,response){
                       test.equal(response.statusCode,200,"Status de resposta!!");
                       test.equal(data.message,"Não foi possível criar contador!!","Contador criado com sucesso!!");
                       test.done();
                 })
                 .on('error', function(err, response){
                       test.ok(false,"Erro ao criar Contador!!");
                       test.done();
                 });
            test.throws(command);
            test.expect(3);
      },

      newContadorWithoutDescription: function(test){
            var contador = {prefixo: 'ABNT'};
            contador.prefixo = encodeURIComponent(contador.prefixo);
            contador.descricao = encodeURIComponent(contador.descricao);

            var command = rest.post('http://'+host+":"+port+'/notas/contador/new',
                 {
                           data: contador
                 })
                 .on('success', function(data,response){
                       test.equal(response.statusCode,200,"Status de resposta!!");
                       test.equal(data.message,"Não foi possível criar contador!!","Contador criado com sucesso!!");
                       test.done();
                 })
                 .on('error', function(err, response){
                       test.ok(false,"Erro ao criar Contador!!");
                       test.done();
                 });
            test.throws(command);
            test.expect(3);
      },

      updateContador: function(test){
            var contador = {prefixo: 'UNIT', descricao: 'Contador de teste de unidade (Modificado)', contador: 2, casas: 6};
            contador.prefixo = encodeURIComponent(contador.prefixo);
            contador.descricao = encodeURIComponent(contador.descricao);
            contador.contador = encodeURIComponent(contador.contador);
            contador.casas = encodeURIComponent(contador.casas);
            var descricao = encodeURIComponent('Contador de teste de unidade');
            var command = rest.put('http://'+host+":"+port+'/notas/contador/descricao/'+descricao,
                 {
                          data: contador
                 })
                 .on('success', function(data,response){
                       test.equal(response.statusCode,200,"Status de resposta!!");
                       test.equal(data.message,"Contador atualizado com sucesso!!","Contador criado com sucesso!!");
                       test.done();
                 })
                 .on('error', function(err, response){
                       test.ok(false,"Erro ao atualizar Contador!!");
                       test.done();
                 });
            test.throws(command);
            test.expect(3);
      },

      updateContadorWithoutPrefix: function(test){
            var contador = {descricao: 'Contador de teste de unidade (Modificado)', contador: 12, casas: 2};
            contador.prefixo = encodeURIComponent(contador.prefixo);
            contador.descricao = encodeURIComponent(contador.descricao);
            contador.contador = encodeURIComponent(contador.contador);
            contador.casas = encodeURIComponent(contador.casas);
            var descricao = encodeURIComponent('Contador de teste de unidade (Modificado)');
            var command = rest.put('http://'+host+":"+port+'/notas/contador/descricao/'+descricao,
                 {
                          data: contador
                 })
                 .on('success', function(data,response){
                       test.equal(response.statusCode,200,"Status de resposta!!");
                       test.equal(data.message,'Não foi possível atualizar o contador!!',"Contador criado com sucesso!!");
                       test.done();
                 })
                 .on('error', function(err, response){
                       test.ok(false,"Erro ao atualizar Contador!!");
                       test.done();
                 });
            test.throws(command);
            test.expect(3);
      },

      updateContadorWithoutDescription: function(test){
            var contador = {prefixo: 'UNIT',contador: 10, casas: 2};
            contador.prefixo = encodeURIComponent(contador.prefixo);
            contador.descricao = encodeURIComponent(contador.descricao);
            contador.contador = encodeURIComponent(contador.contador);
            contador.casas = encodeURIComponent(contador.casas);
            var descricao = encodeURIComponent('Contador de teste de unidade (Modificado)');
            var command = rest.put('http://'+host+":"+port+'/notas/contador/descricao/'+descricao,
                 {
                          data: contador
                 })
                 .on('success', function(data,response){
                       test.equal(response.statusCode,200,"Status de resposta!!");
                       test.equal(data.message,'Não foi possível atualizar o contador!!',"Contador criado com sucesso!!");
                       test.done();
                 })
                 .on('error', function(err, response){
                       test.ok(false,"Erro ao atualizar Contador!!");
                       test.done();
                 });
            test.throws(command);
            test.expect(3);
      },

      updateContadorWithScript: function(test){
            var contador = {prefixo: 'UNIT', descricao: 'Contador de <script>location.href="www.google.com"</script>teste de unidade (Modificado)', contador: 2, casas: 6};
            contador.prefixo = encodeURIComponent(contador.prefixo);
            contador.descricao = encodeURIComponent(contador.descricao);
            contador.contador = encodeURIComponent(contador.contador);
            contador.casas = encodeURIComponent(contador.casas);
            var descricao = encodeURIComponent('Contador de teste de unidade (Modificado)');
            var command = rest.put('http://'+host+":"+port+'/notas/contador/descricao/'+descricao,
                 {
                          data: contador
                 })
                 .on('success', function(data,response){
                       test.equal(response.statusCode,200,"Status de resposta!!");
                       test.equal(data.message,"Formato inválido de contador!!","Contador criado com sucesso!!");
                       test.done();
                 })
                 .on('error', function(err, response){
                       test.ok(false,"Erro ao atualizar Contador!!");
                       test.done();
                 });
            test.throws(command);
            test.expect(3);
      },

      updateContadorWithUnderscoreCharOne: function(test){
            var contador = {prefixo: 'UNIT', descricao: 'Contador_de_teste_de_unidade___(Modificado)', contador: 2, casas: 6};
            contador.prefixo = encodeURIComponent(contador.prefixo);
            contador.descricao = encodeURIComponent(contador.descricao);
            contador.contador = encodeURIComponent(contador.contador);
            contador.casas = encodeURIComponent(contador.casas);
            var descricao = encodeURIComponent('Contador de teste de unidade (Modificado)');
            var command = rest.put('http://'+host+":"+port+'/notas/contador/descricao/'+descricao,
                 {
                          data: contador
                 })
                 .on('success', function(data,response){
                       test.equal(response.statusCode,200,"Status de resposta!!");
                       test.equal(data.message,"Formato inválido de contador!!","Contador criado com sucesso!!");
                       test.done();
                 })
                 .on('error', function(err, response){
                       test.ok(false,"Erro ao atualizar Contador!!");
                       test.done();
                 });
            test.throws(command);
            test.expect(3);
      },

      updateContadorWithUnderscoreCharTwo: function(test){
            var contador = {prefixo: 'UNIT-one', descricao: 'Contador__de_teste_de_unidade___(Modificado)', contador: 2, casas: 6};
            contador.prefixo = encodeURIComponent(contador.prefixo);
            contador.descricao = encodeURIComponent(contador.descricao);
            contador.contador = encodeURIComponent(contador.contador);
            contador.casas = encodeURIComponent(contador.casas);
            var descricao = encodeURIComponent('Contador de teste de unidade (Modificado)');
            var command = rest.put('http://'+host+":"+port+'/notas/contador/descricao/'+descricao,
                 {
                          data: contador
                 })
                 .on('success', function(data,response){
                       test.equal(response.statusCode,200,"Status de resposta!!");
                       test.equal(data.message,"Formato inválido de contador!!","Contador criado com sucesso!!");
                       test.done();
                 })
                 .on('error', function(err, response){
                       test.ok(false,"Erro ao atualizar Contador!!");
                       test.done();
                 });
            test.throws(command);
            test.expect(3);
      },

      getContadores: function(test){
           var command = rest.get('http://'+host+":"+port+'/notas/contador/all')
                 .on('success', function(data,response){
                       test.equal(response.statusCode,200,"Status de resposta!!");
                       test.equal(typeof(data),"object","Contador criado com sucesso!!");
                       test.done();
                 })
                 .on('error', function(err,response){
                       test.ok(false,"Erro ao buscar Contadores!!");
                       test.done();
                 });
            test.throws(command);
            test.expect(3);
      },

      getContadorByPrefixo: function(test){
            var prefixo = encodeURIComponent("UNIT");
            var command = rest.get('http://'+host+":"+port+'/notas/contador/prefixo/'+prefixo)
                 .on('success', function(data, response){
                       test.equal(response.statusCode,200,"Status de resposta!!");
                       test.equal(typeof(data),"object","Contador criado com sucesso!!");
                       test.done();
                 })
                 .on('error', function(err, response){
                       test.ok(false,"Erro ao buscar Contadores!!");
                       test.done();
                 });
            test.throws(command);
            test.expect(3);
      },

      getContadorByInvalidPrefixoOne: function(test){
            var prefixo = encodeURIComponent("UN IT");
            var command = rest.get('http://'+host+":"+port+'/notas/contador/prefixo/'+prefixo)
                 .on('success', function(data, response){
                       test.equal(response.statusCode,200,"Status de resposta!!");
                       test.equal(data.message,"Formato de prefixo inválido!!","Contador criado com sucesso!!");
                       test.done();
                 })
                 .on('error', function(err, response){
                       test.ok(false,"Erro ao buscar Contadores!!");
                       test.done();
                 });
            test.throws(command);
            test.expect(3);
      },

      getContadorByInvalidPrefixoTwo: function(test){
            var prefixo = encodeURIComponent(">>[UNIT]");
            var command = rest.get('http://'+host+":"+port+'/notas/contador/prefixo/'+prefixo)
                 .on('success', function(data, response){
                       test.equal(response.statusCode,200,"Status de resposta!!");
                       test.equal(data.message,"Formato de prefixo inválido!!","Contador criado com sucesso!!");
                       test.done();
                 })
                 .on('error', function(err, response){
                       test.ok(false,"Erro ao buscar Contadores!!");
                       test.done();
                 });
            test.throws(command);
            test.expect(3);
      },

      getContadorByInvalidPrefixoThree: function(test){
            var prefixo = encodeURIComponent("(UNIT)");
            var command = rest.get('http://'+host+":"+port+'/notas/contador/prefixo/'+prefixo)
                 .on('success', function(data, response){
                       test.equal(response.statusCode,200,"Status de resposta!!");
                       test.equal(data.message,"Formato de prefixo inválido!!","Contador criado com sucesso!!");
                       test.done();
                 })
                 .on('error', function(err, response){
                       test.ok(false,"Erro ao buscar Contadores!!");
                       test.done();
                 });
            test.throws(command);
            test.expect(3);
      },

      getContadorByInvalidPrefixoWithScript: function(test){
            var prefixo = encodeURIComponent("<script>location.href='www.google.com'</script>");
            var command = rest.get('http://'+host+":"+port+'/notas/contador/prefixo/'+prefixo)
                 .on('success', function(data, response){
                       test.equal(response.statusCode,200,"Status de resposta!!");
                       test.equal(data.message,"Formato de prefixo inválido!!","Contador criado com sucesso!!");
                       test.done();
                 })
                 .on('error', function(err, response){
                       test.ok(false,"Erro ao buscar Contadores!!");
                       test.done();
                 });
            test.throws(command);
            test.expect(3);
      },

      getContadorByDescricao: function(test){
            var descricao = encodeURIComponent('Contador de teste de unidade (Modificado)');
            var command = rest.get('http://'+host+":"+port+'/notas/contador/descricao/'+descricao)
                 .on('success', function(data, response){
                       test.equal(response.statusCode,200,"Status de resposta!!");
                       test.equal(typeof(data),"object","Contador não foi encontrado!!");
                       test.done();
                 })
                 .on('error', function(err, response){
                       test.ok(false,"Erro ao buscar Contadores!!");
                       test.done();
                 });
            test.throws(command);
            test.expect(3);
      },

      updateValorContadorByPrefixo: function(test){
           var prefixo = 'UNIT';
           var valor = 50;
           var command = rest.put('http://'+host+":"+port+'/notas/contador/prefixo/'+prefixo+'/casas/'+valor)
                 .on('success', function(data, response){
                       test.equal(response.statusCode,200,"Status de resposta!!");
                       test.equal(data.message,"Número de casas alterado com sucesso!!","Contador criado com sucesso!!");
                       test.done();
                 })
                 .on('error', function(err, response){
                       test.ok(false,"Erro ao buscar Contadores!!");
                       test.done();
                 });
            test.throws(command);
            test.expect(3);
      },

      updateValorContadorByPrefixoWithInvalidValue: function(test){
           var prefixo = encodeURIComponent('UNIT');
           var valor = encodeURIComponent('A');
           var command = rest.put('http://'+host+":"+port+'/notas/contador/prefixo/'+prefixo+'/casas/'+valor)
                 .on('success', function(data, response){
                       test.equal(response.statusCode,200,"Status de resposta!!");
                       test.equal(data.message,"Não foi possível mudar o número de casas!!","Contador criado com sucesso!!");
                       test.done();
                 })
                 .on('error', function(err, response){
                       test.ok(false,"Erro ao atualizar contador!!");
                       test.done();
                 });
            test.throws(command);
            test.expect(3);
      },

      resetContadorByPrefixo: function(test){
            var prefixo = encodeURIComponent('UNIT');
            var command = rest.put('http://'+host+":"+port+'/notas/contador/prefixo/'+prefixo+'/reset')
                  .on('success', function(data, response){
                       test.equal(response.statusCode,200,"Status de resposta!!");
                       test.equal(data.message,"Contador foi reiniciado com sucesso!!","Contador criado com sucesso!!");
                       test.done();
                  })
                  .on('error', function(err, response){
                       test.ok(false,"Erro ao reinicializar Contador!!");
                       test.done();
                  });
            test.throws(command);
            test.expect(3);
      },

      searchNextContadorByPrefixoOne: function(test){
            var prefixo = encodeURIComponent('UNIT');
            var command = rest.get('http://'+host+':'+port+'/notas/contador/prefixo/'+prefixo+'/searchnext')
                 .on('success', function(data, response){
                       test.equal(response.statusCode,200,"Status de resposta!!");
                       test.equal(data,"UNIT-1","Contador incrementado com sucesso!!");
                       test.done();
                 })
                 .on('error', function(err, response){
                       test.ok(false,"Erro ao incrementar Contador!!");
                       test.done();
                 });
            test.throws(command);
            test.expect(3);
      },

      getNextContadorByPrefixoOne: function(test){
            var prefixo = encodeURIComponent('UNIT');
            var command = rest.get('http://'+host+':'+port+'/notas/contador/prefixo/'+prefixo+'/next')
                 .on('success', function(data, response){
                       test.equal(response.statusCode,200,"Status de resposta!!");
                       test.equal(data,"UNIT-1","Contador incrementado com sucesso!!");
                       test.done();
                 })
                 .on('error', function(err, response){
                       test.ok(false,"Erro ao incrementar Contador!!");
                       test.done();
                 });
            test.throws(command);
            test.expect(3);
      },

      searchNextContadorByPrefixoTwo: function(test){
            var prefixo = encodeURIComponent('UNIT');
            var command = rest.get('http://'+host+':'+port+'/notas/contador/prefixo/'+prefixo+'/searchnext')
                 .on('success', function(data, response){
                       test.equal(response.statusCode,200,"Status de resposta!!");
                       test.equal(data,"UNIT-2","Contador incrementado com sucesso!!");
                       test.done();
                 })
                 .on('error', function(err, response){
                       test.ok(false,"Erro ao incrementar Contador!!");
                       test.done();
                 });
            test.throws(command);
            test.expect(3);
      },

      getNextContadorByPrefixoTwo: function(test){
            var prefixo = encodeURIComponent('UNIT');
            var command = rest.get('http://'+host+':'+port+'/notas/contador/prefixo/'+prefixo+'/next')
                 .on('success', function(data, response){
                       test.equal(response.statusCode,200,"Status de resposta!!");
                       test.equal(data,"UNIT-2","Contador incrementado com sucesso!!");
                       test.done();
                 })
                 .on('error', function(err, response){
                       test.ok(false,"Erro ao incrementar Contador!!");
                       test.done();
                 });
            test.throws(command);
            test.expect(3);
      },

      searchNextContadorByPrefixoThree: function(test){
            var prefixo = encodeURIComponent('UNIT');
            var command = rest.get('http://'+host+':'+port+'/notas/contador/prefixo/'+prefixo+'/searchnext')
                 .on('success', function(data, response){
                       test.equal(response.statusCode,200,"Status de resposta!!");
                       test.equal(data,"UNIT-3","Contador incrementado com sucesso!!");
                       test.done();
                 })
                 .on('error', function(err, response){
                       test.ok(false,"Erro ao incrementar Contador!!");
                       test.done();
                 });
            test.throws(command);
            test.expect(3);
      },

      getNextContadorByPrefixoThree: function(test){
            var prefixo = encodeURIComponent('UNIT');
            var command = rest.get('http://'+host+':'+port+'/notas/contador/prefixo/'+prefixo+'/next')
                 .on('success', function(data, response){
                       test.equal(response.statusCode,200,"Status de resposta!!");
                       test.equal(data,"UNIT-3","Contador incrementado com sucesso!!");
                       test.done();
                 })
                 .on('error', function(err, response){
                       test.ok(false,"Erro ao incrementar Contador!!");
                       test.done();
                 });
            test.throws(command);
            test.expect(3);
      },

      getNextContadorByInvalidPrefixo: function(test){
            var prefixo = encodeURIComponent('U [[NIT');
            var command = rest.get('http://'+host+':'+port+'/notas/contador/prefixo/'+prefixo+'/next')
                 .on('success', function(data, response){
                       test.equal(response.statusCode,200,"Status de resposta!!");
                       test.equal(data.message,"Contador não foi encontrado!!","Contador incrementado com sucesso!!");
                       test.done();
                 })
                 .on('error', function(err, response){
                       test.ok(false,"Erro ao incrementar Contador!!");
                       test.done();
                 });
            test.throws(command);
            test.expect(3);
      },

      getPriorContadorByInvalidPrefixo: function(test){
            var prefixo = encodeURIComponent('U@NI@T');
            var command = rest.get('http://'+host+':'+port+'/notas/contador/prefixo/'+prefixo+'/prior')
                 .on('success', function(data, response){
                       test.equal(response.statusCode,200,"Status de resposta!!");
                       test.equal(data.message,"Contador não foi encontrado!!","Contador decrementado com sucesso!!");
                       test.done();
                 })
                 .on('error', function(err, response){
                       test.ok(false,"Erro ao incrementar Contador!!");
                       test.done();
                 });
            test.throws(command);
            test.expect(3);
      },

      getPriorContadorByPrefixo: function(test){
            var prefixo = encodeURIComponent('UNIT');
            var command = rest.get('http://'+host+':'+port+'/notas/contador/prefixo/'+prefixo+'/prior')
                 .on('success', function(data, response){
                       test.equal(response.statusCode,200,"Status de resposta!!");
                       test.equal(data,"UNIT-2","Contador decrementado com sucesso!!");
                       test.done();
                 })
                 .on('error', function(err, response){
                       test.ok(false,"Erro ao incrementar Contador!!");
                       test.done();
                 });
            test.throws(command);
            test.expect(3);
      },

      incContadorByPrefixo: function(test){
            var prefixo = encodeURIComponent('UNIT');
            var command = rest.put('http://'+host+':'+port+'/notas/contador/prefixo/'+prefixo+'/inc')
                 .on('success', function(data, response){
                       test.equal(response.statusCode,200,"Status de resposta!!");
                       test.equal(data.contador,3,"Contador incrementado com sucesso!!");
                       test.done();
                 })
                 .on('error', function(err, response){
                       test.ok(false,"Erro ao incrementar Contador!!");
                       test.done();
                 });
            test.throws(command);
            test.expect(3);
      },

      decContadorByPrefixo: function(test){
            var prefixo = encodeURIComponent('UNIT');
            var command = rest.put('http://'+host+':'+port+'/notas/contador/prefixo/'+prefixo+'/dec')
                 .on('success', function(data, response){
                       test.equal(response.statusCode,200,"Status de resposta!!");
                       test.equal(data.contador,2,"Contador decrementado com sucesso!!");
                       test.done();
                 })
                 .on('error', function(err, response){
                       test.ok(false,"Erro ao incrementar Contador!!");
                       test.done();
                 });
            test.throws(command);
            test.expect(3);
      },

      deleteContadorByPrefixo: function(test){
            prefixo = encodeURIComponent("UNIT");
            var command = rest.del('http://'+host+":"+port+'/notas/contador/prefixo/'+prefixo)
                 .on('success', function(data, response){
                       test.equal(response.statusCode,200,"Status de resposta!!");
                       test.equal(data.message,"Contador excluído com sucesso!!","Contador criado com sucesso!!");
                       test.done();
                 })
                 .on('error', function(err, response){
                       test.ok(false,"Erro ao excluir Contador!!");
                       test.done();
                 });
            test.throws(command);
            test.expect(3);
      },

};