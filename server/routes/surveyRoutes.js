const express = require('express');
const router = express.Router();

const {
  createSurvey,
  getAllSurveys,
  getSurveyById,
} = require('../controllers/surveyController');

router.post('/create', createSurvey);

router.get('/getAll', getAllSurveys);

router.get('/get/:id', getSurveyById);

module.exports = router;