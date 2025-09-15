// src/data/products.js
import axios from "axios";

const API_URL = "https://68a2a8a1c5a31eb7bb1d67a6.mockapi.io/api/1/product";

// async функция, продукттарды серверден алат
export const fetchProducts = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data; // массив продукттар
  } catch (error) {
    console.error("Error fetching products:", error);
    return []; // ката болгондо бош массив
  }
};
