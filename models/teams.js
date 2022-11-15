const {DataTypes} = require ('sequelize');

module.exports = (instance) => {
    return instance.define('teams', {
        teamId:{
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        nameTeam: {
            type: DataTypes.STRING,
        }
    }, {
        freezeTableName: true
    });
}

