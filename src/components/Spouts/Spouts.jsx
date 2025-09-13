import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useCart } from "../CartContext/CartContext";
import "./Spouts.css";

function Spouts() {
  const [products, setProducts] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 2500]);
  const [flippedIds, setFlippedIds] = useState([]);

  const cartContext = useCart();
  const { cart, setCart } = cartContext || { cart: [], setCart: () => {} };
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get("search") || "";

  const initialProducts = [
    { id: 1, name: "Носик 1", article: "S-001", price: 1500, inStock: "В наличии",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9NtBrXaWcn0nzo68elq8cDcKWJwrcPCKn2g&s",
      description: "Стильный и прочный носик для душа.", brand: "ERYOS"},
    { id: 2, name: "Носик 2", article: "S-002", price: 1800, inStock: "В наличии",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-0JsZgnfyS9Bh1LSsxQc6whWDBz2k6WmR0A&s",
      description: "Элегантный носик для ванной.", brand: "JAGO"},
    { id: 3, name: "Носик 3", article: "S-003", price: 1200, inStock: "Нет в наличии",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfCyFWcvMMwTlQyEgWCngasd9n7lMyLxq9Tg&s",
      description: "Компактный и удобный носик.", brand: "ACIAR"},
    { id: 4, name: "Носик 4", article: "S-004", price: 2000, inStock: "В наличии",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIndzLdMjsKkpk_X9BZT_LKQyh4kZjZIpHwQ&s",
      description: "Стильный и прочный носик.", brand: "INOX"},
    { id: 5, name: "Носик 5", article: "S-005", price: 1400, inStock: "В наличии",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5_I5LaffOfoBy0QcNt7spKoSQj2KvcpV0Rg&s",
      description: "Простой и надежный носик.", brand: "ERYOS"},
    { id: 6, name: "Носик 6", article: "S-006", price: 2100, inStock: "Нет в наличии",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShbwwtSo-o8LFVYOso0gDkOPQk2UB7kbIazw&s",
      description: "Элегантный носик для душа.", brand: "JAGO"},
    { id: 7, name: "Носик 7", article: "S-007", price: 1750, inStock: "В наличии",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQS9HHVwo7ucz-nYaJIVoPu3SqkoQkm4aiqrA&s",
      description: "Прочный и удобный носик.", brand: "ACIAR"},
    { id: 8, name: "Носик 8", article: "S-008", price: 1950, inStock: "В наличии",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQL_086fe-Fid-XX4tDltGp_VYyJzkfwPFCg&s",
      description: "Элегантный носик для ванной.", brand: "INOX"},
    { id: 9, name: "Носик 9", article: "S-009", price: 1600, inStock: "Нет в наличии",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGO_K1PlcIm2yQmqcKYPZgP6TdHNgb8lgqTg&s",
      description: "Качественный и прочный носик.", brand: "ERYOS"},
    { id: 10, name: "Носик 10", article: "S-010", price: 2200, inStock: "В наличии",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShp6xOW2ZkUg0ofsTBd04IewwECBrqgtrH9g&s",
      description: "Стильный носик для душа.", brand: "JAGO"},
    { id: 11, name: "Носик 11", article: "S-011", price: 1900, inStock: "В наличии",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT43WOocS7zyI2nnFW9tddM-AA9UO6FmuIxQw&s",
      description: "Модный и прочный носик.", brand: "ACIAR"},
    { id: 12, name: "Носик 12", article: "S-012", price: 1250, inStock: "Нет в наличии",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVI2q5_Re38g-tCIuw0Yvmu6uGF6vR4TrZHA&s",
      description: "Компактный носик для ванной.", brand: "INOX"},
    { id: 13, name: "Носик 13", article: "S-013", price: 1550, inStock: "В наличии",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTn_ESCdds1SCk7mmAxXxGU1VcIs9ZSs2cSHg&s",
      description: "Стильный и надежный носик.", brand: "ERYOS"},
    { id: 14, name: "Носик 14", article: "S-014", price: 1700, inStock: "В наличии",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVxUobXuNes6OVM1OmMlFCkZkFoOTXtgHANQ&s",
      description: "Прочный носик для душа.", brand: "JAGO"},
    { id: 15, name: "Носик 15", article: "S-015", price: 1350, inStock: "Нет в наличии",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSNEhkpx5z2pzlALkqPLWXOsNqUJt3YBn_5A&s",
      description: "Компактный и удобный носик.", brand: "ACIAR"},
    { id: 16, name: "Носик 16", article: "S-016", price: 1850, inStock: "В наличии",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQd9TMLtpe-678cY7-a7qDPw8NQx4u5woQC9w&s",
      description: "Элегантный носик для ванной.", brand: "INOX"},
    { id: 17, name: "Носик 17", article: "S-017", price: 1600, inStock: "В наличии",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgmVqegEjUx4XiTxKa3eSEkDQbUafUYS3vow&s",
      description: "Качественный и прочный носик.", brand: "ERYOS"},
    { id: 18, name: "Носик 18", article: "S-018", price: 2000, inStock: "Нет в наличии",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0oDLHIiaiMowxw4MYlmKVJLTd5ysK6nH2eA&s",
      description: "Стильный носик для душа.", brand: "JAGO"},
    { id: 19, name: "Носик 19", article: "S-019", price: 1400, inStock: "В наличии",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjUT1FbLXYVvA7okoHXjqa6szxudMgvvQtjQ&s",
      description: "Прочный и надежный носик.", brand: "ACIAR"},
    { id: 20, name: "Носик 20", article: "S-020", price: 1950, inStock: "В наличии",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlZeknKeeKq7rpPzXCs-1-XFP9ltRv4Uop1A&s",
      description: "Модный носик для ванной.", brand: "INOX"},
    { id: 21, name: "Носик 21", article: "S-021", price: 1750, inStock: "В наличии",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlJ4kGugSUa6Da6qzJCouaFnaphE0ki60EOw&s",
      description: "Стильный носик для душа.", brand: "ERYOS"},
    { id: 22, name: "Носик 22", article: "S-022", price: 1800, inStock: "Нет в наличии",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxXRn0Tz1l8llIwfrAXAe0LuJaVOXLFvVhEA&s",
      description: "Прочный и надежный носик.", brand: "JAGO"},
    { id: 23, name: "Носик 23", article: "S-023", price: 1600, inStock: "В наличии",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7ApQoxtMsCHN96YQ2P64cAdRR1Si0ycc1Zg&s",
      description: "Компактный и удобный носик.", brand: "ACIAR"},
    { id: 24, name: "Носик 24", article: "S-024", price: 2100, inStock: "В наличии",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8etDMwQErVBKFybyVimWMjdXC9Vu8abHb9A&s",
      description: "Элегантный носик для душа.", brand: "INOX"},
    { id: 25, name: "Носик 25", article: "S-025", price: 1500, inStock: "Нет в наличии",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrDlp2FWQ-OYs8biLEGFKKqt62KtQZFCZ9Hg&s",
      description: "Прочный носик для ванной.", brand: "ERYOS"},
    { id: 26, name: "Носик 26", article: "S-026", price: 1850, inStock: "В наличии",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuA0pUE_9lC9NPDVu21WpUYvZf38RVbusSlw&s",
      description: "Элегантный носик для ванной.", brand: "JAGO"},
    { id: 27, name: "Носик 27", article: "S-027", price: 1700, inStock: "В наличии",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWCCcxxs-iMGukGijoJfD1hO6GT7EeI--iYg&s",
      description: "Стильный носик для душа.", brand: "ACIAR"},
    { id: 28, name: "Носик 28", article: "S-028", price: 2000, inStock: "Нет в наличии",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXT6bw_lFVr42UWGXIU9u0EVwL3quPVRED5w&s",
      description: "Прочный и надежный носик.", brand: "INOX"},
    { id: 29, name: "Носик 29", article: "S-029", price: 1550, inStock: "В наличии",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGWTlnWaJa04LS7aruVZrE8gqA-LE0EhzAZA&s",
      description: "Компактный носик для ванной.", brand: "ERYOS"},
    { id: 30, name: "Носик 30", article: "S-030", price: 2250, inStock: "В наличии",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-mdto4Zd9OWdHcRAfdCB5MX-RcYt2j6dLkg&s",
      description: "Модный и стильный носик.", brand: "JAGO"},
  ];

  useEffect(() => {
    setProducts(initialProducts);
  }, []);

  const addToCart = (product) => {
    setCart((prev) => {
      const exist = prev.find((p) => p.id === product.id);
      if (exist) return prev.map((p) => (p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p));
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const toggleBrand = (brand) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const toggleFlip = (id) => {
    setFlippedIds((prev) =>
      prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id]
    );
  };

  const filteredProducts = products
    .filter((p) => p.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter((p) => (selectedBrands.length > 0 ? selectedBrands.includes(p.brand) : true))
    .filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);

  return (
    <div className="spouts-container">
      <aside className="sidebar">
        <h3>Цена</h3>
        <input
          type="range"
          min="0"
          max="2500"
          step="50"
          value={priceRange[1]}
          onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
        />
        <p>до {priceRange[1].toLocaleString()} руб.</p>

        <h3>Бренды</h3>
        <ul>
          {["ERYOS", "JAGO", "ACIAR", "INOX"].map((b) => (
            <li key={b}>
              <label>
                <input
                  type="checkbox"
                  checked={selectedBrands.includes(b)}
                  onChange={() => toggleBrand(b)}
                />
                {b}
              </label>
            </li>
          ))}
        </ul>
      </aside>

      <main className="spouts-main">
        <h1>Носики для душа</h1>
        <div className="product-grid">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((p) => (
              <div key={p.id} className="product-card" onClick={() => toggleFlip(p.id)}>
                <div className={`flip-card-inner ${flippedIds.includes(p.id) ? "flipped" : ""}`}>
                  <div className="flip-card-front">
                    <img src={p.image} alt={p.name} onError={(e) => (e.target.src = "https://picsum.photos/150")} />
                    <h3>{p.name}</h3>
                    <p>Артикул: {p.article}</p>
                    <p className="price">{p.price.toLocaleString()} руб.</p>
                    <p className={p.inStock === "В наличии" ? "in-stock" : "out-stock"}>{p.inStock}</p>
                    <button
                      className="add-to-cart-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(p);
                      }}
                    >
                      Добавить в корзину
                    </button>
                  </div>
                  <div className="flip-card-back">
                    <h3>Описание</h3>
                    <p>{p.description}</p>
                    <p><strong>Бренд:</strong> {p.brand}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>Продукты по запросу "{searchTerm}" не найдены.</p>
          )}
        </div>
      </main>
    </div>
  );
}

export default Spouts;
