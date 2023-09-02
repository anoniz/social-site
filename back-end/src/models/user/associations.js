const { Sequelize, DataTypes } = require ('sequelize');
const User = require('./userProfile');
const UserPost = require('./userPost');
const UserComment = require('./userComment');
const {postLike,commentLike} = require('./userLike');

User.hasMany(UserPost, {
    onDelete: 'CASCADE',
    foreignKey: {
        type: DataTypes.STRING,
        allowNull: false
    }
});
UserPost.belongsTo(User);

// a comment have 2 relations. 1 who made the comment(user) and where (post)
User.hasMany(UserComment, {
    onDelete: 'CASCADE',
    foreignKey: {
        type: DataTypes.STRING,
        allowNull: false
    }
});
UserComment.belongsTo(User);

UserPost.hasMany(UserComment, {
    onDelete: 'CASCADE',
    foreignKey: {
        type: DataTypes.STRING,
        allowNull: false
    }
});
UserComment.belongsTo(UserPost);


User.hasMany(postLike, {
    onDelete: 'CASCADE',
    foreignKey: {
        type: DataTypes.STRING,
        allowNull: false
    }
});
postLike.belongsTo(User);

UserPost.hasMany(postLike, {
    onDelete:'CASCADE',
    foreignKey: {
        type: DataTypes.STRING,
        allowNull: false
    }
});
postLike.belongsTo(UserPost);

User.hasMany(commentLike, {
    onDelete: 'CASCADE',
    foreignKey: {
        type: DataTypes.STRING,
        allowNull: false
    }
});
commentLike.belongsTo(User);

UserComment.hasMany(commentLike, {
    onDelete: 'CASCADE',
    foreignKey: {
        type: DataTypes.STRING,
        allowNull: false
    }
});
commentLike.belongsTo(UserComment);



module.exports = {
    User,
    UserPost,
    UserComment,
    postLike,
    commentLike
}

