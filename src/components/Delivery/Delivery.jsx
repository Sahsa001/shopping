import React, { useState } from "react";
import { useCart } from "../CartContext/CartContext";
import "./Delivery.css";

export default function Delivery() {
  const { cart, clearCart } = useCart();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [house, setHouse] = useState("");
  const [apartment, setApartment] = useState("");
  const [comment, setComment] = useState("");
  const [agree, setAgree] = useState(false);

  const [paymentMethod, setPaymentMethod] = useState("cash"); // cash | card | mbank
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCVC, setCardCVC] = useState("");
  const [mbankLogin, setMbankLogin] = useState("");
  const [mbankPassword, setMbankPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!agree) {
      alert("Пожалуйста, согласитесь с Политикой конфиденциальности.");
      return;
    }

    if (cart.length === 0) {
      alert("Корзина бош!");
      return;
    }

    const orderItems = cart
      .map(
        (item, index) =>
          `${index + 1}) ${item.name} — ${item.quantity} шт. (${item.price} сом)`
      )
      .join("\n");

    let paymentInfo = "";
    if (paymentMethod === "cash") {
      paymentInfo = "💵 Наличные при получении";
    } else if (paymentMethod === "card") {
      paymentInfo = `💳 Карта: ${cardNumber}, срок: ${cardExpiry}`;
    } else if (paymentMethod === "mbank") {
      paymentInfo = `📱 М-Банк (логин: ${mbankLogin})`;
    }

    const message = `
🛒 Жаңы заказ:
👤 Аты: ${name}
📞 Телефон: ${phone}
🏠 Адрес: ${city}, ул.${street}, дом ${house}, кв/офис ${apartment}
📝 Комментарий: ${comment || "—"}

📦 Товарлар:
${orderItems}

💰 Төлөө: ${paymentInfo}
⏰ Убакыт: ${new Date().toLocaleString()}
    `;

    const phoneNumber = "996220087452"; // сенин номерди кой
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;

    window.open(whatsappURL, "_blank");

    clearCart();

    setName("");
    setPhone("");
    setCity("");
    setStreet("");
    setHouse("");
    setApartment("");
    setComment("");
    setAgree(false);
    setPaymentMethod("cash");
    setCardNumber("");
    setCardExpiry("");
    setCardCVC("");
    setMbankLogin("");
    setMbankPassword("");
  };

  return (
    <div className="delivery-page">
      <div className="delivery-form-container">
        <h2>Оформить заказ</h2>

        <form onSubmit={handleSubmit} className="delivery-form">
          <input type="text" placeholder="Ваше имя" value={name} onChange={(e) => setName(e.target.value)} required />
          <input type="tel" placeholder="Номер телефона" value={phone} onChange={(e) => setPhone(e.target.value)} required />
          <input type="text" placeholder="Город" value={city} onChange={(e) => setCity(e.target.value)} required />
          <input type="text" placeholder="Улица" value={street} onChange={(e) => setStreet(e.target.value)} required />

          <div className="address-row">
            <input type="text" placeholder="Дом" value={house} onChange={(e) => setHouse(e.target.value)} required />
            <input type="text" placeholder="Квартира / офис" value={apartment} onChange={(e) => setApartment(e.target.value)} />
          </div>

          <textarea placeholder="Комментарий" value={comment} onChange={(e) => setComment(e.target.value)}></textarea>

          {/* --- Payment Options --- */}
          <h3>Выберите способ оплаты:</h3>
          <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
            <option value="cash">Наличные</option>
            <option value="card">Банковская карта</option>
            <option value="mbank">М-Банк</option>
          </select>

          {/* If Card selected */}
          {paymentMethod === "card" && (
            <div className="card-fields">
              <input type="text" placeholder="Номер карты" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} required />
              <input type="text" placeholder="MM/YY" value={cardExpiry} onChange={(e) => setCardExpiry(e.target.value)} required />
              <input type="text" placeholder="CVC" value={cardCVC} onChange={(e) => setCardCVC(e.target.value)} required />
            </div>
          )}

          {/* If M-Bank selected */}
          {paymentMethod === "mbank" && (
            <div className="mbank-fields">
              <input type="text" placeholder="M-Bank логин" value={mbankLogin} onChange={(e) => setMbankLogin(e.target.value)} required />
              <input type="password" placeholder="M-Bank пароль" value={mbankPassword} onChange={(e) => setMbankPassword(e.target.value)} required />
            </div>
          )}

          <label className="agree-label">
            <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} />
            Я согласен(а) с Политикой конфиденциальности
          </label>

          <button type="submit">Отправить заказ</button>
        </form>
      </div>
    </div>
  );
}
