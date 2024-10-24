const Survey = require("../models/Survey");

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
      { $group: { _id: "$dietDescription", count: { $sum: 1 } } },
    ]);
    res.status(200).json(dietDistribution);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getPopularFoodChoices = async (req, res) => {
  try {
    const householdFood = await Survey.aggregate([
      { $unwind: "$household" },
      { $group: { _id: "$household", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);

    const readyToEatFood = await Survey.aggregate([
      { $unwind: "$readyToEatFood" },
      { $group: { _id: "$readyToEatFood", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
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
          mostCommonDiet: { $addToSet: "$dietDescription" },
        },
      },
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
    const dietConsumptionDescriptionSuggestions = await Survey.distinct(
      "foodConsumptionFrequency.dietDescription"
    );
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
      foodConsumptionFrequencyDietDescription:
        dietConsumptionDescriptionSuggestions,
      weather: weatherSuggestions,
      medicalHistory: medicalHistorySuggestions,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getMatchingSurveys = async (req, res) => {

  try {
    const mismatchedSurveys = await Survey.find({ traditionalEatingHabits: { $exists: true, $nin: [true, false] } });
    res.status(200).json(mismatchedSurveys);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getEatingHabitsStatistics = async (req, res) => {
  try {
    const eatingHabitsAggregation = [
      {
        $match: {
          traditionalEatingHabits: { $exists: true }, 
          ethnicity: { $exists: true } 
        },
      },
      {
        $group: {
          _id: {
            ethnicity: "$ethnicity", 
            traditionalEatingHabits: "$traditionalEatingHabits",
          },
          count: { $sum: 1 }, 
        },
      },
      {
        $group: {
          _id: "$_id.ethnicity", 
          total: { $sum: "$count" }, 
          traditionalCount: {
            $sum: {
              $cond: [{ $eq: ["$_id.traditionalEatingHabits", 'true'] }, "$count", 0], 
            },
          },
          newEatingCount: {
            $sum: {
              $cond: [{ $eq: ["$_id.traditionalEatingHabits", 'false'] }, "$count", 0], 
            },
          },
        },
      },
      {
        $project: {
          ethnicity: "$_id", 
          traditionalPercentage: {
            $cond: [
              { $gt: ["$total", 0] },
              { $multiply: [{ $divide: ["$traditionalCount", "$total"] }, 100] },
              0,
            ], 
          },
          newEatingPercentage: {
            $cond: [
              { $gt: ["$total", 0] },
              { $multiply: [{ $divide: ["$newEatingCount", "$total"] }, 100] },
              0,
            ], 
          },
        },
      },
    ];

    const stats = await Survey.aggregate(eatingHabitsAggregation);
    res.status(200).json(stats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getMedicalHistoryStatistics = async (req, res) => {
  try {
    const medicalHistoryAggregation = [
      { $unwind: "$household" },
      { $unwind: "$readyToEatFood" },
      {
        $group: {
          _id: {
            medicalHistory: "$medicalHistory",
            household: "$household",
            readyToEatFood: "$readyToEatFood",
          },
          count: { $sum: 1 },
        },
      },
      {
        $group: {
          _id: { medicalHistory: "$_id.medicalHistory" },
          total: { $sum: "$count" },
          householdFoodCounts: {
            $push: {
              household: "$_id.household",
              count: "$count",
            },
          },
          readyToEatFoodCounts: {
            $push: {
              readyToEatFood: "$_id.readyToEatFood",
              count: "$count",
            },
          },
        },
      },
    ];

    const stats = await Survey.aggregate(medicalHistoryAggregation);
    res.status(200).json(stats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getMedicalHistorySportStatistics = async (req, res) => {
  try {
    const medicalHistorySportAggregation = [
      {
        $group: {
          _id: {
            medicalHistory: "$medicalHistory",
            traditional: "$traditionalEatingHabits",
            sportPractice: "$sportPractice",
          },
          count: { $sum: 1 },
        },
      },
      {
        $group: {
          _id: { medicalHistory: "$_id.medicalHistory" },
          total: { $sum: "$count" },
          traditionalEatingCount: {
            $sum: {
              $cond: [{ $eq: ["$_id.traditional", true] }, "$count", 0],
            },
          },
          newEatingCount: {
            $sum: {
              $cond: [{ $eq: ["$_id.traditional", false] }, "$count", 0],
            },
          },
          sportPracticeCount: {
            $sum: {
              $cond: [{ $eq: ["$_id.sportPractice", true] }, "$count", 0],
            },
          },
          noSportPracticeCount: {
            $sum: {
              $cond: [{ $eq: ["$_id.sportPractice", false] }, "$count", 0],
            },
          },
        },
      },
      {
        $project: {
          medicalHistory: "$_id.medicalHistory",
          traditionalEatingPercentage: {
            $multiply: [
              { $divide: ["$traditionalEatingCount", "$total"] },
              100,
            ],
          },
          newEatingPercentage: {
            $multiply: [{ $divide: ["$newEatingCount", "$total"] }, 100],
          },
          sportPracticePercentage: {
            $multiply: [{ $divide: ["$sportPracticeCount", "$total"] }, 100],
          },
          noSportPracticePercentage: {
            $multiply: [{ $divide: ["$noSportPracticeCount", "$total"] }, 100],
          },
        },
      },
    ];

    const stats = await Survey.aggregate(medicalHistorySportAggregation);
    res.status(200).json(stats);
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
  getEatingHabitsStatistics,
  getMedicalHistoryStatistics,
  getMedicalHistorySportStatistics,
  getMatchingSurveys,
};
