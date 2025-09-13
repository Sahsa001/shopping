import React, { useState, useEffect } from "react";
import "./Stores.css";

const storesData = [
  {
    id: 1,
    name: "DEMM Магазин 1",
    location: "г. Бишкек, проспект Чуй 101",
    open: 9,
    close: 22,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRloiDjIcVN8eKdQ868_mKxQK0ugXUnxiJhlQ&s",
    gallery: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9TIydXiP6xkuiJ-L9aVc4HymJlkw0DvwwZg&s",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-TqOCKikIxgKiuxXedsq30ZyCCyav49qrwA&s",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKeuk7iLfOt3GzPlaoYtz1Oi0kKefncrWgoA&s",
    ],
    reviews: [],
  },
  {
    id: 2,
    name: "DEMM Магазин 2",
    location: "г. Бишкек, ул. Московская 12",
    open: 10,
    close: 20,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIMRG6VeQQ5GB0myz4QMo9VrxoDDJTJQynhA&s",
    gallery: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZulnA5UVlHz7JnjlMexEmZJRIvl7gZwZJLw&s",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0fqpxVSXZeWftlR6bSX5dfjR4aYfimew_Tg&s",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAflNn9ikEDN9II5tvJMCwn3iM7fEtKKKw2Q&s",
    ],
    reviews: [],
  },
  {
    id: 3,
    name: "DEMM Магазин 3",
    location: "г. Бишкек, ул. Абдрахманова 45",
    open: 8,
    close: 21,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyEYWXcNR3cMZxBr9Ck8PJab_lgQXoH4s6YQ&s",
    gallery: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKerMRaW6vsOdVkBrM4nrRXsgoy1KdW3Dn1A&s",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFQYl5uiNrgi8VS1Or9utxfKJRVibjVwgI5g&s",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8z15y6SidB4ZsHYr_MPOmO_MbC5yL0z5aBQ&s",
    ],
    reviews: [],
  },
  {
    id: 4,
    name: "DEMM Магазин 4",
    location: "г. Бишкек, ул. Токтогула 78",
    open: 9,
    close: 22,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQYAofup7QTZckFsWuRfEvVwkA0NDBs8dNyA&s",
    gallery: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTC1xnR-_KbjxuzDC_aqd1HWcscC1zt_WfleA&s",
      "https://teploresurs72.ru/upload/resize_cache/iblock/9af/800_700_10af9c9c73da77234092a237357b6d8c8/9af479c5accb89b8d7d552f0d8f4a833.JPG",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREpHQyD00nV5bmuXdQR2IlkDRwNE0SwEAxbg&s",
    ],
    reviews: [],
  },
  {
    id: 5,
    name: "DEMM Магазин 5",
    location: "г. Бишкек, ул. Панфилова 22",
    open: 10,
    close: 20,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAkLTk7-uhzgic941O2ksi7g3N6EAn02dG-w&s",
    gallery: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSITUbR0S0-MSlj0T4JBKVMoyzk3FZ0tOutbA&s",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPSdoQaMq2k3gBdaRqToo2LVba07RHOX9ixw&s",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiQJNvRijwZHFSswiuhEBZj45hFBDaxHK2ng&s",
    ],
    reviews: [],
  },
  {
    id: 6,
    name: "DEMM Магазин 6",
    location: "г. Бишкек, ул. Чокморова 33",
    open: 9,
    close: 21,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhDDGtXe9lcExqXGirEWrXKSOmGYppwds0sQ&s",
    gallery: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrjoSogTIw0ioKkGyoOmb-gsAuDmfWHLDTJA&s",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyawbZ6Al_HAroAC3SCVcRdlaMHb6SSXYh7A&s",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_ZsErJtZyeUA8OEmPYnvx-BN6WD814LlO9sIaiKFdLM-nJpki9Ivd0n1Gv4NsHEO_hQM&usqp=CAU",
    ],
    reviews: [],
  },
  {
    id: 7,
    name: "DEMM Магазин 7",
    location: "г. Бишкек, ул. Логвиненко 11",
    open: 8,
    close: 20,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZGo_njXCr_zGPyGfU4I4Jbc66pDrGqIsqMw&s",
    gallery: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVZrQBgX9kl_l6hjwWAAyTTM5UevYIFV715KNKav6RGx230QvSpyZLhtoeb9l3cH133vY&usqp=CAU",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzULVcfYckF5uLaqFNkHmTyfO899US2-VOuQ&s",
      "https://images.fooby.ru/1/64/88/3193612",
    ],
    reviews: [],
  },
  {
    id: 8,
    name: "DEMM Магазин 8",
    location: "г. Бишкек, ул. Ахунбаева 99",
    open: 9,
    close: 22,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFms9rRhbsSutVp-k6mNBuvi2NQgR1LylbJA&s",
    gallery: [
      "https://fd8f3b0d-a4a5-424f-9d57-1156ad7104f7.selcdn.net/uploads/images/135343/large_3_large3.jpg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSITUbR0S0-MSlj0T4JBKVMoyzk3FZ0tOutbA&s",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPSdoQaMq2k3gBdaRqToo2LVba07RHOX9ixw&s",
    ],
    reviews: [],
  },
];

