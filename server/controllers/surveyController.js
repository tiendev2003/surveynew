const {
  Survey,
  Question,
  User,
  Response,
  Option,
  SurveyParticipant,
  SurveyType, // Add this line
} = require("../models");
const { successResponse, errorResponse } = require("../utils/response");

const { sendSurveyEmail } = require("../utils/surveyUtils");
const { scheduleSurveyEmail } = require("../utils/scheduler");
const Department = require("../models/Department");
const Class = require("../models/Class");
const SurveyQuestion = require("../models/SurveyQuestion");
const SurveyResponse = require("../models/SurveyResponse");
const sequelize = require("../config/db");
const schedule = require('node-schedule');

exports.createSurvey = async (req, res) => {
  const { title, description, start_date, end_date, question_ids, questions, survey_type_id } = req.body; // Add survey_type_id

  try {
    // Tạo khảo sát
    const survey = await Survey.create({
      title,
      description,
      start_date,
      end_date,
      created_by: req.user.id,
      survey_type_id, // Add survey_type_id
    });

    // Liên kết câu hỏi có sẵn
    if (Array.isArray(question_ids) && question_ids.length > 0) {
      const surveyQuestions = question_ids.map((id) => ({
        survey_id: survey.id,
        question_id: id,
      }));
      await SurveyQuestion.bulkCreate(surveyQuestions);
    }

    // Tạo câu hỏi mới và liên kết
    if (Array.isArray(questions) && questions.length > 0) {
      for (const q of questions) {
        const question = await Question.create({
          question_text: q.text,
          question_type: q.type,
          created_by: req.user.id,
          survey_type_id: survey_type_id, // Add survey_type_id
          status: "draft",
        });

        if (q.type === "multiple_choice" && Array.isArray(q.options)) {
          const options = q.options.map((opt) => ({
            question_id: question.id,
            option_text: opt,
          }));
          await Option.bulkCreate(options);
        }

        await SurveyQuestion.create({
          survey_id: survey.id,
          question_id: question.id,
        });
      }
    }

    successResponse(res, "Survey created successfully", survey);
  } catch (err) {
    errorResponse(res, "Failed to create survey", err.message, 500);
  }
};

exports.getSurveys = async (req, res) => {
  try {
    const surveys = await Survey.findAll({
      where: { created_by: req.user.id },
      attributes: [
        "id",
        "title",
        "description",
        "start_date",
        "end_date",
        "createdAt",
        "status",
      ],
    });

    successResponse(res, "Surveys retrieved successfully", surveys);
  } catch (err) {
    errorResponse(res, "Failed to retrieve surveys", err.message, 500);
  }
};  

exports.updateSurvey = async (req, res) => {
  const { id } = req.params;
  const { title, description, start_date, end_date, question_ids, questions, survey_type_id } = req.body; // Add survey_type_id
  console.log(req.body);
  try {
    const survey = await Survey.findByPk(id);
    if (!survey)
      return errorResponse(res, "Survey not found", "Invalid survey ID", 404);

    // Cập nhật khảo sát
    survey.title = title || survey.title;
    survey.description = description || survey.description;
    survey.start_date = start_date || survey.start_date;
    survey.end_date = end_date || survey.end_date;
    survey.survey_type_id = survey_type_id || survey.survey_type_id; // Add survey_type_id

    await survey.save();

    // Xóa tất cả các câu hỏi liên kết trước đó
    await SurveyQuestion.destroy({ where: { survey_id: survey.id } });

    // Liên kết câu hỏi có sẵn

    if (Array.isArray(question_ids) && question_ids.length > 0) {
      const surveyQuestions = question_ids.map((id) => ({
        survey_id: survey.id,
        question_id: id,
      }));
      await SurveyQuestion.bulkCreate(surveyQuestions);
      console.log("có câu hỏi");
    }

    // Tạo câu hỏi mới và liên kết
    if (Array.isArray(questions) && questions.length > 0) {
      for (const q of questions) {
        const question = await Question.create({
          question_text: q.text,
          question_type: q.type,
          created_by: req.user.id,
          survey_type_id: survey_type_id, // Add survey_type_id
        });

        if (q.type === "multiple_choice" && Array.isArray(q.options)) {
          const options = q.options.map((opt) => ({
            question_id: question.id,
            option_text: opt,
          }));
          await Option.bulkCreate(options);
        }

        await SurveyQuestion.create({
          survey_id: survey.id,
          question_id: question.id,
        });
      }
    }

    successResponse(res, "Survey updated successfully", { survey });
  } catch (err) {
    errorResponse(res, "Failed to update survey", err.message, 500);
  }
};

