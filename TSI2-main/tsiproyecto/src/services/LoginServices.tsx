import axios from "axios";

export async function loginUsuario(codUsuario: string, contraseña: string) {
  try {
    // Petición al backend
    const response = await axios.post("http://localhost:3000/api/login", {
      codUsuario,
      contraseña,
    });

    const token = response.data.token;

    // Guardar token y usuario en localStorage
    localStorage.setItem("token", token);
    localStorage.setItem("cod_usuario", codUsuario);

    return token; // Lo retornamos por si lo ocupa el frontend
  } catch (error: any) {
    // Si backend retorna un error detallado
    if (error.response && error.response.data?.error) {
      throw new Error(error.response.data.error);
    }

    // Error genérico (servidor caído, CORS, etc.)
    throw new Error("No se pudo conectar con el servidor");
  }
}
