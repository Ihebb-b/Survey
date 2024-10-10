const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const surveySchema = new Schema({
  name: { type: String, required: true },
  gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
  age: { type: Number, required: true },
  country: { type: String, required: true },
  education: { type: String, required: false },
  ethnicity: { type: String, required: false },
  dietDescription: { type: String, enum: ['Vegetarian', 'Non-Vegetarian', 'Vegan', 'Others'], required: true },
  householdPurchasedFood: [{ type: String }], // array of strings for selected food
  readyToEatFood: [String],
  foodConsumptionFrequency: [{
    foodItem: { type: String },
    period: { type: String, enum: ['Day', 'Week', 'Month'] },
    unit: { type: String, enum: ['Gram', 'Litre', 'Number'] },
    value: { type: Number }
}],
  traditionalEatingHabits: [Boolean],
  newEatingHabits: [Boolean],
  medicalHistory: [String],
  unit: { type: String, enum: ['Cold', 'Hot', 'Moderate'] },
  physicalActivity: { type: Boolean, required: true }
});

module.exports = mongoose.model('Survey', surveySchema);
