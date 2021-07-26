'use strict';
const { hashPassword } = require('../helpers/bcrypt');
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model;
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Movie,{ foreignKey: 'UserId' })
    }
  }
  User.init({
    email: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        isEmail : {
          args: true,
          msg: 'Invalid email format'
        }
      }
    },
    password: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        len: {
          args : [5],
          msg : 'Minimal 5 character'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate: (user) => {
        user.password = hashPassword(user.password);
      }
    },
    validate: {
      isUnique() {
        return User.findOne({
          where: {
            email: this.email
          }
        })
        .then(data => {
          if (data) {
            throw new Error('Email is being used')
          } 
        })
      }
    }
  });
  return User;
};