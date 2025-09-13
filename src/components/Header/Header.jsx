import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import poisk from "../../assets/poisk.png";
import logo from "../../assets/logo.png";
import cartLogo from "../../assets/cart-logo.png";
import promoIcon from "../../assets/promo-icon.png";
import { useCart } from "../CartContext/CartContext";
import "./Header.css";

function Header() {
  const navigate = useNavigate();
  const { cart } = useCart();
  const [searchTerm, setSearchTerm] = useState("");
  const [user, setUser] = useState(null);
  const [accountOpen, setAccountOpen] = useState(false);

  const categories = [
    { name: "смесители", path: "/mixers" },
    { name: "душевые системы", path: "/shower-systems" },
    { name: "душевые стойки", path: "/shower-racks" },
    { name: "изливы", path: "/spouts" },
    { name: "аксессуары", path: "/accessories" },
  ];

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  const handleSearch = () => {
    if (!searchTerm.trim()) return;

    const term = searchTerm.toLowerCase();
    const category = categories.find((cat) =>
      term.includes(cat.name.toLowerCase())
    );

    if (category) {
      navigate(`${category.path}?search=${encodeURIComponent(searchTerm)}`);
    } else {
      // Если категория не найдена, ищем среди всех товаров на Mixers
      navigate(`/mixers?search=${encodeURIComponent(searchTerm)}`);
    }

    setSearchTerm("");
  };

  const handleAccountClick = () => {
    if (user) setAccountOpen(!accountOpen);
    else navigate("/login");
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setAccountOpen(false);
    navigate("/");
  };

  const handleCallClick = () => {
    const phoneNumber = "+996220087452";
    const message = encodeURIComponent("Здравствуйте! Хочу заказать звонок.");
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
  };

  const handleCartClick = () => navigate("/cart");

  return (
    <header className="header">
      <div className="header-top">
        <nav className="header-links">
          <NavLink to="/about" className="nav-link">О компании</NavLink>
          <NavLink to="/delivery" className="nav-link">Оплата и доставка</NavLink>
          <NavLink to="/stores" className="nav-link">Магазины</NavLink>
          <NavLink to="/contacts" className="nav-link">Контакты</NavLink>
        </nav>

        <div className="account-wrapper">
          <button className="account-btn" onClick={handleAccountClick}>
            {user ? `👤 ${user.name}` : "Личный кабинет"}
          </button>

          {accountOpen && user && (
            <div className="account-dropdown">
              <NavLink to="/account" className="dropdown-link">Мой профиль</NavLink>
              <button onClick={handleLogout} className="dropdown-link logout-btn">Выйти</button>
            </div>
          )}
        </div>
      </div>

      <div className="header-main">
        <div className="logo">
          <NavLink to="/"><img src={logo} alt="Logo" /></NavLink>
        </div>

        {/* Поиск */}
        <div className="search-wrapper">
          <input
            type="text"
            className="search-input"
            placeholder="Поиск по сайту..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") handleSearch(); }}
          />
          <button className="search-btn" onClick={handleSearch}>
            <img src={poisk} alt="Поиск" />
          </button>
        </div>

        <div className="header-actions">
          <div className="phone-block">
            <a href="tel:+996220087452" className="phone-link">+996 220 087 452</a>
            <span className="time-info">Звоните с 8:10 до 18:10</span>
          </div>
          <button className="call-btn" onClick={handleCallClick}>Заказать звонок</button>

          <div className="cart-btn-wrapper">
            <button className="cart-btn" onClick={handleCartClick}>
              <img src={cartLogo} alt="Корзина" />
              {cart.length > 0 && <span className="cart-count">{cart.length}</span>}
            </button>
          </div>
        </div>
      </div>

      <nav className="main-nav sticky-nav">
        <NavLink to="/promotions" className="nav-item active">
          Акции <img src={promoIcon} alt="Promo" className="nav-icon" />
        </NavLink>
        <NavLink to="/mixers" className="nav-item">Смесители</NavLink>
        <NavLink to="/shower-systems" className="nav-item">Душевые системы</NavLink>
        <NavLink to="/shower-racks" className="nav-item">Душевые стойки</NavLink>
        <NavLink to="/spouts" className="nav-item">Изливы</NavLink>
        <NavLink to="/accessories" className="nav-item">Аксессуары</NavLink>
      </nav>
    </header>
  );
}

export default Header;
