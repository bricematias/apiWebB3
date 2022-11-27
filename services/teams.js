const db = require('../models');

exports.getAllTeams = async () => {
    return await db.teams.findAll();
}

exports.getTeamsById= async(teamId) => {
    return await db.teams.findAll({
        where: {
            teamId
        }
    });
}

exports.getTeamsByName= async(nameTeam) => {
    return await db.teams.findAll({
        where: {
            nameTeam
        }
    });
}

exports.addTeam = async(nameTeam) => {
    return await db.teams.create({nameTeam});
}

exports.deleteTeam = async(teamId) => {
    return await db.teams.destroy({
        where: {
            teamId
        }
    });
}
exports.updateTeam = async (teamId,nameTeam) => {
    return await db.teams.update({
            nameTeam: nameTeam,
        },
        {
            where: {teamId: teamId}
        });
}

