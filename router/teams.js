const express = require('express'),
    router = express.Router(),
    teamController = require('../controller/teams');

router.get('/', teamController.getAllTeams);
router.get('/:name', teamController.getTeamsByName);
router.post('/', teamController.addTeam);
router.delete('/:name', teamController.deleteTeam);

module.exports = router;