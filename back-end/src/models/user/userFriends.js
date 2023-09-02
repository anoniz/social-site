const { Sequelize,DataTypes, Model } = require('sequelize');
const db = require('../../db/sequelize');

const Friend = db.define('Friend', {
    friendship_id: {       //pk

    },
    user_id: {   //fk

    },
    friend_id: {   //fk
     
    },
    status: {   //accepted, rejected, pending

    }
});

