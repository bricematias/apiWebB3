const db = require('../models');

exports.getAllTeams = async () => {
    return await db.teams.findAll();
}

exports.getTeamsByName = async(nameTeam) => {
    return await db.teams.findAll({
        where: {
            nameTeam
        }
    });
}
exports.addTeam = async(nameTeam) => {
    return await db.teams.create({nameTeam});
}

exports.deleteTeam = async(nameTeam) => {
    return await db.teams.destroy({
        where: {
            nameTeam
        }
    });
}

