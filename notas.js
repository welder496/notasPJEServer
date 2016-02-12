/* global __base */
/*
 * Notas PJE server with REST capability
 * Version: 1.0.0.20
 */

global.__base =  __dirname;

var fs = require('extfs');
var multer = require('multer');
var util = require("util");

var notas = require('./model/notas');
var routerPerfil = require('./routes/routerPerfil');
var routerFuncionalidade = require('./routes/routerFuncionalidade');
var routerContador = require('./routes/routerContador');
var routerNotasTags = require('./routes/routerNotasTags');
var routerNotasCodigoCodigo = require('./routes/routerNotasCodigoCodigo');
var routerNotasId = require('./routes/routerNotasId');
var routerNotasArquivos = require('./routes/routerNotasArquivos');
var routerNotasAll = require('./routes/routerNotasAll');
var routerNotasParamId = require('./routes/routerNotasParamId');
var routerNotasNew = require('./routes/routerNotasNew');
var routerNotasFirst = require('./routes/routerNotasFirst');
var routerNotasLike = require('./routes/routerNotasLike');
var routerNotasCodigoLike = require('./routes/routerNotasCodigoLike');
var routerNotasParamCodigo = require('./routes/routerNotasParamCodigo');
var routerMapReduceNotasByTags = require('./routes/routerMapReduceNotasByTags');
var routerUsuario = require('./routes/routerUsuario');

var express    = require('express');
var app        = express();
var morgan = require('morgan');
var bodyParser = require('body-parser');
var path = require('path');

var docs = __base + '/documentos';

var port = process.env.PORT || 12345;

var router = express.Router();

var accessLogger = fs.createWriteStream(__dirname+'/logAccess.log',{flags: 'a'});

/*
 * Database connection
 * Uses mongoDB (Document database)
 */

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/Notas');

/*
 * Configuring CORS(CROSS ORIGIN RESOURCE SHARING) for access REST routines
 */

var allowCrossDomain = function(req, res, next) {
      res.header('Access-Control-Allow-Origin', 'cnj.jus.br');
      res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
      res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');
      // intercept OPTIONS method
      if ('OPTIONS' == req.method) {
            res.sendStatus(200);
      } else {
            next();
      }
};

app.use(morgan('combined',{stream: accessLogger}));
app.use(allowCrossDomain);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(multer({inMemory:true}));
app.use('/notas',router);
app.use('/notas/perfil',routerPerfil);
app.use('/notas/funcionalidade',routerFuncionalidade);
app.use('/notas/contador',routerContador);
app.use('/notas/notas/codigo',routerNotasCodigoCodigo);
app.use('/notas/notas/id',routerNotasId);
app.use('/notas/notas/:codigo',routerNotasParamCodigo);
app.use('/notas/notas/tags',routerNotasTags);
app.use('/notas/notas/arquivos',routerNotasArquivos);
app.use('/notas/notas/all',routerNotasAll);
app.use('/notas/notas/:id',routerNotasParamId);
app.use('/notas/notas/new',routerNotasNew);
app.use('/notas/notas/first',routerNotasFirst);
app.use('/notas/notas/like',routerNotasLike);
app.use('/notas/notas/codigo/like',routerNotasCodigoLike);
app.use('/notas/mapReduce',routerMapReduceNotasByTags);
app.use('/notas/usuario',routerUsuario);
app.use('/arquivos',express.static(docs));
/*
 * Generic access to assess the application!!
 */
router.get('/', function(req, res){
      res.json({message: 'Aplicação notasPJEServer está funcionando!!'});
});

module.exports = app;

/*End of Application
 *Written by: Welder Mauricio de Souza
 */

