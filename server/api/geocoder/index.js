'use strict';

var express = require('express');
var controller = require('./geocoder.controller');

var router = express.Router();

router.get('/:address', controller.search);
router.get('/:lat/:lon', controller.reverse);

module.exports = router;