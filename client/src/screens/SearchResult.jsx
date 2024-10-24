import { useLocation, Link } from "react-router-dom";
import { useSearchStatisticsQuery } from "../slices/searchApiSlice";

import React, { useState } from "react";


const SearchResult = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get("query");
  

  

  const { data, error, isLoading } = useSearchStatisticsQuery(query);

  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 7; 

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const indexOfLastResult = currentPage * resultsPerPage;
  const indexOfFirstResult = indexOfLastResult - resultsPerPage;
  const currentResults = data.results.slice(indexOfFirstResult, indexOfLastResult);

  const totalPages = Math.ceil(data.results.length / resultsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container  mx-auto py-10">
      <h1 className="text-4xl font-bold text-center mb-8">
        Search Results for "{query}"
      </h1>
      <p className="text-center mb-4">
        Displaying statistics related to your search query.
      </p>

      {data && data.results.length > 0 ? (
        <ul className="list-none">
           {currentResults.map((item) => (
            <li key={item._id} className="mb-4 p-4 border-b">
              <Link
                to={`/detail/${item._id}`}
                className="text-xl font-bold hover:underline"
              >
                {item.name} - {item.country}
              </Link>
              <p>
                {item.age} | {item.diet}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No results found.</p>
      )}

        {/* Pagination */}
        {totalPages > 1 && (
        <nav>
          <ul className="pagination flex justify-center mt-8">
            {Array.from({ length: totalPages }, (_, index) => (
              <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                <button
                  onClick={() => paginate(index + 1)}
                  className="px-3 py-1 border border-gray-300 hover:bg-blue-600 hover:text-white"
                >
                  {index + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      )}

    </div>
  );
};

export default SearchResult;
