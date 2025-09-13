import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { CartProvider } from "./components/CartContext/CartContext";
import { UserProvider } from "./components/UserContext/UserContext"; // 👈 UserProviderди коштук
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <CartProvider>
      <UserProvider>   {/* 👈 UserProvider менен ороп койдук */}
        <App />
      </UserProvider>
    </CartProvider>
  </React.StrictMode>
);
