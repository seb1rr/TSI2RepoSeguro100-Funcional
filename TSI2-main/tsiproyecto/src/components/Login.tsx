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
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow-sm p-4" style={{ maxWidth: "400px", width: "100%" }}>
        <div className="text-center mb-4">
          <img
            src="/images/apple.png"
            alt="Logo"
            className="img-fluid"
            style={{ maxHeight: "80px" }}
          />
          <h5 className="mt-3 fw-semibold">Accede a tu cuenta</h5>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="codUsuario" className="form-label">RUT</label>
            <input
              type="text"
              id="codUsuario"
              className="form-control"
              placeholder="12.345.678-9"
              value={codUsuario}
              onChange={(e) => setCodUsuario(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="contraseña" className="form-label">Contraseña</label>
            <input
              type="password"
              id="contraseña"
              className="form-control"
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
            className="btn btn-outline-secondary w-100"
            onClick={handleCrearCuenta}
          >
            Crear Cuenta
          </button>
        </form>
      </div>
    </div>
  );
}