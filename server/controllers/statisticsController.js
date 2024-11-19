const Survey = require("../models/Survey");

// Tries statistics

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

const getMatchingSurveys = async (req, res) => {
  try {
    const mismatchedSurveys = await Survey.find({
      traditionalEatingHabits: { $exists: true, $nin: [true, false] },
    });
    res.status(200).json(mismatchedSurveys);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// General statistics

const getEatingHabitsStatistics = async (req, res) => {
  try {
    const eatingHabitsAggregation = [
      {
        $match: {
          traditionalEatingHabits: { $exists: true },
          age: { $exists: true },
        },
      },
      {
        $group: {
          _id: {
            age: "$age",
            traditionalEatingHabits: "$traditionalEatingHabits",
          },
          count: { $sum: 1 },
        },
      },
      {
        $group: {
          _id: "$_id.age",
          total: { $sum: "$count" },
          traditionalCount: {
            $sum: {
              $cond: [
                { $eq: ["$_id.traditionalEatingHabits", true] },
                "$count",
                0,
              ],
            },
          },
          newEatingCount: {
            $sum: {
              $cond: [
                { $eq: ["$_id.traditionalEatingHabits", false] },
                "$count",
                0,
              ],
            },
          },
        },
      },
      {
        $project: {
          age: "$_id",
          traditionalPercentage: {
            $cond: [
              { $gt: ["$total", 0] },
              {
                $multiply: [{ $divide: ["$traditionalCount", "$total"] }, 100],
              },
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
      // Sort by age based on the defined order
      {
        $addFields: {
          ageOrder: {
            $indexOfArray: [
              [
                "Between 1-10 years",
                "Between 10-18 years",
                "Between 19-25 years",
                "Between 26-29 years",
                "Between 30-39 years",
                "Between 40-49 years",
                "Between 50-59 years",
                "Between 60-69 years",
                "Over 70 years",
              ],
              "$age",
            ],
          },
        },
      },
      { $sort: { ageOrder: 1 } },
      { $project: { ageOrder: 0 } }, // Remove the ageOrder field from final output
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
      // Unwind both arrays for accurate grouping
      { $unwind: "$medicalHistory" },
      { $unwind: "$homeMade" },
      { $unwind: "$ordered" },

      // Combine `homeMade` and `ordered` fields into one field for flexibility
      {
        $facet: {
          homeMadeStats: [
            {
              $group: {
                _id: {
                  medicalHistory: "$medicalHistory",
                  foodType: "homemade",
                  foodName: "$homeMade.name",
                  consumption: "$homeMade.consumption",
                },
                count: { $sum: 1 },
              },
            },
          ],
          orderedStats: [
            {
              $group: {
                _id: {
                  medicalHistory: "$medicalHistory",
                  foodType: "ordered",
                  foodName: "$ordered.name",
                  consumption: "$ordered.consumption",
                },
                count: { $sum: 1 },
              },
            },
          ],
        },
      },
      {
        $project: {
          combinedStats: { $concatArrays: ["$homeMadeStats", "$orderedStats"] },
        },
      },
      { $unwind: "$combinedStats" },

      // Final grouping by medical history and summarizing food stats
      {
        $group: {
          _id: "$combinedStats._id.medicalHistory",
          total: { $sum: "$combinedStats.count" },
          foodStatistics: {
            $push: {
              foodType: "$combinedStats._id.foodType",
              foodName: "$combinedStats._id.foodName",
              consumption: "$combinedStats._id.consumption",
              count: "$combinedStats.count",
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

const getFruitStatisticsByCountry = async (req, res) => {
  try {
    const fruitStatisticsAggregation = [
      {
        $match: {
          "fruits.0": { $exists: true },
          country: { $exists: true },
          fruitUnitPerDay: { $exists: true, $ne: "None" },
        },
      },
      { $unwind: "$fruits" },
      {
        $group: {
          _id: {
            country: "$country",
            fruitType: "$fruits",
            fruitUnit: "$fruitUnitPerDay",
          },
          count: { $sum: 1 },
        },
      },
      {
        $group: {
          _id: "$_id.country",
          fruitData: {
            $push: {
              fruitType: "$_id.fruitType",
              fruitUnit: "$_id.fruitUnit",
              count: "$count",
            },
          },
          totalFruits: { $sum: "$count" },
        },
      },
      {
        $project: {
          country: "$_id",
          fruitData: 1,
          totalFruits: 1,
        },
      },
    ];

    const fruitStats = await Survey.aggregate(fruitStatisticsAggregation);
    res.status(200).json(fruitStats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Demographic statistics

const getGenderStatistics = async (req, res) => {
  try {
    const totalSurveys = await Survey.countDocuments();

    // Count males and females
    const maleCount = await Survey.countDocuments({ gender: "Male" });
    const femaleCount = await Survey.countDocuments({ gender: "Female" });

    // Calculate percentages
    const malePercentage = ((maleCount / totalSurveys) * 100).toFixed(2);
    const femalePercentage = ((femaleCount / totalSurveys) * 100).toFixed(2);

    res.status(200).json({
      totalSurveys,
      male: {
        count: maleCount,
        percentage: malePercentage,
      },
      female: {
        count: femaleCount,
        percentage: femalePercentage,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const getAgeGroupDistribution = async (req, res) => {
  try {
    const totalSurveys = await Survey.countDocuments();

    const ageGroupData = await Survey.aggregate([
      {
        $group: {
          _id: "$age",
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          ageGroup: "$_id",
          count: 1,
          percentage: {
            $multiply: [{ $divide: ["$count", totalSurveys] }, 100],
          },
        },
      },
      {
        $sort: { ageGroup: 1 }, // Sort age groups for consistent ordering
      },
    ]);

    res.json({
      totalSurveys,
      ageGroups: ageGroupData,
    });
  } catch (error) {
    console.error("Error fetching age group distribution:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getCountryRepresentation = async (req, res) => {
  try {
    const totalSurveys = await Survey.countDocuments();

    const countryData = await Survey.aggregate([
      {
        $group: {
          _id: "$country",
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          country: "$_id",
          count: 1,
          percentage: {
            $multiply: [{ $divide: ["$count", totalSurveys] }, 100],
          },
        },
      },
      {
        $sort: { country: 1 },
      },
    ]);

    res.json({
      totalSurveys,
      countries: countryData,
    });
  } catch (error) {
    console.error("Error fetching country representation:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getSocialStatus = async (req, res) => {
  try {
    const totalSurveys = await Survey.countDocuments();

    const socialStateData = await Survey.aggregate([
      {
        $group: {
          _id: "$socialState",
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          socialState: "$_id",
          count: 1,
          percentage: {
            $multiply: [{ $divide: ["$count", totalSurveys] }, 100],
          },
        },
      },
      {
        $sort: { socialState: 1 },
      },
    ]);

    res.json({
      totalSurveys,
      socialStates: socialStateData,
    });
  } catch (error) {
    console.error("Error fetching social state distribution:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const mapChildrenNumberToValue = {
  None: 0,
  One: 1,
  Two: 2,
  Three: 3,
  Four: 4,
  Five: 5,
  "More than five": 6,
};

const getAverageChildrenStatistics = async (req, res) => {
  try {
    const validChildrenData = await Survey.aggregate([
      {
        $match: {
          children: "Yes",
          childrenNumber: {
            $in: [
              "None",
              "One",
              "Two",
              "Three",
              "Four",
              "Five",
              "More than five",
            ],
          },
        },
      },
      {
        $addFields: {
          mappedChildrenNumber: {
            $switch: {
              branches: [
                { case: { $eq: ["$childrenNumber", "None"] }, then: 0 },
                { case: { $eq: ["$childrenNumber", "One"] }, then: 1 },
                { case: { $eq: ["$childrenNumber", "Two"] }, then: 2 },
                { case: { $eq: ["$childrenNumber", "Three"] }, then: 3 },
                { case: { $eq: ["$childrenNumber", "Four"] }, then: 4 },
                { case: { $eq: ["$childrenNumber", "Five"] }, then: 5 },
                {
                  case: { $eq: ["$childrenNumber", "More than five"] },
                  then: 6,
                },
              ],
              default: 0,
            },
          },
        },
      },
      {
        $group: {
          _id: null,
          totalChildren: { $sum: "$mappedChildrenNumber" },
          totalHouseholds: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          averageChildren: {
            $cond: {
              if: { $eq: ["$totalHouseholds", 0] },
              then: 0,
              else: { $divide: ["$totalChildren", "$totalHouseholds"] },
            },
          },
        },
      },
    ]);

    const result = validChildrenData[0] || { averageChildren: 0 };

    res.json(result);
  } catch (error) {
    console.error("Error calculating average children per household:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Health and Diet-Related Statistics

const getStatisticsDiet = async (req, res) => {
  try {
    const dietDistribution = await Survey.aggregate([
      {
        $group: {
          _id: "$diet",
          count: { $sum: 1 },
        },
      },
      {
        $facet: {
          dietStats: [{ $project: { diet: "$_id", count: 1, _id: 0 } }],
          totalCount: [{ $group: { _id: null, total: { $sum: "$count" } } }],
        },
      },
      {
        $project: {
          dietStats: {
            $map: {
              input: "$dietStats",
              as: "dietStat",
              in: {
                diet: "$$dietStat.diet",
                count: "$$dietStat.count",
                percentage: {
                  $multiply: [
                    {
                      $divide: [
                        "$$dietStat.count",
                        { $arrayElemAt: ["$totalCount.total", 0] },
                      ],
                    },
                    100,
                  ],
                },
              },
            },
          },
        },
      },
      { $unwind: "$dietStats" },
      { $replaceRoot: { newRoot: "$dietStats" } },
    ]);

    res.json(dietDistribution);
  } catch (error) {
    console.error("Error calculating diet distribution:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const mapUnitToNumber = (unit) => {
  const mapping = {
    None: 0,
    1: 1,
    "Between 1-2": 1.5,
    "Between 2-3": 2.5,
    "Between 3-4": 3.5,
    "Between 4-5": 4.5,
    "Between 5-6": 5.5,
    "Between 6-7": 6.5,
    "Between 7-8": 7.5,
    "Between 8-9": 8.5,
    "Between 9-10": 9.5,
    "Over 10": 11, 
  };
  return mapping[unit] || 0;
};

const getStatisticsAverageFruitIntake = async (req, res) => {
  try {
    const surveys = await Survey.find(
      { fruitUnitPerDay: { $ne: "None" } },
      { fruitUnitPerDay: 1 }
    );

    const totalUnits = surveys.reduce(
      (sum, survey) => sum + mapUnitToNumber(survey.fruitUnitPerDay),
      0
    );
    const averageUnits = surveys.length > 0 ? totalUnits / surveys.length : 0;

    res.json({ averageFruitIntakePerDay: averageUnits });
  } catch (error) {
    console.error("Error calculating average fruit intake:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getStatisticsAverageVegetableIntake = async (req, res) => {
  try {
    const surveys = await Survey.find(
      { vegetableUnitPerDay: { $ne: "None" } },
      { vegetableUnitPerDay: 1 }
    );

    const totalUnits = surveys.reduce(
      (sum, survey) => sum + mapUnitToNumber(survey.vegetableUnitPerDay),
      0
    );
    const averageUnits = surveys.length > 0 ? totalUnits / surveys.length : 0;

    res.json({ averageVegetableIntakePerDay: averageUnits });
  } catch (error) {
    console.error("Error calculating average vegetable intake:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getStatisticsVegetarianVeganPercentage = async (req, res) => {
  try {
    const totalCount = await Survey.countDocuments();

    const vegetarianVeganCount = await Survey.countDocuments({ diet: { $in: ["Vegetarian", "Vegan"] } });

    const vegetarianVeganPercentage = totalCount > 0 ? (vegetarianVeganCount / totalCount) * 100 : 0;

    res.json({
      vegetarianVeganPercentage: vegetarianVeganPercentage.toFixed(2) 
    });
  } catch (error) {
    console.error("Error calculating vegetarian/vegan percentage:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getPhysicalActivityRatio = async (req, res) => {
  try {
    const totalCount = await Survey.countDocuments();

    const yesCount = await Survey.countDocuments({ physicalActivity: "yes" });
    const noCount = await Survey.countDocuments({ physicalActivity: "no" });

    const yesPercentage = totalCount > 0 ? (yesCount / totalCount) * 100 : 0;
    const noPercentage = totalCount > 0 ? (noCount / totalCount) * 100 : 0;

    res.json({
      physicalActivityRatio: {
        yes: yesPercentage.toFixed(2),
        no: noPercentage.toFixed(2),
      },
    });
  } catch (error) {
    console.error("Error calculating physical activity ratio:", error);
    res.status(500).json({ error: "Internal Server Error" });
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
  getFruitStatisticsByCountry,
  getGenderStatistics,
  getAgeGroupDistribution,
  getCountryRepresentation,
  getSocialStatus,
  getAverageChildrenStatistics,
  getStatisticsDiet,
  getStatisticsAverageFruitIntake,
  getStatisticsAverageVegetableIntake,
  getStatisticsVegetarianVeganPercentage,
};
