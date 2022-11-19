const db = require('../models');

exports.getAllPlayers = async () => {
    return await db.players.findAll();
}

exports.getPlayerByName = async (nameTeam) => {
    return await db.players.findAll({
        where: {
            nameTeam
        }
    });
}
exports.addPlayer = async (nameTeam) => {
    return await db.players.create({nameTeam});
}

exports.deletePlayer = async (nameTeam) => {
    return await db.players.destroy({
        where: {
            nameTeam
        }
    });
}

