import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function SearchResults() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const query = params.get("search")?.toLowerCase() || "";

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- Получаем товары с API ---
  useEffect(() => {
    setLoading(true);
    fetch("https://68a2a8a1c5a31eb7bb1d67a6.mockapi.io/api/1/product")
      .then((res) => res.json())
      .then((data) => {
        const formattedProducts = data[0].products.map((item) => ({
          id: item.id,
          name: item.name || "Без названия",
          category: item.category || "DEMM",
          price: item.price || "0 руб.",
          image: item.image || "https://picsum.photos/200",
        }));
        setProducts(formattedProducts);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(query) ||
      p.category.toLowerCase().includes(query)
  );

  return (
    <div style={{ padding: "40px" }}>
      <h2>Результаты поиска</h2>
      {query ? <p>Вы искали: <strong>{query}</strong></p> : <p>Введите запрос для поиска.</p>}

      {loading ? (
        <p>Загрузка...</p>
      ) : filteredProducts.length > 0 ? (
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: "20px",
          marginTop: "20px"
        }}>
          {filteredProducts.map((product) => (
            <div key={product.id} style={{
              border: "1px solid #ccc",
              padding: "10px",
              borderRadius: "8px",
              textAlign: "center"
            }}>
              <img src={product.image} alt={product.name} style={{ width: "100%", height: "150px", objectFit: "cover", marginBottom: "10px" }} />
              <h3>{product.name}</h3>
              <p>Категория: {product.category}</p>
              <p>Цена: {product.price}</p>
            </div>
          ))}
        </div>
      ) : (
        <p style={{ marginTop: "20px" }}>Ничего не найдено.</p>
      )}
    </div>
  );
}

export default SearchResults;
