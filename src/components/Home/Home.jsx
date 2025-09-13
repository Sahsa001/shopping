import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; 
import "./Home.css";

import banner1 from "../../assets/banner.jpg";
import banner2 from "../../assets/banner2.jpg";
import banner3 from "../../assets/banner3.jpg";

function Home() {
  const images = [banner1, banner2, banner3];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="home">
      <div
        className="hero"
        style={{ backgroundImage: `url(${images[currentIndex]})` }}
      >
        <div className="hero-content">
          <Link to="/CatalogNav" className="catalog-link">
            Перейти в каталог &gt;
          </Link>
          <h1>
            Изысканные смесители <br /> для вашего интерьера
          </h1>
          <p className="hero-subtitle">
            Гарантируем высочайшую безопасность и надёжность <br />
            в соответствии с международными стандартами качества.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;