const { Sequelize, DataTypes, Model, DatabaseError } = require('sequelize');
const db = require('../../db/sequelize');

const Post = db.define('Post', {
      id: {
          type: DataTypes.STRING,  
          primaryKey: true
      }, 
      post_text: {
         type: DataTypes.TEXT,
         allowNull: false
      },
      post_image: {
         type: DataTypes.STRING      // image url   
      },
      post_video: {
         type: DataTypes.STRING      // image url  
      },
      total_likes: {
         type: DataTypes.INTEGER
      },
      total_comments: {
        type: DataTypes.INTEGER
      },
      total_shares: {
        type: DataTypes.INTEGER
      }
}, {
   schema: "user_schema"
});


module.exports = Post;