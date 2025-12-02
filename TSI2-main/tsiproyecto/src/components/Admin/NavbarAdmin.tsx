import { Link, useNavigate } from "react-router-dom";

// Componente de barra de navegación para el administrador
// Manejo los enlaces a las secciones principales de la app y el cierre de sesión
export default function NavbarAdmin() {
  const navigate = useNavigate(); // Uso useNavigate para redirigir al login al cerrar sesión

  // Función para cerrar sesión
  // Limpio los datos del usuario en localStorage y redirijo al login de administrador
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("tipo_usuario");
    localStorage.removeItem("cod_usuario");
    navigate("/admin/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        {/* Logo y enlace a la página principal del admin */}
        <Link className="navbar-brand" to="/admin">
          AppleStore Admin
        </Link>

        {/* Botón de menú responsive */}
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

        {/* Contenedor de los enlaces del navbar */}
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav ms-auto">

            {/* Sección de Envíos */}
            {/* Contiene enlaces para registrar envíos, registrar entregas y ver pedidos entregados */}
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

            {/* Sección de Productos */}
            {/* Permite crear productos nuevos y ver los existentes */}
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

            {/* Sección de Ajustes */}
            {/* Contiene enlaces para crear ajustes y ver los ajustes existentes */}
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

            {/* Sección de Seguimiento */}
            {/* Permite ver todos los seguimientos registrados */}
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

            {/* Botón para cerrar sesión */}
            {/* Llama a la función handleLogout al hacer clic */}
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
