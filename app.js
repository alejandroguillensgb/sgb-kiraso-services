var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var multer = require('multer');
var socket_io = require("socket.io");

var app = express();

var io = socket_io();
app.io = io;

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '/home/alejandro/kiraso-wizard/service_data/tmp')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
});

var upload = multer({ storage: storage }).single('file');

var getContent = require('./routes/getContent');
var setContent = require('./routes/setContent');
var dirTree = require('./routes/dirTree');
var mongoose_createProject = require('./routes/mongoose_createProject');
var createUser = require("./routes/createUser");
var dropDb = require("./routes/dropDb");
var loginUser = require("./routes/loginUser");
var mongoose_setGraph = require("./routes/mongoose_setGraph");
var mongoose_setProjects = require("./routes/mongoose_setProjects");
var mongoose_findGraph = require("./routes/mongoose_findGraph");
var mongoose_findApp = require("./routes/mongoose_findApp");
var mongoose_removeElement = require("./routes/mongoose_removeElement");
var mongoose_updateProject = require("./routes/mongoose_updateProject");
var exec = require("./routes/exec")(io);
var generateFolder = require("./routes/generateFolder");
var runApp = require("./routes/runApp")(io);
var setContentConfig = require("./routes/setContentConfig");
var killApp = require("./routes/killApp");
var setInventario = require("./routes/setInventario");
var cloneRepo = require("./routes/cloneRepo");
var removeComp = require("./routes/removeComp");
var moveScreens = require("./routes/moveScreens");
var setMetadata = require("./routes/setMetadata");
var uploadFile = require("./routes/uploadFile")(upload);
var genApp = require("./routes/genApp");

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

app.use('/getContent', getContent);
app.use('/setContent', setContent);
app.use('/dirTree', dirTree);
app.use('/mongoose_createProject', mongoose_createProject);
app.use('/createUser', createUser);
app.use('/dropDb', dropDb);
app.use('/loginUser', loginUser);
app.use('/mongoose_setGraph', mongoose_setGraph);
app.use('/mongoose_setProjects', mongoose_setProjects);
app.use('/mongoose_findGraph', mongoose_findGraph);
app.use('/mongoose_findApp', mongoose_findApp);
app.use('/mongoose_removeElement', mongoose_removeElement);
app.use('/mongoose_updateProject', mongoose_updateProject);
app.use('/exec', exec);
app.use('/generateFolder', generateFolder);
app.use('/runApp', runApp);
app.use('/setContentConfig', setContentConfig);
app.use('/killApp', killApp);
app.use('/setInventario', setInventario);
app.use('/cloneRepo', cloneRepo);
app.use('/removeComp', removeComp);
app.use('/moveScreens', moveScreens);
app.use('/setMetadata', setMetadata);
app.use('/uploadFile', uploadFile);
app.use('/genApp', genApp);

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
