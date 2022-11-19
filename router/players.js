const express = require('express'),
    router = express.Router(),
    playerController = require('../controller/players');

router.get('/', playersController.getAllPlayers);
router.get('/:name', playersController.getPlayerByName);
router.post('/', playersController.addPlayer);
router.delete('/:name', playersController.deletePlayer);

module.exports = router;