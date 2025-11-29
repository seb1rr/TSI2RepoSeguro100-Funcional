import { Link, useNavigate } from "react-router-dom";
import React from "react";

export default function NavbarAdmin() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Limpiar datos de sesión
    localStorage.removeItem("token");
    localStorage.removeItem("tipo_usuario");
    localStorage.removeItem("cod_usuario");

    // Redirigir a login admin
    navigate("/admin/login");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/admin">
            AppleStore Admin
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav ms-auto">

              {/* Dropdown Productos */}
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="productosDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Productos
                </a>
                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="productosDropdown">
                  <li>
                    <Link className="dropdown-item" to="productos/crear">Crear Producto</Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="productos/listar">Listar Productos</Link>
                  </li>
                </ul>
              </li>

              {/* Dropdown Ajustes */}
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="ajustesDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Ajustes
                </a>
                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="ajustesDropdown">
                  <li>
                    <Link className="dropdown-item" to="ajustes/crear">Crear Ajuste</Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="ajustes/listar">Ver Ajustes</Link>
                  </li>
                </ul>
              </li>

              {/* Botón Cerrar Sesión */}
              <li className="nav-item">
                <button
                  className="btn btn-outline-light ms-3"
                  onClick={handleLogout}
                >
                  Cerrar Sesión
                </button>
              </li>

            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
