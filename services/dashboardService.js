var MongoClient = require('mongodb').MongoClient
var responseGenrator = require("./responseGenrator");
exports.getDashboardData = function () {
    try {
        return new Promise(function (resolve, reject) {
            MongoClient.connect('mongodb://localhost:27017', function (err, client) {
                if (err) {
                    console.log("Error in connection ", err);
                    reject(responseGenrator.responseGenrator(404, "Error while connecting to database ", ex));
                    return;
                }
                var db = client.db('sample');
                db.collection('dashboard').find().toArray(function (err, result) {
                    if (err) {
                        console.log("Error occuered at DB operation ", err);
                        resolve(responseGenrator.responseGenrator(400, "Database failed for read dashboard data", err));
                        return;
                    } else {
                        console.log("Data found for dashboard ");
                        let count = result.length;
                        let data = {};
                        data["result"] = result;
                        data["count"] = count;
                        resolve(responseGenrator.responseGenrator(200, "Data found", data));
                        return;
                    }
                })
            })
        })
    } catch (ex) {
        reject(responseGenrator.responseGenrator(404, "Exception occuered ", ex));
        return;
    }
}

exports.newsReports = function (indexRefernceNo) {
    try {
        return new Promise(function (resolve, reject) {
            MongoClient.connect('mongodb://localhost:27017', function (err, client) {
                if (err) {
                    console.log("Error in connection ", err);
                    reject(responseGenrator.responseGenrator(404, "Error while connecting to database ", ex));
                    return;
                }
                var db = client.db('sample');
                db.collection('newsReports').find({ "indexRefernceNo": indexRefernceNo }).toArray(function (err, result) {
                    if (err) {
                        console.log("Error occuered at DB operation ", err);
                        resolve(responseGenrator.responseGenrator(400, "Database failed for read dashboard data", err));
                        return;
                    } else {
                        console.log("Data found for newsReports ");
                        let count = result.length;
                        let data = {};
                        data["result"] = result;
                        data["count"] = count;
                        resolve(responseGenrator.responseGenrator(200, "Data found", data));
                        return;
                    }
                })
            })
        })
    } catch (ex) {
        reject(responseGenrator.responseGenrator(404, "Exception occuered ", ex));
        return;
    }
}

exports.registerUser = function (reqObj) {
    try {
        return new Promise(function (resolve, reject) {
            MongoClient.connect('mongodb://localhost:27017', function (err, client) {
                if (err) {
                    console.log("Error in connection ", err);
                    reject(responseGenrator.responseGenrator(404, "Error while connecting to database ", ex));
                    return;
                }
                var db = client.db('sample');
                let queryCriteria = registrationOrchestration(reqObj);
                db.collection('userRegistrations').update(queryCriteria.findCriteria, queryCriteria.insertCriteria, {upsert: true}, function (err, result) {
                    if (err) {
                        console.log("Error occuered at DB operation ", err);
                        resolve(responseGenrator.responseGenrator(400, "Database failed for Write dashboard data", err));
                        return;
                    } else {
                        console.log("User registration is done");
                        resolve(responseGenrator.responseGenrator(200, "Data updated", result));
                        return;
                    }
                })
            })
        })
    } catch (ex) {
        reject(responseGenrator.responseGenrator(404, "Exception occuered ", ex));
        return;
    }
}

function registrationOrchestration(reqObj) {
    console.log(" >>>>>>>>  ", reqObj.mobileNo)
    let query = { "mobileNo": reqObj.mobileNo };
    let updateQuery = {
        $set: {
            "dist": reqObj.dist,
            "tal": reqObj.tal,
            "village": reqObj.tal,
            "mobileNo": reqObj.mobileNo,
            "additionalInfo": reqObj.additionalInfo,
            "booking": reqObj.booking,
            "bookingDetail": reqObj.bookingDetail,
            "confirmation": reqObj.confirmation,
            "confirmationDetail": reqObj.confirmationDetail
        }
    }
    return {"findCriteria" : query, "insertCriteria" : updateQuery}
}

exports.getRegisterdUser = function (mobileNo) {
    try {
        return new Promise(function (resolve, reject) {
            MongoClient.connect('mongodb://localhost:27017', function (err, client) {
                if (err) {
                    console.log("Error in connection ", err);
                    reject(responseGenrator.responseGenrator(404, "Error while connecting to database ", ex));
                    return;
                }
                var db = client.db('sample');
                db.collection('userRegistrations').find({ "mobileNo": mobileNo }).toArray(function (err, result) {
                    if (err) {
                        console.log("Error occuered at DB operation ", err);
                        resolve(responseGenrator.responseGenrator(400, "Database failed for read dashboard data", err));
                        return;
                    } else {
                        console.log("Data found for newsReports ");
                        let count = result.length;
                        let data = {};
                        data["result"] = result;
                        data["count"] = count;
                        resolve(responseGenrator.responseGenrator(200, "Data found", data));
                        return;
                    }
                })
            })
        })
    } catch (ex) {
        reject(responseGenrator.responseGenrator(404, "Exception occuered ", ex));
        return;
    }
}