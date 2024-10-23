const Survey = require("../models/Survey");

const searchStatistics = async (req, res) => {
  const { query, page = 1, limit = 30 } = req.query; 

  try {
    const results = await Survey.find(
      { $text: { $search: query } } 
    )
      .limit(limit * 1) // Convert limit to number
      .skip((page - 1) * limit) // Skip based on current page
      .exec();

    const count = await Survey.countDocuments({ $text: { $search: query } });

    res.status(200).json({
      results,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const advancedSearch = async (req, res) => {
  const {
    query,
    gender,
    ageMin,
    ageMax,
    country,
    page = 1,
    limit = 10,
  } = req.query;

  let filter = {};

  if (query) {
    filter.$text = { $search: query }; // Use text search for general query
  }

  if (gender) {
    filter.gender = gender; // Filter by gender
  }

  if (ageMin && ageMax) {
    filter.age = { $gte: parseInt(ageMin), $lte: parseInt(ageMax) }; // Filter by age range
  }

  if (country) {
    filter.country = country; // Filter by country
  }

  try {
    const results = await Survey.find(filter)
      .limit(limit * 1) 
      .skip((page - 1) * limit) 
      .exec();

    const count = await Survey.countDocuments({ $text: { $search: query } });

 res.status(200).json({
      results,
      totalPages: Math.ceil(count / limit),
      currentPage: page
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllSuggestions = async (req, res) => {
  try {
    const suggestions = {
      name: await Survey.distinct("name"),
      gender: await Survey.distinct("gender"),
      country: await Survey.distinct("country"),
      education: await Survey.distinct("education"),
      ethnicity: await Survey.distinct("ethnicity"),
      dietDescription: await Survey.distinct("dietDescription"),
      household: await Survey.distinct("household"),
      readyToEatFood: await Survey.distinct("readyToEatFood"),
      foodConsumptionFrequencyDietDescription: await Survey.distinct("foodConsumptionFrequency.dietDescription"),
      weather: await Survey.distinct("weather"),
      medicalHistory: await Survey.distinct("medicalHistory")
    };

    res.status(200).json(suggestions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
  };





module.exports = {
  searchStatistics,
  advancedSearch,
  getAllSuggestions,
};
