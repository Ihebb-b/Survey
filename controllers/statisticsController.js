const Survey = require('../models/Survey');

const getStatistics = async (req, res) => {
  try {
    // Calculate the total number of surveys
    const totalSurveys = await Survey.countDocuments();

    // Calculate average age of respondents
    const ageStats = await Survey.aggregate([
      { $group: { _id: null, avgAge: { $avg: "$age" } } },
    ]);

    const avgAge = ageStats.length > 0 ? ageStats[0].avgAge : 0;

    // Calculate diet distribution (vegetarian, non-vegetarian, vegan)
    const dietDistribution = await Survey.aggregate([
      {
        $group: {
          _id: "$dietDescription",
          count: { $sum: 1 },
        },
      },
    ]);

    // Get the most common household foods
    const householdFoodStats = await Survey.aggregate([
      { $unwind: "$householdFood" },
      {
        $group: {
          _id: "$householdFood",
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
      { $limit: 5 }, // Top 5 most purchased household foods
    ]);

    // Calculate medical history prevalence
    const medicalHistoryStats = await Survey.aggregate([
      { $unwind: "$medicalHistory" },
      {
        $group: {
          _id: "$medicalHistory",
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
    ]);

    // Physical activity distribution
    const physicalActivityStats = await Survey.aggregate([
      {
        $group: {
          _id: "$physicalActivity",
          count: { $sum: 1 },
        },
      },
    ]);

    res.status(200).json({
      totalSurveys,
      avgAge,
      dietDistribution,
      householdFoodStats,
      medicalHistoryStats,
      physicalActivityStats,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getDietDistribution = async (req, res) => {
    try {
      const dietDistribution = await Survey.aggregate([
        { $group: { _id: '$dietDescription', count: { $sum: 1 } } }
      ]);
      res.status(200).json(dietDistribution);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
const getPopularFoodChoices = async (req, res) => {
    try {
      const householdFood = await Survey.aggregate([
        { $unwind: '$household' },
        { $group: { _id: '$household', count: { $sum: 1 } } },
        { $sort: { count: -1 } }
      ]);
  
      const readyToEatFood = await Survey.aggregate([
        { $unwind: '$readyToEatFood' },
        { $group: { _id: '$readyToEatFood', count: { $sum: 1 } } },
        { $sort: { count: -1 } }
      ]);
  
      res.status(200).json({ householdFood, readyToEatFood });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

const getPhysicalActivityRatio = async (req, res) => {
    try {
      const total = await Survey.countDocuments();
      const active = await Survey.countDocuments({ physicalActivity: true });
      const ratio = ((active / total) * 100).toFixed(2);
  
      res.status(200).json({ active, total, ratio });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

const getSurveyStatistics = async (req, res) => {
    try {
      const stats = await Survey.aggregate([
        {
          $group: {
            _id: null,
            avgAge: { $avg: "$age" },
            totalRespondents: { $sum: 1 },
            mostCommonDiet: { $addToSet: "$dietDescription" }
          }
        }
      ]);
      res.status(200).json(stats);
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
  getStatistics,
  getDietDistribution,
  getPopularFoodChoices,
  getPhysicalActivityRatio,
  getSurveyStatistics,
  getAllSuggestions,
};
