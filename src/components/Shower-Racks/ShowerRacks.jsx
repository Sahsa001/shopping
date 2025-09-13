import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useCart } from "../CartContext/CartContext";
import "./ShowerRacks.css";

function ShowerRacks() {
  const [products, setProducts] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [flippedIds, setFlippedIds] = useState([]);

  const cartContext = useCart();
  const { cart, setCart } = cartContext || { cart: [], setCart: () => {} };
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get("search") || "";

  // --- массив продукттор 30 шт --- 
  const initialProducts = [
    { id: 1, name: "Полка для душа 1", article: "A-001", price: 12000, inStock: "В наличии",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRz1Ir3MJntZi7DMI5dakcjn6S3cpDPONdn2ZminGvc4-pGGrZk4XARDAs&s",
      description: "Качественная полка для душа.", category: "Полки для душа", brand: "ERYOS"},
    { id: 2, name: "Полка для душа 2", article: "A-002", price: 2300, inStock: "В наличии",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRa3vJxCPUNZOj7OGRQFCs8lHnt0SCQD5GtcTuEFuSDnVTe1ku2bcWhmy0&s",
      description: "Прочная и стильная полка.", category: "Полки для душа", brand: "JAGO"},
    { id: 3, name: "Полка для душа 3", article: "A-003", price: 1800, inStock: "Нет в наличии",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtrRQW9U_O5-cHUcsSNvp7jIjy6ea6rofZEQ2Gn5fygk-e9XnQY8pQYJs&s",
      description: "Полка с современным дизайном.", category: "Полки для душа", brand: "ACIAR"},
    { id: 4, name: "Полка для душа 4", article: "A-004", price: 2500, inStock: "В наличии",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrwYcqzBhr5Z_XKth0p5HJDWEIdYXh1r3-rHvgYo7W_LKuhOVx0Jgjj1g&s",
      description: "Элегантная полка для ванной.", category: "Полки для душа", brand: "INOX"},
    { id: 5, name: "Полка для душа 5", article: "A-005", price: 1950, inStock: "В наличии",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2C0gGhcSSeC-WxkFp6n4fGN8fT2PCswRbXYwhjGXhwZXNNJKfwQdAgWI&s",
      description: "Прочная и надежная полка.", category: "Полки для душа", brand: "ERYOS"},
    { id: 6, name: "Полка для душа 6", article: "A-006", price: 2100, inStock: "Нет в наличии",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9WMDXtXONDHwioq0QwR94iSuJh3wZ8xZrLnuH8acDNDNSZR5wxM5WFqI&s",
      description: "Стильная полка для душа.", category: "Полки для душа", brand: "JAGO"},
    { id: 7, name: "Полка для душа 7", article: "A-007", price: 1750, inStock: "В наличии",
      image: "https://ir-3.ozone.ru/s3/multimedia-f/c1000/6480618987.jpg",
      description: "Компактная полка для ванной.", category: "Полки для душа", brand: "ACIAR"},
    { id: 8, name: "Полка для душа 8", article: "A-008", price: 2400, inStock: "В наличии",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-as85lcby8kKJsZr4TtsHM1T_X0j5Vf5Opg&s",
      description: "Классическая полка для душа.", category: "Полки для душа", brand: "INOX"},
    { id: 9, name: "Полка для душа 9", article: "A-009", price: 2000, inStock: "Нет в наличии",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWPD3WT0VsSDdPpJv-D2sn1bzBPhtJvMuqrw&s",
      description: "Удобная и практичная полка.", category: "Полки для душа", brand: "ERYOS"},
    { id: 10, name: "Полка для душа 10", article: "A-010", price: 2200, inStock: "В наличии",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtl9SZH5XYl12296oFFi8RI375zCcuUI4V5g&s",
      description: "Простая и надежная полка.", category: "Полки для душа", brand: "JAGO"},
    { id: 11, name: "Полка для душа 11", article: "A-011", price: 1900, inStock: "В наличии",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSfPrKQoI06ZJYrSamHN2ZSR_OscJTZbjv6Q&s",
      description: "Элегантная полка для ванной комнаты.", category: "Полки для душа", brand: "ACIAR"},
    { id: 12, name: "Полка для душа 12", article: "A-012", price: 2100, inStock: "Нет в наличии",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJ7iE3T3m5Ht7OaDb7MDPvvl5UezMkzGxIdw&s",
      description: "Простая и практичная полка.", category: "Полки для душа", brand: "INOX"},
    { id: 13, name: "Полка для душа 13", article: "A-013", price: 2300, inStock: "В наличии",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0FuZzv0BjdAyIsC2Hy1GCUWD5ZgH0dIIkTg&s",
      description: "Модная и стильная полка.", category: "Полки для душа", brand: "ERYOS"},
    { id: 14, name: "Полка для душа 14", article: "A-014", price: 1800, inStock: "В наличии",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjWwlSkz_yS_XQWdFtYj_3DJHmxtSBb-nVTg&s",
      description: "Компактная и удобная полка.", category: "Полки для душа", brand: "JAGO"},
    { id: 15, name: "Полка для душа 15", article: "A-015", price: 1950, inStock: "Нет в наличии",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQr7OUIu2v-eGCRz0douxMOjv9GrpzqtNRVyw&s",
      description: "Стильная полка для душа.", category: "Полки для душа", brand: "ACIAR"},
    { id: 16, name: "Полка для душа 16", article: "A-016", price: 2250, inStock: "В наличии",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0FuZzv0BjdAyIsC2Hy1GCUWD5ZgH0dIIkTg&s",
      description: "Качественная и надежная полка.", category: "Полки для душа", brand: "INOX"},
    { id: 17, name: "Полка для душа 17", article: "A-017", price: 2100, inStock: "В наличии",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1o0dVFTsQQkeJJNG2sdrtfUkXWZVNxwgHjA&s",
      description: "Простая и элегантная полка.", category: "Полки для душа", brand: "ERYOS"},
    { id: 18, name: "Полка для душа 18", article: "A-018", price: 2000, inStock: "Нет в наличии",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWGRP270MHPHMnGQNru3RbMXuXc-C6mDkneQ&s",
      description: "Удобная полка для ванной.", category: "Полки для душа", brand: "JAGO"},
    { id: 19, name: "Полка для душа 19", article: "A-019", price: 2150, inStock: "В наличии",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2MNSlv3HRjBRyp-3bJt6ajc5IsTClYZMwdQ&s",
      description: "Стильная и прочная полка.", category: "Полки для душа", brand: "ACIAR"},
    { id: 20, name: "Полка для душа 20", article: "A-020", price: 2250, inStock: "В наличии",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStv4AJNP4kZ6PtQF2CdTDRb7o99ytu9qh2RQ&s",
      description: "Элегантная полка для душа.", category: "Полки для душа", brand: "INOX"},
    { id: 21, name: "Полка для душа 21", article: "A-021", price: 1950, inStock: "Нет в наличии",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ08na1OUNCG0tS-5dc_bLXLejGj32LPthuLw&s",
      description: "Компактная и удобная полка.", category: "Полки для душа", brand: "ERYOS"},
    { id: 22, name: "Полка для душа 22", article: "A-022", price: 2200, inStock: "В наличии",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2XTMDsjaHpIZiuhJRV7EcXTmBLOImW5JMIQ&s",
      description: "Стильная и прочная полка.", category: "Полки для душа", brand: "JAGO"},
    { id: 23, name: "Полка для душа 23", article: "A-023", price: 1800, inStock: "В наличии",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfeG5uVkuP80Z60GXIDNVakq0ZmPQLMKitTg&s",
      description: "Простая и надежная полка.", category: "Полки для душа", brand: "ACIAR"},
    { id: 24, name: "Полка для душа 24", article: "A-024", price: 2400, inStock: "Нет в наличии",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0WeMC6eWXmFjz6ZBYFZ7IXCByvRwPmYYPrg&s",
      description: "Элегантная полка для ванной.", category: "Полки для душа", brand: "INOX"},
    { id: 25, name: "Полка для душа 25", article: "A-025", price: 2000, inStock: "В наличии",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR314xi6IvRGD999mWgRCL1vokc4OP93WXq8Q&s",
      description: "Качественная и прочная полка.", category: "Полки для душа", brand: "ERYOS"},
    { id: 26, name: "Полка для душа 26", article: "A-026", price: 2100, inStock: "В наличии",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSemmuylZ6ImxcbcButh32X8JM2YYF6zRlNdQ&s",
      description: "Стильная полка для душа.", category: "Полки для душа", brand: "JAGO"},
    { id: 27, name: "Полка для душа 27", article: "A-027", price: 2300, inStock: "Нет в наличии",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT--cq5vYgneWoosmDehob--s610GqKXlt9Og&s",
      description: "Прочная и удобная полка.", category: "Полки для душа", brand: "ACIAR"},
    { id: 28, name: "Полка для душа 28", article: "A-028", price: 1900, inStock: "В наличии",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwFrnV53JQOPSye3osjLe_fZA9qz4TNX5IjA&s",
      description: "Элегантная полка для душа.", category: "Полки для душа", brand: "INOX"},
    { id: 29, name: "Полка для душа 29", article: "A-029", price: 2250, inStock: "В наличии",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSh4gDtAPvXnG-kb26oc2qwj2IThRddy-fxSw&s",
      description: "Компактная и удобная полка.", category: "Полки для душа", brand: "ERYOS"},
    { id: 30, name: "Полка для душа 30", article: "A-030", price: 2350, inStock: "Нет в наличии",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT63PtErCX_GmWrWvC_sGTUYe3bV_WeHAB2gw&s",
      description: "Прочная и стильная полка.", category: "Полки для душа", brand: "JAGO"},
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
    <div className="shower-racks-container">
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

      <main className="shower-racks-main">
        <h1>Полки для душа</h1>
        <div className="product-grid">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((p) => (
              <div key={p.id} className="product-card" onClick={() => toggleFlip(p.id)}>
                <div className={`flip-card-inner ${flippedIds.includes(p.id) ? "flipped" : ""}`}>
                  <div className="flip-card-front">
                    <img
                      src={p.image}
                      alt={p.name}
                      onError={(e) => (e.target.src = "https://picsum.photos/150")}
                    />
                    <h3>{p.name}</h3>
                    <p>Артикул: {p.article}</p>
                    <p className="price">{p.price.toLocaleString()} руб.</p>
                    <p className={p.inStock === "В наличии" ? "in-stock" : "out-stock"}>
                      {p.inStock}
                    </p>
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
                    <p>
                      <strong>Категория:</strong> {p.category}
                    </p>
                    <p>
                      <strong>Бренд:</strong> {p.brand}
                    </p>
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

export default ShowerRacks;
