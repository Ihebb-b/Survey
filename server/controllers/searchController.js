const Survey = require("../models/Survey");

const searchStatistics = async (req, res) => {
  const { query, page = 1, limit = 10 } = req.query; // Get the search query from the URL

  try {
    const results = await Survey.find(
      { $text: { $search: query } } // MongoDB text search
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
      .limit(limit * 1) // Convert limit to number
      .skip((page - 1) * limit) // Skip based on current page
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
      // Fetch distinct values for each field in the survey schema
      const nameSuggestions = await Survey.distinct("name");
      const genderSuggestions = await Survey.distinct("gender");
      const countrySuggestions = await Survey.distinct("country");
      const educationSuggestions = await Survey.distinct("education");
      const ethnicitySuggestions = await Survey.distinct("ethnicity");
      const dietDescriptionSuggestions = await Survey.distinct("dietDescription");
      const householdFoodSuggestions = await Survey.distinct("household");
      const readyToEatFoodSuggestions = await Survey.distinct("readyToEatFood");
      const dietConsumptionDescriptionSuggestions = await Survey.distinct("foodConsumptionFrequency.dietDescription");
      const weatherSuggestions = await Survey.distinct("weather");
      const medicalHistorySuggestions = await Survey.distinct("medicalHistory");
      
      // Return the results as an object where each field has its own array of distinct values
      res.status(200).json({
        name: nameSuggestions,
        gender: genderSuggestions,
        country: countrySuggestions,
        education: educationSuggestions,
        ethnicity: ethnicitySuggestions,
        dietDescription: dietDescriptionSuggestions,
        household: householdFoodSuggestions,
        readyToEatFood: readyToEatFoodSuggestions,
        foodConsumptionFrequencyDietDescription: dietConsumptionDescriptionSuggestions,
        weather: weatherSuggestions,
        medicalHistory: medicalHistorySuggestions
      });
      
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };



module.exports = {
  searchStatistics,
  advancedSearch,
  getAllSuggestions,
};
