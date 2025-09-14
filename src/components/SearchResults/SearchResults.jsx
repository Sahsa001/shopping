import React, { useEffect, useState } from "react";
import { useLocation, NavLink } from "react-router-dom";
import axios from "axios";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function SearchResults() {
  const query = useQuery().get("query");
  const [results, setResults] = useState([]);
  const API_URL = "https://68a2a8a1c5a31eb7bb1d67a6.mockapi.io/api/1/product";

  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }

    const fetchData = async () => {
      try {
        const response = await axios.get(API_URL);
        const filtered = response.data.filter((p) =>
          p.name.toLowerCase().includes(query.toLowerCase())
        );
        setResults(filtered);
      } catch (error) {
        console.error("Ошибка поиска:", error);
        setResults([]);
      }
    };

    fetchData();
  }, [query]);

  return (
    <div className="search-results-page">
      <h2>Результаты поиска для "{query}"</h2>
      {results.length === 0 ? (
        <p>Ничего не найдено</p>
      ) : (
        <ul className="search-results-list">
          {results.map((item) => (
            <li key={item.id}>
              <NavLink
                to={`/${item.category ? item.category.toLowerCase().replace(/ /g, "-") : "#"}`}
              >
                <img src={item.image} alt={item.name} />
                <div>
                  <span>{item.name}</span>
                  <span>{item.price} ₸</span>
                </div>
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchResults;
