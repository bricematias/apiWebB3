const {DataTypes} = require ('sequelize');

module.exports = (instance) => {
    return instance.define('users', {
        id:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        firstName: {
            type: DataTypes.STRING,
        },
        lastName:{
            type: DataTypes.STRING,
        },
        password:{
            type: DataTypes.STRING,
        }
    }, {
        freezeTableName: true
    });
}
