var express = require('express');
var router = require('./routes/routes.js');
var app = express();
var path = require('path');
var engines = require('consolidate');
var bodyParser = require('body-parser');
var assert = require('assert');
const { ObjectID } = require('mongodb');
const { mongoose } = require('./db/db');
const { Room } = require('./models/Room');
const { User } = require('./models/User');
const MongoClient = require('mongodb').MongoClient;

// var mongoose = require('mongoose');
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../client'));
app.use(express.static(path.join(__dirname, '../client')));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: false}))

app.use('/', router);
module.exports = app;