const express = require('express');
const router = express.Router();
const surveyTypeController = require('../controllers/surveyTypeController');

router.post('/', surveyTypeController.createSurveyType);
router.get('/', surveyTypeController.getAllSurveyTypes);
router.get('/:id', surveyTypeController.getSurveyTypeById);
router.put('/:id', surveyTypeController.updateSurveyType);
router.delete('/:id', surveyTypeController.deleteSurveyType);

module.exports = router;
