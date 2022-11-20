const express = require('express'),
    router = express.Router(),
    teamsController = require('../controller/teams');

router.get('/', teamsController.getAllTeams);
router.get('/:nameTeam', teamsController.getTeamsByName);
router.post('/', teamsController.addTeam);
router.delete('/:nameTeam', teamsController.deleteTeam);

module.exports = router;