const {DataTypes} = require ('sequelize');

module.exports = (instance) => {
    return instance.define('players', {
        playerId:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            foreignKey: true
        },
        name: {
            type: DataTypes.STRING,
        },
        lastName: {
            type: DataTypes.STRING,
        },
        position: {
            type: DataTypes.STRING,
        }
    }, {
        freezeTableName: true
    });
}