import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useGetAllSuggestionsQuery } from "../slices/searchApiSlice";
import { FaSearch, FaTimes } from "react-icons/fa";

const Hero = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const {data: allSuggestions,isLoading,error} = useGetAllSuggestionsQuery();
  const navigate = useNavigate();
  const inputRef = useRef();

  useEffect(() => {
    if (searchQuery.trim() && allSuggestions) {
      const combinedSuggestions = [
        ...(allSuggestions.gender || []),
        ...(allSuggestions.country || []),
        ...(allSuggestions.education || []),
        ...(allSuggestions.ethnicity || []),
        ...(allSuggestions.dietDescription || []),
        ...(allSuggestions.household || []),
        ...(allSuggestions.readyToEatFood || []),
        ...(allSuggestions.weather || []),
        ...(allSuggestions.medicalHistory || []),
      ];

      const filtered = combinedSuggestions.filter((suggestion) =>
        suggestion?.toLowerCase().includes(searchQuery.toLowerCase())
      );

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
      // window.location.reload();
    } else {
      console.log("Search query is empty");
    }
  };

  if (isLoading) return <p>Loading suggestions...</p>;
  if (error) return <p>Error loading suggestions: {error.message}</p>;
  return (
    <div className="py-3 bg-gray-100 min-h-screen">
      <div className="container mx-auto flex justify-center">
        <div className="p-10 bg-white shadow-lg rounded-lg w-full md:w-2/3 lg:w-2/2">
          <h1 className="text-4xl font-bold text-center mb-6">
            Statistics Observatory
          </h1>
          <p className="text-center mb-6 text-gray-600">
            Search and explore health statistics across various demographics.
          </p>

          {/* Search Bar */}
          <div className="relative mb-4">
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              <input
                ref={inputRef}
                type="text"
                className="w-full py-3 pl-10 pr-4 border border-gray-300  shadow-sm focus:outline-none focus:ring focus:ring-indigo-500"
                placeholder="Search statistics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />

              {filteredSuggestions.length > 0 && (
                <FaTimes
                  className="absolute right-28 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer z-20"
                  onClick={() => setSearchQuery("")} 
                />
              )}
              
              {/* Search Button */}
              <button
                onClick={handleSearch}
                className="absolute right-1 top-1/2 transform -translate-y-1/2 py-3 px-4 bg-blue-600 text-white text-sm  shadow hover:bg-blue-800 transition duration-300"
              >
                Search
              </button>
            </div>

            {/* Autocomplete Suggestions */}
            {filteredSuggestions.length > 0 && (
              <ul className="absolute z-10 w-full bg-white border border-gray-200 rounded-lg shadow-lg mt-2 max-h-40 overflow-auto">
                {filteredSuggestions.slice(0, 15).map((suggestion, index) => (
                  <li
                    key={index}
                    className="px-4 py-2 hover:bg-blue-500 hover:text-white cursor-pointer"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Filter Buttons Section */}
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            <button className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition duration-300">
              Sport practicing
            </button>
            <button className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition duration-300">
              Healthiest foods
            </button>
            <button className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition duration-300">
              Pizza consumed during one year
            </button>
            <button className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition duration-300">
              Weather and foods
            </button>
            <button className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition duration-300">
              Stay slim
            </button>
            <button className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition duration-300">
              Or not
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
