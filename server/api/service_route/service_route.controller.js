'use strict';

var _ = require('lodash');
var ServiceRoute = require('./service_route.model');

// Get list of service_routes
exports.index = function(req, res) {
  ServiceRoute.find(function (err, service_routes) {
    if(err) { return handleError(res, err); }
    return res.json(200, service_routes);
  });
};

// Get a single service_route
exports.show = function(req, res) {
  ServiceRoute.findById(req.params.id, function (err, service_route) {
    if(err) { return handleError(res, err); }
    if(!service_route) { return res.send(404); }
    return res.json(service_route);
  });
};

// Creates a new service_route in the DB.
exports.create = function(req, res) {
  ServiceRoute.create(req.body, function(err, service_route) {
    if(err) { return handleError(res, err); }
    return res.json(201, service_route);
  });
};

// Updates an existing service_route in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  ServiceRoute.findById(req.params.id, function (err, service_route) {
    if (err) { return handleError(res, err); }
    if(!service_route) { return res.send(404); }
    var updated = _.merge(service_route, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, service_route);
    });
  });
};

// Deletes a service_route from the DB.
exports.destroy = function(req, res) {
  ServiceRoute.findById(req.params.id, function (err, service_route) {
    if(err) { return handleError(res, err); }
    if(!service_route) { return res.send(404); }
    service_route.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}