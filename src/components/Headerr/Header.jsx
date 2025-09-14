import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import poisk from "../../assets/poisk.png";
import logo from "../../assets/logo.png";
import cartLogo from "../../assets/cart-logo.png";
import promoIcon from "../../assets/promo-icon.png";
import { useCart } from "../CartContext/CartContext";
import products from "../../data/products"; // default export
import "./Header.css";

function Header() {
  const navigate = useNavigate();
  const { cart } = useCart() || { cart: [] }; // Қауіпсіздік үшін дефолт мән қосылды
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [user, setUser] = useState(null);
  const [accountOpen, setAccountOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // Mobile menu toggle

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  const handleSearch = (e) => {
    if ((e.type === "click") || (e.key === "Enter" && e.type === "keydown")) {
      if (searchTerm.trim() !== "") {
        const results = products.filter((product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setSearchResults(results);
      } else {
        setSearchResults([]);
      }
    }
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

  const handleNavLinkClick = () => {
    setMenuOpen(false); // Мобильдік менюні жабу
    setSearchResults([]); // Іздеу нәтижелерін тазарту
    setSearchTerm(""); // Іздеу өрісін тазарту
  };

  return (
    <header className="header">
      {/* HEADER TOP */}
      <div className="header-top">
        <nav className={`header-links ${menuOpen ? "open" : ""}`}>
          <NavLink to="/about" className="nav-link" onClick={handleNavLinkClick}>О компании</NavLink>
          <NavLink to="/delivery" className="nav-link" onClick={handleNavLinkClick}>Оплата и доставка</NavLink>
          <NavLink to="/stores" className="nav-link" onClick={handleNavLinkClick}>Магазины</NavLink>
          <NavLink to="/contacts" className="nav-link" onClick={handleNavLinkClick}>Контакты</NavLink>
        </nav>

        <div className="account-wrapper">
          <button className="account-btn" onClick={handleAccountClick}>
            {user ? `👤 ${user.name}` : "Личный кабинет"}
          </button>
          {accountOpen && user && (
            <div className="account-dropdown">
              <NavLink to="/account" className="dropdown-link" onClick={handleNavLinkClick}>Мой профиль</NavLink>
              <button onClick={handleLogout} className="dropdown-link logout-btn">Выйти</button>
            </div>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>
      </div>

      {/* HEADER MAIN */}
      <div className="header-main">
        <div className="logo">
          <NavLink to="/" onClick={handleNavLinkClick}><img src={logo} alt="Logo" /></NavLink>
        </div>

        <div className="search-wrapper">
          <input
            type="text"
            className="search-input"
            placeholder="Поиск по сайту..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleSearch} // Enter басқанда іздеу
          />
          <button className="search-btn" onClick={handleSearch}>
            <img src={poisk} alt="Поиск" />
          </button>

          {searchResults.length > 0 && (
            <div className="search-results">
              <ul>
                {searchResults.map((item) => (
                  <li key={item.id}>
                    <NavLink
                      to={`/${item.category.toLowerCase().replace(/ /g, "-")}`} // Категория URL-ға сәйкес реттелді
                      onClick={handleNavLinkClick}
                    >
                      <img src={item.image} alt={item.name} />
                      <span className="name">{item.name}</span>
                      <span className="price">{item.price} ₸</span>
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          )}
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

      {/* MAIN NAVIGATION */}
      <nav className={`main-nav ${menuOpen ? "open" : ""}`}>
        <NavLink to="/promotions" className="nav-item" onClick={handleNavLinkClick}>
          Акции <img src={promoIcon} alt="Promo" className="nav-icon" />
        </NavLink>
        <NavLink to="/mixers" className="nav-item" onClick={handleNavLinkClick}>Смесители</NavLink>
        <NavLink to="/shower-systems" className="nav-item" onClick={handleNavLinkClick}>Душевые системы</NavLink>
        <NavLink to="/shower-racks" className="nav-item" onClick={handleNavLinkClick}>Душевые стойки</NavLink>
        <NavLink to="/spouts" className="nav-item" onClick={handleNavLinkClick}>Изливы</NavLink>
        <NavLink to="/accessories" className="nav-item" onClick={handleNavLinkClick}>Аксессуары</NavLink>
      </nav>
    </header>
  );
}

export default Header;