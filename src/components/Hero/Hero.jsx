import React from "react";
import "./Hero.css";

function Hero() {
  return (
    <section className="hero">
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <a href="#catalog" className="catalog-link">Перейти в каталог ›</a>
        <h1>Изысканные смесители для вашего интерьера</h1>
        <p>
          Гарантируем высочайшую безопасность и надёжность<br />
          в соответствии с международными стандартами качества.
        </p>
      </div>
    </section>
  );
}

export default Hero;