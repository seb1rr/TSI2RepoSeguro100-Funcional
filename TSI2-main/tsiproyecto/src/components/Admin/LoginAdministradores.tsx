import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginAdmin } from "../../services/LoginAdminService";

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

      if (!token || typeof token !== "string") throw new Error("Token inválido");

      // Guardar token y cod_usuario en localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("tipo_usuario", tipo_usuario.toString());
      localStorage.setItem("cod_usuario", codUsuario); 

      if (tipo_usuario === 1) {
        navigate("/admin/dashboard");
      } else {
        throw new Error("Acceso denegado: no eres administrador");
      }
    } catch (err: any) {
      setError(err.message || "Error desconocido");
    }
  };

  const handleVolver = () => {
    navigate("/login");
  };

  return (
    <div className="position-relative min-vh-100 d-flex justify-content-center align-items-center">

      {/* Fondo */}
      <div
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{
          backgroundImage: "url('/images/fondo2.jpeg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
          zIndex: -2,
        }}
      />

      {/* Overlay oscuro */}
      <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark bg-opacity-25" />

      {/* Formulario */}
      <div className="card shadow-sm p-4" style={{ maxWidth: "400px", width: "100%", backgroundColor: "rgba(255,255,255,0.85)" }}>
        <div className="text-center mb-4">
          <img src="/images/apple.png" alt="Logo" className="img-fluid" style={{ maxHeight: "80px" }} />
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

          <button type="submit" className="btn btn-primary w-100 mb-2">Ingresar</button>

          {/* Botón volver al login normal */}
          <button type="button" className="btn btn-secondary w-100" onClick={handleVolver}>
            Volver al login normal
          </button>
        </form>
      </div>
    </div>
  );
}
