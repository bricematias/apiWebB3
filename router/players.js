const express = require('express'),
    router = express.Router(),
    playerController = require('../controller/players');

router.get('/', playerController.getPlayers);
router.get('/:id', playerController.getPlayerById);
router.post('/', playerController.addPlayer);
router.delete('/:id', playerController.deletePlayerById);

module.exports = router;