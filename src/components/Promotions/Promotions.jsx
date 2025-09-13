import { Link } from "react-router-dom";
import "./Promotions.css";

import bannerImg from "../../assets/bannerr.jpg";
import catSmesiteli from "../../assets/rac.jpg";
import catDushevye from "../../assets/dush.png";
import catDushevyeStoyki from "../../assets/stoc.png";
import catNiveli from "../../assets/izl.png";
import catAksessuary from "../../assets/acses.png";
import promo1 from "../../assets/skidd.jpg";
import promo2 from "../../assets/skidd2.jpg";
import promo3 from "../../assets/skidd3.jpg";
import companyImg from "../../assets/zav.png";

function Promotions() {
  return (
    <div className="promotions-page">
      <section className="banner">
        <img src={bannerImg} alt="Баннер" className="banner-img" />
        <div className="banner-text">
          <h1>Изысканные смесители для вашего интерьера</h1>
          <p>
            Подчеркните стиль вашей ванной комнаты с элегантными и надежными
            смесителями DEMM.
          </p>
          <Link to="/catalognav" className="btn">
            Каталог
          </Link>
        </div>
      </section>

      <section className="categories">
        <div className="cat-grid">
          <div className="grid-left">
            <div className="cat-card">
              <img src={catSmesiteli} alt="Смесители" />
              <div className="cat-overlay">
                <h3>Смесители</h3>
                <Link to="/mixers" className="btn-small">
                  Подробнее
                </Link>
              </div>
            </div>
            <div className="cat-card">
              <img src={catDushevye} alt="Душевые системы" />
              <div className="cat-overlay">
                <h3>Душевые системы</h3>
                <Link to="/shower-systems" className="btn-small">
                  Подробнее
                </Link>
              </div>
            </div>
            <div className="cat-card">
              <img src={catDushevyeStoyki} alt="Душевые стойки" />
              <div className="cat-overlay">
                <h3>Душевые стойки</h3>
                <Link to="/shower-racks" className="btn-small">
                  Подробнее
                </Link>
              </div>
            </div>
            <div className="cat-card">
              <img src={catNiveli} alt="Нивели" />
              <div className="cat-overlay">
                <h3>Нивели</h3>
                <Link to="/spouts" className="btn-small">
                  Подробнее
                </Link>
              </div>
            </div>
          </div>

          <div className="vertical-card">
            <img src={catAksessuary} alt="Аксессуары" />
            <div className="cat-overlay">
              <h3>Аксессуары</h3>
              <Link to="/accessories" className="btn-small">
                Подробнее
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="promotions">
        <h2>Актуальные акции</h2>
        <div className="promo-grid">
          {[
            {
              title: "Скидка 15%",
              desc: "Скидка 15% на коллекцию смесителей DEMM до конца месяца",
              img: promo1,
              id: "/mixers",
            },
            {
              title: "Осенняя распродажа",
              desc: "Специальные цены на душевые системы",
              img: promo2,
              id: "/shower-systems",
            },
            {
              title: "Акция выходного дня",
              desc: "Только в выходные уникальные предложения",
              img: promo3,
              id: "/accessories",
            },
          ].map((promo, idx) => (
            <div key={idx} className="promo-card">
              <img src={promo.img} alt={promo.title} />
              <div className="promo-content">
                <h3>{promo.title}</h3>
                <p>{promo.desc}</p>
                <Link to={`${promo.id}`} className="btn-small">
                  Подробнее
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- О компании --- */}
      <section className="company">
        <div className="company-content">
          <h2>О компании</h2>
          <p>
            Компания DEMM, созданная в Марселе, отличает высокий уровень качества
            продукции, который гарантирует надежность и долговечность.
          </p>
          <strong>
            Гарантирует высокую безопасность и надежность в соответствии с
            международными стандартами качества.
          </strong>
          <Link to="/about" className="btn">
            Подробнее
          </Link>
        </div>
        <img src={companyImg} alt="О компании" className="company-img" />
      </section>
    </div>
  );
}

export default Promotions;