exports.deleteSurvey = async (req, res) => {
  const { id } = req.params;

  try {
    const survey = await Survey.findByPk(id);
    if (!survey)
      return errorResponse(res, "Survey not found", "Invalid survey ID", 404);

    await survey.destroy();
    successResponse(res, "Survey deleted successfully", null);
  } catch (err) {
    errorResponse(res, "Failed to delete survey", err.message, 500);
  }
};

exports.sendSurvey = async (req, res) => {
  const { id } = req.params;
  const { emailList } = req.body;

  try {
    const survey = await Survey.findByPk(id);
    if (!survey)
      return errorResponse(res, "Survey not found", "Invalid survey ID", 404);

    if (emailList && Array.isArray(emailList)) {
      await sendSurveyEmail(emailList, survey); // Hàm gửi email

      // Lưu trữ user được xem survey
      const users = await User.findAll({
        where: { email: emailList },
        attributes: ["id"],
      });

      const surveyParticipants = users.map((user) => ({
        user_id: user.id,
        survey_id: survey.id,
      }));

      await SurveyParticipant.bulkCreate(surveyParticipants);
    }

    successResponse(res, "Survey sent successfully", null);
  } catch (err) {
    errorResponse(res, "Failed to send survey", err.message, 500);
  }
};

exports.createSurveyLink = async (req, res) => {
  const { id } = req.params;

  try {
    const survey = await Survey.findByPk(id);

    if (!survey) return errorResponse(res, "Survey not found", null, 404);

    const link = `${process.env.CLIENT_URL}/manage-surveys/${id}`;

    successResponse(res, "Survey link created successfully", { link });
  } catch (err) {
    errorResponse(res, "Failed to create survey link", err.message, 500);
  }
};

exports.updateSurveySchedule = async (req, res) => {
  const { id } = req.params;
  const { start_date, end_date } = req.body;

  try {
    const survey = await Survey.findByPk(id);

    if (!survey) return errorResponse(res, "Survey not found", null, 404);

    survey.start_date = start_date || survey.start_date;
    survey.end_date = end_date || survey.end_date;

    await survey.save();

    successResponse(res, "Survey schedule updated successfully", {
      start_date: survey.start_date,
      end_date: survey.end_date,
    });
  } catch (err) {
    errorResponse(res, "Failed to update survey schedule", err.message, 500);
  }
};

exports.scheduleSurvey = async (req, res) => {
  const { id } = req.params;
  const { schedule_time, class_ids } = req.body;

  try {
    const survey = await Survey.findByPk(id);

    if (!survey) return errorResponse(res, "Survey not found", null, 404);

    await scheduleSurveyEmail(survey, class_ids, schedule_time);

    successResponse(res, "Survey scheduled successfully", { schedule_time });
  } catch (err) {
    errorResponse(res, "Failed to schedule survey", err.message, 500);
  }
};

