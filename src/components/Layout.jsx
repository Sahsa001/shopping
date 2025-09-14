// src/components/Layout.jsx
import React from "react";
import Header from "./header/Header";
import { Outlet } from "react-router-dom";
// import Promotions from "./Promotions/Promotions";
import Footer from "./Footer/Footer";

function Layout() {
  return (
    <div>
      <Header /> 
      <main>
        <Outlet /> 
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
