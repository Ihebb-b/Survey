// Hero.js
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useGetAllSuggestionsQuery } from "../slices/searchApiSlice";
import { FaSearch, FaTimes } from "react-icons/fa";
import backgroundImage from '../assets/background.jpg';
import backgroundImage2 from '../assets/background2.jpg';
import chartsBackground2 from '../assets/chartsBackground2.jpg';



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
    <div className="container1" style={{
      backgroundImage: `url(${chartsBackground2})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}
    >
      <div className="container2"  >
        <div className="container3">
          <h1 className="hero-title"> 
            Statistics Observatory
          </h1>
          <p className="phrase">
            Search and explore diet-related statistics across various
            demographics.
          </p>

          <div className="flex justify-center mb-4">
            <div className="relative w-full max-w-lg">
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
                  className="absolute right-28 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                  onClick={() => setSearchQuery("")}
                />
              )}

              <button
                onClick={handleSearch}
                className="absolute right-1 top-1/2 transform -translate-y-1/2 py-2 px-4 bg-gray-600 rounded text-white shadow hover:bg-indigo-700 transition duration-300"
              >
                Search
              </button>

              {filteredSuggestions.length > 0 && (
                <ul className="absolute z-10 w-full bg-white border border-gray-200 rounded-lg shadow-lg mt-2 max-h-80 overflow-y-auto">
                  {filteredSuggestions.slice(0, 50).map((suggestion, index) => (
                    <li
                      key={index}
                      className="px-4 py-2 hover:bg-indigo-500 hover:text-white cursor-pointer"
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      {suggestion}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {[
              "Sport practicing",
              "Healthiest foods",
              "Pizza consumed",
              "Weather and foods",
              "Stay slim",
              "Or not",
            ].map((filter, index) => (
              <button
                key={index}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition duration-300"
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
