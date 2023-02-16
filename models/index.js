const User = require('./User');
const Post = require('./Post');
const Review = require('./Review')

User.hasMany(Post, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

User.hasMany(Review, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Post.hasMany(Review, {
  foreignKey: 'post_id',
  onDelete: 'CASCADE'
});

Post.belongsTo(User, {
  foreignKey: 'user_id'
});

Review.belongsTo(User, {
    foreignKey: 'user_id'
});

  Review.belongsTo(Post, {
    foreignKey: 'post_id'
});

module.exports = { User, Post , Review };