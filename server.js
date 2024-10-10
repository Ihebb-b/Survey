const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const surveyRoutes = require('./routes/surveyRoutes');
const statisticsRoutes = require('./routes/statisticsRoutes');

const connectDB = require('./config/db');

require('dotenv').config();


//dotenv.config();

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());


// Connect Database
connectDB();

// Routes
app.use('/api/surveys', surveyRoutes);
app.use('/api/statistics', statisticsRoutes);
app.use('/api/search', require('./routes/searchRoutes'));
// Set up a root route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Starting the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
