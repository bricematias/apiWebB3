const {Sequelize} = require('sequelize');
const dbConfig = require('../db.config');

const instance  = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password,{
    host: dbConfig.hostname,
    dialect: "mysql"
});

module.exports = {
    instance,
    users: require('./users')(instance),
    players: require('./players')(instance),
    teams: require('./teams')(instance)
};

instance.models.teams.hasOne(instance.models.players, {foreignKey: 'teamId'});
