const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const surveySchema = new Schema({
  name: { type: String, required: true },
  gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
  age: { type: Number, required: true },
  country: { type: String, required: true },
  education: { type: String, required: false },
  ethnicity: { type: String, enum: ['Greek', 'Italian', 'Spaniard', 'Turks', 'North_African', 'Middle Eastern', 'Sicilians'], required: true },
  dietDescription: { type: String, enum: ['Vegetarian', 'Non-Vegetarian', 'Vegan', 'Others'], required: true },
  household: [{ type: String }], // array of strings for selected food
  readyToEatFood: [String],
  foodConsumptionFrequency: [{
    dietDescription: { type: String, enum: ['Home_Made', 'Ordered'], required: true },
    period: { type: String, enum: ['Day', 'Week', 'Month'] },
    unit: { type: String, enum: ['Gram', 'Litre', 'Number'] },
    value: { type: Number }
}],
  traditionalEatingHabits: {type: Boolean},
  newEatingHabits: {type: Boolean},
  medicalHistory: {type: String},
  weather: { type: String, enum: ['Cold', 'Hot', 'Moderate'] },
  physicalActivity: { type: Boolean, required: true }
});

surveySchema.index({
  name: 'text',
  gender: 'text',
  country: 'text',
  education: 'text',
  ethnicity: 'text',
  dietDescription: 'text',
  household: 'text',
  readyToEatFood: 'text',
  foodConsumptionFrequency: 'text',
  traditionalEatingHabits: 'text',
  newEatingHabits: 'text',
  medicalHistory: 'text',
  weather: 'text',
  physicalActivity:'text',
  // Add more fields if needed
});

module.exports = mongoose.model('Survey', surveySchema);
