import React, { useState } from 'react'
import "./Card.css"
import { useCart } from '../CartContext/CartContext';

export default function Card({
    p
}) {
      const cartContext = useCart();
    const { cart, setCart } = cartContext || { cart: [], setCart: () => { } };
    const [flippedIds, setFlippedIds] = useState([]);
    const toggleFlip = (id) => {
        setFlippedIds((prev) =>
            prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id]
        );
    };
    const addToCart = (product) => {
        setCart((prev) => {
            const exist = prev.find((p) => p.id === product.id);
            if (exist) return prev.map((p) => (p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p));
            return [...prev, { ...product, quantity: 1 }];
        });
    };

    return (
        <div className="product-card" onClick={() => toggleFlip(p.id)}>
            <div className={`flip-card-inner ${flippedIds.includes(p.id) ? "flipped" : ""}`}>
                <div className="flip-card-front">
                    <img
                        src={p.image}
                        alt={p.name}
                        onError={(e) => (e.target.src = "https://picsum.photos/150")}
                        className="product-image"
                    />
                    <h3 className='product-name'>{p.name}</h3>
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
    )
}
