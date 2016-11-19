var express = require('express');
var app = express();
var mongo = require('mongodb').MongoClient;


var link = 'mongodb://Matheus:testingdb1234@ds157247.mlab.com:57247/urls';


app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('*', function(req, response) {  
  var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl; 
  var parameter = (req.originalUrl).substring(1,(req.originalUrl).length);
  console.log(fullUrl);
  console.log(parameter);


});



/*

mongo.connect(link, function(err, db) {
    if(err) {
        console.log("Erro aqui!");
        throw err;
    }
    var urls = db.collection('urls');
    urls.findOne({
        originalURL: { $eq: 'https://www.google.com' }
    }, function(error, result){
        if (error){ 
            console.log("Deu erro!!")
        }
        if (result){
            console.log("Encontrou algo!!");
        }
        else{
            console.log("Nao encontrou nada!!");
        }

    });
});

*/



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