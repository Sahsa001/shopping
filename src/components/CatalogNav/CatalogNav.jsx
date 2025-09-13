import React, { useEffect, useState } from "react";
import { useCart } from "../CartContext/CartContext";
import "./CatalogNav.css";
import Card from "../Card/Card";

function CatalogNav() {
  const [products, setProducts] = useState([]);
  const { cart, setCart } = useCart();
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [flippedCards, setFlippedCards] = useState({});

  useEffect(() => {
    fetch("https://68a2a8a1c5a31eb7bb1d67a6.mockapi.io/api/1/product")
      .then((res) => res.json())
      .then((data) => {
        const formatted = data[0].products.map((item) => ({
          id: item.id,
          name: item.name || "Без названия",
          article: item.article || "N/A",
          price: parseInt(item.price) || 0,
          inStock: item.inStock || "Нет в наличии",
          image: item.image || "https://picsum.photos/150",
          description: item.description || "Без описания",
          category: item.category || "Смесители",
          brand: item.brand || "DEMM",
        }));
        setProducts(formatted);
      });
  }, []);

  const addToCart = (product) => {
    setCart((prev) => {
      const exists = prev.find((p) => p.id === product.id);
      if (exists) {
        return prev.map((p) =>
          p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const toggleCategory = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const toggleBrand = (brand) => {
    setSelectedBrands((prev) =>
      prev.includes(brand)
        ? prev.filter((b) => b !== brand)
        : [...prev, brand]
    );
  };

  const toggleFlip = (id) => {
    setFlippedCards((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredProducts = products
    .filter((p) =>
      selectedCategories.length > 0 ? selectedCategories.includes(p.category) : true
    )
    .filter((p) =>
      selectedBrands.length > 0 ? selectedBrands.includes(p.brand) : true
    )
    .filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);

  return (
    <div className="catalog-container">
      <aside className="sidebar">
        <h3>Категории</h3>
        <ul>
          {["Смесители", "Душевые системы", "Лейки", "Аксессуары"].map((cat) => (
            <li key={cat}>
              <label>
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(cat)}
                  onChange={() => toggleCategory(cat)}
                />
                {cat}
              </label>
            </li>
          ))}
        </ul>

        <h3>Цена</h3>
        <input
          type="range"
          min="0"
          max="100000"
          step="1000"
          value={priceRange[1]}
          onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
        />
        <p>до {priceRange[1]} руб.</p>

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

      <main className="catalog-main">
        <h1>Каталог</h1>
        <div className="product-grid">
          {filteredProducts.map((product) => (
            <Card p={product} key={product.id} />
          ))}
        </div>
      </main>
    </div>
  );
}

export default CatalogNav;

