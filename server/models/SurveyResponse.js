
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
 
const SurveyResponse = sequelize.define("SurveyResponse", {
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  survey_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  question_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  answer_text: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

module.exports = SurveyResponse;