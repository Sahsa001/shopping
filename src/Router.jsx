import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./components/Home/Home";
import About from "./components/About/About";
import Contact from "./components/Contact/Contact";
import Mixers from "./components/mixers/Mixers";
import ShowerSystems from "./components/ShowerSystems/ShowerSystems";
import Promotions from "./components/Promotions/Promotions";
import Delivery from "./components/Delivery/Delivery";
import Stores from "./components/Stores/Stores";
import ShowerRacks from "./components/Shower-Racks/ShowerRacks";
import Catalog from "./components/CatalogNav/CatalogNav";
import Cart from "./components/Cart/Cart";
import Spouts from "./components/Spouts/Spouts";
import Accessories from "./components/Accessories/Accessories";
import SearchResults from "./components/SearchResults/SearchResults";
import Login from "./components/login/Login";
import Register from "./components/Register/Register";
import Account from "./components/Account/Account";

// Context'тер
import { CartProvider } from "./components/CartContext/CartContext";
import { UserProvider } from "./components/UserContext/UserContext";

// Layout'ту провайдер менен ороп коебуз
const withProviders = (element) => (
  <UserProvider>
    <CartProvider>{element}</CartProvider>
  </UserProvider>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: withProviders(<Layout />),
    children: [
      { path: "/", element: <Home /> },
      { path: "about", element: <About /> },
      { path: "contacts", element: <Contact /> },
      { path: "mixers", element: <Mixers /> },
      { path: "shower-systems", element: <ShowerSystems /> },
      { path: "promotions", element: <Promotions /> },
      { path: "delivery", element: <Delivery /> },
      { path: "stores", element: <Stores /> },
      { path: "shower-racks", element: <ShowerRacks /> },
      { path: "catalognav", element: <Catalog /> },
      { path: "cart", element: <Cart /> },
      { path: "spouts", element: <Spouts /> },
      { path: "accessories", element: <Accessories /> },
      { path: "search", element: <SearchResults /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "account", element: <Account /> },
      
    ],
  },
]);

export default router;
