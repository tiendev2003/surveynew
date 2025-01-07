const Department = require("../models/Department");
const Class = require("../models/Class"); // Add this line to import the Class model
const { successResponse, errorResponse } = require("../utils/response");

exports.createDepartment = async (req, res) => {
  const { name } = req.body;

  try {
    const department = await Department.create({ name });
    successResponse(res, "Department created successfully", department);
  } catch (err) {
    errorResponse(res, "Failed to create department", err.message, 500);
  }
};

exports.getDepartments = async (req, res) => {
  try {
    const departments = await Department.findAll();
    successResponse(res, "Departments retrieved successfully", departments);
  } catch (err) {
    errorResponse(res, "Failed to retrieve departments", err.message, 500);
  }
};

exports.getDepartmentById = async (req, res) => {
  const { id } = req.params;

  try {
    const department = await Department.findOne({
      where: { id },
      include: [{ model: Class }],
    });
    if (!department) {
      return errorResponse(res, "Department not found", 404);
    }
    successResponse(res, "Department retrieved successfully", department);
  } catch (err) {
    errorResponse(res, "Failed to retrieve department", err.message, 500);
  }
};

exports.updateDepartment = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    const department = await Department.findByPk(id);
    if (!department) {
      return errorResponse(res, "Department not found", 404);
    }
    department.name = name;
    await department.save();
    successResponse(res, "Department updated successfully", department);
  } catch (err) {
    errorResponse(res, "Failed to update department", err.message, 500);
  }
};

exports.deleteDepartment = async (req, res) => {
  const { id } = req.params;

  try {
    const department = await Department.findByPk(id);
    if (!department) {
      return errorResponse(res, "Department not found", 404);
    }
    await Class.destroy({ where: { departmentId: id } }); // Add this line to delete associated classes
    await department.destroy();
    successResponse(
      res,
      "Department and associated classes deleted successfully"
    );
  } catch (err) {
    errorResponse(res, "Failed to delete department", err.message, 500);
  }
};
