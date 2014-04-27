// Node_modules setup
var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// DataBase setup
var mongo = require('mongodb');
//var monk = require('monk');
//var db = monk('localhost:27017/nodetest1');

// --------------- Connect to MongoLab --------------- //
var mongoose = require('mongoose');
var uristring = process.env.MONGOLAB_URI ||
    'localhost:27017/nodetest1';

mongoose.connect(uristring, function(err, res){
    if(err){
        console.log('ERROR connection to ' + uristring + '. ' + err);
    } else{
        console.log('Succeeded connected to: ' + uristring);
    }
});
// --------------- Connect to MongoLab --------------- //

var userSchema = new mongoose.Schema({
    username: String,
    email: String
});

var PUser = mongoose.model('usercollections', userSchema);

// Create user manually
var johndoe = new PUser ({
    username: "mongotest1",
    email: "mongotest1@gmail.com"
});

// Saving it to the database.
//johndoe.save(function (err) {if (err) console.log ('Error on save!')});

// Routes setup
var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Needs to come before our route definitions, so that they can make use of it
//app.use(function(req, res, next){
//    req.db = db;
//    next();
//});

app.use('/', routes);
app.use('/users', users);

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

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