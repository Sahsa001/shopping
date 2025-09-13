import axios from "axios";

const API_URL = "http://localhost:3000/products"; // json-server

export async function getProducts() {
  const res = await axios.get(API_URL);
  return res.data;
}
