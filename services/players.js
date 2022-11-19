const db = require('../models');

exports.getAllPlayers = async () => {
    return await db.players.findAll();
}

exports.getPlayerByName = async (name) => {
    return await db.players.findAll({
        where: {
            name
        }
    });
}
exports.addPlayer = async (name,lastName,position,nameTeam) => {
    return await db.players.create({name,lastName,position,nameTeam});
}

exports.deletePlayer = async (name) => {
    return await db.players.destroy({
        where: {
            name
        }
    });
}

