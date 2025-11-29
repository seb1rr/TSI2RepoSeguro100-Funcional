
import axios from "axios";

const API_URL = "http://localhost:3000/api";

export const deleteProducto = async (codProducto: string) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No hay token disponible");

    await axios.delete(`${API_URL}/productos/${codProducto}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error: any) {
    if (error.response?.data?.error) {
      throw new Error(error.response.data.error);
    }
    throw new Error("Error al eliminar el producto");
  }
};