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
  let uniqueRoomArray =[];
  let roomdata = [];
  let roomInfo = [];
  let building_to_query;
  let room = [];
  let query_for_rooms;
  let buildingNumber;

  router.get('/', function (req, res) {
        res.render('index.ejs');
  });
  router.post('/', function (req, res) {
    // res.send('got the data we needed');
    // console.log(req.body.value);
    building_to_query = req.body.value;
    console.log(req.body);    
    query_for_rooms = {"building": building_to_query};
});

// console.log(building_to_query);
  router.get('/API/building', function(req, res){
    
    db.collection('Courses').find(query_for_rooms).toArray(
      function(err, result){
        room = [];
        if(err)
          console.log(err);
        result.forEach((record)=>{
          room.push(record.room);
        });
      uniqueRoomArray = room.filter(function(elem,pos){
        return room.indexOf(elem) == pos;
      });
      res.send({rooms:uniqueRoomArray});
      
    });
  })

  router.post('/API/building', function (req, res) {
    // res.send('got the data we needed');
    // console.log(req.body.value);
    buildingNumber = req.body.roomnumber;
    console.log('-------------------------')
    console.log(buildingNumber);    
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
      res.send({buildings: uniqueArray});
      });
  });

  router.get('/API/roominfo', function(req,res) {
    console.log(building_to_query);
    console.log(buildingNumber);
    db.collection('Courses').find({
      "building":building_to_query,
      "room": buildingNumber
    }).toArray(
      function(err,result){
        roomdata= [];
        if(err)
          console.log(err);
          result.forEach((record) => {
            roomdata.push(record);
          });
        roomInfo = roomdata.filter(function(elem, pos) {
          return roomdata.indexOf(elem) == pos;
        });
        res.send({roomInfo: roomInfo});
      })

  });
});

module.exports = router;