'use strict';

var express = require('express');
var controller = require('./stop.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.get('/name/:name', controller.searchByName);

module.exports = router;