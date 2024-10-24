import React from 'react'
import Hero from '../components/Hero'
import EatingHabitsChart from '../components/EatingHabitsChart'
import MedicalHistoryChart from '../components/MedicalHistoryChart'

const HomeScreen = () => {
  return (
    <>
    <Hero />
    <div className="container mx-auto p-4  flex-col space-y-4">
  <div className="flex items-center justify-center">
    <div className="bg-white border border-gray-200 rounded-lg shadow-md ">
      <h1 className="text-center mb-2">Eating Habits</h1>
      <EatingHabitsChart />
    </div>
  </div>

  <div className="flex items-center justify-center">
    <div className="bg-white border border-gray-200 rounded-lg shadow-md w-full">
      <h1 className="text-center mb-2">Medical History</h1>
      <MedicalHistoryChart />
    </div>
  </div>
</div>

  
    </>
  )
}

export default HomeScreen;