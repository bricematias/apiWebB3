const express = require('express'),
    router = express.Router(),
    authentificationController = require('../controller/auth');

router.post('/', authentificationController.login);

module.exports = router;