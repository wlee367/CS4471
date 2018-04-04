var express = require('express');
var router = express.Router();
const {mongoose} = require('../db/db');
const {Room} = require('../models/Room');
const {User} = require('../models/User');
const assert = require('assert');
const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://admin:admin@ds155278.mlab.com:55278/4471', function (err, database) {

  assert.equal(null, err);
  console.log("Successfully connected to MongoDB.");
  const db = database.db('4471');
  let location = [];
  let uniqueArray = [];

  router.get('/', function (req, res) {
        res.render('index.ejs');
      
  });

  router.get('/API/search', function(req,res) {
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
      res.send(uniqueArray);
      });
  })
});

module.exports = router;