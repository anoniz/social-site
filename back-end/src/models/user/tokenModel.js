const {sequelize, DataTypes} = require('sequelize');
const db = require('../../db/sequelize');

const Token = db.define('Token', {
    user_id: {
        type: DataTypes.STRING,
    }
})
