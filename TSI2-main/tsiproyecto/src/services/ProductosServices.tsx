import axios from "axios";

const API_URL = "http://localhost:3000/api";

export const getCategoriaById = async (codCategoria: string) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No hay token disponible");

    const response = await axios.get(`${API_URL}/categorias/${codCategoria}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data.data;
  } catch (error: any) {
    if (error.response?.data?.error) {
      throw new Error(error.response.data.error);
    }
    throw new Error("Error al obtener la categoría");
  }
};