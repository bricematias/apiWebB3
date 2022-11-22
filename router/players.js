const express = require('express'),
    router = express.Router(),
    playersController = require('../controller/players');

router.get('/', playersController.getAllPlayers);
router.get('/:firstname', playersController.getPlayerByFirstname);
router.post('/', playersController.addPlayer);
router.delete('/:id', playersController.deletePlayer);

module.exports = router;