import axios from "axios";

const API_URL = "http://localhost:3000/api/carrito";

const getToken = () => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Token no disponible");
  return token;
};

const getCodUsuario = () => {
  const cod_usuario = localStorage.getItem("cod_usuario");
  if (!cod_usuario) throw new Error("Usuario no disponible");
  return cod_usuario;
};

export const carritoClient = {
  
  agregarProducto: async (codProducto: string, cantidad: number) => {
    const token = getToken();
    const cod_usuario = getCodUsuario();

    const response = await axios.post(
      `${API_URL}/agregar`,
      { cod_usuario, cod_producto: codProducto, cantidad },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    return response.data;
  },

  obtenerCarrito: async () => {
    const token = getToken();
    const cod_usuario = getCodUsuario();

    const response = await axios.get(
      `${API_URL}/usuario/${cod_usuario}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    const payload = response.data?.data;
    if (!payload) return { items: [], total: 0 };

    const itemsOriginales = payload.items || [];

    const items = itemsOriginales.map((item: any) => ({
      cod_carrito: item.cod_carrito,
      cantidad: item.cantidad,
      producto: {
        nombre: item.producto?.nombre ?? "Producto",
        precio: item.precio_unitario ?? 0,
        stock: item.producto?.stock ?? 0,
      },
    }));

    return {
      items,
      total: payload.total || 0,
    };
  },

  actualizarCantidad: async (cod_carrito: number, cantidad: number) => {
    const token = getToken();

    const response = await axios.put(
      `${API_URL}/actualizar/${cod_carrito}`,
      { cantidad },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    return response.data;
  },

  eliminarProducto: async (cod_carrito: number) => {
    const token = getToken();

    const response = await axios.delete(
      `${API_URL}/eliminar/${cod_carrito}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    return response.data;
  },

  
  vaciarCarrito: async () => {
    const token = getToken();
    const cod_usuario = getCodUsuario();

    const response = await axios.delete(`${API_URL}/vaciar`, {
      headers: { Authorization: `Bearer ${token}` },
      data: { cod_usuario }, 
    });

    return response.data;
  },
};
