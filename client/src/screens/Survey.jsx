import React, { useState } from 'react';
import { useCreateSurveyMutation } from '../slices/surveyApiSlice';

const Survey = () => {
  const [surveyData, setSurveyData] = useState({
    name: '',
    gender: 'Male',
    age: 0,
    country: '',
    education: '',
    ethnicity: 'Greek',
    dietDescription: 'Vegetarian',
    household: [],
    readyToEatFood: [],
    foodConsumptionFrequency: [
      { dietDescription: 'Home_Made', period: 'Day', unit: 'Gram', value: 0 },
    ],
    traditionalEatingHabits: false,
    newEatingHabits: false,
    medicalHistory: '',
    weather: 'Cold',
    physicalActivity: false,
  });

  const [createSurvey] = useCreateSurveyMutation();

  const handleChange = (e) => {
    setSurveyData({ ...surveyData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createSurvey(surveyData);
      alert('Survey submitted successfully');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white p-6 shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold text-center mb-6">Survey Form</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name */}
        <div>
          <label className="block text-lg font-medium mb-2">Name</label>
          <input
            type="text"
            name="name"
            value={surveyData.name}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md"
            required
          />
        </div>

        {/* Gender */}
        <div>
          <label className="block text-lg font-medium mb-2">Gender</label>
          <select
            name="gender"
            value={surveyData.gender}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md"
            required
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Age */}
        <div>
          <label className="block text-lg font-medium mb-2">Age</label>
          <input
            type="number"
            name="age"
            defaultValue={0}
            value={surveyData.age}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md"
            required
          />
        </div>

        {/* Country */}
        <div>
          <label className="block text-lg font-medium mb-2">Country</label>
          <input
            type="text"
            name="country"
            value={surveyData.country}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md"
            required
          />
        </div>

        {/* Education */}
        <div>
          <label className="block text-lg font-medium mb-2">Education</label>
          <input
            type="text"
            name="education"
            value={surveyData.education}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md"
          />
        </div>

        {/* Ethnicity */}
        <div>
          <label className="block text-lg font-medium mb-2">Ethnicity</label>
          <select
            name="ethnicity"
            value={surveyData.ethnicity}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md"
            required
          >
            <option value="Greek">Greek</option>
            <option value="Italian">Italian</option>
            <option value="Spaniard">Spaniard</option>
            <option value="Turks">Turks</option>
            <option value="North_African">North African</option>
            <option value="Middle Eastern">Middle Eastern</option>
            <option value="Sicilians">Sicilians</option>
          </select>
        </div>

        {/* Diet Description */}
        <div>
          <label className="block text-lg font-medium mb-2">Diet Description</label>
          <select
            name="dietDescription"
            value={surveyData.dietDescription}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md"
            required
          >
            <option value="Vegetarian">Vegetarian</option>
            <option value="Non-Vegetarian">Non-Vegetarian</option>
            <option value="Vegan">Vegan</option>
            <option value="Others">Others</option>
          </select>
        </div>

        {/* Traditional Eating Habits */}
        <div>
          <label className="block text-lg font-medium mb-2">Traditional Eating Habits</label>
          <input
            type="checkbox"
            name="traditionalEatingHabits"
            checked={surveyData.traditionalEatingHabits}
            onChange={(e) =>
              setSurveyData({
                ...surveyData,
                traditionalEatingHabits: e.target.checked,
              })
            }
            className="h-5 w-5"
          />
        </div>

        {/* New Eating Habits */}
        <div>
          <label className="block text-lg font-medium mb-2">New Eating Habits</label>
          <input
            type="checkbox"
            name="newEatingHabits"
            checked={surveyData.newEatingHabits}
            onChange={(e) =>
              setSurveyData({
                ...surveyData,
                newEatingHabits: e.target.checked,
              })
            }
            className="h-5 w-5"
          />
        </div>

        {/* Medical History */}
        <div>
          <label className="block text-lg font-medium mb-2">Medical History</label>
          <input
            type="text"
            name="medicalHistory"
            value={surveyData.medicalHistory}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md"
          />
        </div>

        {/* Weather */}
        <div>
          <label className="block text-lg font-medium mb-2">Weather</label>
          <select
            name="weather"
            value={surveyData.weather}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md"
            required
          >
            <option value="Cold">Cold</option>
            <option value="Hot">Hot</option>
            <option value="Moderate">Moderate</option>
          </select>
        </div>

        {/* Physical Activity */}
        <div>
          <label className="block text-lg font-medium mb-2">Physical Activity</label>
          <input
            type="checkbox"
            name="physicalActivity"
            checked={surveyData.physicalActivity}
            onChange={(e) =>
              setSurveyData({
                ...surveyData,
                physicalActivity: e.target.checked,
              })
            }
            className="h-5 w-5"
          />
        </div>

        <button
          type="submit"
          className="w-full p-3 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Survey;
