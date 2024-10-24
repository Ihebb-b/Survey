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
} = require("../controllers/statisticsController");
const { get } = require("mongoose");
const router = express.Router();

router.get("/stats", getStatistics);
router.get("/dietDistribution", getDietDistribution);
router.get("/popularFoodChoices", getPopularFoodChoices);
router.get("/physicalRatio", getPhysicalActivityRatio);
router.get("/surveyStats", getSurveyStatistics);
router.get("/eatingHabits", getEatingHabitsStatistics);
router.get("/medicalHistory", getMedicalHistoryStatistics);
router.get("/medicalHistorySport", getMedicalHistorySportStatistics);
router.get("/matchingSurveys", getMatchingSurveys);
module.exports = router;
