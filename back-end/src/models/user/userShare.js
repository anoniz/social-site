const { Sequelize,DataTypes, Model } = require('sequelize');
const db = require('../../db/sequelize');

const Share = db.define('share', {
    share_id: {

    },
    user_id: {    //fk , the user who shared the post.
    
    },
    post_id: {    //fk , the posy being shared

    }
});