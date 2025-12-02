import { Link, useNavigate } from "react-router-dom";

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

            {/* Envíos */}
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="enviosDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Envíos
              </a>
              <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="enviosDropdown">
                <li>
                  <Link className="dropdown-item" to="envios/registrar">
                    Registrar Envío
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="envios/entregar">
                    Registrar Entrega
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="pedidos/entregados">
                    Ver Pedidos Entregados
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="pedidos/detalle">
                    Ver Detalle Pedido
                  </Link>
                </li>
              </ul>
            </li>

            {/* Productos */}
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
                  <Link className="dropdown-item" to="productos/crear">
                    Crear Producto
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="productos">
                    Ver Productos
                  </Link>
                </li>
              </ul>
            </li>

            {/* Ajustes */}
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
                  <Link className="dropdown-item" to="ajustes/crear">
                    Crear Ajuste
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="ajustes">
                    Ver Ajustes
                  </Link>
                </li>
              </ul>
            </li>

            {/* Seguimiento */}
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="seguimientoDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Seguimiento
              </a>
              <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="seguimientoDropdown">
               
                <li>
                  <Link className="dropdown-item" to="seguimiento/ver">
                    Ver Seguimientos
                  </Link>
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
  );
}
 