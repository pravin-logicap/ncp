var config = require("./config");
var MongoClient = require('mongodb').MongoClient
exports.connectToMongo = function () {
    return new Promise(function (resolve, reject) {
        MongoClient.connect('mongodb://' + config.dbAuth.userName + ':' + config.dbAuth.password+ '@localhost:27017', function (err, client) {
            //MongoClient.connect('mongodb://localhost:27017', function (err, client) {  
        if (err) {
                console.log("Error in connection ", err);
                reject(err);
                return;
            }
            var db = client.db('sample');
            resolve(db);
        })
    })
};