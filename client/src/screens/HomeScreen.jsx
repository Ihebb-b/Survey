import React from 'react';
import Hero from '../components/Hero';
import EatingHabitsChart from '../components/EatingHabitsChart';
import MedicalHistoryChart from '../components/MedicalHistoryChart';

const HomeScreen = () => {
  return (
    <>
      <Hero />
      <div className="container mx-auto p-4 space-y-4">
        {/* Charts Wrapper with Responsive Layout */}
        <div className="flex flex-col md:flex-row md:space-x-4 md:space-y-0 space-y-4 items-start justify-center">
          {/* Eating Habits Section */}
          <div className="flex flex-col items-center w-full md:w-1/2 bg-white border border-gray-200 rounded-lg shadow-md p-4 space-y-2">
            <h1 className="text-center text-xl font-semibold mb-2">Eating Habits</h1>
            <p className="text-gray-600 text-sm text-center mb-2">
              A breakdown comparison between traditional and new eating habits across various age groups in the Mediterranean.
            </p>
            <EatingHabitsChart />
          </div>

          {/* Medical History Section */}
          <div className="flex flex-col items-center w-full md:w-1/2 bg-white border border-gray-200 rounded-lg shadow-md p-4 space-y-2">
            <h1 className="text-center text-xl font-semibold mb-2">Medical History</h1>
            <p className="text-gray-600 text-sm text-center mb-2">
              Analysis of home made and ordered food consumption patterns with relative medical history.
            </p>
            <MedicalHistoryChart />
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeScreen;
