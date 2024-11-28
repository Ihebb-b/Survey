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
  getParticipantsByState,
  getAverageFoodExpenditure,
  getIncomeDistribution,
  getIncomeDietCorrelation,
  getEatingOutVsCooking,
  calculateActivityDietCorrelation,
  calculateFastFoodConsumptionFrequency,
  getDietAgeCorrelation,
  getPizza,
} = require("../controllers/statisticsController");
const { get } = require("mongoose");
const router = express.Router();


// General statistics
router.get("/stats", getStatistics);
router.get("/dietDistribution", getDietDistribution);
router.get("/popularFoodChoices", getPopularFoodChoices);
router.get("/surveyStats", getSurveyStatistics);
router.get("/matchingSurveys", getMatchingSurveys);


// Demographic statistics
router.get("/genderStats", getGenderStatistics);
router.get("/age-group", getAgeGroupDistribution);
router.get("/countryRepresentation", getCountryRepresentation);
router.get("/socialStatus", getSocialStatus);
router.get("/averageChildren", getAverageChildrenStatistics);
router.get("/eatingHabits", getEatingHabitsStatistics);
router.get("/participantsByState/:stateName", getParticipantsByState);


// Health and Diet statistics
router.get("/fruitStatsByCountry", getFruitStatisticsByCountry);
router.get("/statisticsDiet", getStatisticsDiet);
router.get("/statisticsAverageFruitIntake", getStatisticsAverageFruitIntake);
router.get("/statisticsAverageVegetableIntake", getStatisticsAverageVegetableIntake);
router.get("/statisticsVegetarianVeganPercentage", getStatisticsVegetarianVeganPercentage);
router.get("/medicalHistory", getMedicalHistoryStatistics);
router.get("/medicalHistorySport", getMedicalHistorySportStatistics);
router.get("/physicalRatio", getPhysicalActivityRatio);

// Economic and Social statistics
router.get("/averageFoodExpenditure", getAverageFoodExpenditure);
router.get("/incomeDistribution", getIncomeDistribution);
router.get("/incomeDietCorrelation", getIncomeDietCorrelation);
router.get("/eatingOutVsCooking", getEatingOutVsCooking);
router.get("/calculateActivityDietCorrelation", calculateActivityDietCorrelation);
router.get("/calculateFastFoodConsumptionFrequency", calculateFastFoodConsumptionFrequency);

//Dietary preferences statistics

router.get("/dietAgeCorrelation", getDietAgeCorrelation);



// In generl now
router.get("/pizza", getPizza);


module.exports = router;
