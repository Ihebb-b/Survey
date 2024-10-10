const express = require('express');
const { searchStatistics, advancedSearch,
    getAllSuggestions } = require('../controllers/searchController');
const router = express.Router();

router.get('/search', searchStatistics);
router.get('/advanced-search', advancedSearch);
router.get('/suggestions', getAllSuggestions);



module.exports = router;
