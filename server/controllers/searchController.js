const Survey = require("../models/Survey");
const { getSocialStatus } = require("./statisticsController");



const searchStatistics = async (req, res) => {
  const { query, page = 1, limit = 30 } = req.query; 

  try {
    const results = await Survey.find(
      { $text: { $search: query } } 
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
    limit = 100,
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
      .limit(limit * 1) 
      .skip((page - 1) * limit) 
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
    const suggestions = {
      name: await Survey.distinct("name"),
      gender: await Survey.distinct("gender"),
      age: await Survey.distinct("age"),
      state: await Survey.distinct("state"),
      ville: await Survey.distinct("ville"),
      country: await Survey.distinct("country"),   
      height: await Survey.distinct("height"),
      weight: await Survey.distinct("weight"),
      education: await Survey.distinct("education"),
      Occupation: await Survey.distinct("Occupation"),
      salary: await Survey.distinct("salary"),
      currency: await Survey.distinct("currency"),
      socialStatus: await Survey.distinct("socialStatus"),
      diet: await Survey.distinct("diet"),
      meat: await Survey.distinct("meat"),
      fruit: await Survey.distinct("fruit"),
      fruitUnitPerDay: await Survey.distinct("fruitUnitPerDay"),
      vegetable: await Survey.distinct("vegetable"),
      vegetableUnitPerDay: await Survey.distinct("vegetableUnitPerDay"),
      religious: await Survey.distinct("religious"),
      fish: await Survey.distinct("fish"),
      dairy: await Survey.distinct("dairy"),
      oil: await Survey.distinct("oil"),
      homeMade: await Survey.distinct("homeMade"),
      ordered: await Survey.distinct("ordered"),
      medicalHistory: await Survey.distinct("medicalHistory"),
    };

    res.status(200).json(suggestions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
  };





module.exports = {
  searchStatistics,
  advancedSearch,
  getAllSuggestions,
};
