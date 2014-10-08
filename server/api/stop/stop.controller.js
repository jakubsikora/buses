'use strict';

var _ = require('lodash');
var Stop = require('./stop.model');

// Get list of stops
exports.index = function(req, res) {
  Stop.find(function (err, stops) {
    if(err) { return handleError(res, err); }
    return res.json(200, stops.splice(0,10));
  });
};

// Get a single stop
exports.show = function(req, res) {
  Stop.findById(req.params.id, function (err, stop) {
    if(err) { return handleError(res, err); }
    if(!stop) { return res.send(404); }
    return res.json(stop);
  });
};

exports.searchByName = function(req, res) {
  Stop.find({StopName: new RegExp(req.params.name, 'i')}, function (err, stop) {
    if(err) { return handleError(res, err); }
    if(!stop) { return res.send(404); }
    return res.json(stop);
  });
};

function handleError(res, err) {
  return res.send(500, err);
}