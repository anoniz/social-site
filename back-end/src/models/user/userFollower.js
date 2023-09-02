const { Sequelize,DataTypes, Model } = require('sequelize');
const db = require('../../db/sequelize');


const Follower = db.define('Follower', {
    follower_id: {  //pk
    
    },
    user_id: {    //fk
    
    },
    follower_user_id: {

    }
});