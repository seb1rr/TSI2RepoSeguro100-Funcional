
import axios from "axios";

const API_URL = "http://localhost:3000/api";

export const getProductos = async () => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Token no disponible");

  const response = await axios.get(`${API_URL}/productos`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data.data; 
};