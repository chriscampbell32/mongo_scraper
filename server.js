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
mongoose.connect("mongodb://localhost/scraper");
var db = mongoose.connection;

db.on('error', function(err){
    console.log('Mongoose error: ', err);
});
db.once('open', function(){
    console.log('Mongoose connected :)');
});



//require schema
var Note = require('./models/noteModel.js');
var Article = require('./models/articleModel.js');

//routes
app.get('/', function(req, res){
    //scrape reddit
    request('https://news.ycombinator.com/', function(error, response, html){
        var $ = cheerio.load(html);
        $("td.title:nth-child(3)>a").each(function(i, element){
            var articleTitle = $(element).tex();
            var articleLink = $(element).attr('href');

            //create new instance
            var insertedArticle = new Article({
                title: articleTitle,
                link: articleLink
            });
            //save to database
            insertedArticle.save(function(err, dbArticle){
                if(err){
                    console.log(err);

                }else {
                    console.log(dbArticle);
                }
            });
            res.sendFile(process.cwd() + '/index.html')
        });

        });
    });

app.get('/displayInfo', function(req, res){
    Article.find({}, function(err, articleData){
        if(err){
            throw err;
        }

        res.json(articleData);
    })
});







app.listen(PORT, function(req, res){
    console.log('app running on port %s', PORT);
});