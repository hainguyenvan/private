"use strict";
var LocationModel = require('../models/location')

var loadFromFile = function(fn) {
  var data = require(fn);
  console.log("data.length = " + data.length);
  for (let i in data) {
    let tmp = data[i].default || data[i];
   
    // console.log(tmp.id);
    tmp.geometry = undefined;
    LocationModel.import(tmp)
      .then(data => {
          console.log('Done 1 record !')
          // fulfill(data);
      })
      .catch(err => {
          console.log(err);
          reject();
      })
  } 
};

loadFromFile("./PlaceTHX.json");

var times = 0;
var timer = setInterval(
    () => {
        times ++;
        console.log(times + ", " + timer);
        if (times > 2) {
            console.log("Clear...");
            clearInterval(timer);
        }
    }, 1000);

