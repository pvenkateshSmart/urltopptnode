var createError = require('http-errors');
var express = require('express');
const dotenv = require('dotenv')
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
dotenv.config({ path: './config/config.env' })
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
let cors = require("cors");

app.use(cors());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/pdftopppt', require('./routes/pdftoppt'))
app.use('/urltopdf', require('./routes/urltopdf'))
app.use('/papertemplate', require('./routes/papertemplate'))
// catch 404 and forward to error handler

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Methods','GET,PUT,POST,PATCH,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);

  next();
})
var environment = process.env.NODE_ENV || 'development';

const PORT = process.env.PORT || 3000

app.listen(
  PORT,
  console.log(`Server running in ${environment} mode on port ${PORT}`)
)
// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

// module.exports = app;
