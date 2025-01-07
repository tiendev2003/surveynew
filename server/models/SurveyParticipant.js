const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const SurveyParticipant = sequelize.define('SurveyParticipant', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  survey_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  participation_status: {
    type: DataTypes.ENUM('pending', 'completed'),
    defaultValue: 'pending',
  },
}, {
  timestamps: true,
});

module.exports = SurveyParticipant;
