// HomeScreen.js
import React from 'react';
import Hero from '../components/Hero';
import EatingHabitsChart from '../components/EatingHabitsChart';
import MedicalHistoryChart from '../components/MedicalHistoryChart';
import FruitPieChart from '../components/FruitPieChart';

const HomeScreen = () => {
  return (
    <>
      <Hero />
      <div className="container mx-auto px-4 py-6 space-y-6">

        {/* Fruit Consumption Section */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg shadow-lg p-6 text-center space-y-4">
          <h1 className="text-2xl font-bold text-gray-800">Fruit Consumption by Country</h1>
          <p className="text-gray-700 text-md">Overview of fruit types and units consumed daily by country. Select a country for specific data.</p>
          <FruitPieChart />
        </div>

        {/* Grid for Eating Habits and Medical History Charts */}
        <div className="grid gap-6 md:grid-cols-2">

          {/* Eating Habits Section */}
          <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-6 text-center space-y-4">
            <h1 className="text-xl font-semibold text-gray-800">Eating Habits</h1>
            <p className="text-gray-600 text-sm">A comparative analysis of traditional vs. modern eating habits across Mediterranean age groups.</p>
            <EatingHabitsChart />
          </div>

          {/* Medical History Section */}
          <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-6 text-center space-y-4">
            <h1 className="text-xl font-semibold text-gray-800">Medical History</h1>
            <p className="text-gray-600 text-sm">Insights on food consumption and associated medical history across different demographics.</p>
            <MedicalHistoryChart />
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeScreen;
