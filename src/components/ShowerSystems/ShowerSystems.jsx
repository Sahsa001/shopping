import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import "./ShowerSystems.css";
import { useCart } from "../CartContext/CartContext";
import Card from "../Card/Card";

function ShowerSystems() {
  const [products, setProducts] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [selectedProduct, setSelectedProduct] = useState(null); // Попап үшін

  const cartContext = useCart();
  const { cart, setCart } = cartContext || { cart: [], setCart: () => {} };
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get("search") || "";

  useEffect(() => {
    fetch("https://68a2a8a1c5a31eb7bb1d67a6.mockapi.io/api/1/showerSystem")
      .then((response) => {
        if (!response.ok) throw new Error(`Сетевой запрос не удался: ${response.status}`);
        return response.json();
      })
      .then((data) => {
        const rawProducts = Array.isArray(data)
          ? data[0]?.products || data
          : data.products || [];

        const formattedProducts = rawProducts
          .map((item) => ({
            id: item.id,
            name: item.name || "Без названия",
            article: item.article || "N/A",
            price: parseInt(item.price.replace(/[^\d]/g, '')) || 0,
            inStock: item.inStock || "Нет в наличии",
            image: item.image || "https://picsum.photos/150",
            description: item.description || "Без описания",
            category: item.category || "Душевые системы",
            brand: item.brand || "DEMM",
          }))
          .filter((product) => product.category === "Душевые системы");

        setProducts(formattedProducts);
      })
      .catch((error) => console.error("Ошибка при загрузке данных:", error));
  }, []);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);
      if (existing) {
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

  const filteredProducts = products
    .filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((product) =>
      selectedBrands.length > 0 ? selectedBrands.includes(product.brand) : true
    )
    .filter(
      (product) => product.price >= priceRange[0] && product.price <= priceRange[1]
    );

  return (
    <div className="shower-systems-container">
      {/* Фильтр панель */}
      <aside className="sidebar">
        <h3>Цена</h3>
        <input
          type="range"
          min="0"
          max="100000"
          step="1000"
          value={priceRange[1]}
          onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
        />
        <p>до {priceRange[1].toLocaleString()} руб.</p>

        <h3>Бренды</h3>
        <ul>
          {["DEMM", "Grohe", "Hansgrohe"].map((brand) => (
            <li key={brand}>
              <label>
                <input
                  type="checkbox"
                  checked={selectedBrands.includes(brand)}
                  onChange={() => toggleBrand(brand)}
                />
                {brand}
              </label>
            </li>
          ))}
        </ul>
      </aside>

      {/* Продукты */}
      <main className="shower-systems-main">
        <h1>Душевые системы</h1>
        <div className="product-grid">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <Card p={product} />
            ))
          ) : (
            <p>Продукты по запросу "{searchTerm}" не найдены.</p>
          )}
        </div>

        {selectedProduct && (
          <div className="product-popup" onClick={() => setSelectedProduct(null)}>
            <div className="popup-content" onClick={(e) => e.stopPropagation()}>
              <h2>{selectedProduct.name}</h2>
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="popup-image"
                onError={(e) => (e.target.src = "https://picsum.photos/150")}
              />
              <p><strong>Артикул:</strong> {selectedProduct.article}</p>
              <p><strong>Цена:</strong> {selectedProduct.price.toLocaleString()} руб.</p>
              <p><strong>Статус:</strong> {selectedProduct.inStock}</p>
              <p><strong>Описание:</strong> {selectedProduct.description}</p>
              <p><strong>Бренд:</strong> {selectedProduct.brand}</p>
              <p><strong>Категория:</strong> {selectedProduct.category}</p>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  addToCart(selectedProduct);
                  setSelectedProduct(null);
                }}
                className="add-to-cart-btn popup-btn"
              >
                В корзину
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedProduct(null);
                }}
                className="close-btn"
              >
                Закрыть
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default ShowerSystems;