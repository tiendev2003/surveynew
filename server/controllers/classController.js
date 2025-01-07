const { Department, User } = require("../models");
const Class = require("../models/Class");
const { errorResponse, successResponse } = require("../utils/response");

exports.createClass = async (req, res) => {
  const { name, department_id } = req.body;
  console.log(req.body);
  try {
    // kiểm trả có trùng tên lớp học không
    const classExist = await Class.findOne({ where: { name } });
    if (classExist) {
      return errorResponse(res, "Class already exists", 400);
    }

    const classroom = await Class.create({ name, department_id });
    successResponse(res, "Class created successfully", classroom);
  } catch (err) {
    console.log(err);
    errorResponse(res, "Failed to create class", err.message, 500);
  }
};

exports.getClasses = async (req, res) => {
  try {
    const classes = await Class.findAll({
      include: [{ model: Department, as: "department" }],
    });
    successResponse(res, "Classes retrieved successfully", classes);
  } catch (err) {
    errorResponse(res, "Failed to retrieve classes", err.message, 500);
  }
};

exports.getClassById = async (req, res) => {
  const { id } = req.params;

  try {
    const classroom = await Class.findByPk(id, {
      include: [
        { model: Department, as: "department" },
     
      ],
    });
    if (!classroom) {
      return errorResponse(res, "Class not found", 404);
    }
    successResponse(res, "Class retrieved successfully", classroom);
  } catch (err) {
    errorResponse(res, "Failed to retrieve class", err.message, 500);
  }
};

exports.updateClass = async (req, res) => {
  const { id } = req.params;
  const { name, department_id } = req.body;

  try {
    const classroom = await Class.findByPk(id);
    if (!classroom) {
      return errorResponse(res, "Class not found", 404);
    }
    classroom.name = name;
    classroom.department_id = department_id;
    await classroom.save();
    successResponse(res, "Class updated successfully", classroom);
  } catch (err) {
    errorResponse(res, "Failed to update class", err.message, 500);
  }
};

exports.deleteClass = async (req, res) => {
  const { id } = req.params;

  try {
    const classroom = await Class.findByPk(id);
    if (!classroom) {
      return errorResponse(res, "Class not found", 404);
    }
    await classroom.destroy();
    successResponse(res, "Class deleted successfully");
  } catch (err) {
    errorResponse(res, "Failed to delete class", err.message, 500);
  }
};
