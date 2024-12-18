
const Survey = require('../models/Survey');

const filterEmptyStrings = (data) => {
  Object.keys(data).forEach((key) => {
    if (data[key] === "") {
      delete data[key];
    }
  });
  return data;
};

// Survey's basic crud

const createSurvey = async (req, res) => {
  try {
    const filteredData = filterEmptyStrings(req.body);
    const newSurvey = await Survey.create(filteredData);
    await newSurvey.save();
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