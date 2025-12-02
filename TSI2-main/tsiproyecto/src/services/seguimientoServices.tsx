// src/services/seguimientoServices.ts
import axios from "axios";

const API_URL = "http://localhost:3000/api/seguimiento";

const getHeaders = () => ({
  Authorization: `Bearer ${localStorage.getItem("token")}`,
  "Content-Type": "application/json",
});

// Crear seguimiento (estado como número: 0 = no en tránsito, 2 = en tránsito)
export const crearSeguimiento = async (data: { cod_pedido: string; estado: number }) => {
  try {
    const res = await axios.post(API_URL, data, { headers: getHeaders() });
    return res.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Error al crear seguimiento");
  }
};

// Obtener todos los seguimientos
export const obtenerSeguimientos = async (params?: {
  page?: number;
  limit?: number;
  cod_pedido?: string;
  estado?: number;
  fecha_inicio?: string;
  fecha_fin?: string;
}) => {
  try {
    const res = await axios.get(`${API_URL}/ver`, {
      headers: getHeaders(),
      params,
    });
    return res.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Error al obtener seguimientos");
  }
};

// Actualizar estado de seguimiento
export const actualizarEstadoSeguimiento = async (nro_seguimiento: string, estado: number) => {
  try {
    const res = await axios.put(
      `${API_URL}/${nro_seguimiento}/estado`,
      { estado },
      { headers: getHeaders() }
    );
    return res.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Error al actualizar estado");
  }
};

// Eliminar seguimiento
export const eliminarSeguimiento = async (nro_seguimiento: string) => {
  try {
    const res = await axios.delete(`${API_URL}/${nro_seguimiento}`, { headers: getHeaders() });
    return res.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Error al eliminar seguimiento");
  }
};
