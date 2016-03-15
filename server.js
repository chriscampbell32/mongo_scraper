var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cheerio = require('cheerio');
var request = require('request');
var expressHandlebars = require('express-handlebars');
var PORT = process.env.PORT || 8080;






app.listen(PORT, function(req, res){
    console.log('app running on port %s', PORT);
});