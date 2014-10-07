'use strict';

var geocoderProvider = 'google';
var http = 'http';
var geocoder = require('node-geocoder').getGeocoder(geocoderProvider, http);

// Get a single geocoder
exports.search = function(req, res) {
  geocoder.geocode(req.params.address, function(err, response) {
    if(err) { return handleError(response, err); }
    if(!response) { return res.send(404); }
    return res.json(response);
  });
};

exports.reverse = function(req, res) {
  geocoder.reverse(req.params.lat, req.params.lon, function(err, response) {
    if(err) { return handleError(response, err); }
    if(!response) { return res.send(404); }
    return res.json(response);
  });
};


function handleError(res, err) {
  return res.send(500, err);
}