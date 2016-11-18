var mongo = require('mongodb').MongoClient;

var link = 'mongodb://Matheus:kirkhetfield92@ds157247.mlab.com:57247/urls';

mongo.connect(link, function(err, db) {
        if(err) throw err;
        var urls = db.collection('urls');
        urls.find({
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