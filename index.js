var express = require('express');
var app = express();
var url = require('url');
var mongo = require('mongodb').MongoClient;
var link = 'mongodb://Matheus:kirkhetfield92@ds157247.mlab.com:57247/urls';




app.set('port', (process.env.PORT || 5000));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.get('*', function(req, response) {  
  var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl; 
  var parameter = (req.originalUrl).substring(1,(req.originalUrl).length);
  console.log(fullUrl);
  console.log(parameter);
  if (parameter == '')
    response.send("Inform the address to be shortened at the url as follows: https://ancient-sierra-90112.herokuapp.com/new/http://www.urlToBeShortened.com");
  
  else if (parameter.indexOf("new/http://www.") >= 0 || parameter.indexOf("new/https://www.") >= 0){
    var urlObj = {
        original_url: parameter.substring(4,parameter.length),
        short_url: "https://ancient-sierra-90112.herokuapp.com/" + Math.floor((Math.random() * 10000) + 1)
    }
    response.json(urlObj);


    //database insert operation
    var mongo = require('mongodb').MongoClient
    mongo.connect(link, function(err, db) {
        if(err) {
            console.log("db connection error");
            throw err;
        }
        var urls = db.collection('urls');
        urls.insert(urlObj);
        console.log("Database updated!");
        db.close();
    });
  }


    else if(parameter.length<=5 && !isNaN(parameter)){
    //response.send("shortened url");

        var mongo = require('mongodb').MongoClient
        mongo.connect(link, function(err, db) {
        if(err) {
            console.log("Can't connect to database!");
            throw err;
        }
        var urls = db.collection('urls');
        urls.findOne({
            short_url: { $eq: 'https://ancient-sierra-90112.herokuapp.com/' + parameter }
        }, function(error, result){
                if (error){ 
                    console.log("Database error!!");
                }
                if (result)
                    response.redirect('https://ancient-sierra-90112.herokuapp.com/' + parameter);
                else
                    response.send("This shortened url is not in database.");
            });
        });
    }


});


app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});











/*
//insert obj to db
var mongo = require('mongodb').MongoClient
    mongo.connect(link, function(err, db) {
        if(err) {
            console.log("db connection error");
            throw err;
        }
        var urls = db.collection('urls'),
            obj = {originalURL: "https://www.google.com", shortID: 997};
        urls.insert(obj);
        console.log(JSON.stringify(obj));
        db.close()  ;
});

*/