var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/products');
const productRouter = require('./routes/products')
const userRouter = require('./routes/userRoute')
const orderRouter = require('./routes/orderRoute')
const errorMiddleware = require('./middleware/error')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/ecommerce')
    .then(()=> console.log('MongoDB connected!'))
    .catch(error => console.log('Something Wrong',error))

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/product',productRouter)
app.use('/api/user',userRouter)
app.use('/api/order',orderRouter)
app.use(errorMiddleware)

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

module.exports = app;
