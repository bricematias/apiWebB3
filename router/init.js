const express = require('express'),
    router = express.Router(),
    initController = require('../controller/init');

router.post('/', initController.initialisation);

module.exports = router;