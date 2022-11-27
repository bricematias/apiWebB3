const express = require('express'),
    router = express.Router(),
    { authiMddleware, authMiddleware } = require('../controller/auth'),
    playersController = require('../controller/players');

router.get('/', playersController.getAllPlayers);
router.get('/:id', playersController.getPlayerById);
router.patch('/:id', playersController.updatePlayer);
router.post('/',authMiddleware, playersController.addPlayer);
router.delete('/:id',authMiddleware, playersController.deletePlayer);

module.exports = router;