import { Link, Outlet } from "react-router-dom";

export default function NavbarAmin() {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/admin">AppleStore Admin</Link>

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
                    <Link className="dropdown-item" to="productos/crear">Crear</Link>
                  </li>
                 
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      
      <main className="container mt-4">
        <Outlet />
      </main>
    </>
  );
}