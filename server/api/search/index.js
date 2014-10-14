'use strict';

var express = require('express');
var controller = require('./search.controller');

var router = express.Router();

router.get('/:s', controller.show);
router.get('/:lat/:lon', controller.nearby);

module.exports = router;