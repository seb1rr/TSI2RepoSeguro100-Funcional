import axios from "axios";

const API_URL = "http://localhost:3000/api/ajustes";

const getToken = () => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Token no disponible");
  return token;
};

export const ajusteClient = {
  crearAjuste: async (
    cod_usuario: string,
    cod_producto: string,
    tipo_ajuste: boolean,
    cantidad: number,
    descripcion: string,
    cod_pedido?: string
  ) => {
    const token = getToken();
    const response = await axios.post(
      API_URL,
      { cod_usuario, cod_producto, tipo_ajuste, cantidad, descripcion, cod_pedido },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  },

  obtenerAjustes: async () => {
    const token = getToken();
    const response = await axios.get(`${API_URL}/ver`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.data.ajustes; // Devuelve solo el arreglo de ajustes
  },

  obtenerAjustePorId: async (cod_ajuste: string) => {
    const token = getToken();
    const response = await axios.get(`${API_URL}/${cod_ajuste}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.data; // Devuelve el ajuste específico
  },
};

