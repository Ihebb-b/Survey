
const Survey = require('../models/Survey');


const createSurvey = async (req, res) => {
  try {
    const newSurvey = await Survey.create(req.body);
    res.status(201).json(newSurvey);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


const getAllSurveys = async (req, res) => {
  try {
    const surveys = await Survey.find({});
    res.status(200).json(surveys);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getSurveyById = async (req, res) => {
  try {
    const survey = await Survey.findById(req.params.id);
    if (!survey) {
      return res.status(404).json({ message: 'Survey not found' });
    }
    res.status(200).json(survey);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createSurvey,
  getAllSurveys,
  getSurveyById,
};
