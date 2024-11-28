// Hero.js
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useGetAllSuggestionsQuery } from "../slices/searchApiSlice";
import { FaSearch, FaTimes } from "react-icons/fa";
import backgroundImage from "../assets/background.jpg";
import backgroundImage2 from "../assets/background2.jpg";
import chartsBackground2 from "../assets/chartsBackground2.jpg";
import mediterraneandiet from "../assets/mediterraneandiet.jpg";
import ImageGallery from "./ImageGallery";
import olive from "../assets/olive.jpg";
import diet2 from "../assets/diet2.jpg";
import diet3 from "../assets/diet3.jpg";
import diet4 from "../assets/diet4.jpg";
import delecious from "../assets/delecious.jpg";

const Hero = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const {
    data: allSuggestions,
    isLoading,
    error,
  } = useGetAllSuggestionsQuery();
  const navigate = useNavigate();
  const inputRef = useRef();

  useEffect(() => {
    if (searchQuery.trim() && allSuggestions) {
      const combinedSuggestions = [
        ...(allSuggestions.name || []),
        ...(allSuggestions.gender || []),
        ...(allSuggestions.state || []),
        ...(allSuggestions.ville || []),
        ...(allSuggestions.country || []),
        ...(allSuggestions.height || []),
        ...(allSuggestions.weight || []),
        ...(allSuggestions.education || []),
        ...(allSuggestions.occupation || []),
        ...(allSuggestions.salary || []),
        ...(allSuggestions.currency || []),
        ...(allSuggestions.socialStatus || []),
        ...(allSuggestions.diet || []),
        ...(allSuggestions.meat || []),
        ...(allSuggestions.fruit || []),
        ...(allSuggestions.fruitUnitPerDay || []),
        ...(allSuggestions.vegetable || []),
        ...(allSuggestions.vegetableUnitPerDay || []),
        ...(allSuggestions.religious || []),
        ...(allSuggestions.fish || []),
        ...(allSuggestions.dairy || []),
        ...(allSuggestions.oil || []),
        ...(allSuggestions.homeMade || []),
        ...(allSuggestions.ordered || []),
        ...(allSuggestions.medicalHistory || []),
      ];

      // const filtered = combinedSuggestions.filter((suggestion) =>
      //   suggestion?.toLowerCase().includes(searchQuery.toLowerCase())
      // );

      // const filtered = combinedSuggestions.filter(
      //   (suggestion) =>
      //     typeof suggestion === "string" &&
      //     suggestion.toLowerCase().includes(searchQuery.toLowerCase())
      // );

      const filtered = combinedSuggestions.filter((suggestion) => {
        if (typeof suggestion === "string") {
          return suggestion.toLowerCase().includes(searchQuery.toLowerCase());
        }
        return false;
      });

      setFilteredSuggestions(filtered);
    } else {
      setFilteredSuggestions([]);
    }
  }, [searchQuery, allSuggestions]);

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion);
    setTimeout(() => {
      setFilteredSuggestions([]);
      inputRef.current.blur();
    }, 0);
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/search-results?query=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
    } else {
      console.log("Search query is empty");
    }
  };

  if (isLoading) return <p>Loading suggestions...</p>;
  if (error) return <p>Error loading suggestions: {error.message}</p>;

  return (
    <div
      className="container1"
      style={{
        backgroundImage: `url(${delecious})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="flex-container">
        <div className="container2">
          <div className="container3">
            <h1 className="hero-title">MM.Diet Statistics Observatory</h1>
            <p className="phrase">
              Search and explore diet-related statistics across various
              demographics.
            </p>

            <div className="d-flex mb-4">
              <div className="relative w-full">
                <FaSearch className="search-icon" />
                <input
                  ref={inputRef}
                  type="text"
                  className="search-bar"
                  placeholder="Search statistics..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />

                {filteredSuggestions.length > 0 && (
                  <FaTimes
                    className="close-icon"
                    onClick={() => setSearchQuery("")}
                  />
                )}

                <button onClick={handleSearch} className="custom-btn">
                  Search
                </button>

                {filteredSuggestions.length > 0 && (
                  <ul className="suggestions-list">
                    {filteredSuggestions
                      .slice(0, 50)
                      .map((suggestion, index) => (
                        <li
                          key={index}
                          className="suggestion-dropdown-item"
                          onClick={() => handleSuggestionClick(suggestion)}
                        >
                          {suggestion}
                        </li>
                      ))}
                  </ul>
                )}
              </div>
            </div>

            <div className="mt-10 flex flex-wrap justify-center gap-2">
              {[
                "Sport practicing",
                "Healthiest foods",
                "Pizza consumed",
                "Climate and foods",
                "Gender distribution",
                "Traditional foods",
              ].map((filter, index) => (
                <button
                  key={index}
                  className="custom-btn text-white rounded transition duration-300"
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="container4">
          <div className="image-wrapper">
            <img src={diet3} alt="olive" className="hero-image" />
            <div className="overlay">
              <p className="overlay-text">Welcome to our statistical site where you can find differenet statistics about the mediterranean diet.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
