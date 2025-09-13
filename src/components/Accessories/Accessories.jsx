import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useCart } from "../CartContext/CartContext";
import "./Accessories.css";

function Spouts() {
  const [products, setProducts] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [flippedIds, setFlippedIds] = useState([]);

  const cartContext = useCart();
  const { cart, setCart } = cartContext || { cart: [], setCart: () => {} };
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get("search") || "";

    const initialProducts = [
  { id: 1, name: "Излив 1", article: "S-001", price: 1500, inStock: "В наличии",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlmt1gvIG0cw11uRBa3gILK7dyex3fk0LYHw&s",
    description: "Качественный излив.", category: "Изливы", brand: "ERYOS"},
  { id: 2, name: "Излив 2", article: "S-002", price: 2500, inStock: "В наличии",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6aU2daY0npVFw3B3GwlglAaeM7VZdHxYnRw&s",
    description: "Стильный и прочный излив.", category: "Изливы", brand: "JAGO"},
  { id: 3, name: "Излив 3", article: "S-003", price: 1800, inStock: "Нет в наличии",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmDfhkc1V-J9Nb8KxBF2qkOEohsKwvA8TW6A&s",
    description: "Прочный излив для ванной.", category: "Изливы", brand: "ACIAR"},
  { id: 4, name: "Излив 4", article: "S-004", price: 2600, inStock: "В наличии",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT31K0OiDEksrs5W9lUScEjycM_Ut1hxajdKQ&s",
    description: "Элегантный излив.", category: "Изливы", brand: "INOX"},
  { id: 5, name: "Излив 5", article: "S-005", price: 2000, inStock: "В наличии",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSR8ASlh_41PJfBX5FvCXnHYmdzkqAw-QVAuw&s",
    description: "Компактный и удобный излив.", category: "Изливы", brand: "ERYOS"},
  { id: 6, name: "Излив 6", article: "S-006", price: 2200, inStock: "Нет в наличии",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-GzDjDr6srEUScUg-utV6_BVMiOi1bGdfhg&s",
    description: "Современный дизайн излива.", category: "Изливы", brand: "JAGO"},
  { id: 7, name: "Излив 7", article: "S-007", price: 1750, inStock: "В наличии",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9KSqgrAl7OZ572Orbh0P6YZfuqy0FK3mn_w&s",
    description: "Прочный и стильный излив.", category: "Изливы", brand: "ACIAR"},
  { id: 8, name: "Излив 8", article: "S-008", price: 2400, inStock: "В наличии",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrgjBS9r0dARPU04Dlh4B_G_lApEvJgvcZLg&s",
    description: "Элегантный излив для ванной.", category: "Изливы", brand: "INOX"},
  { id: 9, name: "Излив 9", article: "S-009", price: 2100, inStock: "Нет в наличии",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTO8uJPP-b-d9XgsTuxutAWIkGh6kw5Nvllg&s",
    description: "Качественный и надежный излив.", category: "Изливы", brand: "ERYOS"},
  { id: 10, name: "Излив 10", article: "S-010", price: 2300, inStock: "В наличии",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9aDe-tGspYGwqUNEbW6vcGmMF9hOrIWKh9w&s",
    description: "Простая и надежная конструкция.", category: "Изливы", brand: "JAGO"},
  { id: 11, name: "Излив 11", article: "S-011", price: 1950, inStock: "В наличии",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRg-lkkkYWxwuWY8uBKYeoXgKR_2MLOfpLwRQ&s",
    description: "Модный и прочный излив.", category: "Изливы", brand: "ACIAR"},
  { id: 12, name: "Излив 12", article: "S-012", price: 2250, inStock: "Нет в наличии",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzvsIzjvtMsGGLqY8Bkv4LzaZ2EMR2d3xu9A&s",
    description: "Качественный излив для ванной.", category: "Изливы", brand: "INOX"},
  { id: 13, name: "Излив 13", article: "S-013", price: 2100, inStock: "В наличии",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQp5a6Y4pZxxB9hbLAhsvdr72l5xlVuHgrB1g&s",
    description: "Элегантный дизайн.", category: "Изливы", brand: "ERYOS"},
  { id: 14, name: "Излив 14", article: "S-014", price: 2400, inStock: "В наличии",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKvagQrkPrfNpP-38BuZPDXVrqed754FuVzQ&s",
    description: "Прочный и стильный излив.", category: "Изливы", brand: "JAGO"},
  { id: 15, name: "Излив 15", article: "S-015", price: 1800, inStock: "Нет в наличии",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTz17VMGgrpvtekacKUg3tXSjyIZCG-VTWPaA&s",
    description: "Компактный и удобный.", category: "Изливы", brand: "ACIAR"},
  { id: 16, name: "Излив 16", article: "S-016", price: 2000, inStock: "В наличии",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRP8oXBD75rZa2Fttl73aHC31TyczgrMHp2bg&s",
    description: "Современный излив.", category: "Изливы", brand: "INOX"},
  { id: 17, name: "Излив 17", article: "S-017", price: 2250, inStock: "В наличии",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRccKeZHarjpmIoVUKLhIKxyqcEAa-b78ljXA&s",
    description: "Прочный и красивый.", category: "Изливы", brand: "ERYOS"},
  { id: 18, name: "Излив 18", article: "S-018", price: 2350, inStock: "Нет в наличии",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtzg4ESDyE3CG6S_t0QWrYWqaCtWV2vdYcHQ&s",
    description: "Элегантный и удобный.", category: "Изливы", brand: "JAGO"},
  { id: 19, name: "Излив 19", article: "S-019", price: 2100, inStock: "В наличии",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT96AJQOif3wavpYct_kUosZeRoqsACEY7jcw&s",
    description: "Качественный излив для ванной.", category: "Изливы", brand: "ACIAR"},
  { id: 20, name: "Излив 20", article: "S-020", price: 2500, inStock: "В наличии",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9JQG_SuY7dK8O6bCpqefnabBZt13vpfcGbQ&s",
    description: "Современный и стильный.", category: "Изливы", brand: "INOX"},
  { id: 21, name: "Излив 21", article: "S-021", price: 1800, inStock: "В наличии",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVXN69GriOelZdVPLDBZzpsR2j3JM7-SQx1Q&s",
    description: "Простой и надежный.", category: "Изливы", brand: "ERYOS"},
  { id: 22, name: "Излив 22", article: "S-022", price: 2200, inStock: "Нет в наличии",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5WRrAVKk_3LamBuFhyk6_11DS2NO8oYe9LQ&s",
    description: "Прочный и красивый излив.", category: "Изливы", brand: "JAGO"},
  { id: 23, name: "Излив 23", article: "S-023", price: 2400, inStock: "В наличии",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5WRrAVKk_3LamBuFhyk6_11DS2NO8oYe9LQ&s",
    description: "Элегантный дизайн.", category: "Изливы", brand: "ACIAR"},
  { id: 24, name: "Излив 24", article: "S-024", price: 2300, inStock: "В наличии",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5WRrAVKk_3LamBuFhyk6_11DS2NO8oYe9LQ&s",
    description: "Прочный и стильный излив.", category: "Изливы", brand: "INOX"},
  { id: 25, name: "Излив 25", article: "S-025", price: 1950, inStock: "Нет в наличии",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsj3vyI1MfOSbNSlp-Oheu1_QyYUpJukI-nA&s",
    description: "Качественный и удобный.", category: "Изливы", brand: "ERYOS"},
  { id: 26, name: "Излив 26", article: "S-026", price: 2100, inStock: "В наличии",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTO5_0TuwTz9ltszx5Dg3iPJ_WqsiiqYjMEqA&s",
    description: "Современный и надежный.", category: "Изливы", brand: "JAGO"},
  { id: 27, name: "Излив 27", article: "S-027", price: 2200, inStock: "В наличии",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTO5_0TuwTz9ltszx5Dg3iPJ_WqsiiqYjMEqA&s",
    description: "Простой и стильный излив.", category: "Изливы", brand: "ACIAR"},
  { id: 28, name: "Излив 28", article: "S-028", price: 2400, inStock: "Нет в наличии",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKpbyMzRwktIwL6UiJ8AGg19vbxHpp9OtgSA&s",
    description: "Элегантный и качественный.", category: "Изливы", brand: "INOX"},
  { id: 29, name: "Излив 29", article: "S-029", price: 2000, inStock: "В наличии",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNAoirKuPx_OEIn0H1WaNhtkDVoIkLtFl0yg&s",
    description: "Прочный и удобный излив.", category: "Изливы", brand: "ERYOS"},
  { id: 30, name: "Излив 30", article: "S-030", price: 2500, inStock: "В наличии",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUIry9irX6vQlF8KMRDF8JD3nZIOCmuIC1Zg&s",
    description: "Современный и стильный излив.", category: "Изливы", brand: "JAGO"},
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

      <main className="spouts-main">
        <h1>Изливы</h1>
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

export default Spouts;
