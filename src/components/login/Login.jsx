import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useUser } from "../UserContext/UserContext";
import "./Login.css";

export default function Login() {
  const { setUser } = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (savedUser && savedUser.email === email) {
      setUser(savedUser);
      navigate("/account");
    } else {
      alert("Пользователь не найден или неверный email");
    }
  };

  return (
    <div className="login-page">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Пароль" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Войти</button>
      </form>
      <p>Нет аккаунта? <Link to="/register">Зарегистрироваться</Link></p>
    </div>
  );
}
