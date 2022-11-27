const express = require('express'),
    router = express.Router(),
    teamsController = require('../controller/teams');

router.get('/', teamsController.getAllTeams);
router.get('/:id', teamsController.getTeamsById);
router.post('/', teamsController.addTeam);
router.delete('/:id', teamsController.deleteTeam);

module.exports = router;