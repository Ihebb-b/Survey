import React from "react";
import DietDistributionChart from "../../components/charts/healthAndDiet/DietDistributionChart";
import AverageFruitIntakeChart from "../../components/charts/healthAndDiet/AverageFruitItakeChart";
import AverageVegetableIntakeChart from "../../components/charts/healthAndDiet/AverageVegetableIntakeChart";
import VegetarianVeganPercentageChart from "../../components/charts/healthAndDiet/VegetarianVeganPercentageChart";
import PhysicalActivityRatioChart from "../../components/charts/healthAndDiet/PhysicalActivityRatioChart";

const HealthAndDiet = () => {
  return (
    <>
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
        Health Diet Statistics
      </h1>

      <div className="container mx-auto px-4 flex flex-wrap gap-6 justify-center">
        {/* Gender Statistics Chart */}
        <div className="w-full md:w-1/2 lg:w-1/3 bg-white shadow-lg rounded-lg p-4">
          <DietDistributionChart />
        </div>

        {/* Vegetarian Vegan Percentage Chart */}
        <div className="w-full md:w-1/2 lg:w-1/3 bg-white shadow-lg rounded-lg p-4">
          <VegetarianVeganPercentageChart />
        </div>

        {/* Average Fruit Intake Chart Chart */}
        <div className="w-full md:w-1/2 lg:w-1/3 bg-white shadow-lg rounded-lg p-4">
          <AverageFruitIntakeChart />
        </div>

        {/* Average Vegetable Intake Chart */}
        <div className="w-full md:w-1/2 lg:w-1/3 bg-white shadow-lg rounded-lg p-4">
          <AverageVegetableIntakeChart />
        </div>


        {/* Physical Activity Ratio Chart */}
        <div className="w-full md:w-1/2 lg:w-1/3 bg-white shadow-lg rounded-lg p-4">
          <PhysicalActivityRatioChart />
        </div>

        

      </div>
    </>
  );
};

export default HealthAndDiet;
