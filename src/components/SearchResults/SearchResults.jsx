import React, { useState, useEffect } from "react";
// products массивин кайсы жерден алып жатсаң ошол жерден импорт кылышың керек!
// import { products } from "../data/products";  <-- мисалы

function SearchResults() {
  const [results, setResults] = useState([]);
  const searchParams = new URLSearchParams(window.location.search);
  const query = searchParams.get("query");

  useEffect(() => {
    if (!query) return;

    // products массивинен фильтрлөө
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(query.toLowerCase())
    );
    setResults(filtered);
  }, [query]);

  return (
    <div>
      <h2>Результаты поиска для "{query}"</h2>
      <ul>
        {results.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default SearchResults;
