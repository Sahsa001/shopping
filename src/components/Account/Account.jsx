import React, { useState } from "react";
import { useUser } from "../UserContext/UserContext";
import { useCart } from "../CartContext/CartContext";
import { useNavigate } from "react-router-dom";
import "./Account.css";

export default function Account() {
  const { user, setUser } = useUser();
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();

  const [profilePic, setProfilePic] = useState(null);

  const handleLogout = () => {
    setUser(null);
    navigate("/login");
  };

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePic(URL.createObjectURL(file));
    }
  };

  return (
    <div className="account-page">
      <h2>Личный кабинет</h2>

      <div className="profile-section">
        <div className="profile-pic">
          {profilePic ? (
            <img src={profilePic} alt="Profile" />
          ) : (
            <div className="placeholder">Добавить фото</div>
          )}
          <input type="file" accept="image/*" onChange={handleUpload} />
        </div>

        <div className="profile-info">
          <p><strong>Имя:</strong> {user?.name}</p>
          <p><strong>Email:</strong> {user?.email}</p>
        </div>
      </div>

      <h3>Ваши покупки:</h3>
      {cart.length === 0 ? (
        <p>Корзина пуста</p>
      ) : (
        <ul className="cart-list">
          {cart.map((item, i) => (
            <li key={i}>
              {item.name} — {item.quantity || 1} шт.
            </li>
          ))}
        </ul>
      )}

      <div className="account-buttons">
        <button onClick={handleLogout} className="logout-btn">
          Выйти
        </button>
        <button onClick={clearCart} className="clear-cart-btn">
          Очистить корзину
        </button>
      </div>
    </div>
  );
}
