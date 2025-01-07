const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const SurveyType = sequelize.define('SurveyType', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
}, {
  timestamps: true,
});

module.exports = SurveyType;
