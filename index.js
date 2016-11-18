var mongo = require('mongodb').MongoClient;

var link = 'mongodb://Matheus:kirkhetfield92@ds157247.mlab.com:57247/urls';

mongo.connect(link, function(err, db) {
        if(err) throw err;
        var urls = db.collection('urls');
        urls.find({
            fullURL: 'www.google.com'
        }).toArray(function(err, docs){
            if(err) throw err;
            console.log(docs);
            db.close();
        });
});