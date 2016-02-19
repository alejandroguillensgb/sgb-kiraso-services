var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
var getContent = require('./routes/getContent');
var setContent = require('./routes/setContent');
var dirTree = require('./routes/dirTree');
var testTree = require('./routes/test-tree');
var copyContent = require('./routes/copyContent');
var getFiles = require('./routes/getFiles');
var insert_db = require('./routes/insert_db');
var setModels = require('./routes/setModels');
var findModel = require('./routes/findModel');
var mongoose_test = require('./routes/mongoose_test');
var mongooseFind = require('./routes/mongooseFind');
var mongoose_setModels = require('./routes/mongoose_setModels');
var createUser = require("./routes/createUser");
var dropDb = require("./routes/dropDb");
var loginUser = require("./routes/loginUser");
var mongoose_setGraph = require("./routes/mongoose_setGraph");
var mongoose_setProjects = require("./routes/mongoose_setProjects");
var mongoose_findGraph = require("./routes/mongoose_findGraph");

var app = express();

app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'GET, POST, PUT, DELETE, OPTIONS, Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With');
  next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/getContent', getContent);
app.use('/setContent', setContent);
app.use('/dirTree', dirTree);
app.use('/testTree', testTree);
app.use('/copyContent', copyContent);
app.use('/getFiles', getFiles);
app.use('/insert_db', insert_db);
app.use('/setModels', setModels);
app.use('/findModel', findModel);
app.use('/mongoose_test', mongoose_test);
app.use('/mongooseFind', mongooseFind);
app.use('/mongoose_setModels', mongoose_setModels);
app.use('/createUser', createUser);
app.use('/dropDb', dropDb);
app.use('/loginUser', loginUser);
app.use('/mongoose_setGraph', mongoose_setGraph);
app.use('/mongoose_setProjects', mongoose_setProjects);
app.use('/mongoose_findGraph', mongoose_findGraph);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
