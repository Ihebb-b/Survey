import { useLocation, Link } from "react-router-dom";
import { useSearchStatisticsQuery } from "../slices/searchApiSlice";

import { Bar } from "react-chartjs-2";

import React from "react";

const SearchResult = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get("query");

  

  const { data, error, isLoading } = useSearchStatisticsQuery(query);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-bold text-center mb-8">
        Search Results for "{query}"
      </h1>
      <p className="text-center mb-4">
        Displaying statistics related to your search query.
      </p>

      {data && data.results.length > 0 ? (
        <ul className="list-none">
          {data.results.map((item) => (
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
    </div>
  );
};

export default SearchResult;
