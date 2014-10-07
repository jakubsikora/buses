'use strict';

var _ = require('lodash');
var request = require("request");
var Livestop = require('./livestop.model');

// Get list of livestops
exports.index = function(req, res) {
  Livestop.find(function (err, livestops) {
    if(err) { return handleError(res, err); }
    return res.json(200, livestops);
  });
};

// Get a single livestop
exports.show = function(req, res) {
  //TODO
  var url = "http://bh.buscms.com/api/XmlEntities/v1/departureboard.aspx?clientid=BrightonBuses&datatype=json&stopid=" + req.params.id;

  request(url, function(err, response, body){
    if(err) { return handleError(response, err); }
    if(!body) { return res.send(404); }
    return res.json(JSON.parse(body));
  });
};

function handleError(res, err) {
  return res.send(500, err);
}