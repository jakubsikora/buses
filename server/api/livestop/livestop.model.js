'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var LivestopSchema = new Schema({
  name: String,
  info: String,
  active: Boolean
});

module.exports = mongoose.model('Livestop', LivestopSchema);