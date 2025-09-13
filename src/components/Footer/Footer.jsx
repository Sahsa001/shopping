import React from "react";
import { NavLink } from "react-router-dom";
import "./Footer.css";
import logo from "../../assets/logo.png";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Сол жак */}
        <div className="footer-left">
          <img src={logo} alt="Logo" className="footer-logo" />
          <a href="https://wa.me/+996220087452" className="whatsapp-btn">
            Написать в WhatsApp
          </a>
        </div>

        {/* Орто */}
        <div className="footer-links">
          <div className="footer-column">
            <h4>Каталог</h4>
            <NavLink to="/mixers">Смесители</NavLink>
            <NavLink to="/showers">Душевые системы</NavLink>
            <NavLink to="/shower-racks">Душевые стойки</NavLink>
            <NavLink to="/spouts">Изливы</NavLink>
            <NavLink to="/accessories">Аксессуары</NavLink>
          </div>
          <div className="footer-column">
            <h4>Для клиента</h4>
            <NavLink to="/promotions">Акции</NavLink>
            <NavLink to="/about">О компании</NavLink>
            <NavLink to="/delivery">Оплата и доставка</NavLink>
            <NavLink to="/stores">Магазины</NavLink>
            <NavLink to="/contacts">Контакты</NavLink>
          </div>
        </div>

        {/* Оң жак */}
        <div className="footer-right">
          <p className="footer-news">
            Узнавайте об акциях и новостях первыми, подпишитесь на рассылку
          </p>
          <form className="subscribe" onSubmit={(e)=>{e.preventDefault(); alert('Спасибо за подписку!')}}>
            <input type="email" placeholder="Электронная почта" required />
            <button type="submit">Подписаться →</button>
          </form>
          <p className="footer-phone">+996 220 087 452</p>
          <p className="footer-address">г. Бишкек, улица, дом, офис</p>
        </div>
      </div>

      {/* Төмөн */}
      <div className="footer-bottom">
        <p>© DEMM RUBINETTERIA 2023</p>
        <div className="footer-policy">
          <NavLink to="/offer">Договор оферты</NavLink>
          <NavLink to="/policy">Пользовательское соглашение</NavLink>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
