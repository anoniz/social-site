const { Sequelize,DataTypes, Model } = require('sequelize');
const db = require('../../db/sequelize');

const postLike = db.define('postLike', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true
    }
}, {
    // Other model options go here
    schema: "user_schema"
});

const commentLike = db.define('commentLike', {
   id: {
       type: DataTypes.STRING,
       primaryKey: true
   }
}, {
    // Other model options go here
    schema: "user_schema"
});

module.exports = {
    postLike,
    commentLike
}

