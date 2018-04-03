var express = require('express');
var router = express.Router();
const { mongoose } = require('../db/db');
const { Room } = require('../models/Room');
const { User } = require('../models/User');
const assert = require('assert');
const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://admin:admin@ds155278.mlab.com:55278/4471', function(err, database) {

   assert.equal(null, err);
    console.log("Successfully connected to MongoDB.");
    const db = database.db('4471');

   router.get('/', function(req, res){
      db.collection('Courses').find({ start: '9:30 AM'}).toArray(
        function(err, result){
          res.render('index.ejs', {'Courses': result});

         }
      );
    
   });
});

module.exports = router;