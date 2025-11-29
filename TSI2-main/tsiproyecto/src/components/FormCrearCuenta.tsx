import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { crearCliente } from "../services/CrearCuentaService";

export default function Registro() {
  const [codUsuario, setCodUsuario] = useState(""); 
  const [nombreApellido, setNombreApellido] = useState("");
  const [direccion, setDireccion] = useState("");
  const [telefono, setTelefono] = useState("");
  const [correo, setCorreo] = useState("");
  const [contraseña, setContraseña] = useState(""); 
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const rutRegex = /^\d{7,8}-[0-9kK]$/;
    if (!rutRegex.test(codUsuario)) {
      setError("El RUT debe tener el formato 12345678-9");
      return;
    }

    try {
      await crearCliente({
        codUsuario,
        nombreApellido,
        direccion,
        telefono,
        correo,
        contraseña,
      });
      navigate("/login");
    } catch (err: any) {
      if (err.response?.status === 409) {
        setError("Este RUT o correo ya está registrado");
      } else {
        setError(err.message || "Error al crear la cuenta");
      }
    }
  };
  

  return (
    <div className="container mt-5" style={{ maxWidth: "500px" }}>
      <h3 className="mb-4 text-center">Crear Cuenta</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">RUT</label>
          <input
            type="text"
            className="form-control"
            value={codUsuario}
            onChange={(e) => setCodUsuario(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Nombre y Apellido</label>
          <input
            type="text"
            className="form-control"
            value={nombreApellido}
            onChange={(e) => setNombreApellido(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Dirección</label>
          <input
            type="text"
            className="form-control"
            value={direccion}
            onChange={(e) => setDireccion(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Teléfono</label>
          <input
            type="tel"
            className="form-control"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Correo</label>
          <input
            type="email"
            className="form-control"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Contraseña</label>
          <input
            type="password"
            className="form-control"
            value={contraseña}
            onChange={(e) => setContraseña(e.target.value)}
            required
          />
        </div>
        {error && <div className="alert alert-danger">{error}</div>}
        <button type="submit" className="btn btn-success w-100">
          Crear Cuenta
        </button>
      </form>
    </div>
  );
}
