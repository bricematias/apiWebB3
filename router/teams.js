const { authMiddleware } = require('../controller/auth');

const express = require('express'),
    router = express.Router(),
    teamsController = require('../controller/teams');

router.get('/', teamsController.getAllTeams);
router.get('/:id', teamsController.getTeamsById);
router.post('/',authMiddleware, teamsController.addTeam);
router.delete('/:id',authMiddleware, teamsController.deleteTeam);

module.exports = router;