var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cheerio = require('cheerio');
var request = require('request');
var expressHandlebars = require('express-handlebars');


var PORT = process.env.PORT || 8080;

//handlebars setup
app.engine('handlebars', expressHandlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//middleware
app.use(bodyParser.urlencoded({
    extended:false
}));
app.use(express.static('public'));

///////CONNECT TO THE DATABASE//////




//require schema
var Note = require('./models/noteModel.js');
var Article = require('./models/articleModel.js');

//routes
app.get('/', function(req, res){
    res.send('index.html');
})






app.listen(PORT, function(req, res){
    console.log('app running on port %s', PORT);
});