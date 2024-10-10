const express = require('express');
const { getStatistics, getDietDistribution, 
    getPopularFoodChoices, 
    getPhysicalActivityRatio,  
    getSurveyStatistics, getAllSuggestions } = require('../controllers/statisticsController');
const router = express.Router();

router.get('/stats', getStatistics);
router.get('/dietDistribution', getDietDistribution);
router.get('/popularFoodChoices', getPopularFoodChoices);
router.get('/physicalRatio', getPhysicalActivityRatio);
router.get('/surveyStats', getSurveyStatistics);
router.get('/suggestions', getAllSuggestions);

module.exports = router;
