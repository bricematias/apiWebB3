/* const teamsService = require('../services/teams');
const createError = require('http-errors');

exports.getAllTeams = async (req, res) => {
    const teams = await teamsService.getAllTeams();
    res.set('Cache-control', 'max-age=30');
    res.json({success: true, data: teams});
}

exports.getTeamsByName = async (req, res, next) => {
   let teamsName = req.params.teams; // We are sure here by using validator that we have a valid number, we can parseInt
   const teams = await teamsService.getTeamsByName(teamsName);
   if (teams && teams.length === 1) {
      res.json({success: true, data: teams[0]});
   } else {
      next(createError(404, "no team found for this name"));
   }
}

exports.addTeam = async (req, res, next) => {
    if (req.body && req.body.nameTeam) {
        const teamCreated = await teamsService.addTeam(req.body.nameTeam);
        if (teamCreated) {
            res.status(201).json({success: true, id: teamCreated.name});
        } else {
            next(createError(400, "Error when creating this team, verify your args"));
        }
    } else {
        next(createError(400, "Cannot add this team, make sure all args has been sent"));
    }
}

exports.deleteTeam = async (req, res, next) => {
    if (req.params.nameTeam) {
        const name = req.params.nameTeam;
        const teams = await teamsService.getTeamByName(name);
        if (teams.length === 1) {
            const nbOfDeletion = await teamsService.deleteTeam(name);
            if (nbOfDeletion === 1) {
                res.json({success: true});
            } else {
                next(createError(500, 'Unknown error when trying to delete this teams, maybe it\'s already deleted'));
            }
        } else {
            next(createError(404, `The team with name '${name}' doesn't exists, it cannot be deleted`));
        }
    } else {
        next(createError(400, "The name is required"));
    }
}*/