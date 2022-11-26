const teamsService = require('../services/teams');
const createError = require('http-errors');

exports.getAllTeams = async (req, res) => {
    const teams = await teamsService.getAllTeams();
    res.set('Cache-control', 'max-age=30');
    res.json({success: true, data: teams});
}

exports.getTeamsById = async (req, res, next) => {
   let teamId = req.params.id; // We are sure here by using validator that we have a valid number, we can parseInt
   const teams = await teamsService.getTeamsById(teamId);
   if (teams && teams.length === 1) {
      res.json({success: true, data: teams[0]});
   } else {
      next(createError(404, "no team found for this teamId"));
   }
}

exports.addTeam = async (req, res, next) => {
    if (req.body && req.body.nameTeam) {
        const verifyName = await teamsService.getTeamsByName(req.body.nameTeam);
        if (verifyName.length === 0) {
            const teamCreated = await teamsService.addTeam(req.body.nameTeam);
            if (teamCreated) {
                res.status(201).json({success: true, name: teamCreated.nameTeam});
            } else {
                next(createError(400, "Error when creating this team, verify your args"));
            }
        } else {
            next(createError(400, "This team name already exists"));
        }
    } else {
        next(createError(400, "Cannot add this team, make sure all args has been sent"));
    }
}

exports.deleteTeam = async (req, res, next) => {
    if (req.params.id) {
        const teamId = req.params.id;
        const teams = await teamsService.getTeamsById(teamId);
        if (teams.length === 1) {
            const nbOfDeletion = await teamsService.deleteTeam(teamId);
            if (nbOfDeletion === 1) {
                res.json({success: true});
            } else {
                next(createError(500, 'Unknown error when trying to delete this teams, maybe it\'s already deleted'));
            }
        } else {
            next(createError(404, `The team with teamId '${teamId}' doesn't exists, it cannot be deleted`));
        }
    } else {
        next(createError(400, "The name is required"));
    }
}