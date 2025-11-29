
import axios from "axios";

export const crearCliente = async (cliente: {
  codUsuario: string;
  nombreApellido: string;
  direccion: string;
  telefono: string;
  correo: string;
  contraseña: string;
}) => {
  const response = await axios.post(
    "http://localhost:3000/api/clientes/crear",
    cliente
  );

  return response.data;
};
