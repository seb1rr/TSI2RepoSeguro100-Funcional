
import axios from "axios";

const API_URL = "http://localhost:3000/api";

export const getCategorias = async () => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Token no disponible");

  const response = await axios.get(`${API_URL}/categorias`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data.data; 
};