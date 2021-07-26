'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model;
  class Movie extends Model {
    static associate(models) {
      Movie.belongsTo(models.User,{ foreignKey: 'UserId' })
    }
  }
  Movie.init({
    title: {
      type : DataTypes.STRING,
      allowNull:false,
      validate : {
        notNull : {
          args : true,
          msg : 'Title is required'
        }
      }
    },
    genre: DataTypes.STRING,
    poster: DataTypes.STRING,
    year: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Movie',
  });
  return Movie;
};