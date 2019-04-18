var express = require("express");
var bodyParser = require("body-parser");
var mongodb = require("mongodb");
var ObjectID = mongodb.ObjectID;

var INSTANCES_COLLECTION = "uc2instances";

var app = express();
app.use(bodyParser.json());
let count = 0;

// Create a database variable outside of the database connection callback to reuse the connection pool in your app.
var db;

// Connect to the database before starting the application server.
mongodb.MongoClient.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/test", function (err, client) {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  // Save database object from the callback for reuse.
  db = client.db();
  console.log("Database connection ready");

  // Initialize the app.
  var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
  });
});

function handleError(res, reason, message, code) {
    console.log("ERROR: " + reason);
    res.status(code || 500).json({"error": message});
  }

  app.get("/api/uc2instances", function(req, res) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    db.collection(INSTANCES_COLLECTION).find({}).toArray(function(err, docs) {
      if (err) {
        handleError(res, err.message, "Failed to get UC2 Instances.");
      } else {
        res.status(200).json(docs);
      }
    });
  });

  app.get("/api/uc2instances/page/:skip/:top/:token", function(req, res) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    const topVal = req.params.top,
        skipVal = req.params.skip,
        top = (isNaN(topVal)) ? 10 : +topVal,
        skip = (isNaN(skipVal)) ? 0 : +skipVal;
        let result;

        if(req.params.token === ''){
            result = {total: 0, errorMessage: 'You must specify a token', instances: []}
            res.status(200).json(result);
            return;
        }
        else {
            var query = {token: req.params.token}
            db.collection("users").find(query).toArray(function(err, docs) {
            if (err) {
                handleError(res, err.message, "Failed to create new user.");
                } 
                else {
                    if(docs.length === 0){
                        res.status(200).json({isvalid: true});
                        result = {total: 0, errorMessage: 'Invalid token', instances: []}
                        res.status(200).json(result);
                    }
                }
            });
        }
        
        db.collection(INSTANCES_COLLECTION).find({})
            .count(function(err, icount){
                count = icount;
            });

        db.collection(INSTANCES_COLLECTION).find({})
            .skip(skip)
            .limit(top)
            .toArray(function(err, docs){
                if (err) {
                    handleError(res, err.message, "Failed to create new user.");
                } else {
                    if(docs.length === 0){
                        result = {total: 0, errorMessage: 'Failed to get UC2 Instances.', instances: []}
                        res.status(200).json(result);
                    }
                    else {
                        result = {total: count, errorMessage: '', instances: docs}
                        res.status(200).json(result);
                    }
                }
        });
  });

  app.get("/api/login/:token", function(req, res) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    var query = {token: req.params.token}
    db.collection("users").find(query).toArray(function(err, docs) {
      if (err) {
        handleError(res, err.message, "Failed to create new user.");
      } else {
        if(docs.length > 0){
            res.status(200).json({isvalid: true});
        }
        else {
            res.status(200).json({isvalid: false});
        }
      }
    });
  });

  
