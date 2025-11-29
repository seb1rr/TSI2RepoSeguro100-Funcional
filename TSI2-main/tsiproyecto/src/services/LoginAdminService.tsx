
import axios from "axios";

export async function loginAdmin(cod_usuario: string, contraseña: string) {
  try {
    const response = await axios.post("http://localhost:3000/api/login/admin", {
      cod_usuario,
      contraseña,
    });

    const { token, tipo_usuario } = response.data;
    return { token, tipo_usuario };
  } catch (error: any) {
    if (error.response?.data?.error) {
      throw new Error(error.response.data.error);
    } else {
      throw new Error("No se pudo conectar con el servidor");
    }
  }
}