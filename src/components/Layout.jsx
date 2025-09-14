
import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "./Footer/Footer";
import Header from "./header/Header.jsx";

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
