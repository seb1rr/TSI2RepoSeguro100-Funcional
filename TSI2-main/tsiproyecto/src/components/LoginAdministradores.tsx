import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginAdmin } from "../services/LoginAdminService";

export default function LoginAdmin() {
  const [codUsuario, setCodUsuario] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const { token, tipo_usuario } = await loginAdmin(codUsuario, contrasena);

      if (!token || typeof token !== "string") {
        throw new Error("Token inválido");
      }

      localStorage.setItem("token", token);
      localStorage.setItem("tipo_usuario", tipo_usuario.toString());

     
      if (tipo_usuario === 1) {
        navigate("/admin/dashboard");
      } else {
        throw new Error("Acceso denegado: no eres administrador");
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Error desconocido");
      }
    }
  };


  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow-sm p-4" style={{ maxWidth: "400px", width: "100%" }}>
        <div className="text-center mb-4">
          <img
            src="/images/apple.png"
            alt="Logo"
            className="img-fluid"
            style={{ maxHeight: "80px" }}
          />
          <h5 className="mt-3 fw-semibold">Accede como Administrador</h5>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="codUsuario" className="form-label">Código de Usuario</label>
            <input
              type="text"
              id="codUsuario"
              className="form-control"
              placeholder="Ej: admin001"
              value={codUsuario}
              onChange={(e) => setCodUsuario(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="contrasena" className="form-label">Contraseña</label>
            <input
              type="password"
              id="contrasena"
              className="form-control"
              placeholder="••••••••"
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
              required
            />
          </div>

          {error && <div className="alert alert-danger">{error}</div>}

          <button type="submit" className="btn btn-primary w-100 mb-2">
            Ingresar
          </button>
        </form>
      </div>
    </div>
  );
}