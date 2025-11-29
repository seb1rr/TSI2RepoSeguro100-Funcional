import axios from "axios";

const API_URL = "http://localhost:3000/api";

export const crearProducto = async (producto: {
  nombre: string;
  descripcion?: string;
  precioUnitario?: number;
  stock?: number;
  imagen?: string;
  codCategoria: string;
}) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No hay token disponible");

    const response = await axios.post(`${API_URL}/productos`, producto, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error: any) {
    const mensaje = error.response?.data?.error || "Error al crear producto";
    throw new Error(mensaje);
  }
};