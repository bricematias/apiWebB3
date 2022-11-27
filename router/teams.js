const { authMiddleware } = require('../controller/auth');

const express = require('express'),
    router = express.Router(),
    teamsController = require('../controller/teams');
const playersController = require("../controller/players");

router.get('/', teamsController.getAllTeams);
router.get('/:id', teamsController.getTeamsById);
router.patch('/:id', teamsController.updateTeam);
router.post('/',authMiddleware, teamsController.addTeam);
router.delete('/:id',authMiddleware, teamsController.deleteTeam);

module.exports = router;