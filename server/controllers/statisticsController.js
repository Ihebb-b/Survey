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

// const getParticipantsByState = async (req, res) => {
//   try {
//     const { stateName } = req.params;

//     // Aggregate statistics for the given state
//     const participants = await Survey.aggregate([
//       { $match: { state: stateName } }, // Filter by state
//       {
//         $group: {
//           _id: "$ville", // Group by ville
//           count: { $sum: 1 }, // Count participants
//         },
//       },
//     ]);

//     // Respond with aggregated statistics
//     res.status(200).json({
//       state: stateName,
//       totalParticipants: participants.reduce((sum, p) => sum + p.count, 0),
//       details: participants,
//     });
//   } catch (error) {
//     res.status(500).json({ error: "Failed to retrieve statistics" });
//   }

// }

const getParticipantsByState = async (req, res) => {
  try {
    const { stateName } = req.params;

    // Aggregate statistics for the given state
    const participants = await Survey.aggregate([
      { $match: { state: stateName } }, // Filter by state
      {
        $group: {
          _id: "$ville", // Group by ville
          count: { $sum: 1 }, // Count participants
        },
      },
    ]);

    // Calculate total participants and unique cities
    const totalParticipants = participants.reduce((sum, p) => sum + p.count, 0);
    const uniqueCities = participants.length;

    // Prepare detailed statistics
    const statistics = {
      state: stateName,
      totalParticipants,
      uniqueCities,
      details: participants.map(p => ({
        city: p._id,
        count: p.count,
        percentage: ((p.count / totalParticipants) * 100).toFixed(2) + '%', // Percentage of total participants
      })),
    };

    // Respond with aggregated statistics
    res.status(200).json(statistics);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve statistics" });
  }
};


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

//Economic Statistics


