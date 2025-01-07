const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const SurveyType = require('./SurveyType'); // Add this line

const Question = sequelize.define(
  "Question",
  {
    question_text: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    question_type: {
      type: DataTypes.ENUM("text", "multiple_choice", "rating", "boolean"),
      allowNull: false,
    },
    created_by: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("active", "draft", "inactive"),
      defaultValue: "active",
    },
    survey_type_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: SurveyType,
        key: 'id',
      },
    },
  },
  {
    timestamps: true,
  }
);

Question.belongsTo(SurveyType, { foreignKey: 'survey_type_id', as: 'surveyType' });
SurveyType.hasMany(Question, { foreignKey: 'survey_type_id', as: 'questions' });

module.exports = Question;
