import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginAdmin } from "../../services/LoginAdminService";

// Componente de login de administrador
// Manejo los estados del código de usuario, contraseña y mensajes de error
// Uso useNavigate para redirigir según el tipo de usuario
export default function LoginAdmin() {
  const [codUsuario, setCodUsuario] = useState(""); // Estado para el código del usuario
  const [contrasena, setContrasena] = useState(""); // Estado para la contraseña
  const [error, setError] = useState(""); // Estado para mostrar mensajes de error
  const navigate = useNavigate(); // Hook para redireccionar a otras rutas

  // Función que se ejecuta al enviar el formulario
  // Llama al servicio de login, guarda el token y cod_usuario en localStorage
  // Redirige al dashboard si es administrador o muestra error si no lo es
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const { token, tipo_usuario } = await loginAdmin(codUsuario, contrasena);

      if (!token || typeof token !== "string") throw new Error("Token inválido");

      // Guardar información de sesión en localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("tipo_usuario", tipo_usuario.toString());
      localStorage.setItem("cod_usuario", codUsuario);

      if (tipo_usuario === 1) {
        navigate("/admin/dashboard"); // Redirijo al dashboard de administrador
      } else {
        throw new Error("Acceso denegado: no eres administrador");
      }
    } catch (err: any) {
      setError(err.message || "Error desconocido"); // Manejo de errores
    }
  };

  // Función para volver al login normal
  const handleVolver = () => {
    navigate("/login");
  };

  return (
    <div className="position-relative min-vh-100 d-flex justify-content-center align-items-center">
      {/* Fondo con imagen y overlay oscuro */}
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
      <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark bg-opacity-25" />

      {/* Contenedor del formulario con sombra y fondo semitransparente */}
      <div className="card shadow-sm p-4" style={{ maxWidth: "400px", width: "100%", backgroundColor: "rgba(255,255,255,0.85)" }}>
        {/* Logo y título del formulario */}
        <div className="text-center mb-4">
          <img src="/images/apple.png" alt="Logo" className="img-fluid" style={{ maxHeight: "80px" }} />
          <h5 className="mt-3 fw-semibold">Accede como Administrador</h5>
        </div>

        {/* Formulario de login */}
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

          {/* Muestra mensajes de error si existen */}
          {error && <div className="alert alert-danger">{error}</div>}

          {/* Botones para enviar el formulario o volver al login normal */}
          <button type="submit" className="btn btn-primary w-100 mb-2">Ingresar</button>
          <button type="button" className="btn btn-secondary w-100" onClick={handleVolver}>
            Volver al login normal
          </button>
        </form>
      </div>
    </div>
  );
}
