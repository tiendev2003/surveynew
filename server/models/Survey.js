const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const SurveyType = require('./SurveyType'); // Add this line

const Survey = sequelize.define('Survey', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  created_by: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  start_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  end_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('draft', 'active', 'closed'),
    defaultValue: 'draft',
  },
  is_approved : {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  total_user: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  survey_type_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: SurveyType,
      key: 'id',
    },
  },
}, {
  timestamps: true,
});

Survey.belongsTo(SurveyType, { foreignKey: 'survey_type_id', as: 'surveyType' });
SurveyType.hasMany(Survey, { foreignKey: 'survey_type_id', as: 'surveys' });

module.exports = Survey;
