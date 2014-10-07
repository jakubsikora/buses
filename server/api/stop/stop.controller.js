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

// Creates a new stop in the DB.
exports.create = function(req, res) {
  Stop.create(req.body, function(err, stop) {
    if(err) { return handleError(res, err); }
    return res.json(201, stop);
  });
};

// Updates an existing stop in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Stop.findById(req.params.id, function (err, stop) {
    if (err) { return handleError(res, err); }
    if(!stop) { return res.send(404); }
    var updated = _.merge(stop, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, stop);
    });
  });
};

// Deletes a stop from the DB.
exports.destroy = function(req, res) {
  Stop.findById(req.params.id, function (err, stop) {
    if(err) { return handleError(res, err); }
    if(!stop) { return res.send(404); }
    stop.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}