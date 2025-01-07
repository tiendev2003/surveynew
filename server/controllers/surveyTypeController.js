const SurveyType = require('../models/SurveyType');
const { successResponse, errorResponse } = require('../utils/response');

// Create a new survey type
exports.createSurveyType = async (req, res) => {
  try {
    const { name } = req.body;
    const surveyType = await SurveyType.create({ name });
    successResponse(res, 'Survey type created successfully', surveyType, 201);
  } catch (error) {
    errorResponse(res, 'Failed to create survey type', error.message);
  }
};

// Get all survey types
exports.getAllSurveyTypes = async (req, res) => {
  try {
    const surveyTypes = await SurveyType.findAll();
    successResponse(res, 'Survey types retrieved successfully', surveyTypes);
  } catch (error) {
    errorResponse(res, 'Failed to retrieve survey types', error.message);
  }
};

// Get a single survey type by ID
exports.getSurveyTypeById = async (req, res) => {
  try {
    const { id } = req.params;
    const surveyType = await SurveyType.findByPk(id);
    if (!surveyType) {
      return errorResponse(res, 'Survey type not found', null, 404);
    }
    successResponse(res, 'Survey type retrieved successfully', surveyType);
  } catch (error) {
    errorResponse(res, 'Failed to retrieve survey type', error.message);
  }
};

// Update a survey type by ID
exports.updateSurveyType = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const surveyType = await SurveyType.findByPk(id);
    if (!surveyType) {
      return errorResponse(res, 'Survey type not found', null, 404);
    }
    surveyType.name = name;
    await surveyType.save();
    successResponse(res, 'Survey type updated successfully', surveyType);
  } catch (error) {
    errorResponse(res, 'Failed to update survey type', error.message);
  }
};

// Delete a survey type by ID
exports.deleteSurveyType = async (req, res) => {
  try {
    const { id } = req.params;
    const surveyType = await SurveyType.findByPk(id);
    if (!surveyType) {
      return errorResponse(res, 'Survey type not found', null, 404);
    }
    await surveyType.destroy();
    successResponse(res, 'Survey type deleted successfully', null, 204);
  } catch (error) {
    errorResponse(res, 'Failed to delete survey type', error.message);
  }
};
