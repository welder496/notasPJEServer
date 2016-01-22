
      var app = require('../notas');
      var server = require('../bin/www');
      var http = require("http");

module.exports = {

         setUp: function(callback){
            server = http.createServer(app);
            callback();
         },

         testApplicationOn: function(test){
               httpGet("http://localhost:12345/notas", function(response, responseTxt){
                     test.equals(response.statusCode, 200, "statusCode testing");
                     test.equals(responseTxt,'{"message":"Aplicação notasPJEServer está funcionando!!"}',"NotasServer string server response!!");
                     test.expect(2);
                     test.done();
               });
         }

};

         function httpGet(url, callback) {
            var request = http.get(url);
            request.on("response", function(response) {
               var responseTxt = "";
               response.setEncoding("utf8");

               response.on("data", function(chunk) {
                  responseTxt += chunk;
               });
               response.on("end", function() {
                  callback(response, responseTxt);
               });
            });
         };


