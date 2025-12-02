import axios from "axios";

const API_URL = "http://localhost:3000/api";

export const getProductoPorCodigo = async (codProducto: string) => {
  try {
    const token = localStorage.getItem("token"); 
    const response = await axios.get(`${API_URL}/productos/${codProducto}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(" Error en getProductoPorCodigo:", error);
    throw new Error("No se pudo obtener el producto");
  }
};



export const actualizarProducto = async (codProducto: string, productoActualizado: any) => {
  try {
    const token = localStorage.getItem("token"); 
    const response = await axios.put(
      `${API_URL}/productos/editar/${codProducto}`,
      productoActualizado,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(" Error en actualizarProducto:", error);
    throw new Error("No se pudo actualizar el producto");
  }
};