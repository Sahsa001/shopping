import React, { useState } from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaWhatsapp, FaTelegram } from "react-icons/fa";
import emailjs from "emailjs-com";
import "./Contact.css";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSending(true);

    emailjs
      .send(
        "YOUR_SERVICE_ID",
        "YOUR_TEMPLATE_ID",
        form,
        "YOUR_PUBLIC_KEY"
      )
      .then(
        () => {
          alert("Сообщение успешно отправлено!");
          setForm({ name: "", email: "", message: "" });
          setSending(false);
        },
        (err) => {
          alert("Ошибка при отправке: " + err.text);
          setSending(false);
        }
      );
  };

  return (
    <div className="contact-page">
      <h1>Контакты</h1>
      <p>Свяжитесь с нами любым удобным способом:</p>

      {/* --- Карточки --- */}
      <div className="contact-cards">
        <div className="contact-card">
          <FaPhoneAlt className="icon phone" />
          <div>
            <h3>Телефон</h3>
            <a href="tel:+996220087452">+996 220 087 452</a>
          </div>
        </div>

        <div className="contact-card">
          <FaEnvelope className="icon email" />
          <div>
            <h3>Email</h3>
            <a href="mailto:info@demm.com">info@demm.com</a>
          </div>
        </div>

        <div className="contact-card">
          <FaMapMarkerAlt className="icon map" />
          <div>
            <h3>Офис</h3>
            <span>г. Бишкек, ул. Чуй, 123</span>
          </div>
        </div>
      </div>

      {/* --- WhatsApp & Telegram --- */}
      <div className="social-buttons">
        <a
          href="https://wa.me/996220087452"
          className="social-btn whatsapp"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaWhatsapp /> WhatsApp
        </a>
        <a
          href="https://t.me/+996996223432957"
          className="social-btn telegram"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaTelegram /> Telegram
        </a>
      </div>

      {/* --- Форма --- */}
      <form className="contact-form" onSubmit={handleSubmit}>
        <h2>Напишите нам</h2>
        <input
          type="text"
          name="name"
          placeholder="Ваше имя"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Ваш Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <textarea
          name="message"
          placeholder="Ваше сообщение"
          value={form.message}
          onChange={handleChange}
          required
        ></textarea>
        <button type="submit" disabled={sending}>
          {sending ? "Отправка..." : "Отправить"}
        </button>
      </form>

      {/* --- Карта --- */}
      <div className="map-container">
        <iframe
          title="map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2910.1234567890!2d74.586123456!3d42.874123456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDLCsDUyJzU2LjAiTiA3NMKwMzUnMzMuMCJF!5e0!3m2!1sen!2skg!4v1690000000000"
          width="100%"
          height="400"
          style={{ border: 0, borderRadius: "12px" }}
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
}
