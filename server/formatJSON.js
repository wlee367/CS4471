const { ObjectID } = require('mongodb');
const { mongoose } = require('./db/db');
var fs = require('fs');

var path = require('path');
var engines = require('consolidate');
var bodyParser = require('body-parser');
var assert = require('assert');
const jsonObject = require('../scraper/data.json')
const Course = require('./models/Course');

let course = {};
let day = [];
let arrayOfJson = []



        for(var j = 0; j<=Object.keys(jsonObject).length; j++){
            // console.log(Object.keys(jsonObject).length);
            // console.log(j);
            let subjects = jsonObject[j];
            for (let classes in subjects){
            
                course.code = classes;
                
                let details = subjects[classes];
            
                for (element in details){
                    let lastArray = details[element];
                    for (var i =0; i<lastArray.length; i++){
            
                        if(i%12 === 0){
                            course = {};
                            day = [];
                        }
                        
                        if(i%12 >= 1 && i%12 <= 5){ 
                            day.push(lastArray[i]);
                        }
                        if(i%12 === 6)
                            course.days = day;
                        if(i%12 === 9)
                            course.start = lastArray[i];
                        if(i%12 === 10)
                            course.end = lastArray[i];
                        
                        if(i%12 === 11){
                            course.code = classes;
                            // course.location = lastArray[i];
                            const location = lastArray[i]
                            const array = location.split("-");
                            array.map(function(val) {return + val+1;})
                            // console.log(array[0]);
                            // console.log(array[1]); 
                            course.building = array[0];
                            course.room = array[1];
                            //break apart building and room number here 
                            console.log(course);
                            arrayOfJson.push(course);
                        }
                            
                    }
                }
    
            }
        };


        
        fs.writeFile("./arrayJSON.json", JSON.stringify(arrayOfJson, null, 2), function(err) {
            if(err) {
                return console.log(err);
            }
        
            console.log("The file was saved!");
        }); 

