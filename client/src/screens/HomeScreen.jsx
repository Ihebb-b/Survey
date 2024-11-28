// HomeScreen.js
import React, { useEffect, useState, useRef } from "react";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import EatingHabitsChart from "../components/charts/EatingHabitsChart";
import MedicalHistoryChart from "../components/charts/MedicalHistoryChart";
import FruitPieChart from "../components/charts/FruitPieChart";
import mapImage from "../assets/map.png";
import mapImage2 from "../assets/map2.png";
import StateStatisticsChart from "../components/charts/demographic/StateStatisticsChart";
import { Link, useNavigate, useParams, NavLink } from "react-router-dom";

import MealsListComponent from "../components/MealsListComponent";

const HomeScreen = () => {
  const [selectedState, setSelectedState] = useState(null);

  const handleStateClick = (state) => {
    setSelectedState(state);
  };

  return (
    <>
      <div className="container">
        <Hero />


      {/*Map Container*/}
        <div className="container">
          <h1 className="title1">Participants Percentage</h1>

          <div
            className="container "
            style={{
              display: "flex",
              gap: "10px",
              backgroundColor: "#FEF9E7",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div
              className="map-card"
              style={{
                flex: "2",
                overflow: "hidden",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                borderRadius: "8px",
              }}
            >
              <img
                src={mapImage}
                alt="World Map"
                style={{
                  width: "100%",
                  height: "auto",
                  borderRadius: "8px",
                }}
                className="zoomable-image"
              />

              <button
                onClick={() => handleStateClick("Morocco")}
                style={{ position: "absolute", top: "54%", left: "24%" }}
                className="marker-button"
              >
                <span className="tooltip">Morocco</span>
              </button>

              <button
                onClick={() => handleStateClick("Algeria")}
                style={{ position: "absolute", top: "52%", left: "29%" }}
                className="marker-button"
              >
                <span className="tooltip">Algeria</span>
              </button>
              <button
                onClick={() => handleStateClick("Tunisia")}
                style={{ position: "absolute", top: "50%", left: "34%" }}
                className="marker-button"
              >
                <span className="tooltip">Tunisia</span>
              </button>

              <button
                onClick={() => handleStateClick("Libya")}
                style={{ position: "absolute", top: "58%", left: "40%" }}
                className="marker-button"
              >
                <span className="tooltip">Libya</span>
              </button>

              <button
                onClick={() => handleStateClick("Egypt")}
                style={{ position: "absolute", top: "60%", left: "50%" }}
                className="marker-button"
              >
                <span className="tooltip">Egypt</span>
              </button>

              <button
                onClick={() => handleStateClick("Palestine")}
                style={{ position: "absolute", top: "58%", left: "55%" }}
                className="marker-button"
              >
                <span className="tooltip">Palestine</span>
              </button>

              <button
                onClick={() => handleStateClick("Syria")}
                style={{ position: "absolute", top: "53%", left: "59%" }}
                className="marker-button"
              >
                <span className="tooltip">Syria</span>
              </button>

              <button
                onClick={() => handleStateClick("Turkey")}
                style={{ position: "absolute", top: "47%", left: "54%" }}
                className="marker-button"
              >
                <span className="tooltip">Turkey</span>
              </button>

              <button
                onClick={() => handleStateClick("Greece")}
                style={{ position: "absolute", top: "45%", left: "47%" }}
                className="marker-button"
              >
                <span className="tooltip">Greece</span>
              </button>

              <button
                onClick={() => handleStateClick("Italy")}
                style={{ position: "absolute", top: "42%", left: "40%" }}
                className="marker-button"
              >
                <span className="tooltip">Italy</span>
              </button>

              <button
                onClick={() => handleStateClick("France")}
                style={{ position: "absolute", top: "35%", left: "32%" }}
                className="marker-button"
              >
                <span className="tooltip">France</span>
              </button>

              <button
                onClick={() => handleStateClick("Spain")}
                style={{ position: "absolute", top: "42%", left: "25%" }}
                className="marker-button"
              >
                <span className="tooltip">Spain</span>
              </button>
            </div>

            <div
              className="chart-container"
              style={{
                flex: "1",
                display: "flex",
                flexDirection: "column",
                //justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#EBF5FB",
                borderRadius: "8px",
                padding: "5px",
                opacity: "0.95",
              }}
            >
              <h3
                className="chart-title"
                style={{
                  marginTop: "20px",
                  marginBottom: "50px",
                  fontSize: "1.3rem",
                  fontWeight: "bold",
                  color: "#333",
                }}
              >
                {selectedState
                  ? `Statistics for Participants in ${selectedState}`
                  : "Select a State to View Statistics"}
              </h3>
              <StateStatisticsChart selectedState={selectedState} />
            </div>
          </div>
        </div>


      {/* Most Viewed Meals Container */}                           
        <div class="container mt-14">
          <div class="section-header-wrapper">
            <h1 class="title1">Most viewed traditional meals</h1>

            <NavLink to="/survey">
              <button class="custom-btn">View all</button>
            </NavLink>
          </div>

          <MealsListComponent />
        </div>

        <div className="container mt-5">
          <h1 className="title1">General Statistics</h1>
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

        <Footer />
      </div>
    </>
  );
};

export default HomeScreen;
