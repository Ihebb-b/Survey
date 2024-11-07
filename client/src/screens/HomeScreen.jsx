// HomeScreen.js
import React from "react";
import Hero from "../components/Hero";
import EatingHabitsChart from "../components/charts/EatingHabitsChart";
import MedicalHistoryChart from "../components/charts/MedicalHistoryChart";
import FruitPieChart from "../components/charts/FruitPieChart";

const HomeScreen = () => {
  return (
    <>
      <Hero />

      <div className="container mx-auto px-4 py-6 space-y-6">
        <h1 className="text-4xl font-bold text-left text-gray-800 mb-6">
          General Statistics
        </h1>
        {/* Fruit Consumption Section */}
        <div className="w-full md:w-2/2 lg:w-3/3 bg-white shadow-lg rounded-lg p-4">
          <FruitPieChart />
        </div>

        {/* Grid for Eating Habits and Medical History Charts */}
        <div className="grid gap-6 md:grid-cols-2">

          {/* Eating Habits Section */}
          <div className="w-full md:w-2/2 lg:w-3/3 bg-white shadow-lg rounded-lg p-4">
            <EatingHabitsChart />
          </div>

          {/* Medical History Section */}
          <div className="w-full md:w-2/2 lg:w-3/3 bg-white shadow-lg rounded-lg p-4">
            <MedicalHistoryChart />
          </div>
          
        </div>
      </div>
    </>
  );
};

export default HomeScreen;
