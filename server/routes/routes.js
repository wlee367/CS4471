var express = require('express');
var router = express.Router();
const {
  mongoose
} = require('../db/db');
const {
  Room
} = require('../models/Room');
const {
  User
} = require('../models/User');
const assert = require('assert');
const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://admin:admin@ds155278.mlab.com:55278/4471', function (err, database) {

  assert.equal(null, err);
  console.log("Successfully connected to MongoDB.");
  const db = database.db('4471');
  let location = [];
  router.get('/', function (req, res) {
    db.collection('Courses').find().toArray(
      function (err, result){
        if(err)
          console.log(err);
        result.forEach((record) => {
          location.push(record.building);
        });
      uniqueArray = location.filter(function(elem, pos) {
        return location.indexOf(elem) == pos;
      });
      // console.log(uniqueArray);
      res.render({
        "buildings": uniqueArray
        });
      });

      
    
    db.collection('Courses').find({
      start: '9:30 AM'
    }).toArray(
      function (err, result) {
        res.render('index.ejs', {
          'Courses': result
        });
        // db.Courses.aggregate([{$group: {"_id":"$building"}}])
      }
    );
  });
});

module.exports = router;