exports.approveSurvey = async (req, res) => {
  const { id } = req.params;

  try {
    const survey = await Survey.findByPk(id);
    if (!survey)
      return errorResponse(res, "Survey not found", "Invalid survey ID", 404);

    survey.is_approved = true; // Đánh dấu khảo sát đã được duyệt
    survey.status = "active"; // Đánh dấu khảo sát đã được kích hoạt
    await survey.save();

    successResponse(res, "Survey approved successfully", { survey });
  } catch (err) {
    console.log(err);
    errorResponse(res, "Failed to approve survey", err.message, 500);
  }
};
exports.getPendingSurveys = async (req, res) => {
  try {
    const surveys = await Survey.findAll({
      where: { is_approved: false }, // Chỉ lấy khảo sát chưa duyệt
    });

    successResponse(res, "Pending surveys retrieved successfully", { surveys });
  } catch (err) {
    errorResponse(res, "Failed to retrieve pending surveys", err.message, 500);
  }
};

exports.sendSurveyToGroups = async (req, res) => {
  const { id } = req.params; // ID của khảo sát
  const { type, ids } = req.body; // Gửi theo "department" hoặc "class"
  try {
    const survey = await Survey.findByPk(id);
    if (!survey)
      return errorResponse(res, "Survey not found", "Invalid survey ID", 404);

    if (!survey.is_approved) {
      return errorResponse(
        res,
        "Survey not approved",
        "Survey must be approved before sending",
        403
      );
    }

    let emailList = [];

    if (type === "department") {
      // Lấy danh sách email từ các khoa
      const users = await User.findAll({
        include: [
          {
            model: Class,
            as: "class",
            include: [
              {
                model: Department,
                as: "department",
                where: { id: ids },
              },
            ],
          },
        ],
        attributes: ["email", "id"],
      });
      emailList = users.map((user) => user.email);

      // Lưu trữ user được xem survey
      const existingParticipants = await SurveyParticipant.findAll({
        where: { survey_id: survey.id },
        attributes: ["user_id"],
      });
      const existingUserIds = existingParticipants.map((p) => p.user_id);

      const newParticipants = users
        .filter((user) => !existingUserIds.includes(user.id))
        .map((user) => ({
          user_id: user.id,
          survey_id: survey.id,
        }));
      await SurveyParticipant.bulkCreate(newParticipants);
    } else if (type === "class") {
      console.log(ids);
      // Lấy danh sách email từ các lớp
      const users = await User.findAll({
        where: { class_id: ids },
        attributes: ["email", "id"],
      });
      emailList = users.map((user) => user.email);

      // Lưu trữ user được xem survey
      const existingParticipants = await SurveyParticipant.findAll({
        where: { survey_id: survey.id },
        attributes: ["user_id"],
      });
      const existingUserIds = existingParticipants.map((p) => p.user_id);

      const newParticipants = users
        .filter((user) => !existingUserIds.includes(user.id))
        .map((user) => ({
          user_id: user.id,
          survey_id: survey.id,
        }));
      await SurveyParticipant.bulkCreate(newParticipants);
    } 
    // nếu type = all thì gửi cho tất cả user
    else if (type === "all_students") {
      const users = await User.findAll({
        attributes: ["email", "id"],
      });
      emailList = users.map((user) => user.email);

    }else {
      return errorResponse(
        res,
        "Invalid type",
        "Invalid group type provided",
        400
      );
    }

    if (emailList.length === 0) {
      return errorResponse(
        res,
        "No users found",
        "No users associated with the provided IDs",
        404
      );
    }
    survey.total_user = emailList.length;
    // Gửi email đến danh sách
    await sendSurveyEmail(emailList, survey);

    // Schedule reminder email 3 days before survey end date
    const reminderDate = new Date(survey.end_date);
    reminderDate.setDate(reminderDate.getDate() - 3);
    if (reminderDate > new Date()) {
      schedule.scheduleJob(reminderDate, async () => {
        await sendSurveyEmail(emailList, survey, true); // true indicates reminder email
      });
    }

    await survey.save();
    successResponse(
      res,
      `Survey sent successfully to ${emailList.length} recipients`,
      null
    );
  } catch (err) {
    console.log(err);
    errorResponse(res, "Failed to send survey", err.message, 500);
  }
};

