import axios from "axios";

const API_URL = "http://localhost:3000/api";

export const pedidosService = {
  // Obtener todos los pedidos activos (no anulados)
  obtenerPedidosActivos: async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${API_URL}/pedidos/activos`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data.data;
    } catch (error: any) {
      console.error("Error en servicio obtenerPedidosActivos:", error.response?.data || error);
      throw error;
    }
  },

  // Obtener todos los pedidos entregados
  obtenerPedidosEntregados: async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${API_URL}/pedidos/entregados`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data.data;
    } catch (error: any) {
      console.error("Error en servicio obtenerPedidosEntregados:", error.response?.data || error);
      throw error;
    }
  },

  // Obtener información de un pedido por código
  obtenerPedidoPorId: async (cod_pedido: string) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${API_URL}/pedidos/informacion?cod_pedido=${cod_pedido}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data.data;
    } catch (error: any) {
      console.error("Error en servicio obtenerPedidoPorId:", error.response?.data || error);
      throw error;
    }
  },

  // Registrar envío de un pedido
  registrarEnvio: async (cod_pedido: string, empresa_envio: string) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `${API_URL}/pedidos/${cod_pedido}`,
        { empresa_envio },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (error: any) {
      console.error("Error en servicio registrarEnvio:", error.response?.data || error);
      throw error;
    }
  },

  // Registrar entrega de un pedido
  registrarEntrega: async (cod_pedido: string) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `${API_URL}/pedidos/registrarentrega/${cod_pedido}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (error: any) {
      console.error("Error en servicio registrarEntrega:", error.response?.data || error);
      throw error;
    }
  },
};
