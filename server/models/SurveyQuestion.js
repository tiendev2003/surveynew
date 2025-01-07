const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Survey = require("./Survey");
const Question = require("./Question");

const SurveyQuestion = sequelize.define(
  "SurveyQuestion",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    survey_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Survey,
        key: "id",
      },
    },
    question_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Question,
        key: "id",
      },
    },
  },
  {
    timestamps: false,
  }
);

Survey.belongsToMany(Question, {
  through: SurveyQuestion,
  foreignKey: "survey_id",
  as: "questions",
});
Question.belongsToMany(Survey, {
  through: SurveyQuestion,
  foreignKey: "question_id",
  as: "surveys",
});

module.exports = SurveyQuestion;
