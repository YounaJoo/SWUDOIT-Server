var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser = require('body-parser');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');


//var SerialPort = require('serialport');
//var serialPort = new SerialPort("COM5", { baudRate:9600}, false);

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.get('/', function(req, res){
  const id = req.cookies.id || 0;

  id++;

  res.cookie('id', id, {
    maxAge: 100000,
  });

  res.send('id: ' + id);
});


/*serialPort.open(function(){
  console.log('접속중');
  serialPort.on('data', function(data) {
    // Arduino에서 오는 데이터를 출력한다.
    //console.log('data received: ' + data);
    var stl = "" + data;

    if(stl.includes('temp')){
      console.log(stl);
    }else if(stl.includes('humi')){
      console.log(stl);
    }else if(stl.includes('gas')){
      console.log(stl);
    }else if(stl.includes('sound')){
      console.log(stl);
    }else{
      console.log(stl);
    }
  });
});*/

module.exports = app;
