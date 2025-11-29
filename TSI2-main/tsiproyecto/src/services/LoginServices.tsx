import axios from "axios";

export async function loginUsuario(codUsuario: string, contraseña: string) {
  try {
    const response = await axios.post("http://localhost:3000/api/login", {
      codUsuario,
      contraseña,
    });

    return response.data.token;
  } catch (error: any) {
    if (error.response && error.response.data?.error) {
      throw new Error(error.response.data.error);
    } else {
      throw new Error("No se pudo conectar con el servidor");
    }
  }
}