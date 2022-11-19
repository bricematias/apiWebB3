const db = require('../models');

exports.getAllUsers  = async() => {
    return await db.users.findAll();
}

exports.getUserById = async(id) => {
    return await db.users.findAll({
        where: {
            id
        }
    });
}
exports.addUser = async(firstName,lastName,password) => {
    return await db.users.create({firstName,lastName,password});
}

exports.deleteUser = async(id) => {
    return await db.teams.destroy({
        where: {
            id
        }
    });
}
