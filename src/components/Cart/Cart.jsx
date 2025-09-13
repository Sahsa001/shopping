// Cart.jsx
import React from "react";
import { useCart } from "../CartContext/CartContext";
import { useNavigate } from "react-router-dom";
import "./Cart.css";

function Cart() {
  const { cart, setCart } = useCart();
  const navigate = useNavigate();

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const increaseQuantity = (productId) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (productId) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const handleCheckout = () => {
    navigate("/delivery"); // доставка барагына өткөрөт
  };

  return (
    <div className="cart">
      <h2>Корзина</h2>
      {cart.length > 0 ? (
        <>
          {cart.map((item) => (
            <div key={item.id} className="cart-item">
              <img
                src={item.image}
                alt={item.name}
                className="cart-item-image"
              />
              <div className="cart-item-details">
                <h3>{item.name}</h3>
                <p>Артикул: {item.article}</p>
                <p>Цена: {item.price} руб.</p>
                <div className="quantity-controls">
                  <button
                    className="qty-btn"
                    onClick={() => decreaseQuantity(item.id)}
                  >
                    -
                  </button>
                  <span className="qty-number">{item.quantity}</span>
                  <button
                    className="qty-btn"
                    onClick={() => increaseQuantity(item.id)}
                  >
                    +
                  </button>
                </div>
                <p>Наличие: {item.inStock}</p>
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                className="remove-from-cart-btn"
              >
                Удалить
              </button>
            </div>
          ))}

          {/* Оформить заказ кнопкасы */}
          <div className="checkout-btn-wrapper">
            <button className="checkout-btn" onClick={handleCheckout}>
              Оформить заказ
            </button>
          </div>
        </>
      ) : (
        <p>Корзина пуста</p>
      )}
    </div>
  );
}

export default Cart;
