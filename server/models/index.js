const User = require("./User");
const Survey = require("./Survey");
const Question = require("./Question");
const Option = require("./Option");
const SurveyParticipant = require("./SurveyParticipant");
const SystemLog = require("./SystemLog");
const Report = require("./Report");
const Class = require("./Class");
const Department = require("./Department");
const SurveyResponse = require("./SurveyResponse");
const SurveyType = require('./SurveyType'); // Add this line

// 1-N: User -> Survey
User.hasMany(Survey, { foreignKey: "created_by" });
Survey.belongsTo(User, { foreignKey: "created_by" });

// 1-N: Question -> Option
Question.hasMany(Option, { foreignKey: "question_id", as: "options" });
Option.belongsTo(Question, { foreignKey: "question_id", as: "options" });

// 1-N: User -> SurveyResponse
User.hasMany(SurveyResponse, { foreignKey: "user_id" });
SurveyResponse.belongsTo(User, { foreignKey: "user_id" });

// 1-N: Survey -> SurveyResponse
Survey.hasMany(SurveyResponse, { foreignKey: "survey_id" });
SurveyResponse.belongsTo(Survey, { foreignKey: "survey_id" });

// 1-N: Question -> SurveyResponse
Question.hasMany(SurveyResponse, { foreignKey: "question_id" });
SurveyResponse.belongsTo(Question, { foreignKey: "question_id" });

// 1-N: Class -> SurveyResponse
Class.hasMany(SurveyResponse, { foreignKey: "class_id" });
SurveyResponse.belongsTo(Class, { foreignKey: "class_id" });

// 1-N: Department -> SurveyResponse
Department.hasMany(SurveyResponse, { foreignKey: "department_id" });
SurveyResponse.belongsTo(Department, { foreignKey: "department_id" });

Survey.belongsToMany(User, {
  through: SurveyParticipant,
  foreignKey: "survey_id",
});
User.belongsToMany(Survey, {
  through: SurveyParticipant,
  foreignKey: "user_id",
});

SurveyParticipant.belongsTo(User, { foreignKey: "user_id" });
User.hasMany(SurveyParticipant, { foreignKey: "user_id" });

SurveyParticipant.belongsTo(Survey, { foreignKey: "survey_id" });
Survey.hasMany(SurveyParticipant, { foreignKey: "survey_id" });

Survey.hasOne(Report, { foreignKey: "survey_id" });
Report.belongsTo(Survey, { foreignKey: "survey_id" });

User.hasMany(SystemLog, { foreignKey: "user_id" });
SystemLog.belongsTo(User, { foreignKey: "user_id" });

User.belongsTo(Class, { foreignKey: "class_id", as: "class" });
Class.hasMany(User, { foreignKey: "class_id", as: "class" });

Survey.belongsToMany(Class, {
  through: "SurveyClasses",
  foreignKey: "survey_id",
});
Class.belongsToMany(Survey, {
  through: "SurveyClasses",
  foreignKey: "class_id",
});

Survey.belongsToMany(Department, {
  through: "SurveyDepartments",
  foreignKey: "survey_id",
});
Department.belongsToMany(Survey, {
  through: "SurveyDepartments",
  foreignKey: "department_id",
});
Survey.belongsToMany(Class, {
  through: "SurveyClasses",
  foreignKey: "survey_id",
});
Class.belongsToMany(Survey, {
  through: "SurveyClasses",
  foreignKey: "class_id",
});
Question.belongsTo(User, { foreignKey: "created_by" });
User.hasMany(Question, { foreignKey: "created_by" });

// Add associations for SurveyType
Survey.belongsTo(SurveyType, { foreignKey: 'survey_type_id' });
SurveyType.hasMany(Survey, { foreignKey: 'survey_type_id' });

Question.belongsTo(SurveyType, { foreignKey: 'survey_type_id' });
SurveyType.hasMany(Question, { foreignKey: 'survey_type_id' });

User.prototype.canAccessSurvey = async function (surveyId) {
  const count = await SurveyParticipant.count({
    where: {
      user_id: this.id,
      survey_id: surveyId,
    },
  });
  return count > 0;
};

module.exports = {
  User,
  Survey,
  Question,
  Option,
  SurveyParticipant,
  SystemLog,
  Report,
  Class,
  Department,
  SurveyResponse,
  SurveyType,
};