exports.getSurveyQuestions = async (req, res) => {
  const { id } = req.params;

  try {
    const survey = await Survey.findByPk(id, {
      include: [
        {
          model: Question,
          include: [{ model: Option }],
        },
      ],
    });

    if (!survey) {
      return errorResponse(res, "Survey not found", null, 404);
    }

    successResponse(
      res,
      "Survey questions retrieved successfully",
      survey.Questions
    );
  } catch (err) {
    errorResponse(res, "Failed to retrieve survey questions", err.message, 500);
  }
};
exports.duplicateSurvey = async (req, res) => {
  const { id } = req.params;

  try {
    const survey = await Survey.findByPk(id, {
      include: [
        {
          model: Question,
          as: "questions",
          include: [
            { model: Option, 
              as: "options"

            }
          ],
        },
      ],
    });
    if (!survey) return errorResponse(res, "Survey not found", null, 404);

    const duplicatedSurvey = await Survey.create({
      title: `${survey.title} (Bản sao)`,
      description: survey.description,
      start_date: survey.start_date,
      end_date: survey.end_date,
      created_by: req.user.id,
    });

    for (const question of survey.questions) {
      await SurveyQuestion.create({
        survey_id: duplicatedSurvey.id,
        question_id: question.id,
      });
    }

    successResponse(res, "Survey duplicated successfully", duplicatedSurvey);
  } catch (err) {
    errorResponse(res, "Failed to duplicate survey", err.message, 500);
  }
};

// get detail survey

exports.getSurveyDetail = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  try {
    const survey = await Survey.findByPk(id, {
      include: [
        {
          model: Question,
          as: "questions",
          include: [{ model: Option, as: "options" }],
        },
      ],
    });

    if (!survey) {
      return errorResponse(res, "Survey not found", null, 404);
    }

    // Fetch user responses for the survey
    const userResponses = await SurveyResponse.findAll({
      where: { survey_id: id, user_id: userId },
      attributes: ["question_id", "answer_text"],
    });

    const responseMap = userResponses.reduce((map, response) => {
      map[response.question_id] = response.answer_text;
      return map;
    }, {});

    // Attach user responses to the questions
    const questionsWithResponses = survey.questions.map((question) => ({
      ...question.toJSON(),
      user_response: responseMap[question.id] || null,
    }));

    successResponse(res, "Survey retrieved successfully", {
      ...survey.toJSON(),
      questions: questionsWithResponses,
    });
  } catch (err) {
    console.log(err);
    errorResponse(res, "Failed to retrieve survey", err.message, 500);
  }
};

exports.getSurveyOfStudent = async (req, res) => {
  const userId = req.user.id;
  const surveyId = req.params.id;
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      errorResponse(res, "User not found", "Invalid user ID", 404);
    }

    const canAccess = await user.canAccessSurvey(surveyId);
    if (!canAccess) {
      errorResponse(
        res,
        "Unauthorized",
        "You do not have access to this survey",
        403
      );
    }

    const survey = await Survey.findByPk(surveyId);
    if (!survey) {
      errorResponse(res, "Survey not found", "Invalid survey ID", 404);
    }

    successResponse(res, "Survey retrieved successfully", survey);
  } catch (error) {
    errorResponse(res, "Failed to retrieve survey", err.message, 500);
  }
};

exports.getSurveysForStudent = async (req, res) => {
  const userId = req.user.id;

  try {
    const user = await User.findByPk(userId, {
      include: [
        {
          model: SurveyParticipant,
          include: [{ model: Survey }],
        },
      ],
    });

    if (!user) {
      return errorResponse(res, "User not found", "Invalid user ID", 404);
    }

    const surveys = user.SurveyParticipants.map(
      (participant) => participant.Survey
    );

    successResponse(res, "Surveys retrieved successfully", surveys);
  } catch (err) {
    errorResponse(res, "Failed to retrieve surveys", err.message, 500);
  }
};

