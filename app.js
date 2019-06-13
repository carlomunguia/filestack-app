var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

function enableCors(app) {
    if (process.env.NODE_ENV !== 'production') {
        app.use(function (req, res, next) {
            res.header('Access-Control-Allow-Credentials', true)
            res.header('Access-Control-Allow-Origin', '*')
            res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
            res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Authorization')
            if ('OPTIONS' === req.method) {
                res.send(200)
            } else {
                next()
            }
        })
    }
}

enableCors(app);









module.exports = app;

