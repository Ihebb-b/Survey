const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const surveySchema = new Schema({
  name: { type: String, required: true },
  gender: { type: String, enum: ['Male', 'Female'], required: true },
  age: { type: String, enum: ['Under 20 years','Between 20-30 years', 'Between 30-40 years',
     'Between 40-50 years', 'Between 50-60 years', 'Over 60 years'  ] ,required: true },
  country: { type: String, enum: ['Algeria', 'Egypt', 
    'Morocco', 'Tunisia', 'Libya', 'Lebanon', 'Palestine',

     'Syria', 'Turkey', 'Albania', 'Bosnia', 'Herzegovina', 'Croatia', 'Cyprus',
      'France', 'Greece', 'Italy', 'Malta', 'Monaco', 
      'Montenegro', 'Slovenia', 'Spain'], required: true },
  education: { type: String, enum:  [ 'None', 
    'Primary education', 'Secondary education',
     'Higher education', 'Technical education'], required: false },
  ethnicity: { type: String, enum: ['Greek', 'Italian', 
    'Spaniard', 'Turks', 'North_African', 
    'Middle Eastern', 'Sicilians'], required: true },
  diet: { type: String, enum: ['Vegetarian', 
    'Non-Vegetarian', 'Both'], required: true },
  household: [{ type: String, enum: [ 'Shakshouka', 
    'Couscous', 
    'Moroccan Tagine', 'Musakhan', 'Harira',
     'Horiatiki (Greek salad)', 
   'Moussaka', 'Spanakopita', 'Melomakarono', 
   'Manti', 'Borek', 'Kofte', 'Risotto', 
   'Timballo', 'Polenta', 'Baba Ghanoush', 'Hummus', 
   'Other'] }],
  readyToEatFood: [{ type: String, enum: ['Pizza', 
    'Sandwiches', 
    'Burgers', 'Wraps', 'Paninis', 'Mlewi', 'Chappati',
     'Manakish', 'Lahmacun', 'Koshari', 'Other'] }],
  foodConsumptionFrequency: [{
    dietDescription: { type: String, enum: ['Home_Made',
       'Ordered'], required: true },
    period: { type: String, enum: ['Day', 'Week', 'Month'], required: true },
    unit: { type: String, enum: ['Gram', 'Litre', 'Number'], required: true },
    value: { type: Number }
}],
  traditionalEatingHabits: {type: Boolean},
  newEatingHabits: {type: Boolean},
  medicalHistory: {type: String, enum: ['None', 'Diabetes',
     
    'Hypertension', 'Heart_Disease', 'Cancer', 
    'Cardiovascular Disease', 
    'Obesity', 'Asthma', 'Arthritis', 
    'Gastrointestinal disorders', 'Metabolic syndrome', 
    'Skin diseases', 'Tuberculosis', 'Hepatitis', 'Other', 'Prefer not to say'], required: false },
  weather: { type: String, enum: ['Cold', 'Hot', 'Warm', 'Moderate', 'Rainy'], required: true },
  sportPractice: { type: Boolean },
  noSportPractice: { type: Boolean }

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
