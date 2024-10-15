const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const surveyRoutes = require('./routes/surveyRoutes');
const statisticsRoutes = require('./routes/statisticsRoutes');
const searchRoutes = require('./routes/searchRoutes');
const userRoutes = require('./routes/userRoutes');
const { notFound, errorHandler } = require('./middelware/errorMiddelware');
const connectDB = require('./config/db');
const  cookieParser = require('cookie-parser');

require('dotenv').config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());


// Connect Database
connectDB();

// Routes
app.use('/api/surveys', surveyRoutes);
app.use('/api/statistics', statisticsRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/user', userRoutes);


// Set up a root route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Starting the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

//Error Handler
app.use(notFound);
app.use(errorHandler);
