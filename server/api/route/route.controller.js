'use strict';

var _ = require('lodash');
var Route = require('./route.model');

// Get list of routes
exports.index = function(req, res) {
  Route.find(function (err, routes) {
    if(err) { return handleError(res, err); }
    return res.json(200, routes);
  });
};

// Get a single route
exports.show = function(req, res) {
  Route.findById(req.params.id, function (err, route) {
    if(err) { return handleError(res, err); }
    if(!route) { return res.send(404); }
    return res.json(route);
  });
};

// Creates a new route in the DB.
exports.create = function(req, res) {
  Route.create(req.body, function(err, route) {
    if(err) { return handleError(res, err); }
    return res.json(201, route);
  });
};

// Updates an existing route in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Route.findById(req.params.id, function (err, route) {
    if (err) { return handleError(res, err); }
    if(!route) { return res.send(404); }
    var updated = _.merge(route, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, route);
    });
  });
};

// Deletes a route from the DB.
exports.destroy = function(req, res) {
  Route.findById(req.params.id, function (err, route) {
    if(err) { return handleError(res, err); }
    if(!route) { return res.send(404); }
    route.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}