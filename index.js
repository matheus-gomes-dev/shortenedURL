var mongo = require('mongodb').MongoClient;

var link = 'mongodb://Matheus:kirkhetfield92@ds157247.mlab.com:57247/urls';


/*
mongo.connect(link, function(err, db) {
        if(err) throw err;
        var urls = db.collection('urls');
        urls.findOne({
            fullURL: { $eq: 'www.google.com' }
        },{
            name: 1,
            age: 1,
            _id: 0
        }).toArray(function(err, docs){
            if(err){
                console.log("Entrou A");
                throw err;
            }
            console.log(docs);
            db.close();
        });
});
*/



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