import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginUsuario } from "../services/LoginServices";

export default function Login() {
  const [codUsuario, setCodUsuario] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.altKey && e.key.toLowerCase() === "a") {
        navigate("/admin/login");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const token = await loginUsuario(codUsuario, contraseña);
      if (!token || typeof token !== "string") {
        throw new Error("Token inválido");
      }

      localStorage.setItem("token", token);
      navigate("/app");
    } catch (err: any) {
      if (err.response?.data?.error) {
        setError(err.response.data.error);
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Error desconocido");
      }
    }
  };

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
      <div
        className="card p-4 shadow"
        style={{
          maxWidth: "400px",
          width: "100%",
          backgroundColor: "rgba(255,255,255,0.25)", // fondo semi-transparente
          backdropFilter: "blur(10px)", // efecto blur para legibilidad
          borderRadius: "15px",
        }}
      >
        <div className="text-center mb-4">
          <img
            src="/images/apple.png"
            alt="Logo"
            className="img-fluid"
            style={{ maxHeight: "80px" }}
          />
          <h5 className="mt-3 fw-semibold text-white">Accede a tu cuenta</h5>
        </div>

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

          {error && <div className="alert alert-danger">{error}</div>}

          <button type="submit" className="btn btn-primary w-100 mb-2">
            Ingresar
          </button>

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
