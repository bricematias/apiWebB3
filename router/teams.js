const express = require('express'),
    router = express.Router(),
    teamController = require('../controller/teams');

router.get('/', teamController.getTeam);
router.get('/:id', teamController.getTeamById);
router.post('/', teamController.addTeam);
router.delete('/:id', teamController.deleteTeamById);

module.exports = router;