exports.saveSurveyResponse = async (req, res) => {
  const { surveyId, responses } = req.body;
  const userId = req.user.id;
  
  try {

    // kiểm tra user có quyền truy cập survey không
    const user = await User.findOne({
      where: { id: userId },
      include: [
        {
          model: Class,
          as: "class",
        },
      ]
    })
    if (!user) {
      return errorResponse(res, "User not found", "Invalid user ID", 404);
    }

    const canAccess = await user.canAccessSurvey(surveyId);
    if (!canAccess) {
      return errorResponse(
        res,
        "Unauthorized",
        "You do not have access to this survey",
        403
      );
    }


    const survey = await Survey.findByPk(surveyId);
    if (!survey) {
      return errorResponse(res, "Survey not found", "Invalid survey ID", 404);
    }

    for (const response of responses) {
      const existingResponse = await SurveyResponse.findOne({
        where: {
          user_id: userId,
          survey_id: surveyId,
          question_id: response.question_id,
        },
      });

      if (existingResponse) {
        existingResponse.answer_text = response.answer_text;
        existingResponse.class_id = user.class_id;
        existingResponse.department_id = user.class.department_id;
        
        await existingResponse.save();
      } else {
        await SurveyResponse.create({
          user_id: userId,
          survey_id: surveyId,
          question_id: response.question_id,
          answer_text: response.answer_text,
          class_id: user.class_id,
        });
      }
    }

    successResponse(res, "Survey responses saved successfully", null);
  } catch (err) {
    errorResponse(res, "Failed to save survey responses", err.message, 500);
  }
};

exports.getSurveyResponseStats = async (req, res) => {
  const { surveyId } = req.params;

  try {
    const classStats = await SurveyResponse.findAll({
      where: { survey_id: surveyId },
      attributes: [
        "class_id",
        [sequelize.fn("COUNT", sequelize.fn("DISTINCT", sequelize.col("user_id"))), "response_count"],
      ],
      group: ["class_id"],
      include: [{ model: Class, attributes: ["name"] }],
    });

    const departmentStats = await SurveyResponse.findAll({
      where: { survey_id: surveyId }, 
      attributes: [
        "department_id",
        [sequelize.fn("COUNT", sequelize.fn("DISTINCT", sequelize.col("user_id"))), "response_count"],
      ],
      group: ["department_id"],
      include: [{ model: Department, attributes: ["name"] }],
    });

    const questionStats = await SurveyResponse.findAll({
      where: { survey_id: surveyId },
      attributes: [
        "question_id",
        [sequelize.fn("COUNT", sequelize.col("question_id")), "response_count"], // Fix column name
      ],

      group: ["question_id"],
      include: [{ model: Question, attributes: ["question_text"] }],
    });

    const optionStats = await SurveyResponse.findAll({
      where: { survey_id: surveyId },
      attributes: [
        "answer_text",
        "question_id",
        [sequelize.fn("COUNT", sequelize.col("answer_text")), "response_count"],
      ],
      group: ["answer_text","question_id" ],
      include: [{ model: Question, attributes: ["question_text"] }],
    });

    successResponse(res, "Survey response statistics retrieved successfully", {
      classStats,
      departmentStats,
      questionStats, // Add question stats
      optionStats, // Add option stats
    });
  } catch (err) {
    console.log(err);
    errorResponse(
      res,
      "Failed to retrieve survey response statistics",
      err.message,
      500
    );
  }
};

exports.getAllSurveyAdmin = async (req, res) => {
  try {
    const surveys = await Survey.findAll( );

    successResponse(res, "Surveys retrieved successfully", surveys);
  } catch (err) {
    console.log(err);
    errorResponse(res, "Failed to retrieve surveys", err.message, 500);
  }
}