'use strict';

var Stop = require('../stop/stop.model');
var async = require('async');

exports.show = function(req, res) {
  async.parallel({
    stops: findStops(req.params.s),
    location: findLocation(req.params.s)
  },
  function(err, results) {
    var maxSeeds = 5;
    var stopLength = results.stops.length || 0;
    var locationLength = results.location.length || 0;
    var totalLength = stopLength + locationLength;
    var stopPercent = Math.round(stopLength/totalLength*100);
    var locationPercent = Math.round(locationLength/totalLength*100);
    var stopSeeds = Math.round(stopPercent/100 * maxSeeds);
    var locationSeeds = Math.round(locationPercent/100 * maxSeeds);
    var output = [];

    if (stopSeeds < 1 && stopLength > 0) {
      stopSeeds = 1;
      locationSeeds = locationSeeds - 1;
    }

    if (locationSeeds < 1 && locationLength > 0) {
      locationSeeds = 1;
      stopSeeds = stopSeeds - 1;
    }

    output = {
      stops: (results.stops.splice(0, stopSeeds) || null),
      location: (results.location.splice(0, locationSeeds) || null)
    };

    res.json(output);
  });
};

function findStops(s) {
  return function(callback) {
    Stop.find({StopName: new RegExp(s, 'i')}, function (err, stop) {
      callback(null, stop);
    });
  };
}

function findLocation(s) {
  return function(callback) {
    var geocoderProvider = 'google';
    var http = 'http';
    var geocoder = require('node-geocoder').getGeocoder(geocoderProvider, http);

    geocoder.geocode({
      address: s,
      components: 'administrative_area:Brighton|country:GB'
    }, function(err, response) {
      callback(null, response);
    });
  };
}

function handleError(res, err) {
  return res.send(500, err);
}