const getAverageFoodExpenditure = async (req, res) => {
  try {
    // Retrieve query parameters for filtering (e.g., region or state)
    const { state, ville, country } = req.query;

    // Build query filter dynamically based on query parameters
    const filter = {};
    if (state) filter.state = state;
    if (ville) filter.ville = ville;
    if (country) filter.country = country;

    // Fetch all users matching the filter
    const users = await Survey.find(filter);

    if (users.length === 0) {
      return res.json({ message: "No users found for the specified filter." });
    }

    // Assume expenditure data is derived from diet and consumption patterns
    const totalExpenditure = users.reduce((total, user) => {
      // Example calculations (adjust based on your actual model)
      const fruitCost = parseInt(user.fruitUnitPerDay.split(' ')[1]) * 30 * 0.5; // $0.5 per fruit unit
      const vegetableCost = parseInt(user.vegetableUnitPerDay.split(' ')[1]) * 30 * 0.3; // $0.3 per vegetable unit

      const userExpenditure = fruitCost + vegetableCost ;
      return total + userExpenditure;
    }, 0);

    // Calculate average expenditure
    const averageExpenditure = totalExpenditure / users.length;

    res.json({
      averageMonthlyExpenditure: averageExpenditure.toFixed(2),
      totalUsers: users.length,
      state,
      ville,
      country,
    });
  } catch (error) {
    console.error("Error calculating average food expenditure:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getIncomeDistribution = async (req, res) => {
  try {
    // Fetch all users
    const users = await Survey.find();

    if (users.length === 0) {
      return res.json({ message: "No users found." });
    }

    // Initialize counters for each income level
    const incomeLevels = {
      low: 0, // "Less than 1000" and "Between 1000-2000"
      middle: 0, // "Between 2000-3000", "Between 3000-4000", "Between 4000-5000"
      high: 0, // "Over 5000"
      undisclosed: 0, // "Prefer not to say"
    };

    // Categorize users by salary
    users.forEach((user) => {
      switch (user.salary) {
        case "Less than 1000":
        case "Between 1000-2000":
          incomeLevels.low++;
          break;
        case "Between 2000-3000":
        case "Between 3000-4000":
        case "Between 4000-5000":
          incomeLevels.middle++;
          break;
        case "Over 5000":
          incomeLevels.high++;
          break;
        case "Prefer not to say":
        default:
          incomeLevels.undisclosed++;
          break;
      }
    });

    // Calculate total users
    const totalUsers = users.length;

    // Convert to percentage distribution
    const incomeDistribution = {
      low: ((incomeLevels.low / totalUsers) * 100).toFixed(2),
      middle: ((incomeLevels.middle / totalUsers) * 100).toFixed(2),
      high: ((incomeLevels.high / totalUsers) * 100).toFixed(2),
      undisclosed: ((incomeLevels.undisclosed / totalUsers) * 100).toFixed(2),
    };

    res.json({
      totalUsers,
      incomeDistribution,
      counts: incomeLevels, // Optional: Return counts along with percentages
    });
  } catch (error) {
    console.error("Error calculating income distribution:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getIncomeDietCorrelation = async (req, res) => {
  try {
    // Fetch all users
    const users = await Survey.find();

    if (users.length === 0) {
      return res.json({ message: "No users found." });
    }

    // Initialize counters for each income level
    const incomeLevels = {
      low: { count: 0, totalDietDiversity: 0 }, // To store the count and total diet diversity score for 'low' income users
      middle: { count: 0, totalDietDiversity: 0 }, // 'middle' income
      high: { count: 0, totalDietDiversity: 0 }, // 'high' income
      undisclosed: { count: 0, totalDietDiversity: 0 }, // For users who prefer not to disclose income
    };

    // Function to calculate the diet diversity score for each user
    const calculateDietDiversity = (user) => {
      let diversityScore = 0;

      // Count the number of food items in each category
      diversityScore += user.fruits ? user.fruits.length : 0;
      diversityScore += user.vegetables ? user.vegetables.length : 0;
      diversityScore += user.meat ? user.meat.length : 0;
      diversityScore += user.dairy ? user.dairy.length : 0;
      diversityScore += user.fish ? user.fish.length : 0;
      diversityScore += user.oil ? user.oil.length : 0;
      diversityScore += user.homeMade ? user.homeMade.length : 0;
      // Add custom categories if needed

      return diversityScore;
    };

    // Categorize users by income and calculate their diet diversity
    users.forEach((user) => {
      const dietDiversityScore = calculateDietDiversity(user);

      // Categorize user by income
      switch (user.salary) {
        case "Less than 1000":
        case "Between 1000-2000":
          incomeLevels.low.count++;
          incomeLevels.low.totalDietDiversity += dietDiversityScore;
          break;
        case "Between 2000-3000":
        case "Between 3000-4000":
        case "Between 4000-5000":
          incomeLevels.middle.count++;
          incomeLevels.middle.totalDietDiversity += dietDiversityScore;
          break;
        case "Over 5000":
          incomeLevels.high.count++;
          incomeLevels.high.totalDietDiversity += dietDiversityScore;
          break;
        case "Prefer not to say":
        default:
          incomeLevels.undisclosed.count++;
          incomeLevels.undisclosed.totalDietDiversity += dietDiversityScore;
          break;
      }
    });

    // Calculate average diet diversity score for each income group
    const incomeDistribution = {
      low: incomeLevels.low.count ? (incomeLevels.low.totalDietDiversity / incomeLevels.low.count).toFixed(2) : 0,
      middle: incomeLevels.middle.count ? (incomeLevels.middle.totalDietDiversity / incomeLevels.middle.count).toFixed(2) : 0,
      high: incomeLevels.high.count ? (incomeLevels.high.totalDietDiversity / incomeLevels.high.count).toFixed(2) : 0,
      undisclosed: incomeLevels.undisclosed.count ? (incomeLevels.undisclosed.totalDietDiversity / incomeLevels.undisclosed.count).toFixed(2) : 0,
    };

    res.json({
      incomeDistribution,
      counts: {
        low: incomeLevels.low.count,
        middle: incomeLevels.middle.count,
        high: incomeLevels.high.count,
        undisclosed: incomeLevels.undisclosed.count,
      },
    });
  } catch (error) {
    console.error("Error calculating income and diet diversity correlation:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getEatingOutVsCooking = async (req, res) => {
  try {
    // Fetch all users from the database
    const users = await Survey.find();

    if (users.length === 0) {
      return res.json({ message: "No users found." });
    }

    // Initialize counters for eating out vs. cooking at home frequency
    const homeMadeFrequency = {
      everyday: 0,
      twoToThreeTimes: 0,
      oneToTwoTimes: 0,
      rarely: 0,
      never: 0,
    };

    const orderedFrequency = {
      everyday: 0,
      twoToThreeTimes: 0,
      oneToTwoTimes: 0,
      rarely: 0,
      never: 0,
    };

    const homeMadeSpending = {
      low: 0,  // Less than 200
      medium: 0,  // 200-500
      high: 0,  // More than 500
    };

    const orderedSpending = {
      low: 0,  // Less than 200
      medium: 0,  // 200-500
      high: 0,  // More than 500
    };

    // Iterate through users to classify them based on their consumption and spending patterns
    users.forEach((user) => {
      // Classify home-made meal frequency and budget
      user.homeMade.forEach((meal) => {
        if (meal.name !== "None") {
          // Classify frequency of home-made meals
          switch (meal.consumption) {
            case "Every Day":
              homeMadeFrequency.everyday++;
              break;
            case "2-3 Times a Week":
              homeMadeFrequency.twoToThreeTimes++;
              break;
            case "1-2 Times a Week":
              homeMadeFrequency.oneToTwoTimes++;
              break;
            case "Rarely":
              homeMadeFrequency.rarely++;
              break;
            case "Never":
              homeMadeFrequency.never++;
              break;
            default:
              break;
          }

          // Classify spending on home-made meals
          switch (meal.budget) {
            case "Less than 100":
            case "100-200":
              homeMadeSpending.low++;
              break;
            case "200-300":
            case "300-400":
            case "400-500":
              homeMadeSpending.medium++;
              break;
            case "500-600":
            case "600-700":
            case "700-800":
            case "800-900":
            case "900-1000":
            case "More than 1000":
              homeMadeSpending.high++;
              break;
            default:
              break;
          }
        }
      });

      // Classify ordered meal frequency and budget
      user.ordered.forEach((meal) => {
        if (meal.name !== "None") {
          // Classify frequency of ordered meals
          switch (meal.consumption) {
            case "Every Day":
              orderedFrequency.everyday++;
              break;
            case "2-3 Times a Week":
              orderedFrequency.twoToThreeTimes++;
              break;
            case "1-2 Times a Week":
              orderedFrequency.oneToTwoTimes++;
              break;
            case "Rarely":
              orderedFrequency.rarely++;
              break;
            case "Never":
              orderedFrequency.never++;
              break;
            default:
              break;
          }

          // Classify spending on ordered meals
          switch (meal.budget) {
            case "Less than 100":
            case "100-200":
              orderedSpending.low++;
              break;
            case "200-300":
            case "300-400":
            case "400-500":
              orderedSpending.medium++;
              break;
            case "500-600":
            case "600-700":
            case "700-800":
            case "800-900":
            case "900-1000":
            case "More than 1000":
              orderedSpending.high++;
              break;
            default:
              break;
          }
        }
      });
    });

    // Calculate percentage distribution for homeMade and ordered frequencies
    const totalUsers = users.length;

    const homeMadeDistribution = {
      everyday: ((homeMadeFrequency.everyday / totalUsers) * 100).toFixed(2),
      twoToThreeTimes: ((homeMadeFrequency.twoToThreeTimes / totalUsers) * 100).toFixed(2),
      oneToTwoTimes: ((homeMadeFrequency.oneToTwoTimes / totalUsers) * 100).toFixed(2),
      rarely: ((homeMadeFrequency.rarely / totalUsers) * 100).toFixed(2),
      never: ((homeMadeFrequency.never / totalUsers) * 100).toFixed(2),
    };

    const orderedDistribution = {
      everyday: ((orderedFrequency.everyday / totalUsers) * 100).toFixed(2),
      twoToThreeTimes: ((orderedFrequency.twoToThreeTimes / totalUsers) * 100).toFixed(2),
      oneToTwoTimes: ((orderedFrequency.oneToTwoTimes / totalUsers) * 100).toFixed(2),
      rarely: ((orderedFrequency.rarely / totalUsers) * 100).toFixed(2),
      never: ((orderedFrequency.never / totalUsers) * 100).toFixed(2),
    };

    const spendingPatternDistribution = {
      homeMadeLow: ((homeMadeSpending.low / totalUsers) * 100).toFixed(2),
      homeMadeMedium: ((homeMadeSpending.medium / totalUsers) * 100).toFixed(2),
      homeMadeHigh: ((homeMadeSpending.high / totalUsers) * 100).toFixed(2),
      orderedLow: ((orderedSpending.low / totalUsers) * 100).toFixed(2),
      orderedMedium: ((orderedSpending.medium / totalUsers) * 100).toFixed(2),
      orderedHigh: ((orderedSpending.high / totalUsers) * 100).toFixed(2),
    };

    // Return the calculated distributions as a response
    res.json({
      homeMadeDistribution,
      orderedDistribution,
      spendingPatternDistribution,
      counts: {
        homeMadeFrequency,
        orderedFrequency,
        homeMadeSpending,
        orderedSpending,
      },
    });
  } catch (error) {
    console.error("Error calculating eating out vs cooking at home statistics:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const calculateActivityDietCorrelation = async (req, res) => {
  try {
    // Fetch all users
    const users = await Survey.find();

    if (users.length === 0) {
      return res.status(404).json({ message: 'No users found' });
    }

    // Initialize counters for each diet type and physical activity status
    const correlationData = {
      Crudism: { yes: 0, no: 0 },
      Fruitarian: { yes: 0, no: 0 },
      Vegetarian: { yes: 0, no: 0 },
      Vegan: { yes: 0, no: 0 },
      Flexitarian: { yes: 0, no: 0 },
      NoDiet: { yes: 0, no: 0 },
      ReligiouslyObservant: { yes: 0, no: 0 },
      Other: { yes: 0, no: 0 },
    };

    // Categorize users by diet type and physical activity status
    users.forEach((user) => {
      const { diet, physicalActivity } = user;
      if (correlationData[diet]) {
        correlationData[diet][physicalActivity]++;
      }
    });

    // Calculate total users for each diet type
    const dietCounts = Object.keys(correlationData).reduce((acc, diet) => {
      const totalDietUsers = correlationData[diet].yes + correlationData[diet].no;
      acc[diet] = totalDietUsers;
      return acc;
    }, {});

    // Convert counts to percentages for each diet type
    const correlationPercentages = Object.keys(correlationData).reduce((acc, diet) => {
      const totalDietUsers = dietCounts[diet];
      const yesPercentage = ((correlationData[diet].yes / totalDietUsers) * 100).toFixed(2);
      const noPercentage = ((correlationData[diet].no / totalDietUsers) * 100).toFixed(2);
      acc[diet] = {
        yes: yesPercentage,
        no: noPercentage,
      };
      return acc;
    }, {});

    res.json({
      totalUsers: users.length,
      dietCounts, // Total users for each diet type
      correlationPercentages, // Percentage of physical activity ("yes" or "no") for each diet type
      counts: correlationData, // Raw counts for each diet and activity combination
    });
  } catch (error) {
    console.error('Error calculating correlation:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const calculateFastFoodConsumptionFrequency = async (req, res) => {
  try {
    // Fetch all user surveys
    const users = await Survey.find();

    if (users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }

    // Initialize counters for each consumption frequency
    const frequencyData = {
      "Every Day": 0,
      "2-3 Times a Week": 0,
      "1-2 Times a Week": 0,
      "1-2 Times a Month": 0,
      "Rarely": 0,
      "Never": 0,
    };

    // Iterate through each user's ordered items
    users.forEach((user) => {
      user.ordered.forEach((item) => {
        const { name, consumption } = item;

        // Only consider valid fast food items
        if (
          [
            "Pizza",
            "Sandwiches",
            "Burgers",
            "Wraps",
            "Paninis",
            "Mlewi",
            "Chappati",
            "Manakish",
            "Lahmacun",
            "Koshari",
            "Other",
          ].includes(name) &&
          frequencyData[consumption] !== undefined
        ) {
          frequencyData[consumption]++;
        }
      });
    });

    // Calculate total occurrences and percentages
    const totalOrders = Object.values(frequencyData).reduce((sum, count) => sum + count, 0);

    const frequencyPercentages = Object.keys(frequencyData).reduce((acc, frequency) => {
      const count = frequencyData[frequency];
      const percentage = ((count / totalOrders) * 100).toFixed(2);
      acc[frequency] = percentage;
      return acc;
    }, {});

    // Respond with calculated statistics
    res.json({
      totalUsers: users.length,
      totalOrders,
      counts: frequencyData, // Raw counts for each consumption frequency
      percentages: frequencyPercentages, // Percentages for each frequency
    });
  } catch (error) {
    console.error("Error calculating fast food consumption frequency:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Dietary preferences Statistics
const getDietAgeCorrelation = async (req, res) => {
  try {
    const users = await Survey.find({}, { diet: 1, age: 1 });

    // Defined age groups
    const ageGroups = [
      "Between 1-10 years",
      "Between 10-18 years",
      "Between 19-25 years",
      "Between 26-29 years",
      "Between 30-39 years",
      "Between 40-49 years",
      "Between 50-59 years",
      "Between 60-69 years",
      "Over 70 years",
    ];

    // Initialize statistics structure
    const correlation = {};
    ageGroups.forEach((ageGroup) => {
      correlation[ageGroup] = {};
    });

    // Populate statistics
    users.forEach((user) => {
      const { age, diet } = user;

      if (!correlation[age][diet]) {
        correlation[age][diet] = 0;
      }
      correlation[age][diet]++;
    });

    // Format data for frontend
    const formattedData = ageGroups.map((ageGroup) => ({
      ageGroup,
      diets: correlation[ageGroup],
    }));

    res.status(200).json({
      totalUsers: users.length,
      correlation: formattedData,
    });
  } catch (error) {
    console.error("Error calculating diet-age correlation:", error);
    res.status(500).json({ message: "Server error" });
  }
};



const getPizza =  async (req, res) => {
  try {
    // Aggregate pizza consumption statistics by country
    const pizzaStatsByVille = await Survey.aggregate([
      {
        $project: {
          homeMadePizza: {
            $in: ["Home Made Pizza", "$homeMade.name"], // Check if "Home Made Pizza" is in the homeMade array
          },
          orderedPizza: {
            $in: ["Pizza", "$ordered.name"], // Check if "Pizza" is in the ordered array
          },
          ville: 1, // Include the ville field
        },
      },
      {
        $group: {
          _id: "$ville", // Group by ville
          pizzaCount: {
            $sum: {
              $cond: [
                { $or: ["$homeMadePizza", "$orderedPizza"] },
                1,
                0,
              ],
            },
          },
        },
      },
      {
        $sort: { pizzaCount: -1 }, // Sort by pizzaCount in descending order
      },
    ]);

    // Return the result as an array of objects with ville and pizza count
    const result = pizzaStatsByVille.map((item) => ({
      ville: item._id,
      pizzaConsumptionCount: item.pizzaCount || 0, // Pizza consumption count (0 if no pizza consumed in the country)
    }));

    return res.json(result); // Return pizza consumption statistics by country
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error calculating pizza consumption statistics by country." });
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
  getParticipantsByState,
  getAverageFoodExpenditure,
  getIncomeDistribution,
  getIncomeDietCorrelation,
  getEatingOutVsCooking,
  calculateActivityDietCorrelation,
  calculateFastFoodConsumptionFrequency,
  getDietAgeCorrelation,
  getPizza,

};
