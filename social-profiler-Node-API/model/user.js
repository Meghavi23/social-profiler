const Sequelize = require('sequelize');

//access database
const sequelize = require('../util/database');

const User = sequelize.define('user', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    email: {
        type: Sequelize.STRING,
        unique: true
    },
    password: Sequelize.STRING
});

module.exports = User;
