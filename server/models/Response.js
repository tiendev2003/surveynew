const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');


const Response = sequelize.define('Response', {
  survey_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  question_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  answer_text: {
    type: DataTypes.TEXT,
  },
 
}, {
  timestamps: true,
});

module.exports = Response;
