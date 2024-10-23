import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import "./SearchBar.css";
import {
  useGetAllSuggestionsQuery,
  useSearchStatisticsQuery,
} from "../slices/searchApiSlice";
import { useNavigate } from "react-router-dom";

export const SearchBar = () => {
  const [input, setInput] = useState("");
  const navigate=useNavigate();
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const { data: suggestions, isLoading: suggestionsLoading } =
    useGetAllSuggestionsQuery();

  useEffect(() => {
    if (input.trim() === "") {
      setFilteredSuggestions([]);
      return;
    }

    if (Array.isArray(suggestions)) {
      const filtered = suggestions.filter((item) =>
        item.toLowerCase().includes(input.toLowerCase())
      );
      setFilteredSuggestions(filtered);
    }
  }, [input, suggestions]);

  const { data: searchResults, error: searchError } = useSearchStatisticsQuery({
    query: input,
  });

  const handleSearch = (e) => {
    e.preventDefault();
    if (input.trim() !== "") {
      // Reset to page 1 when searching
      // setPage(1);
      console.log("Search initiated with query:", input);
      navigate(`/search-results?query=${encodeURIComponent(query)}`, {
        replace: true,
      });
    }
  };

  return (
    <div className="input-wrapper">
      <FaSearch id="search-icon" />
      <form onSubmit={handleSearch}>
        <input
          placeholder="Type to search..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </form>

       {/* Display filtered suggestions */}
       {filteredSuggestions.length > 0 && (
        <ul className="suggestions-list">
          {filteredSuggestions.map((suggestion, index) => (
            <li key={index}>{suggestion}</li>
          ))}
        </ul>
      )}

       {/* Display search results */}
       {searchResults && (
        <div className="search-results">
          {searchResults.results.length > 0 ? (
            searchResults.results.map((result, index) => (
              <div key={index}>
                <h5>{result.name}</h5>
                <p>{result.gender}</p>
              </div>
            ))
          ) : (
            <p>No result found</p>
          )}
        </div>
      )}
    </div>
  );
};