export default function Store() {
  const [currentHour, setCurrentHour] = useState(new Date().getHours());
  const [currentMinute, setCurrentMinute] = useState(new Date().getMinutes());
  const [stores, setStores] = useState(storesData);
  const [reviewInput, setReviewInput] = useState({});

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setCurrentHour(now.getHours());
      setCurrentMinute(now.getMinutes());
    }, 1000 * 60);

    return () => clearInterval(interval);
  }, []);

  const handleRating = (storeId, rating) => {
    setStores((prevStores) =>
      prevStores.map((store) =>
        store.id === storeId ? { ...store, rating } : store
      )
    );
  };

  const handleReviewChange = (storeId, value) => {
    setReviewInput((prev) => ({ ...prev, [storeId]: value }));
  };

  const handleReviewSubmit = (storeId) => {
    const text = reviewInput[storeId];
    if (!text) return;
    setStores((prevStores) =>
      prevStores.map((store) =>
        store.id === storeId
          ? { ...store, reviews: [...store.reviews, text] }
          : store
      )
    );
    setReviewInput((prev) => ({ ...prev, [storeId]: "" }));
  };

  return (
    <div className="store-container">
      <h1 className="store-title"> DEMM Смесители - Бишкек</h1>
      <p className="time-now">
        Текущее время: {currentHour}:{currentMinute.toString().padStart(2, "0")}
      </p>

      <div className="store-grid">
        {stores.map((store) => {
          const isOpen = currentHour >= store.open && currentHour < store.close;

          return (
            <div key={store.id} className="store-card">
              <img src={store.image} alt={store.name} className="store-image" />
              <div className="store-info">
                <h2 className="store-name">{store.name}</h2>
                <p className="store-location">📍 {store.location}</p>
                <p className="store-time">
                  ⏰ {store.open}:00 – {store.close}:00
                </p>
                <p className={`store-status ${isOpen ? "open" : "closed"}`}>
                  {isOpen ? "Открыто ✅" : "Закрыто ❌"}
                </p>

                <div className="store-rating">
                  <span>Оцените магазин: </span>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className={`star ${store.rating >= star ? "filled" : ""}`}
                      onClick={() => handleRating(store.id, star)}
                    >
                      ★
                    </span>
                  ))}
                </div>
                {store.rating && (
                  <p className="rating-text">Ваша оценка: {store.rating} ⭐</p>
                )}

                <div className="store-gallery">
                  {store.gallery.map((img, idx) => (
                    <img key={idx} src={img} alt={`gallery-${idx}`} />
                  ))}
                </div>

                {/* Отзывы */}
                <div className="store-reviews">
                  <h4>Отзывы покупателей:</h4>
                  {store.reviews.length === 0 ? (
                    <p>Пока нет отзывов.</p>
                  ) : (
                    <ul>
                      {store.reviews.map((rev, i) => (
                        <li key={i}>💬 {rev}</li>
                      ))}
                    </ul>
                  )}
                  <textarea
                    placeholder="Оставьте отзыв..."
                    value={reviewInput[store.id] || ""}
                    onChange={(e) =>
                      handleReviewChange(store.id, e.target.value)
                    }
                  />
                  <button onClick={() => handleReviewSubmit(store.id)}>
                    Отправить
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
