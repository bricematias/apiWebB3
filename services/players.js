const db = require('../models');

exports.getAllPlayers = async () => {
    return await db.players.findAll();
}

exports.getPlayerByFirstname = async (firstname) => {
    return await db.players.findAll({
        where: {
            firstname
        }
    });
}
exports.getPlayerById = async (playerId) => {
    return await db.players.findAll({
        where: {
            playerId
        }
    });
}
exports.addPlayer = async (firstname,lastName,position,teamId) => {
    return await db.players.create({firstname,lastName,position,teamId});
}
exports.deletePlayer = async (playerId) => {
    return await db.players.destroy({
        where: {
            playerId
        }
    });
}

