import React from 'react';
import { RouterProvider } from 'react-router-dom';
import router from './Router';

// Context'тер
import { UserProvider } from './components/UserContext/UserContext';
import { CartProvider } from './components/CartContext/CartContext';

function App() {
  return (
    <UserProvider>
      <CartProvider>
        <RouterProvider router={router} />
      </CartProvider>
    </UserProvider>
  );
}

export default App;
