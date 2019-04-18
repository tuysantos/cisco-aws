var express = require("express");
var bodyParser = require("body-parser");
var mongodb = require("mongodb");
var ObjectID = mongodb.ObjectID;

var INSTANCES_COLLECTION = "uc2instances";

var app = express();
app.use(bodyParser.json());

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

// CONTACTS API ROUTES BELOW
// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
    console.log("ERROR: " + reason);
    res.status(code || 500).json({"error": message});
  }
  
  /*  "/api/uc2instances"
   *    GET: finds all uc2 instances
   */

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

  app.get("/api/uc2instances/page/:skip/:top", function(req, res) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    const topVal = req.params.top,
        skipVal = req.params.skip,
        top = (isNaN(topVal)) ? 10 : +topVal,
        skip = (isNaN(skipVal)) ? 0 : +skipVal;

        db.collection(INSTANCES_COLLECTION).find({}).skip(skip).limit(top).toArray(function(err, docs) {
            if (err) {
              handleError(res, err.message, "Failed to get UC2 Instances.");
            } else {
                
              res.status(200).json(docs);
            }
          });
    
    // db.collection(INSTANCES_COLLECTION).count((err, instCount) => {
    //     let count = instCount;
    //     db.collection(INSTANCES_COLLECTION).find({})
    //         .skip(skipVal)
    //         .limit(topVal)
    //         .exec((err, instances) => {
    //             if(err) {
    //                 return callback(err);
    //             }
    //             callback(null, {
    //                 count: count,
    //                 instances: instances
    //             });
    //         })
    // });

    

    
  });

//   app.get("/api/login/:user/:pwd", function(req, res) {
//     res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
//     //var query = [{ userId: req.params.user }, { password: req.params.pwd }];
//     var query = { userId: req.params.user };
//     db.collection("users").find(query).toArray(function(err, docs) {
//       if (err) {
//         handleError(res, err.message, "Failed to get user.");
//       } else {
//         res.status(200).json(doc.ops.token);
//       }
//     });
//   });

  app.post("/api/login", function(req, res) {
    var users = {userId:'admin', password:'supersecret', token: 'YWRtaW46c3VwZXJzZWNyZXQ='}
    db.collection("users").insertOne(users, function(err, doc) {
        if (err) {
            handleError(res, err.message, "Failed to create new user.");
        } else {
            res.status(201).json(doc.ops[0]);
        }
    });
  });
  
  app.post("/api/uc2instances", function(req, res) {
    //var newContact = req.body;
    //newContact.createDate = new Date();
    var arrayData = [
        { name: 'name 3', id: 'b-457822wers', type: 't2.medium', az: 'us-east-1b', publicIP: '54.210.167.203', privateIP: '10.20.30.42', state: 'running'},
        { name: 'name 4', id: 'a-114582qprr', type: 't2.medium', az: 'us-east-1b', publicIP: '54.210.167.204', privateIP: '10.20.30.43', state: 'stopped'},
        { name: 'name 5', id: 'c-451233gdcb', type: 't1.medium', az: 'us-east-1b', publicIP: '54.210.167.205', privateIP: '10.20.30.44', state: 'running'},
        { name: 'name 6', id: 'b-b78945cbvj', type: 't1.small', az: 'us-east-1b', publicIP: '54.210.167.206', privateIP: '10.20.30.45', state: 'running'},
        { name: 'name 7', id: 't-238455mjpu', type: 't3.medium', az: 'us-east-1b', publicIP: '54.210.167.207', privateIP: '10.20.30.46', state: 'running'},
        { name: 'name 8', id: 'm-982332eeea', type: 't1.medium', az: 'us-east-1b', publicIP: '54.210.167.208', privateIP: '10.20.30.47', state: 'running'},
        { name: 'name 9', id: 'd-512344hdfs', type: 't2.small', az: 'us-east-1b', publicIP: '54.210.167.209', privateIP: '10.20.30.48', state: 'running'},
        { name: 'name 10', id: 'a-035457dsfg', type: 't2.medium', az: 'us-east-1b', publicIP: '54.210.168.130', privateIP: '10.20.30.49', state: 'stopped'},
        { name: 'name 11', id: 'v-984522dscf', type: 't2.medium', az: 'us-east-1b', publicIP: '54.210.168.130', privateIP: '10.20.30.40', state: 'running'},
        { name: 'name 12', id: 's-362541xvds', type: 't2.small', az: 'us-east-1b', publicIP: '54.210.168.131', privateIP: '10.20.31.40', state: 'running'},
        { name: 'name 13', id: 'z-451477ffds', type: 't1.medium', az: 'us-east-1b', publicIP: '54.210.168.132', privateIP: '10.20.32.40', state: 'running'},
        { name: 'name 14', id: 'a-582142jhiy', type: 't3.medium', az: 'us-east-1b', publicIP: '54.210.168.133', privateIP: '10.20.33.40', state: 'stopped'},
        { name: 'name 15', id: 'p-251422soiu', type: 't1.small', az: 'us-east-1b', publicIP: '54.210.168.134', privateIP: '10.20.34.40', state: 'running'},
        { name: 'name 16', id: 'g-547123weot', type: 't3.medium', az: 'us-east-1b', publicIP: '54.210.168.135', privateIP: '10.20.35.40', state: 'running'},
        { name: 'name 17', id: 'f-125248qwer', type: 't3.medium', az: 'us-east-1b', publicIP: '54.210.168.136', privateIP: '10.20.36.40', state: 'running'},
        { name: 'name 18', id: 'l-851241nkhf', type: 't2.medium', az: 'us-east-1b', publicIP: '54.210.168.137', privateIP: '10.20.37.40', state: 'running'},
        { name: 'name 19', id: 'k-142513vkjf', type: 't2.small', az: 'us-east-1b', publicIP: '54.210.168.138', privateIP: '10.20.38.40', state: 'stopped'},
        { name: 'name 20', id: 'b-012513wsxc', type: 't1.small', az: 'us-east-1b', publicIP: '54.210.168.139', privateIP: '10.20.39.40', state: 'running'},
        { name: 'name 21', id: 'y-251252dkfg', type: 't1.medium', az: 'us-east-1b', publicIP: '54.210.168.140', privateIP: '10.21.30.40', state: 'running'},
        { name: 'name 22', id: 'i-162542djgg', type: 't2.medium', az: 'us-east-1b', publicIP: '54.210.168.141', privateIP: '10.21.30.40', state: 'running'}
    ];

    db.collection(INSTANCES_COLLECTION).insertMany(arrayData, function(err, doc) {
        if (err) {
            handleError(res, err.message, "Failed to create new UC2 Instances.");
        } else {
            res.status(201).json(doc.ops[0]);
        }
    });
    
  //insertMany
    // if (!req.body.name) {
    //   handleError(res, "Invalid user input", "Must provide a name.", 400);
    // } else {
    //   db.collection(INSTANCES_COLLECTION).insertOne(newContact, function(err, doc) {
    //     if (err) {
    //       handleError(res, err.message, "Failed to create new UC2 Instances.");
    //     } else {
    //       res.status(201).json(doc.ops[0]);
    //     }
    //   });
    // }
  });
  
