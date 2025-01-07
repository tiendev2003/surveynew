const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
  
const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  phone : {
    type: DataTypes.STRING,
    allowNull: true,
   },
  role: {
    type: DataTypes.ENUM('student', 'lecturer', 'admin'),
    defaultValue: 'student',
  },
}, {
  timestamps: true,
});

module.exports = User;
