import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import "./Mixers.css";
import { useCart } from "../CartContext/CartContext";
import Card from "../Card/Card";

function Mixers() {
  const [products, setProducts] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 50000]);
  const [status, setStatus] = useState("all");
  const [flippedCards, setFlippedCards] = useState({});

  const cartContext = useCart();
  const { cart, setCart } = cartContext || { cart: [], setCart: () => {} };
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get("search") || "";

  useEffect(() => {
    fetch("https://68a2a8a1c5a31eb7bb1d67a6.mockapi.io/api/1/product")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Сетевой запрос не удался: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        const formattedProducts = data[0].products.map((item) => ({
          id: item.id,
          name: item.name || "Без названия",
          article: item.article || "N/A",
          price: parseInt(item.price.replace(/[^\d]/g, '')) || 0,
          inStock: item.inStock || "Нет в наличии",
          image: item.image || "https://picsum.photos/150",
          description: item.description || "Без описания",
          brand: item.brand || "DEMM",
          category: "Смесители",
        }));
        setProducts(formattedProducts);
      })
      .catch((error) => console.error("Ошибка при загрузке данных:", error));
  }, []);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
    alert("Добавлено в корзину!");
  };

  const toggleBrand = (brand) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const toggleFlip = (id) => {
    setFlippedCards((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredProducts = products
    .filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((product) =>
      selectedBrands.length > 0 ? selectedBrands.includes(product.brand) : true
    )
    .filter(
      (product) => product.price >= priceRange[0] && product.price <= priceRange[1]
    )
    .filter((product) => status === "all" || product.inStock === status);

  return (
    <div className="mixers-container">
      <aside className="sidebar">
        <h3>Бренды</h3>
        <ul>
          <li>
            <label>
              <input
                type="checkbox"
                checked={selectedBrands.includes("ERYOS")}
                onChange={() => toggleBrand("ERYOS")}
              />
              ERYOS
            </label>
          </li>
          <li>
            <label>
              <input
                type="checkbox"
                checked={selectedBrands.includes("ACIAR INOX")}
                onChange={() => toggleBrand("ACIAR INOX")}
              />
              ACIAR INOX
            </label>
          </li>
          <li>
            <label>
              <input
                type="checkbox"
                checked={selectedBrands.includes("JAGO")}
                onChange={() => toggleBrand("JAGO")}
              />
              JAGO
            </label>
          </li>
        </ul>

        <h3>Цена</h3>
        <input
          type="range"
          min="0"
          max="50000"
          step="1000"
          value={priceRange[1]}
          onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
        />
        <p>до {priceRange[1]} руб.</p>

        <h3>Статус</h3>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="all">Все</option>
          <option value="В наличии">В наличии</option>
          <option value="Нет в наличии">Нет в наличии</option>
        </select>
      </aside>

      <main className="mixers-main">
        <h1>Смесители</h1>
        <div className="product-grid">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
             <Card p={product}/>
            ))
          ) : (
            <p>Смесители по запросу "{searchTerm}" не найдены.</p>
          )}
        </div>
      </main>
    </div>
  );
}

export default Mixers;