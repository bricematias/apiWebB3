const express = require('express'),
    router = express.Router(),
    { authMiddleware } = require('../controller/auth'),
    playersController = require('../controller/players');

router.get('/',authMiddleware, playersController.getAllPlayers);
router.get('/:id', playersController.getPlayerById);
router.post('/', playersController.addPlayer);
router.delete('/:id', playersController.deletePlayer);

module.exports = router;