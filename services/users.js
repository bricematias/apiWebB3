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
    return await db.users.destroy({
        where: {
            id
        }
    });
}

exports.updateUser = async (id, firstName, lastName, password) => {
    return await db.users.update({
        firstName: firstName,
        lastName: lastName,
        password: password
    },
    {
        where: {id}
    });
}
