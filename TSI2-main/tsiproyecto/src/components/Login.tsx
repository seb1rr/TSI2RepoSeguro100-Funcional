import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginUsuario } from "../services/LoginServices";

// Componente de login de usuario
export default function Login() {
  // Estados para almacenar RUT, contraseña y mensajes de error
  const [codUsuario, setCodUsuario] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [error, setError] = useState("");

  // Hook de navegación para redirigir al usuario
  const navigate = useNavigate();

  // useEffect para agregar un atajo de teclado (Ctrl + Alt + A) para ir al login de admin
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.altKey && e.key.toLowerCase() === "a") {
        navigate("/admin/login");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    // Limpieza del event listener al desmontar el componente
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [navigate]);

  // Función para manejar el envío del formulario de login
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      // Llamada al servicio de login que retorna un token
      const token = await loginUsuario(codUsuario, contraseña);
      if (!token || typeof token !== "string") {
        throw new Error("Token inválido");
      }

      // Guardar token en localStorage y redirigir a la app
      localStorage.setItem("token", token);
      navigate("/app");
    } catch (err: any) {
      // Manejo de errores provenientes del backend o desconocidos
      if (err.response?.data?.error) {
        setError(err.response.data.error);
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Error desconocido");
      }
    }
  };

  // Función para redirigir a la página de creación de cuenta
  const handleCrearCuenta = () => {
    navigate("/registro");
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        backgroundImage: "url('/images/fondo1.jpeg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Tarjeta de login con efecto blur y fondo semi-transparente */}
      <div
        className="card p-4 shadow"
        style={{
          maxWidth: "400px",
          width: "100%",
          backgroundColor: "rgba(255,255,255,0.25)",
          backdropFilter: "blur(10px)",
          borderRadius: "15px",
        }}
      >
        {/* Logo e instructivo */}
        <div className="text-center mb-4">
          <img
            src="/images/apple.png"
            alt="Logo"
            className="img-fluid"
            style={{ maxHeight: "80px" }}
          />
          <h5 className="mt-3 fw-semibold text-white">Accede a tu cuenta</h5>
        </div>

        {/* Formulario de login */}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="codUsuario" className="form-label text-white">
              RUT
            </label>
            <input
              type="text"
              id="codUsuario"
              className="form-control bg-white bg-opacity-50"
              placeholder="12.345.678-9"
              value={codUsuario}
              onChange={(e) => setCodUsuario(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="contraseña" className="form-label text-white">
              Contraseña
            </label>
            <input
              type="password"
              id="contraseña"
              className="form-control bg-white bg-opacity-50"
              placeholder="••••••••"
              value={contraseña}
              onChange={(e) => setContraseña(e.target.value)}
              required
            />
          </div>

          {/* Mostrar mensaje de error si existe */}
          {error && <div className="alert alert-danger">{error}</div>}

          {/* Botón de login */}
          <button type="submit" className="btn btn-primary w-100 mb-2">
            Ingresar
          </button>

          {/* Botón para redirigir a registro */}
          <button
            type="button"
            className="btn btn-outline-light w-100"
            onClick={handleCrearCuenta}
          >
            Crear Cuenta
          </button>
        </form>
      </div>
    </div>
  );
}
