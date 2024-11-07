const express = require("express");
const {
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
} = require("../controllers/statisticsController");
const { get } = require("mongoose");
const router = express.Router();
// General statistics
router.get("/stats", getStatistics);
router.get("/dietDistribution", getDietDistribution);
router.get("/popularFoodChoices", getPopularFoodChoices);
router.get("/physicalRatio", getPhysicalActivityRatio);
router.get("/surveyStats", getSurveyStatistics);
router.get("/matchingSurveys", getMatchingSurveys);
// Demographic statistics
router.get("/genderStats", getGenderStatistics);
router.get("/age-group", getAgeGroupDistribution);
router.get("/countryRepresentation", getCountryRepresentation);
router.get("/socialStatus", getSocialStatus);
router.get("/averageChildren", getAverageChildrenStatistics);
router.get("/eatingHabits", getEatingHabitsStatistics);
// Health and Diet statistics
router.get("/fruitStatsByCountry", getFruitStatisticsByCountry);
router.get("/statisticsDiet", getStatisticsDiet);
router.get("/statisticsAverageFruitIntake", getStatisticsAverageFruitIntake);
router.get("/statisticsAverageVegetableIntake", getStatisticsAverageVegetableIntake);
router.get("/statisticsVegetarianVeganPercentage", getStatisticsVegetarianVeganPercentage);
router.get("/medicalHistory", getMedicalHistoryStatistics);
router.get("/medicalHistorySport", getMedicalHistorySportStatistics);


module.exports = router;
